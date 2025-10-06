import { Suspense } from 'react';
import Link from 'next/link';

import { getLocations, getPromotions } from '@/lib/data';
import { SkeletonSection } from '@/components/navigation/skeletons';

async function PromotionsSection() {
  const promotions = await getPromotions();

  if (promotions.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Current offers</h2>
        <Link href="/offers" className="text-sm text-neutral-500 hover:text-neutral-900">
          View all
        </Link>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {promotions.slice(0, 3).map((promotion) => (
          <article key={promotion.id} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-neutral-400">
              {promotion.audience === 'CATERING' ? 'Catering' : 'Signature offer'}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-neutral-900">{promotion.title}</h3>
            {promotion.subtitle ? (
              <p className="mt-1 text-sm text-neutral-500">{promotion.subtitle}</p>
            ) : null}
            {promotion.body ? (
              <p className="mt-4 text-sm leading-6 text-neutral-600 line-clamp-4">
                {promotion.body}
              </p>
            ) : null}
            {promotion.ctaUrl ? (
              <Link
                href={promotion.ctaUrl}
                className="mt-4 inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700"
              >
                {promotion.ctaLabel ?? 'Reserve now'}
              </Link>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

async function LocationsSection() {
  const locations = await getLocations();

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Visit Restoran Kiisi</h2>
        <Link href="/locations" className="text-sm text-neutral-500 hover:text-neutral-900">
          Find a location
        </Link>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {locations.map((location) => (
          <article key={location.id} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-neutral-900">{location.name}</h3>
            <p className="mt-2 text-sm text-neutral-500">
              {location.address?.street}
              <br />
              {location.address?.city}
            </p>
            <p className="mt-4 text-sm text-neutral-500">Open today until 22:00</p>
            <Link
              href={`/locations/${location.slug}`}
              className="mt-6 inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700"
            >
              View details
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 md:flex-row md:items-center">
      <div className="flex-1 space-y-6">
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
          Tallinn Old Town
        </span>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Seasonal Nordic cuisine, freshly prepared each day.
        </h1>
        <p className="text-lg leading-8 text-neutral-600">
          Browse our rotating menu, place a takeaway order, or reserve a table for your next celebration.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
          >
            View menu
          </Link>
          <Link
            href="/reserve"
            className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
          >
            Reserve a table
          </Link>
        </div>
      </div>
      <div className="flex-1 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-amber-600">Chef&apos;s note</p>
        <p className="mt-4 text-lg leading-8 text-neutral-600">
          “Restoran Kiisi is inspired by the forests and coastline surrounding Tallinn. Our kitchen focuses on
          low-waste techniques and seasonal ingredients from local producers.”
        </p>
        <p className="mt-6 text-sm text-neutral-500">— Chef Kristel Kiisi</p>
      </div>
    </section>
  );
}

export default function MarketingHomePage() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <Suspense fallback={<SkeletonSection />}>
        <PromotionsSection />
      </Suspense>
      <Suspense fallback={<SkeletonSection />}>
        <LocationsSection />
      </Suspense>
    </div>
  );
}

