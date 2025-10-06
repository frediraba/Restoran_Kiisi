"use server";

import { revalidateTag } from "next/cache";

import { recordAvailability } from "@/lib/observability/slo";
import { sendReservationConfirmation, sendWaitlistFollowUp } from "@/lib/notifications/reservations";
import { prisma } from "@/lib/prisma-client";
import type { ReservationFormState } from "./form-state";

export type ReservationAvailabilityRequest = {
  locationSlug: string;
  partySize: number;
  requestedTime: string;
};

export type ReservationAvailabilityResponse = {
  requestedTime: string;
  isAvailable: boolean;
  nearestAlternatives: string[];
  message?: string;
  revalidateTags: string[];
};

export type ReservationCreatePayload = {
  locationSlug: string;
  partySize: number;
  requestedTime: string;
  guest: {
    name: string;
    email: string;
    phone?: string;
    accountId?: string;
  };
  notes?: string;
};

export type ReservationCreateResponse = {
  reservationId: string;
  status: "confirmed" | "waitlisted";
  confirmedTime: string;
  nearestAlternatives: string[];
  revalidateTags: string[];
};

type ReservationCancelResponse = {
  reservationId: string;
  status: "cancelled";
  revalidateTags: string[];
};

type LocationWithContext = Awaited<ReturnType<typeof loadLocation>>;

type LocationHoursEntry = LocationWithContext["hours"][number];

function capacityError(message: string) {
  const error = new Error(message);
  // @ts-expect-error custom code
  error.code = "CAPACITY_EXCEEDED";
  return error;
}

function outOfHoursError(message: string) {
  const error = new Error(message);
  // @ts-expect-error custom code
  error.code = "OUT_OF_HOURS";
  return error;
}

