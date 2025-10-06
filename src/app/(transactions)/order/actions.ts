"use server";

import { revalidateTag } from "next/cache";

import { sendInvoiceRequested, sendOrderConfirmation } from "@/lib/notifications/order";
import { queueInvoiceRequest } from "@/lib/workflows/invoice";
import { prisma } from "@/lib/prisma-client";
import type { OrderFormState } from "./form-state";

export type OrderLineInput = {
  menuItemId: string;
  quantity: number;
  notes?: string;
  customizations?: string[];
};

export type OrderSessionInput = {
  serviceType: "pickup" | "dine-in";
  locationSlug: string;
  cart: OrderLineInput[];
  contact: {
    email: string;
    phone?: string;
    name: string;
  };
  requestedReadyAt?: string;
  paymentMode?: "pay_on_site" | "invoice_email";
  accountId?: string;
  specialInstructions?: string;
};

function toMinutes(date: Date) {
  return date.getUTCHours() * 60 + date.getUTCMinutes();
}

type ServiceHour = {
  dayOfWeek: number;
  isClosed: boolean;
  openTime: Date;
  closeTime: Date;
};

function makeServiceDate(base: Date, time: Date) {
  return new Date(
    Date.UTC(
      base.getUTCFullYear(),
      base.getUTCMonth(),
      base.getUTCDate(),
      time.getUTCHours(),
      time.getUTCMinutes(),
      0,
      0,
    ),
  );
}

function findNextServiceTime(hours: ServiceHour[], reference: Date) {
  const base = new Date(
    Date.UTC(reference.getUTCFullYear(), reference.getUTCMonth(), reference.getUTCDate(), 0, 0, 0, 0),
  );
  for (let offset = 0; offset < 7; offset += 1) {
    const dayBase = new Date(base);
    dayBase.setUTCDate(base.getUTCDate() + offset);
    const dayOfWeek = dayBase.getUTCDay();
    const entries = hours
      .filter((entry) => entry.dayOfWeek === dayOfWeek && !entry.isClosed)
      .sort((a, b) => a.openTime.getTime() - b.openTime.getTime());

    for (const entry of entries) {
      const open = makeServiceDate(dayBase, entry.openTime);
      const close = makeServiceDate(dayBase, entry.closeTime);
      if (offset === 0 && reference >= open && reference < close) {
        return new Date(reference);
      }
      if (offset > 0 || reference < open) {
        return open;
      }
    }
  }
  return new Date(reference);
}

function resolveRequestedAt(hours: ServiceHour[], requested?: string) {
  if (requested) {
    const parsed = new Date(requested);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
    throw new Error("Invalid requested time");
  }
  return findNextServiceTime(hours, new Date());
}


async function safeRevalidateTag(tag: string) {
  try {
    await revalidateTag(tag);
  } catch (error) {
    if (error instanceof Error && error.message.includes("static generation store")) {
      return;
    }
    throw error;
  }
}

function normalizePaymentMode(mode?: string) {
  return mode === "invoice_email" ? "INVOICE_EMAIL" : "PAY_ON_SITE";
}

function formatPaymentMode(mode: string) {
  return mode.toLowerCase() as "pay_on_site" | "invoice_email";
}

function ensure(condition: boolean, error: Error) {
  if (!condition) {
    throw error;
  }
}

function serviceClosedError(message: string) {
  const error = new Error(message);
  // @ts-expect-error augment error
  error.code = "SERVICE_CLOSED";
  return error;
}

function itemUnavailableError(unavailable: string[]) {
  const error = new Error("One or more menu items are unavailable");
  // @ts-expect-error augment error
  error.code = "ITEM_UNAVAILABLE";
  // @ts-expect-error augment error
  error.details = unavailable;
  return error;
}

