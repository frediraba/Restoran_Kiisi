type OrderNotificationPayload = {
  orderId: string;
  email: string;
  instructions: string;
  total: number;
};

export async function sendOrderConfirmation({ orderId, email, instructions, total }: OrderNotificationPayload) {
  // TODO: integrate SendGrid. For now we log to observability pipeline.
  console.info("[notifications] order confirmation", {
    orderId,
    email,
    instructions,
    total,
  });
}

export async function sendInvoiceRequested(orderId: string, email: string) {
  console.info("[notifications] invoice requested", { orderId, email });
}
