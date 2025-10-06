"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";

import { signOutAccountAction } from "./account-actions";

export function AccountSignOutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() =>
        startTransition(async () => {
          await signOutAccountAction();
          window.location.href = "/account?signedOut=1";
        })
      }
      className="h-11 px-5 text-primary hover:bg-primary/10"
      disabled={pending}
    >
      {pending ? "Signing out..." : "Sign out"}
    </Button>
  );
}
