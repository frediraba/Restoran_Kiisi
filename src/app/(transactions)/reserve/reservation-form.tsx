"use client";

import { useTransition, useState, useActionState } from "react";

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
    <form
      action={(formData) => {
        startTransition(() => action(formData));
      }}
      className="mx-auto grid max-w-3xl gap-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-2">
        <label className="text-sm font-medium text-neutral-700" htmlFor="location">
          Location
        </label>
        <select
          id="location"
          name="location"
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
          defaultValue={locations[0]?.slug ?? ""}
        >
          {locations.map((location) => (
            <option key={location.slug} value={location.slug}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-neutral-700" htmlFor="partySize">
          Party size
        </label>
        <input
          id="partySize"
          name="partySize"
          type="number"
          min={1}
          max={16}
          required
          defaultValue={4}
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-neutral-700" htmlFor="requestedTime">
          Preferred time
        </label>
        <input
          id="requestedTime"
          name="requestedTime"
          type="datetime-local"
          data-testid="reservation-datetime"
          value={requestedTime}
          onChange={(event) => setRequestedTime(event.target.value)}
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-neutral-700" htmlFor="name">
          Contact name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-neutral-700" htmlFor="email">
          Contact email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-neutral-700" htmlFor="phone">
          Contact phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium text-neutral-700" htmlFor="notes">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="rounded-lg bg-neutral-50 px-4 py-3 text-sm text-neutral-600">
        <p>
          Kiisi holds reservations for 15 minutes. If your preferred slot is unavailable we will offer the nearest
          alternatives automatically.
        </p>
      </div>

      {state.status === "error" ? (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
        >
          {state.message}
        </div>
      ) : null}
      {state.status === "info" ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
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
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
        >
          <p className="font-semibold">Reservation {state.reservationId} {state.statusLabel}</p>
          <p>{state.message}</p>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="submit"
          name="intent"
          value="check"
          className="inline-flex items-center justify-center rounded-full border border-amber-600 px-6 py-3 text-sm font-semibold text-amber-600 hover:bg-amber-50 disabled:opacity-60"
          disabled={pending}
        >
          {pending ? "Checking..." : "Find table"}
        </button>
        <button
          type="submit"
          name="intent"
          value="confirm"
          className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 disabled:opacity-60"
          disabled={pending}
        >
          {pending ? "Submitting..." : "Confirm reservation"}
        </button>
      </div>
    </form>
  );
}
