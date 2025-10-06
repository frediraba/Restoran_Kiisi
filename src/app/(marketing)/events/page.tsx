import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const venues = [
  {
    name: "Private dining room",
    badge: "12 guests",
    description:
      "An intimate oak-panelled room for tastings, anniversaries, and executive dinners with curated playlists and lighting.",
    highlights: [
      "Custom tasting menu with optional wine pairings",
      "Dedicated service team and sommelier",
      "Pre-arrival styling and personalised menus",
      "Discreet AV setup for presentations",
    ],
  },
  {
    name: "Restaurant buyout",
    badge: "40 guests",
    description:
      "Transform the entire restaurant into your stage for milestone celebrations, launches, or festive gatherings.",
    highlights: [
      "Flexible floor plan with lounge and dining zones",
      "Live music or DJ coordination",
      "Signature cocktail and bar programming",
      "Late-night dessert table or midnight snack bar",
    ],
  },
];

const eventPackages = [
  {
    title: "Intimate gathering",
    description: "A warm celebration over a curated three-course menu",
    features: ["Up to 8 guests", "Welcome sparkling wine", "Three-course seasonal menu", "Keepsake menu cards"],
  },
  {
    title: "Chef’s tasting",
    description: "Immersive five-course tasting crafted by our culinary team",
    features: ["Up to 12 guests", "Five-course menu with storytelling", "Sommelier wine pairing", "Floral tablescape"],
  },
  {
    title: "Signature soirée",
    description: "Exclusive restaurant experience with live entertainment",
    features: ["Up to 40 guests", "Custom food and beverage stations", "Full venue styling", "Event concierge on-site"],
  },
];

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-6 py-16">
      <section className="space-y-6 text-center md:text-left">
        <Badge className="mx-auto md:mx-0" variant="outline">
          Celebrate at Kiisi
        </Badge>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Private events</h1>
          <p className="text-base text-muted-foreground md:max-w-2xl">
            From intimate gatherings to full restaurant soirées, our team choreographs every detail so you can be fully present with your guests.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground md:flex-row md:items-center">
          <span className="font-medium text-foreground">Let&apos;s design something unforgettable.</span>
          <span className="rounded-full bg-muted px-4 py-1">Event proposals delivered within 48 hours.</span>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {venues.map((venue) => (
          <Card key={venue.name} className="h-full">
            <CardHeader className="space-y-4">
              <Badge>{venue.badge}</Badge>
              <CardTitle>{venue.name}</CardTitle>
              <CardDescription>{venue.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {venue.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Event collections</h2>
            <p className="text-sm text-muted-foreground">
              Choose one of our signature experiences or let us tailor a celebration to your guest list.
            </p>
          </div>
          <Badge variant="subtle">Seasonal menus updated quarterly</Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {eventPackages.map((pkg) => (
            <Card key={pkg.title}>
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl">{pkg.title}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr,1fr]">
        <Card className="h-full">
          <CardHeader className="space-y-4">
            <Badge variant="subtle">Plan together</Badge>
            <CardTitle>Plan your event</CardTitle>
            <CardDescription>
              Tell us about your celebration and we&apos;ll curate a proposal covering menus, pairings, design, and timeline.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className={cn(buttonClasses(), "flex-1 justify-center")}>
                Contact events team
              </a>
              <a
                href="tel:+37255512345"
                className={cn(buttonClasses({ variant: "outline" }), "flex-1 justify-center")}
              >
                Call +372 555 12345
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              We&apos;ll schedule a design consultation, offer sample menus, and coordinate any site visits you may need.
            </p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader className="space-y-4">
            <Badge variant="outline">Enhancements</Badge>
            <CardTitle>Moments your guests remember</CardTitle>
            <CardDescription>
              Signature touches that layer storytelling and surprise into your celebration.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                <span>Arrival ritual with smoke-infused cocktails and local botanicals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                <span>Story-led menu cards illustrated by Estonian artists</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                <span>Late-night dessert and coffee atelier featuring house-made chocolates</span>
              </li>
            </ul>
            <Separator />
            <p>
              Email
              <a href="mailto:events@restorankiisi.ee" className="font-medium text-primary">
                &nbsp;events@restorankiisi.ee
              </a>
              &nbsp;to explore custom entertainment, photography, and keepsake options.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
