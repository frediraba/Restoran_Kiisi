import { Suspense } from "react";

import { SkeletonSection } from "@/components/navigation/skeletons";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMenuWithCategories } from "@/lib/data";

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
      <section className="relative overflow-hidden rounded-4xl border border-border/70 bg-gradient-to-br from-primary/10 via-background to-background px-8 py-12 shadow-lg shadow-primary/10">
        <div className="pointer-events-none absolute -top-32 right-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" aria-hidden />
        <div className="relative flex flex-col gap-4 text-balance text-foreground">
          <Badge className="w-fit" variant="outline">
            Seasonal tasting 2025
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight">The Kiisi menu</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Bright Baltic produce, fire-grilled seafood, and foraged herbs from the forests around Tallinn. Explore chef-selected
            pairings or build your own experience from the á la carte.
          </p>
        </div>
      </section>

      {categories.map((category) => (
        <section key={category.id} className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">{category.name}</h2>
              {category.description ? (
                <p className="max-w-2xl text-sm text-muted-foreground">{category.description}</p>
              ) : null}
            </div>
            <Badge variant="subtle" className="w-fit">
              {category.menuItems.length} selections
            </Badge>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {category.menuItems.map((item) => (
              <Card
                key={item.id}
                className={item.isAvailable ? "h-full" : "h-full border-amber-300/80 bg-amber-50/80"}
              >
                <CardHeader className="gap-3 p-6 pb-0">
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                    <span className="text-sm font-semibold text-foreground">€{formatPrice(item.price)}</span>
                  </div>
                  {item.description ? <CardDescription>{item.description}</CardDescription> : null}
                </CardHeader>
                <CardContent className="p-6 pt-4">
                  {Array.isArray(item.dietaryTags) && item.dietaryTags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {item.dietaryTags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                  {!item.isAvailable ? (
                    <Badge variant="subtle" className="mt-4 bg-amber-100 text-amber-700">
                      Currently unavailable
                    </Badge>
                  ) : null}
                </CardContent>
              </Card>
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
