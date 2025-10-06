"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { signInAccountAction } from "./account-actions";

export function AccountSignInForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      setError("Enter both email and password.");
      return;
    }

    setError(null);
    setPending(true);

    const result = await signInAccountAction({ email, password });

    if (!result.ok) {
      setError("Invalid credentials. Please try again.");
      setPending(false);
      return;
    }

    form.reset();
    setSignedIn(true);
    setPending(false);
    router.replace("/account?welcome=1");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto grid max-w-md gap-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>
      {error ? (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
        >
          {error}
        </div>
      ) : null}
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 disabled:opacity-60"
        disabled={pending}
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
      {signedIn ? (
        <p className="text-sm text-neutral-600" aria-live="polite">Welcome back! Loading your account...</p>
      ) : null}
    </form>
  );
}
