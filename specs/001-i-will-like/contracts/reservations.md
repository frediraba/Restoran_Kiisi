# Server Action Contract – Reservations

## `checkAvailability(request)`
- **Purpose**: Return availability slots for requested location/party.
- **Input**:
  ```ts
  type ReservationAvailabilityRequest = {
    locationSlug: string;
    partySize: number;
    requestedTime: string; // ISO datetime
  }
  ```
- **Rules**:
  - Validate `partySize <= maxPartySize` configured for location.
  - Snap requestedTime to 15-minute increments.
- **Response**:
  ```ts
  type ReservationAvailabilityResponse = {
    requestedTime: string;
    isAvailable: boolean;
    nearestAlternatives: string[]; // sorted soonest-first, same location only
    message?: string;
    revalidateTags: string[]; // ['reservation-window:{locationId}']
  }
  ```
- **Caching**: `Cache-Control: private, max-age=30` for logged-in account fetch; rely on revalidate tag for updates.

## `createReservation(payload)`
- **Input**:
  ```ts
  type ReservationCreatePayload = {
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
  }
  ```
- **Validation**:
  - Confirm location open and requested time available (`checkAvailability`).
  - Enforce buffer time from previous bookings.
- **Response**:
  ```ts
  type ReservationCreateResponse = {
    reservationId: string;
    status: 'confirmed' | 'waitlisted';
    confirmedTime: string;
    nearestAlternatives: string[];
    revalidateTags: ['reservation-window:{locationId}'];
  }
  ```
- **Errors**: `OUT_OF_HOURS`, `CAPACITY_EXCEEDED` (includes suggested slots), `VALIDATION_ERROR`.

## `cancelReservation(reservationId, reason)`
- **Input**: `{ reservationId: string; reason?: string; actor: 'guest' | 'staff'; }`
- **Behavior**: Sets status to cancelled, revalidates availability tag, logs audit entry.

## Email Notifications
- On confirmed reservation, enqueue transactional email with ICS attachment using SendGrid.
- On waitlist, email with nearest slots and contact CTA.

## Observability
- Trace `reservation.create` spans with attributes `location`, `partySize`, `status`.
- Log warnings when buffer enforcement rejects request to highlight demand.

## Tests (Phase 1 contracts)
1. Contract test: `createReservation` returns `nearestAlternatives` when slot unavailable.
2. Contract test: `checkAvailability` enforces `partySize` limit.
3. Integration test: reservation cancellation frees slot (revalidate tag triggered).

