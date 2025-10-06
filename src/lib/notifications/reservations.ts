export async function sendReservationConfirmation(reservationId: string, email: string, status: string) {
  console.info("[notifications] reservation", {
    reservationId,
    email,
    status,
  });
}

export async function sendWaitlistFollowUp(reservationId: string, email: string, alternatives: string[]) {
  console.info("[notifications] waitlist follow-up", {
    reservationId,
    email,
    alternatives,
  });
}
