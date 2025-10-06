"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <Card className="relative overflow-hidden border-none bg-card shadow-xl shadow-primary/10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
      <CardHeader className="relative space-y-2 pb-2">
        <CardTitle className="text-2xl">Sign in to Kiisi</CardTitle>
        <CardDescription>
          Access reservations, preferences, and loyalty perks with your Kiisi account.
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
              autoComplete="current-password"
              required
            />
          </div>
          {error ? (
            <div
              role="alert"
              aria-live="assertive"
              className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {error}
            </div>
          ) : null}
          <Button type="submit" className="h-12" disabled={pending}>
            {pending ? "Signing in..." : "Sign in"}
          </Button>
          {signedIn ? (
            <p className="text-sm text-muted-foreground" aria-live="polite">
              Welcome back! Loading your account...
            </p>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}
