import { Suspense } from "react";

import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SkeletonSection } from "@/components/navigation/skeletons";
import { getPromotions } from "@/lib/data";

const audienceStyles = {
  CATERING: {
    label: "Catering",
    badgeClass: "bg-accent/10 text-accent border-accent/30",
  },
  LOYALTY: {
    label: "Loyalty",
    badgeClass: "bg-primary/10 text-primary border-primary/30",
  },
  PUBLIC: {
    label: "Signature experience",
    badgeClass: "bg-secondary text-secondary-foreground border-secondary/60",
  },
} as const;

async function OffersContent() {
  const promotions = await getPromotions();

  if (promotions.length === 0) {
    return (
      <div className="relative mx-auto max-w-4xl px-6 py-20">
        <div className="pointer-events-none absolute inset-x-12 top-12 h-48 rounded-full bg-primary/10 blur-3xl" />
        <Card className="relative overflow-hidden border-none bg-card shadow-xl shadow-primary/10">
          <div className="pointer-events-none absolute -right-24 top-0 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />
          <CardHeader className="relative space-y-3 text-center">
            <CardTitle className="text-3xl">No active offers</CardTitle>
            <CardDescription className="mx-auto max-w-2xl text-base">
              Check back soon for seasonal tasting menus, chef collaborations, and intimate dining events crafted for our guests.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center border-t border-border/60 bg-muted/40 px-10 py-6 text-sm text-muted-foreground">
            Be the first to know by subscribing to updates in your Kiisi account.
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-6xl space-y-12 px-6 py-16">
      <div className="pointer-events-none absolute inset-x-10 -top-12 h-64 rounded-full bg-primary/10 blur-3xl" />
      <Card className="relative overflow-hidden border-none bg-gradient-to-br from-primary/15 via-card to-card shadow-2xl shadow-primary/20">
        <div className="pointer-events-none absolute -right-24 top-0 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
        <CardHeader className="relative space-y-3">
          <Badge className="w-fit border-primary/30 bg-primary/10 text-primary">Seasonal highlights</Badge>
          <CardTitle className="text-3xl md:text-4xl">Offers &amp; Events</CardTitle>
          <CardDescription className="max-w-2xl text-base">
            Discover tasting menus, holiday celebrations, and tailored catering experiences from Restoran Kiisi.
          </CardDescription>
        </CardHeader>
        <CardFooter className="relative border-t border-white/40 bg-white/40 px-8 py-6 text-sm text-muted-foreground backdrop-blur">
          Delight your guests and teams with curated Estonian flavours, available across Tallinn and beyond.
        </CardFooter>
      </Card>
      <div className="grid gap-8 md:grid-cols-2">
        {promotions.map((promotion) => {
          const audience = audienceStyles[promotion.audience as keyof typeof audienceStyles] ?? audienceStyles.PUBLIC;

          return (
            <Card
              key={promotion.id}
              className="relative overflow-hidden border-none bg-card shadow-xl shadow-primary/10 transition hover:-translate-y-1 hover:shadow-primary/20"
            >
              <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
              <CardHeader className="relative space-y-3">
                <Badge variant="outline" className={`w-fit border ${audience.badgeClass}`}>
                  {audience.label}
                </Badge>
                <CardTitle className="text-2xl leading-tight text-foreground">{promotion.title}</CardTitle>
                {promotion.subtitle ? (
                  <CardDescription className="text-base text-foreground/80">{promotion.subtitle}</CardDescription>
                ) : null}
              </CardHeader>
              <CardContent className="relative space-y-5">
                {promotion.body ? (
                  <p className="text-sm leading-6 text-muted-foreground">{promotion.body}</p>
                ) : null}
                <dl className="grid gap-2 text-xs text-muted-foreground">
                  <div className="flex justify-between gap-2">
                    <dt className="font-medium uppercase tracking-[0.18em] text-foreground/80">Starts</dt>
                    <dd>{new Date(promotion.startAt).toLocaleDateString()}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="font-medium uppercase tracking-[0.18em] text-foreground/80">Ends</dt>
                    <dd>{new Date(promotion.endAt).toLocaleDateString()}</dd>
                  </div>
                </dl>
              </CardContent>
              {promotion.ctaUrl ? (
                <CardFooter className="relative border-t border-border/60 bg-muted/40 px-6 py-5">
                  <a
                    href={promotion.ctaUrl}
                    className={`${buttonClasses({ variant: "default", size: "sm" })} h-10 px-5`}
                  >
                    {promotion.ctaLabel ?? "Learn more"}
                  </a>
                </CardFooter>
              ) : null}
            </Card>
          );
        })}
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
