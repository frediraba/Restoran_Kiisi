import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-6 py-12">
      <section className="rounded-4xl border border-border/70 bg-gradient-to-br from-primary/10 via-background to-background px-8 py-12 shadow-lg shadow-primary/10">
        <div className="flex flex-col gap-4 text-balance">
          <Badge variant="outline" className="w-fit">
            Hospitality team
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Contact Restoran Kiisi</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Reach our reservations team or events specialists. We reply within one business day.
          </p>
        </div>
      </section>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/70">
          <CardHeader className="p-6 pb-0">
            <CardTitle className="text-lg">General inquiries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-6 pt-4 text-sm text-muted-foreground">
            <p>Call +372 5555 1234</p>
            <p>
              Email <Link href="mailto:hello@restorankiisi.ee" className="font-semibold text-primary">hello@restorankiisi.ee</Link>
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/70">
          <CardHeader className="p-6 pb-0">
            <CardTitle className="text-lg">Reservations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-6 pt-4 text-sm text-muted-foreground">
            <p>
              Reserve online at <Link href="/reserve" className="font-semibold text-primary">restorankiisi.ee/reserve</Link>
            </p>
            <p>
              Email <Link href="mailto:seats@restorankiisi.ee" className="font-semibold text-primary">seats@restorankiisi.ee</Link>
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/70">
          <CardHeader className="p-6 pb-0">
            <CardTitle className="text-lg">Catering &amp; Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-6 pt-4 text-sm text-muted-foreground">
            <p>Email <Link href="mailto:events@restorankiisi.ee" className="font-semibold text-primary">events@restorankiisi.ee</Link></p>
            <p>Phone +372 5555 9876</p>
          </CardContent>
        </Card>
        <Card className="border-dashed border-border/70 bg-muted/20">
          <CardHeader className="p-6 pb-0">
            <CardTitle className="text-lg">Private hire</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-6 pt-4 text-sm text-muted-foreground">
            <p>
              Looking to partner or book the whole venue? Share your event requirements and our team will prepare a proposal
              within 48 hours.
            </p>
            <p>
              Email <Link href="mailto:partners@restorankiisi.ee" className="font-semibold text-primary">partners@restorankiisi.ee</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