export async function createOrder(input: OrderSessionInput) {
  const location = await prisma.restaurantLocation.findUnique({
    where: { slug: input.locationSlug },
    include: {
      hours: true,
      menuItemLinks: {
        include: {
          menuItem: true,
        },
      },
    },
  });

  ensure(Boolean(location), new Error(`Unknown location: ${input.locationSlug}`));

  const requestedAt = resolveRequestedAt(location!.hours as ServiceHour[], input.requestedReadyAt);

  const dayOfWeek = requestedAt.getUTCDay();
  const hoursForDay = location!.hours.filter((entry) => entry.dayOfWeek === dayOfWeek);

  ensure(hoursForDay.length > 0, serviceClosedError("No service hours defined"));

  const minutes = requestedAt.getUTCHours() * 60 + requestedAt.getUTCMinutes();
  const isOpen = hoursForDay.some((entry) => {
    if (entry.isClosed) return false;
    const openMinutes = toMinutes(entry.openTime);
    const closeMinutes = toMinutes(entry.closeTime);
    return minutes >= openMinutes && minutes < closeMinutes;
  });

  ensure(isOpen, serviceClosedError("Service closed for selected time"));

  ensure(input.cart.length > 0, new Error("Cart is empty"));

  const menuItemsBySlug = new Map(location!.menuItemLinks.map((link) => [link.menuItem.slug, link.menuItem]));

  const unavailable: string[] = [];
  let subtotal = 0;

  for (const line of input.cart) {
    const item = menuItemsBySlug.get(line.menuItemId);
    if (!item || !item.isAvailable) {
      unavailable.push(line.menuItemId);
      continue;
    }
    const quantity = Math.max(0, Number.parseInt(String(line.quantity), 10) || 0);
    if (quantity <= 0 || quantity > 10) {
      unavailable.push(line.menuItemId);
      continue;
    }
    const price = Number(item.price ?? 0);
    subtotal += price * quantity;
  }

  if (unavailable.length > 0) {
    throw itemUnavailableError(unavailable);
  }

  const tax = Number((subtotal * 0.1).toFixed(2));
  const total = subtotal + tax;

  const paymentMode = normalizePaymentMode(input.paymentMode);
  const instructions =
    paymentMode === "PAY_ON_SITE"
      ? "Pay at the counter on site when you arrive."
      : `Invoice sent to ${input.contact.email}. Please settle within 24 hours.`;

  const order = await prisma.orderSession.create({
    data: {
      status: "SUBMITTED",
      serviceType: input.serviceType === "dine-in" ? "DINE_IN" : "PICKUP",
      locationId: location!.id,
      guestProfileId: input.accountId ?? null,
      cartItems: input.cart,
      subtotal,
      tax,
      total,
      paymentMode,
      requestedReadyAt: requestedAt,
      specialInstructions: input.specialInstructions ?? null,
      invoiceEmailSentAt: null,
    },
    include: { location: true },
  });

  const estimatedReadyAt = new Date(requestedAt.getTime() + 30 * 60 * 1000);

  await safeRevalidateTag(`order-state:${order.id}`);
  for (const line of input.cart) {
    await safeRevalidateTag(`menu-item:${line.menuItemId}`);
  }

  if (paymentMode === "PAY_ON_SITE") {
    await sendOrderConfirmation({
      orderId: order.id,
      email: input.contact.email,
      instructions,
      total,
    });
  } else {
    await sendInvoiceRequested(order.id, input.contact.email);
    await queueInvoiceRequest({ orderId: order.id, email: input.contact.email, total });
  }

  return {
    orderId: order.id,
    status: "submitted" as const,
    paymentMode: formatPaymentMode(order.paymentMode),
    instructions,
    estimatedReadyAt: estimatedReadyAt.toISOString(),
    revalidateTags: [`order-state:${order.id}`],
  };
}

export async function updateOrderStatus(params: {
  orderId: string;
  status: "submitted" | "ready" | "cancelled";
  actor: "system" | "staff";
}) {
  const order = await prisma.orderSession.update({
    where: { id: params.orderId },
    data: {
      status:
        params.status === "ready"
          ? "READY"
          : params.status === "cancelled"
          ? "CANCELLED"
          : "SUBMITTED",
    },
  });

  await safeRevalidateTag(`order-state:${order.id}`);
  return { orderId: order.id, status: params.status, revalidateTags: [`order-state:${order.id}`] };
}

export async function createOrderAction(
  _: OrderFormState,
  formData: FormData,
): Promise<OrderFormState> {
  try {
    const cartJson = formData.get("cart");
    const cart: OrderLineInput[] = cartJson ? JSON.parse(String(cartJson)) : [];

    const result = await createOrder({
      serviceType: (formData.get("serviceType") as "pickup" | "dine-in") ?? "pickup",
      locationSlug: String(formData.get("location")),
      cart,
      contact: {
        email: String(formData.get("email")),
        name: String(formData.get("name")),
        phone: formData.get("phone") ? String(formData.get("phone")) : undefined,
      },
      requestedReadyAt: formData.get("requestedReadyAt")
        ? new Date(String(formData.get("requestedReadyAt"))).toISOString()
        : undefined,
      paymentMode: (formData.get("paymentMode") as "pay_on_site" | "invoice_email") ?? "pay_on_site",
      specialInstructions: formData.get("specialInstructions")
        ? String(formData.get("specialInstructions"))
        : undefined,
    });

    return {
      status: "success",
      message: "Order submitted",
      orderId: result.orderId,
      instructions: result.instructions,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to submit order";
    return { status: "error", message };
  }
}






