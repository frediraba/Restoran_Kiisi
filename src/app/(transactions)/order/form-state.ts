export type OrderFormState =
  | { status: "idle" }
  | { status: "success"; message: string; orderId: string; instructions: string }
  | { status: "error"; message: string };

export const initialOrderFormState: OrderFormState = { status: "idle" };
