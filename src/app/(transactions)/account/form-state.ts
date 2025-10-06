export type AccountFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export const initialAccountState: AccountFormState = { status: "idle" };