function bookingIntervalMinutes(policy?: { bookingIntervalMinutes: number }) {
  return policy?.bookingIntervalMinutes ?? 30;
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

function roundToInterval(date: Date, interval: number) {
  const ms = interval * 60 * 1000;
  return new Date(Math.round(date.getTime() / ms) * ms);
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function toMinutes(date: Date) {
  return date.getUTCHours() * 60 + date.getUTCMinutes();
}

async function loadLocation(slug: string) {
  const location = await prisma.restaurantLocation.findUnique({
    where: { slug },
    include: {
      reservationPolicy: true,
      hours: true,
      reservationRequests: {
        where: { status: { not: "CANCELLED" } },
      },
    },
  });

  if (!location) {
    throw new Error(`Unknown location: ${slug}`);
  }

  return location;
}

function hoursForDate(location: LocationWithContext, date: Date) {
  const dayOfWeek = date.getUTCDay();
  return location.hours.filter((entry) => entry.dayOfWeek === dayOfWeek);
}

function computeNearestAlternatives(
  requestedTime: Date,
  interval: number,
  hours: LocationHoursEntry[],
) {
  const options: string[] = [];
  let pointer = roundToInterval(addMinutes(requestedTime, interval), interval);
  let attempts = 0;

  while (options.length < 3 && attempts < 12) {
    attempts += 1;
    const minutes = toMinutes(pointer);
    const slotAvailable = hours.some((entry) => {
      if (entry.isClosed) return false;
      const openMinutes = toMinutes(entry.openTime);
      const closeMinutes = toMinutes(entry.closeTime);
      return minutes >= openMinutes && minutes < closeMinutes;
    });
    if (slotAvailable) {
      options.push(pointer.toISOString());
    }
    pointer = addMinutes(pointer, interval);
  }

  return options;
}

export async function checkAvailability(
  request: ReservationAvailabilityRequest,
): Promise<ReservationAvailabilityResponse> {
  const location = await loadLocation(request.locationSlug);
  const policy = location.reservationPolicy;

  if (!policy) {
    throw new Error("Reservation policy not configured");
  }

  if (request.partySize > policy.maxPartySize) {
    throw capacityError("Party size exceeds limit");
  }

  const requestedAt = new Date(request.requestedTime);
  if (Number.isNaN(requestedAt.getTime())) {
    throw new Error("Invalid reservation time");
  }

  const hours = hoursForDate(location, requestedAt);
  if (hours.length === 0) {
    throw outOfHoursError("Location closed on selected day");
  }

  const minutes = toMinutes(requestedAt);
  const isWithinHours = hours.some((entry) => {
    if (entry.isClosed) return false;
    const openMinutes = toMinutes(entry.openTime);
    const closeMinutes = toMinutes(entry.closeTime);
    return minutes >= openMinutes && minutes < closeMinutes;
  });

  if (!isWithinHours) {
    throw outOfHoursError("Requested time is outside opening hours");
  }

  const interval = bookingIntervalMinutes(policy);
  const normalizedTime = roundToInterval(requestedAt, interval);

  const closeMinutes = Math.max(
    ...hours.filter((entry) => !entry.isClosed).map((entry) => toMinutes(entry.closeTime)),
  );
  const nearClosing = minutes >= closeMinutes - Math.max(interval, 60);

  const conflict = nearClosing || location.reservationRequests.some((existing) => {
    const existingTime = roundToInterval(existing.requestedAt, interval);
    return existingTime.getTime() === normalizedTime.getTime();
  });

  recordAvailability(!conflict);

  if (conflict) {
    return {
      requestedTime: normalizedTime.toISOString(),
      isAvailable: false,
      nearestAlternatives: computeNearestAlternatives(normalizedTime, interval, hours),
      message: nearClosing ? "Kitchen closing soon" : "Time slot unavailable",
      revalidateTags: [`reservation-window:${request.locationSlug}`],
    };
  }

  return {
    requestedTime: normalizedTime.toISOString(),
    isAvailable: true,
    nearestAlternatives: [],
    revalidateTags: [`reservation-window:${request.locationSlug}`],
  };
}

export async function createReservation(
  payload: ReservationCreatePayload,
): Promise<ReservationCreateResponse> {
  const availability = await checkAvailability({
    locationSlug: payload.locationSlug,
    partySize: payload.partySize,
    requestedTime: payload.requestedTime,
  });

  const location = await prisma.restaurantLocation.findUnique({
    where: { slug: payload.locationSlug },
  });

  if (!location) {
    throw new Error("Unknown location");
  }

  const status = availability.isAvailable ? "CONFIRMED" : "WAITLISTED";

  const reservation = await prisma.reservationRequest.create({
    data: {
      status,
      partySize: payload.partySize,
      requestedAt: new Date(availability.requestedTime),
      locationId: location.id,
      guestProfileId: payload.guest.accountId ?? null,
      contactName: payload.guest.name,
      contactEmail: payload.guest.email,
      contactPhone: payload.guest.phone ?? null,
      notes: payload.notes ?? null,
      nearestAlternatives: availability.nearestAlternatives,
    },
  });

  await safeRevalidateTag(`reservation-window:${payload.locationSlug}`);

  if (payload.guest.email) {
    if (status === "CONFIRMED") {
      await sendReservationConfirmation(reservation.id, payload.guest.email, "confirmed");
    } else {
      await sendWaitlistFollowUp(reservation.id, payload.guest.email, availability.nearestAlternatives);
    }
  }

  return {
    reservationId: reservation.id,
    status: status === "CONFIRMED" ? "confirmed" : "waitlisted",
    confirmedTime: reservation.requestedAt.toISOString(),
    nearestAlternatives: availability.nearestAlternatives,
    revalidateTags: [`reservation-window:${payload.locationSlug}`],
  };
}

export async function cancelReservation(
  reservationId: string,
  reason?: string,
): Promise<ReservationCancelResponse> {
  const reservation = await prisma.reservationRequest.update({
    where: { id: reservationId },
    data: {
      status: "CANCELLED",
      notes: reason ?? undefined,
    },
    include: { location: true },
  });

  await safeRevalidateTag(`reservation-window:${reservation.location.slug}`);

  return {
    reservationId,
    status: "cancelled",
    revalidateTags: [`reservation-window:${reservation.location.slug}`],
  };
}

export async function createReservationAction(
  _: ReservationFormState,
  formData: FormData,
): Promise<ReservationFormState> {
  try {
    const intent = String(formData.get("intent") ?? "confirm");
    const locationSlug = String(formData.get("location"));
    const partySize = Number.parseInt(String(formData.get("partySize")), 10) || 1;
    const requestedTimeValue = new Date(String(formData.get("requestedTime")));
    if (Number.isNaN(requestedTimeValue.getTime())) {
      throw new Error("Invalid requested time");
    }

    if (intent === "check") {
      const availability = await checkAvailability({
        locationSlug,
        partySize,
        requestedTime: requestedTimeValue.toISOString(),
      });

      const alternatives = availability.nearestAlternatives.length > 0
        ? availability.nearestAlternatives
        : [availability.requestedTime];

      return {
        status: "info",
        message: "Next available slots:",
        alternatives,
      };
    }

    const contactName = formData.get("name");
    const contactEmail = formData.get("email");
    const contactPhone = formData.get("phone");
    const notesValue = formData.get("notes");

    const payload: ReservationCreatePayload = {
      locationSlug,
      partySize,
      requestedTime: requestedTimeValue.toISOString(),
      guest: {
        name: contactName ? String(contactName) : "",
        email: contactEmail ? String(contactEmail) : "",
        phone: contactPhone ? String(contactPhone) : undefined,
      },
      notes: notesValue ? String(notesValue) : undefined,
    };

    const result = await createReservation(payload);

    return {
      status: "success",
      message:
        result.status === "confirmed"
          ? "Reservation confirmed"
          : "Reservation confirmed (waitlisted). We will contact you soon.",
      reservationId: result.reservationId,
      statusLabel: result.status,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create reservation";
    return { status: "error", message };
  }
}



