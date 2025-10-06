import Link from "next/link";

import { getLocations } from "@/lib/data";

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Locations</h1>
        <p className="text-sm text-neutral-500">Choose your nearest Restoran Kiisi dining room.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {locations.map((location) => (
          <article key={location.id} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900">{location.name}</h2>
            <p className="mt-2 text-sm text-neutral-500">
              {location.address?.street}
              <br />
              {location.address?.city}
            </p>
            <p className="mt-4 text-sm text-neutral-500">
              Reservations: {location.phone ?? '+372 5555 1234'}
            </p>
            <Link
              href={`/locations/${location.slug}`}
              className="mt-6 inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700"
            >
              View details
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
