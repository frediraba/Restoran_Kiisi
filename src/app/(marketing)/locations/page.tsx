import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLocations } from "@/lib/data";

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-12">
      <section className="rounded-4xl border border-border/70 bg-gradient-to-br from-primary/10 via-background to-background px-8 py-12 shadow-lg shadow-primary/10">
        <div className="flex flex-col gap-4 text-balance">
          <Badge variant="outline" className="w-fit">
            Across Tallinn
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Locations</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Choose your nearest Restoran Kiisi dining room. Each location shares the core tasting menu with a handful of local
            specialties.
          </p>
        </div>
      </section>
      <div className="grid gap-6 md:grid-cols-2">
        {locations.map((location) => (
          <Card key={location.id} className="h-full border-border/70">
            <CardHeader className="p-6 pb-0">
              <CardTitle className="text-xl">{location.name}</CardTitle>
              <CardDescription>
                {location.address?.street}
                <br />
                {location.address?.city}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 p-6 pt-4 text-sm text-muted-foreground">
              <p>Reservations: {location.phone ?? "+372 5555 1234"}</p>
              <Link
                href={`/locations/${location.slug}`}
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80"
              >
                View details
                <span aria-hidden>→</span>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
