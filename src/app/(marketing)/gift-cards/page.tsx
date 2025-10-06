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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const giftTypes = [
  {
    title: "Physical Gift Cards",
    badge: "Keepsake",
    description:
      "Beautifully printed cards presented in a linen-textured sleeve, ideal for gifting in person.",
    highlights: [
      "Available in €25, €50, €100, and €200 denominations",
      "Hand-wrapped presentation with wax seal",
      "Can be personalised with a handwritten note",
      "Redeemable at all Restoran Kiisi locations",
    ],
  },
  {
    title: "Digital Gift Cards",
    badge: "Instant",
    description:
      "Delivered instantly by email with the option to schedule for a special date—perfect for last-minute surprises.",
    highlights: [
      "Custom amount options from €10 to €500",
      "Add a personalised message and photograph",
      "Secure online redemption",
      "Downloadable PDF for printing at home",
    ],
  },
];

const giftTiers = [
  {
    value: "€25",
    description: "An introduction to our seasonal lunch menu",
  },
  {
    value: "€50",
    description: "A three-course dinner for one or shared appetisers",
  },
  {
    value: "€100",
    description: "A tasting experience for two guests",
  },
  {
    value: "€200",
    description: "An immersive celebration with curated wine pairing",
  },
];

const etiquette = [
  "Gift cards never expire and can be redeemed in multiple visits",
  "Balance enquiries are available in person or via email",
  "Non-transferable for cash or credit with lost cards unable to be replaced",
  "Applicable to dining, takeaway, and event experiences",
  "Change is offered on purchases below the remaining card value",
];

export default function GiftCardsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-6 py-16">
      <section className="space-y-6 text-center md:text-left">
        <Badge className="mx-auto md:mx-0" variant="outline">
          Share the Kiisi table
        </Badge>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Gift Cards
          </h1>
          <p className="text-base text-muted-foreground md:max-w-2xl">
            Treat the people you love to a night in Tallinn&apos;s Old Town. Our gift cards unlock
            chef-driven seasonal menus, intimate events, and cellar pairings crafted by the Kiisi team.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground md:flex-row md:items-center">
          <span className="font-medium text-foreground">Need something today?</span>
          <span className="rounded-full bg-muted px-4 py-1">Digital delivery arrives in moments.</span>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {giftTypes.map((type) => (
          <Card key={type.title} className="h-full">
            <CardHeader className="space-y-4">
              <Badge>{type.badge}</Badge>
              <CardTitle>{type.title}</CardTitle>
              <CardDescription>{type.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {type.highlights.map((highlight) => (
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
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Signature tiers</h2>
            <p className="text-sm text-muted-foreground">
              Choose a denomination to match the experience you&apos;d like to gift.
            </p>
          </div>
          <Badge variant="subtle">Flexible amounts available</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {giftTiers.map((tier) => (
            <Card key={tier.value} className="text-center">
              <CardHeader className="space-y-3">
                <CardTitle className="text-3xl font-semibold text-primary">{tier.value}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
        <Card className="h-full">
          <CardHeader className="space-y-4">
            <Badge variant="subtle">How to purchase</Badge>
            <CardTitle>Purchase gift cards</CardTitle>
            <CardDescription>
              Visit us in person for a beautifully presented card or request a digital delivery by email.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/locations"
                className={cn(buttonClasses(), "flex-1 justify-center")}
              >
                Find locations
              </a>
              <a
                href="/contact"
                className={cn(buttonClasses({ variant: "outline" }), "flex-1 justify-center")}
              >
                Arrange digital delivery
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Prefer a bespoke experience? Our guest relations team can curate progressive tasting journeys, wine pairings,
              and add-on experiences tailored to your recipient.
            </p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader className="space-y-4">
            <Badge variant="outline">Etiquette</Badge>
            <CardTitle>Terms &amp; details</CardTitle>
            <CardDescription>
              A few notes to ensure your recipient enjoys every moment of their Kiisi experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {etiquette.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="justify-start bg-transparent px-8 py-6">
            <a href="/terms" className="text-sm font-semibold text-primary transition hover:text-primary/80">
              Read full terms of service
            </a>
          </CardFooter>
        </Card>
      </section>

      <section>
        <Card className="overflow-hidden">
          <CardHeader className="space-y-3">
            <CardTitle className="text-2xl">Corporate &amp; group gifting</CardTitle>
            <CardDescription>
              Need to send multiple gifts? We can coordinate tailored deliveries, handwritten notes, and invoicing for teams or
              clients.
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Email <a href="mailto:events@restorankiisi.ee" className="font-medium text-primary">events@restorankiisi.ee</a>
              &nbsp;with your preferred quantities and personalised touches, and our concierge will respond within one business day.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:events@restorankiisi.ee"
                className={cn(buttonClasses(), "flex-1 justify-center")}
              >
                Contact concierge
              </a>
              <a
                href="/events"
                className={cn(buttonClasses({ variant: "outline" }), "flex-1 justify-center")}
              >
                Explore private events
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
