import { describe, it, expect } from "vitest";

import { createOrder } from "@/app/(transactions)/order/actions";

describe("createOrder Server Action", () => {
  const basePayload = {
    serviceType: "pickup" as const,
    locationSlug: "old-town",
    cart: [
      { menuItemId: "kiisi-burger", quantity: 2 },
    ],
    contact: { email: "guest@example.com", name: "Aino" },
  };

  it("rethrows SERVICE_CLOSED errors when location is outside service hours", async () => {
    const payload = { ...basePayload, requestedReadyAt: "2025-10-04T08:00:00.000Z" };

    await expect(createOrder(payload)).rejects.toMatchObject({
      code: "SERVICE_CLOSED",
    });
  });

  it("returns pay-on-site instructions when order is accepted", async () => {
    const payload = { ...basePayload, requestedReadyAt: "2025-10-04T17:00:00.000Z" };

    const result = await createOrder(payload);

    expect(result.paymentMode).toBe("pay_on_site");
    expect(result.instructions.toLowerCase()).toContain("pay at");
    expect(result.revalidateTags).toContain("order-state:" + result.orderId);
  });

  it("supports invoice-by-email flow when requested", async () => {
    const payload = {
      ...basePayload,
      paymentMode: "invoice_email" as const,
      contact: { email: "invoice@example.com", name: "Kari" },
    };

    const result = await createOrder(payload);

    expect(result.paymentMode).toBe("invoice_email");
    expect(result.instructions.toLowerCase()).toContain("invoice");
  });
});
