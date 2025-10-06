import { Suspense } from "react";

import { getMenuWithCategories } from "@/lib/data";
import { SkeletonSection } from "@/components/navigation/skeletons";

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

async function MenuContent() {
  const categories = await getMenuWithCategories("old-town");

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-6 py-12">
      {categories.map((category) => (
        <section key={category.id} className="space-y-4">
          <header>
            <h2 className="text-2xl font-semibold text-neutral-900">{category.name}</h2>
            {category.description ? (
              <p className="mt-1 text-sm text-neutral-500">{category.description}</p>
            ) : null}
          </header>
          <div className="grid gap-6 md:grid-cols-2">
            {category.menuItems.map((item) => (
              <article key={item.id} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">{item.name}</h3>
                    {item.description ? (
                      <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
                    ) : null}
                    {Array.isArray(item.dietaryTags) && item.dietaryTags.length > 0 ? (
                      <p className="mt-3 text-xs uppercase tracking-wide text-neutral-400">
                        {item.dietaryTags.join(" • ")}
                      </p>
                    ) : null}
                  </div>
                  <p className="text-sm font-semibold text-neutral-900">€{formatPrice(item.price)}</p>
                </div>
                {!item.isAvailable ? (
                  <p className="mt-4 text-xs font-medium text-amber-600">Currently unavailable</p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<SkeletonSection />}>
      <MenuContent />
    </Suspense>
  );
}
