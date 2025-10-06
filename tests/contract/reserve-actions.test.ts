import { describe, it, expect } from "vitest";

import {
  checkAvailability,
  createReservation,
  cancelReservation,
} from "@/app/(transactions)/reserve/actions";

describe("reservation Server Actions", () => {
  const baseRequest = {
    locationSlug: "old-town",
    partySize: 4,
    requestedTime: "2025-10-04T18:30:00.000Z",
  };

  it("rejects requests that exceed max party size", async () => {
    const request = { ...baseRequest, partySize: 16 };

    await expect(checkAvailability(request)).rejects.toMatchObject({
      code: "CAPACITY_EXCEEDED",
    });
  });

  it("returns nearest alternatives when slot unavailable", async () => {
    const request = { ...baseRequest, requestedTime: "2025-10-04T21:00:00.000Z" };

    const response = await checkAvailability(request);

    expect(response.isAvailable).toBe(false);
    expect(response.nearestAlternatives.length).toBeGreaterThan(0);
  });

  it("creates reservation and exposes cancellation revalidation tag", async () => {
    const payload = {
      ...baseRequest,
      guest: { name: "Laura", email: "laura@example.com" },
      notes: "Birthday dinner",
    };

    const reservation = await createReservation(payload);

    expect(["confirmed", "waitlisted"]).toContain(reservation.status);
    expect(reservation.revalidateTags).toContain("reservation-window:" + payload.locationSlug);

    const cancelResult = await cancelReservation(reservation.reservationId, "changed-plans");
    expect(cancelResult.status).toBe("cancelled");
  });
});
