import { Suspense } from 'react';

import { getPromotions } from '@/lib/data';
import { SkeletonSection } from '@/components/navigation/skeletons';

async function OffersContent() {
  const promotions = await getPromotions();

  if (promotions.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12 text-center">
        <h1 className="text-3xl font-semibold">No active offers</h1>
        <p className="mt-4 text-sm text-neutral-500">
          Check back soon for seasonal tasting menus and special events.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Offers & Events</h1>
        <p className="text-sm text-neutral-500">
          Discover tasting menus, holiday celebrations, and catering specials from Restoran Kiisi.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {promotions.map((promotion) => (
          <article key={promotion.id} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-neutral-400">
              {promotion.audience === 'CATERING' ? 'Catering' : promotion.audience === 'LOYALTY' ? 'Loyalty' : 'Public offer'}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-900">{promotion.title}</h2>
            {promotion.subtitle ? (
              <p className="mt-1 text-sm text-neutral-500">{promotion.subtitle}</p>
            ) : null}
            {promotion.body ? (
              <p className="mt-4 text-sm leading-6 text-neutral-600">{promotion.body}</p>
            ) : null}
            <dl className="mt-4 text-xs text-neutral-500">
              <div className="flex gap-2">
                <dt className="font-medium">Starts:</dt>
                <dd>{new Date(promotion.startAt).toLocaleDateString()}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-medium">Ends:</dt>
                <dd>{new Date(promotion.endAt).toLocaleDateString()}</dd>
              </div>
            </dl>
            {promotion.ctaUrl ? (
              <a
                href={promotion.ctaUrl}
                className="mt-6 inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700"
              >
                {promotion.ctaLabel ?? 'Learn more'}
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

export default function OffersPage() {
  return (
    <Suspense fallback={<SkeletonSection />}>
      <OffersContent />
    </Suspense>
  );
}
