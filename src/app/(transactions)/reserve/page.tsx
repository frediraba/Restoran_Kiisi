import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getLocations } from "@/lib/data";

import { ReservationForm } from "./reservation-form";

export default async function ReservePage() {
  const locations = await getLocations();

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-6 py-12">
      <Card className="overflow-hidden border-border/70 bg-gradient-to-br from-primary/10 via-background to-background">
        <CardContent className="relative space-y-4 p-10">
          <div className="pointer-events-none absolute -left-24 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" aria-hidden />
          <Badge variant="outline">Instant confirmation</Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Reserve a table</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            We confirm reservations instantly during opening hours. Larger parties may be waitlisted.
          </p>
        </CardContent>
      </Card>
      <ReservationForm locations={locations.map((location) => ({ slug: location.slug, name: location.name }))} />
    </div>
  );
}
