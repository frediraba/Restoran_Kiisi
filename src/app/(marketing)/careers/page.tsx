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

const teams = [
  {
    name: "Kitchen",
    badge: "Back of house",
    roles: [
      {
        title: "Sous Chef",
        description: "Lead our kitchen brigade in crafting innovative seasonal tasting menus.",
        details: "Full-time • Tallinn Old Town",
      },
      {
        title: "Line Cook",
        description: "Execute dishes with precision during busy evening services.",
        details: "Full-time • Tallinn Old Town",
      },
    ],
  },
  {
    name: "Front of house",
    badge: "Guest experience",
    roles: [
      {
        title: "Server",
        description: "Deliver thoughtful service with deep menu and wine knowledge.",
        details: "Part-time / Full-time • Tallinn Old Town",
      },
      {
        title: "Host",
        description: "Welcome guests, orchestrate reservations, and set the tone for the evening.",
        details: "Part-time • Tallinn Old Town",
      },
    ],
  },
];

const benefits = [
  "Competitive salary, tips, and performance recognition",
  "Flexible scheduling tailored to work-life balance",
  "Family meal every shift and generous dining discounts",
  "Workshops with guest chefs, sommeliers, and producers",
  "Pathways for progression within the Kiisi group",
  "Wellness support including staff yoga and counselling",
];

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-6 py-16">
      <section className="space-y-6 text-center md:text-left">
        <Badge className="mx-auto md:mx-0" variant="outline">
          Join the Kiisi family
        </Badge>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Careers</h1>
          <p className="text-base text-muted-foreground md:max-w-2xl">
            We believe in nurturing talent, celebrating curiosity, and creating spaces where both guests and team members feel at home.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground md:flex-row md:items-center">
          <span className="font-medium text-foreground">We&apos;re always excited to meet new talent.</span>
          <span className="rounded-full bg-muted px-4 py-1">Applications reviewed weekly.</span>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {teams.map((team) => (
          <Card key={team.name} className="h-full">
            <CardHeader className="space-y-4">
              <Badge>{team.badge}</Badge>
              <CardTitle>{team.name}</CardTitle>
              <CardDescription>
                {team.name === "Kitchen"
                  ? "Craft dishes that honour Estonian ingredients and progressive techniques."
                  : "Deliver hospitality with heart in our historic Old Town dining room."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {team.roles.map((role) => (
                <div
                  key={role.title}
                  className="rounded-2xl border border-border/60 bg-muted/20 p-4 transition hover:border-border hover:bg-muted/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-base font-semibold text-foreground">{role.title}</h3>
                      <p className="text-sm text-muted-foreground">{role.description}</p>
                    </div>
                    <Badge variant="subtle">Hiring</Badge>
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-[0.12em] text-muted-foreground">{role.details}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr,1fr]">
        <Card className="h-full">
          <CardHeader className="space-y-4">
            <Badge variant="subtle">Benefits</Badge>
            <CardTitle>Why you&apos;ll love working here</CardTitle>
            <CardDescription>
              Our team enjoys thoughtful support, ongoing education, and opportunities to grow with the restaurant.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader className="space-y-4">
            <Badge variant="outline">Apply</Badge>
            <CardTitle>Ready to join?</CardTitle>
            <CardDescription>
              Share your CV, tell us about your favourite ingredient, and we&apos;ll be in touch to arrange a conversation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-sm text-muted-foreground">
            <p>
              Email
              <a href="mailto:careers@restorankiisi.ee" className="font-medium text-primary">
                &nbsp;careers@restorankiisi.ee
              </a>
              &nbsp;or visit us between 15:00 and 17:00 on weekdays to meet the team.
            </p>
            <Separator />
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className={cn(buttonClasses(), "flex-1 justify-center")}>
                Apply online
              </a>
              <a
                href="tel:+37255512345"
                className={cn(buttonClasses({ variant: "outline" }), "flex-1 justify-center")}
              >
                Call +372 555 12345
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
