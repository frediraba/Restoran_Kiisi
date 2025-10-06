"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signInAccountAction, signUpAccountAction } from "./account-actions";

export function AccountSignInForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    setStatusMessage(null);

    if (!email || !password) {
      setError("Enter both email and password.");
      return;
    }

    if (mode === "sign-up" && password !== confirmPassword) {
      setError("Passwords must match.");
      return;
    }

    setError(null);
    setPending(true);

    const action = mode === "sign-in" ? signInAccountAction : signUpAccountAction;
    const result = await action({ email, password });

    if (!result.ok) {
      const message =
        result.error === "INVALID_CREDENTIALS"
          ? "Invalid credentials. Please try again."
          : result.error === "ACCOUNT_NOT_FOUND"
            ? "We couldn't find an account with that email. Create one to continue."
            : result.error === "ACCOUNT_EXISTS"
              ? "An account with that email already exists. Try signing in instead."
              : mode === "sign-in"
                ? "Unable to sign in right now. Please try again."
                : "Unable to sign up right now. Please try again.";
      setError(message);
      setPending(false);
      return;
    }

    form.reset();
    setStatusMessage(
      mode === "sign-in"
        ? "Welcome back! Loading your account..."
        : "Account created! Preparing your dashboard..."
    );
    setPending(false);
    router.replace("/account?welcome=1");
  }

  return (
    <Card className="relative overflow-hidden border-primary/20 bg-white/95 shadow-xl shadow-primary/15">
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
      <CardHeader className="relative space-y-2 pb-2">
        <CardTitle className="text-2xl">
          {mode === "sign-in" ? "Sign in to Kiisi" : "Create your Kiisi account"}
        </CardTitle>
        <CardDescription>
          {mode === "sign-in"
            ? "Access reservations, preferences, and loyalty perks with your Kiisi account."
            : "Set your password to manage reservations, orders, and personalised updates."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
              required
            />
          </div>
          {mode === "sign-up" ? (
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
              />
            </div>
          ) : null}
          {error ? (
            <div
              role="alert"
              aria-live="assertive"
              className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {error}
            </div>
          ) : null}
          <div className="flex flex-col gap-3">
            <Button type="submit" className="h-12" disabled={pending}>
              {pending
                ? mode === "sign-in"
                  ? "Signing in..."
                  : "Creating account..."
                : mode === "sign-in"
                  ? "Sign in"
                  : "Sign up"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="h-10 justify-start px-0 text-left text-sm text-primary hover:text-primary"
              onClick={() => {
                setMode((current) => (current === "sign-in" ? "sign-up" : "sign-in"));
                setError(null);
                setStatusMessage(null);
              }}
              disabled={pending}
            >
              {mode === "sign-in"
                ? "Need an account? Sign up"
                : "Already have an account? Sign in"}
            </Button>
          </div>
          {statusMessage ? (
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {statusMessage}
            </p>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}
