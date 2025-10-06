"use client";

import { useTransition, useState, useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createReservationAction } from "./actions";
import { initialReservationFormState, type ReservationFormState } from "./form-state";

type LocationOption = {
  slug: string;
  name: string;
};

type ReservationFormProps = {
  locations: LocationOption[];
};

export function ReservationForm({ locations }: ReservationFormProps) {
  const [state, action] = useActionState<ReservationFormState>(
    createReservationAction,
    initialReservationFormState,
  );
  const [requestedTime, setRequestedTime] = useState<string>(() => {
    const date = new Date();
    date.setHours(date.getHours() + 2);
    return date.toISOString().slice(0, 16);
  });
  const [pending, startTransition] = useTransition();

  return (
    <Card className="border-border/70 bg-card/95">
      <form
        action={(formData) => {
          startTransition(() => action(formData));
        }}
        className="grid gap-6"
      >
        <CardContent className="grid gap-6 p-8">
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Select id="location" name="location" defaultValue={locations[0]?.slug ?? ""}>
              {locations.map((location) => (
                <option key={location.slug} value={location.slug}>
                  {location.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="partySize">Party size</Label>
            <Input id="partySize" name="partySize" type="number" min={1} max={16} required defaultValue={4} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="requestedTime">Preferred time</Label>
            <Input
              id="requestedTime"
              name="requestedTime"
              type="datetime-local"
              data-testid="reservation-datetime"
              step={1800}
              value={requestedTime}
              onChange={(event) => setRequestedTime(event.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Contact name</Label>
            <Input id="name" name="name" type="text" autoComplete="name" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Contact email</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Contact phone</Label>
            <Input id="phone" name="phone" type="tel" autoComplete="tel" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" rows={3} />
          </div>

          <div className="rounded-3xl border border-dashed border-border/70 bg-muted/40 px-5 py-4 text-sm text-muted-foreground">
            Kiisi holds reservations for 15 minutes. If your preferred slot is unavailable we will offer the nearest alternatives
            automatically.
          </div>

          {state.status === "error" ? (
            <div
              role="alert"
              aria-live="assertive"
              className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700"
            >
              {state.message}
            </div>
          ) : null}
          {state.status === "info" ? (
            <div
              role="status"
              aria-live="polite"
              className="rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800"
            >
              <p className="font-semibold">{state.message}</p>
              {state.alternatives.length > 0 ? (
                <ul className="mt-2 space-y-1 text-xs">
                  {state.alternatives.map((slot) => (
                    <li key={slot}>{new Date(slot).toLocaleString()}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
          {state.status === "success" ? (
            <div
              role="status"
              aria-live="polite"
              className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700"
            >
              <p className="font-semibold">Reservation {state.reservationId} {state.statusLabel}</p>
              <p>{state.message}</p>
            </div>
          ) : null}
        </CardContent>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 bg-muted/30 px-8 py-5">
          <Button
            type="submit"
            name="intent"
            value="check"
            variant="ghost"
            className="bg-transparent text-muted-foreground hover:bg-muted/60"
            disabled={pending}
          >
            {pending ? "Checking…" : "Find table"}
          </Button>
          <Button type="submit" name="intent" value="confirm" disabled={pending}>
            {pending ? "Submitting…" : "Confirm reservation"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
