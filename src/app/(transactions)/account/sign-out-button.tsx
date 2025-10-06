"use client";

import { useTransition } from "react";

import { signOutAccountAction } from "./account-actions";

export function AccountSignOutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() =>
        startTransition(async () => {
          await signOutAccountAction();
          window.location.href = "/account?signedOut=1";
        })
      }
      className="text-sm font-semibold text-amber-600 hover:text-amber-700 disabled:opacity-50"
      disabled={pending}
    >
      {pending ? "Signing out..." : "Sign out"}
    </button>
  );
}
