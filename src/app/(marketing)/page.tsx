import { Suspense } from "react";
import Link from "next/link";

import { SkeletonSection } from "@/components/navigation/skeletons";
import { Badge } from "@/components/ui/badge";
import { Button, buttonClasses } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getLocations, getPromotions } from "@/lib/data";
import { parseLocationAddress } from "@/lib/location-address";
import { cn } from "@/lib/utils";

const heroHighlights = [
  {
    title: "Chef's pairing",
    description: "Six-course tasting with curated wine journey from Baltic vineyards.",
  },
  {
    title: "Slow mornings",
    description: "Weekend brunch served 10:00–14:00 with seasonal mocktails.",
  },
  {
    title: "Gatherings",
    description: "Private dining room for up to 18 guests with bespoke menu design.",
  },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-background" />
        <div className="absolute left-1/2 top-0 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/3 translate-y-1/3 rounded-full bg-accent/20 blur-3xl" />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-24 md:flex-row md:items-center">
        <div className="flex-1 space-y-8">
          <Badge variant="subtle" className="w-fit bg-white/70 text-primary shadow-sm backdrop-blur">
            Tallinn Old Town
          </Badge>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Seasonal Nordic cuisine, plated with warmth.
          </h1>
          <p className="text-pretty text-lg text-muted-foreground md:text-xl">
            From intimate dinners to joyful celebrations, Restoran Kiisi crafts modern Estonian flavours inspired by the
            Baltic coastline.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/reserve" className={cn(buttonClasses({ size: "lg" }), "shadow-lg shadow-primary/25")}>
              Reserve a table
            </Link>
            <Link
              href="/menu"
              className={cn(
                buttonClasses({ variant: "outline", size: "lg" }),
                "border-primary/40 bg-white/80 text-primary backdrop-blur transition hover:bg-white",
              )}
            >
              Explore seasonal menu
            </Link>
          </div>
          <dl className="grid gap-4 pt-6 sm:grid-cols-3">
            {heroHighlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-2xl border border-white/60 bg-white/70 px-5 py-4 text-sm text-muted-foreground shadow-sm backdrop-blur transition hover:border-primary/40 hover:text-foreground"
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{highlight.title}</dt>
                <dd className="mt-2 text-sm leading-6 text-muted-foreground/90">{highlight.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Card className="flex-1 border-primary/15 bg-white/90 shadow-xl shadow-primary/15 backdrop-blur">
          <CardHeader className="p-8 pb-4">
            <Badge variant="outline" className="border-primary/40 text-primary">
              Chef&apos;s note
            </Badge>
            <CardTitle className="text-3xl">
              “We cook with the rhythm of Estonia&apos;s forests, farms, and sea.”
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 pt-0 text-base leading-7 text-muted-foreground">
            Our kitchen celebrates low-waste techniques and seasonal produce sourced directly from small regional growers.
            Each plate is finished with a playful detail to surprise and delight.
          </CardContent>
          <CardFooter className="border-0 bg-transparent px-8 pb-8 pt-0 text-sm text-muted-foreground">
            — Chef Kristel Kiisi
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

async function PromotionsSection() {
  const promotions = await getPromotions();

  if (promotions.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <Badge variant="subtle" className="w-fit bg-primary/10 text-primary">
            This month in Kiisi
          </Badge>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Current experiences</h2>
            <p className="mt-2 max-w-xl text-pretty text-base text-muted-foreground">
              Seasonal tastings, family-style feasts, and catering moments curated by Chef Kiisi and the kitchen team.
            </p>
          </div>
        </div>
        <Link
          href="/offers"
          className={cn(buttonClasses({ variant: "ghost", size: "default" }), "justify-start md:justify-end")}
        >
          View all offers
        </Link>
      </header>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {promotions.slice(0, 3).map((promotion) => (
          <Card key={promotion.id} className="border-primary/15 bg-white/95">
            <CardHeader className="pb-4">
              <Badge variant="outline" className="border-primary/30 text-xs text-primary">
                {promotion.audience === "CATERING" ? "Catering" : "Signature experience"}
              </Badge>
              <CardTitle className="text-2xl leading-tight">{promotion.title}</CardTitle>
              {promotion.subtitle ? (
                <CardDescription className="text-base text-muted-foreground">
                  {promotion.subtitle}
                </CardDescription>
              ) : null}
            </CardHeader>
            {promotion.body ? (
              <CardContent className="pt-0 text-sm leading-6 text-muted-foreground">
                <p className="line-clamp-5">{promotion.body}</p>
              </CardContent>
            ) : null}
            {promotion.ctaUrl ? (
              <CardFooter className="bg-primary/5">
                <Link href={promotion.ctaUrl} className={cn(buttonClasses({ variant: "link" }), "text-primary")}>
                  {promotion.ctaLabel ?? "Reserve now"}
                </Link>
              </CardFooter>
            ) : null}
          </Card>
        ))}
      </div>
    </section>
  );
}

async function LocationsSection() {
  const locations = await getLocations();

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge variant="subtle" className="w-fit bg-secondary text-secondary-foreground">
            Around the city
          </Badge>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Visit Restoran Kiisi
          </h2>
          <p className="mt-2 max-w-xl text-pretty text-base text-muted-foreground">
            Explore our dining rooms across Tallinn—each location carries its own atmosphere, music, and seasonal menu
            highlights.
          </p>
        </div>
        <Link href="/locations" className={cn(buttonClasses({ variant: "ghost" }), "justify-start md:justify-end")}>
          Find a location
        </Link>
      </header>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {locations.map((location) => {
          const address = parseLocationAddress(location.address);

          return (
            <Card key={location.id} className="border-primary/15 bg-white/95">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">{location.name}</CardTitle>
                <CardDescription>
                  {address?.street ?? null}
                  {address?.street && address?.city ? <br /> : null}
                  {address?.city ?? null}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5 pt-0 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">Dining style</p>
                  <p>Chef-led tasting menus with vegetarian pairings available.</p>
                </div>
                <Separator className="bg-primary/15" />
                <div>
                  <p className="font-medium text-foreground">Today&apos;s service</p>
                  <p>Open from 12:00 � 22:00 with walk-in lounge from 16:00.</p>
                </div>
              </CardContent>
              <CardFooter className="bg-primary/5">
                <Link
                  href={`/locations/${location.slug}`}
                  className={cn(buttonClasses({ variant: "link" }), "text-primary")}
                >
                  View details
                </Link>
                <Button variant="ghost" size="sm" className="text-xs text-primary/80 hover:text-primary">
                  Map &amp; directions
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function CraftSection() {
  const items = [
    {
      title: "Coastal pantry",
      description: "Dry-aged fish, brined kelp, and foraged sea herbs highlight the flavours of Estonia's shoreline.",
    },
    {
      title: "Cellar pairings",
      description: "A rotating list of natural wines and local ciders curated with our sommeliers for each seasonal menu.",
    },
    {
      title: "Thoughtful catering",
      description: "From business lunches to large celebrations, our catering team brings the Kiisi experience to your venue.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/15 bg-gradient-to-r from-primary/20 via-white to-white p-[1px] shadow-[0_26px_70px_rgba(255,125,0,0.16)]">
        <div className="rounded-[2.45rem] bg-white/85 px-8 py-16 backdrop-blur md:px-14">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="subtle" className="mx-auto mb-4 w-fit bg-accent/10 text-accent">
              The Kiisi craft
            </Badge>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Every course is an invitation to linger.
            </h2>
            <p className="mt-4 text-pretty text-base text-muted-foreground md:text-lg">
              We design dining journeys that begin with a warm welcome, continue with thoughtful pacing, and finish with a gentle finale.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-primary/15 bg-white/80 p-6 text-left shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(255,125,0,0.18)]"
              >
                <div className="mb-4 h-12 w-12 rounded-2xl bg-primary/15" />
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
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
      <CraftSection />
      <Suspense fallback={<SkeletonSection />}>
        <LocationsSection />
      </Suspense>
    </div>
  );
}
