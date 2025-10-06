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

const services = [
  {
    title: "Corporate gatherings",
    tag: "Business",
    description:
      "Boardroom lunches, press events, and brand launches with discreet service and polished presentation.",
    highlights: [
      "Seasonally rotating menus tailored to your agenda",
      "Dedicated event lead for seamless logistics",
      "Service staff, tableware, and styling included",
      "Dietary accommodations prepared with advance notice",
    ],
  },
  {
    title: "Private celebrations",
    tag: "Celebration",
    description:
      "Milestone birthdays, intimate weddings, and anniversaries designed around your story and favourite flavours.",
    highlights: [
      "Menu consultation with our head chef",
      "Wine pairing guidance from our sommelier team",
      "Flexible service formats—from plated to family-style",
      "Delivery and on-site finishing within Tallinn and Harju County",
    ],
  },
];

const packages = [
  {
    name: "Canapé reception",
    description: "Elegant standing event with curated bites",
    details: [
      "Up to 60 guests",
      "Twelve seasonal canapés",
      "Signature welcome cocktail",
      "Two-hour service team",
    ],
  },
  {
    name: "Chef’s table",
    description: "Seven-course plated tasting with wine pairings",
    details: [
      "Up to 24 guests",
      "Tableside storytelling by our chefs",
      "Sommelier-selected pairing menu",
      "Printed menus for each guest",
    ],
  },
  {
    name: "Weekend retreat",
    description: "Multi-day experience with breakfast, lunch, and dinner",
    details: [
      "Up to 40 guests",
      "Interactive cooking workshop",
      "Cellar tasting experience",
      "On-site service captain",
    ],
  },
];

export default function CateringPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-6 py-16">
      <section className="space-y-6 text-center md:text-left">
        <Badge className="mx-auto md:mx-0" variant="outline">
          From our kitchen to yours
        </Badge>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Catering services</h1>
          <p className="text-base text-muted-foreground md:max-w-2xl">
            Elevate your gathering with considered flavours, artful presentation, and hospitality delivered by the
            Restoran Kiisi events team.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground md:flex-row md:items-center">
          <span className="font-medium text-foreground">Planning something bespoke?</span>
          <span className="rounded-full bg-muted px-4 py-1">We respond within one business day.</span>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.title} className="h-full">
            <CardHeader className="space-y-4">
              <Badge>{service.tag}</Badge>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {service.highlights.map((highlight) => (
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
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Signature packages</h2>
            <p className="text-sm text-muted-foreground">
              Curated culinary journeys designed for a variety of guest counts and atmospheres.
            </p>
          </div>
          <Badge variant="subtle">Custom menus available</Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <Card key={pkg.name}>
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {pkg.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                      <span>{detail}</span>
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
            <Badge variant="subtle">Let&apos;s collaborate</Badge>
            <CardTitle>Start planning</CardTitle>
            <CardDescription>
              Share your event vision and we&apos;ll prepare a tailored proposal complete with timelines, staffing, and menu flow.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className={cn(buttonClasses(), "flex-1 justify-center")}>
                Contact catering team
              </a>
              <a
                href="tel:+37255512345"
                className={cn(buttonClasses({ variant: "outline" }), "flex-1 justify-center")}
              >
                Call +372 555 12345
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Include your preferred date, guest count, and location—we&apos;ll confirm availability and schedule a consultation.
            </p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader className="space-y-4">
            <Badge variant="outline">Enhancements</Badge>
            <CardTitle>Additional experiences</CardTitle>
            <CardDescription>
              Extend the celebration with wine tastings, chef-led workshops, or bespoke styling elements.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>Popular additions include:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                <span>Nordic spirits pairing bar with seasonal infusions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                <span>Interactive rye bread workshop hosted by our bakers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                <span>Floral styling and tablescape curation in partnership with local artisans</span>
              </li>
            </ul>
            <Separator />
            <p>
              Looking for something unexpected? Email
              <a href="mailto:events@restorankiisi.ee" className="font-medium text-primary">
                &nbsp;events@restorankiisi.ee
              </a>
              &nbsp;and we&apos;ll craft a concept just for you.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
