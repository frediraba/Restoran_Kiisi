export type ReservationFormState =
  | { status: "idle" }
  | { status: "success"; message: string; reservationId: string; statusLabel: string }
  | { status: "info"; message: string; alternatives: string[] }
  | { status: "error"; message: string };

export const initialReservationFormState: ReservationFormState = { status: "idle" };
