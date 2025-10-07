import Link from "next/link";
import { notFound } from "next/navigation";

import { getLocationBySlug, getMenuWithCategories } from "@/lib/data";
import { parseLocationAddress } from "@/lib/location-address";

function formatPrice(value: unknown) {
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    if (!Number.isNaN(parsed)) {
      return parsed.toFixed(2);
    }
  }
  if (value && typeof value === "object" && "toNumber" in value && typeof value.toNumber === "function") {
    return value.toNumber().toFixed(2);
  }
  return "0.00";
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const categories = await getMenuWithCategories(slug);
  const address = parseLocationAddress(location.address);

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <nav className="text-sm text-neutral-500">
        <Link href="/locations" className="hover:text-neutral-900">
          Locations
        </Link>
        <span className="px-2">/</span>
        <span className="text-neutral-900">{location.name}</span>
      </nav>
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-neutral-900">{location.name}</h1>
        {address ? (
          <p className="text-sm text-neutral-500">
            {[address.street, address.city].filter(Boolean).join(", ")}
          </p>
        ) : null}
        {location.phone ? <p className="text-sm text-neutral-500">Phone: {location.phone}</p> : null}
      </header>
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Opening hours</h2>
        <dl className="mt-4 space-y-2 text-sm text-neutral-600">
          {location.hours.map((entry) => (
            <div key={entry.id} className="flex justify-between">
              <dt>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][entry.dayOfWeek]}</dt>
              <dd>
                {entry.isClosed
                  ? "Closed"
                  : `${new Date(entry.openTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} – ${new Date(entry.closeTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`}
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Popular dishes</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {categories
            .flatMap((category) => category.menuItems)
            .slice(0, 4)
            .map((item) => (
              <article key={item.id} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h3 className="text-base font-semibold text-neutral-900">{item.name}</h3>
                {item.description ? (
                  <p className="mt-1 text-sm text-neutral-600">{item.description}</p>
                ) : null}
                <p className="mt-3 text-sm font-semibold text-neutral-900">
                  €{formatPrice(item.price)}
                </p>
              </article>
            ))}
        </div>
      </section>
    </div>
  );
}
