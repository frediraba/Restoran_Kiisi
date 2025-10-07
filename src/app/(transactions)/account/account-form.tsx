"use client";

import { useActionState } from "react";

import type { GuestProfile } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

import { updateProfileAction } from "./account-actions";
import { initialAccountState, type AccountFormState } from "./form-state";

type AccountFormProps = {
  profile: GuestProfile;
  locations: { slug: string; name: string }[];
};

export function AccountForm({ profile, locations }: AccountFormProps) {
  const [state, action, pending] = useActionState<AccountFormState, FormData>(
    updateProfileAction,
    initialAccountState,
  );

  return (
    <form action={action}>
      <Card className="border-primary/15 bg-white/95 shadow-xl shadow-primary/10">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl">Profile details</CardTitle>
          <CardDescription>
            Update contact preferences, favourite locations, and security details for your Kiisi experiences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <input type="hidden" name="profileId" value={profile.id} />

          <div className="grid gap-2">
            <Label htmlFor="email">Email (sign-in)</Label>
            <Input id="email" name="email" type="email" required defaultValue={profile.email} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" name="firstName" defaultValue={profile.firstName ?? ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" name="lastName" defaultValue={profile.lastName ?? ""} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input id="phone" name="phone" defaultValue={profile.phone ?? ""} placeholder="e.g. +372 5555 5555" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="defaultLocation">Preferred location</Label>
            <Select
              id="defaultLocation"
              name="defaultLocation"
              defaultValue={profile.defaultLocationId ?? locations[0]?.slug}
            >
              {locations.map((location) => (
                <option key={location.slug} value={location.slug}>
                  {location.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="newPassword">New password (optional)</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="Leave blank to keep current password"
            />
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary/5 p-4">
            <Checkbox id="marketingOptIn" name="marketingOptIn" defaultChecked={profile.marketingOptIn} />
            <div className="space-y-1 text-sm">
              <Label htmlFor="marketingOptIn" className="font-medium">
                Seasonal offers and events
              </Label>
              <p className="text-muted-foreground">
                Receive curated tasting menus, loyalty surprises, and early access to special happenings.
              </p>
            </div>
          </div>

          {state.status === "error" ? (
            <div className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {state.message}
            </div>
          ) : null}
          {state.status === "success" ? (
            <div className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-600">
              Profile updated successfully.
            </div>
          ) : null}
        </CardContent>
        <div className="flex flex-col gap-3 border-t border-primary/15 bg-primary/5 px-8 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>{pending ? "Saving your preferences..." : "Changes apply immediately across Kiisi experiences."}</p>
          <Button type="submit" className="h-11 px-6" disabled={pending}>
            {pending ? "Saving..." : "Save profile"}
          </Button>
        </div>
      </Card>
    </form>
  );
}
