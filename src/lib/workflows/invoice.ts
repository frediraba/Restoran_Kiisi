type InvoiceRequest = {
  orderId: string;
  email: string;
  total: number;
};

export async function queueInvoiceRequest({ orderId, email, total }: InvoiceRequest) {
  // TODO: integrate with finance system. Temporary logging only.
  console.info("[finance] invoice request queued", {
    orderId,
    email,
    total,
  });
}
