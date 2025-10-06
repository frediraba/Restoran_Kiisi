import { getLocations } from "@/lib/data";

import { ReservationForm } from "./reservation-form";

export default async function ReservePage() {
  const locations = await getLocations();

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-neutral-900">Reserve a table</h1>
        <p className="text-sm text-neutral-500">
          We confirm reservations instantly during opening hours. Larger parties may be waitlisted.
        </p>
      </header>
      <ReservationForm locations={locations.map((location) => ({ slug: location.slug, name: location.name }))} />
    </div>
  );
}
