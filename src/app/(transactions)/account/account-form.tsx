"use client";

import { useTransition } from "react";
import { useFormState } from "react-dom";

import type { GuestProfile } from "@prisma/client";

import { updateProfileAction } from "./account-actions";
import { initialAccountState, type AccountFormState } from "./form-state";

type AccountFormProps = {
  profile: GuestProfile;
  locations: { slug: string; name: string }[];
};

export function AccountForm({ profile, locations }: AccountFormProps) {
  const [state, action] = useFormState<AccountFormState>(
    updateProfileAction,
    initialAccountState,
  );
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => startTransition(() => action(formData))}
      className="grid gap-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <input type="hidden" name="profileId" value={profile.id} />

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="email">
          Email (sign-in)
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={profile.email}
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="firstName">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            defaultValue={profile.firstName ?? ""}
            className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="lastName">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            defaultValue={profile.lastName ?? ""}
            className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="phone">
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          defaultValue={profile.phone ?? ""}
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="defaultLocation">
          Preferred location
        </label>
        <select
          id="defaultLocation"
          name="defaultLocation"
          defaultValue={profile.defaultLocationId ?? locations[0]?.slug}
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
        >
          {locations.map((location) => (
            <option key={location.slug} value={location.slug}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="newPassword">
          New password (optional)
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          placeholder="Leave blank to keep current password"
          className="rounded-lg border border-neutral-200 px-3 py-2 text-sm"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="marketingOptIn"
          name="marketingOptIn"
          type="checkbox"
          defaultChecked={profile.marketingOptIn}
          className="h-4 w-4 rounded border border-neutral-300"
        />
        <label className="text-sm text-neutral-600" htmlFor="marketingOptIn">
          Receive seasonal updates and special offers via email.
        </label>
      </div>

      {state.status === "error" ? (
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.message}
        </div>
      ) : null}
      {state.status === "success" ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Profile updated successfully.
        </div>
      ) : null}

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 disabled:opacity-50"
        disabled={pending}
      >
        {pending ? "Saving..." : "Save profile"}
      </button>
    </form>
  );
}
