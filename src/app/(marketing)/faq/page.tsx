import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const categories = [
  {
    title: "Reservations & dining",
    badge: "Plan ahead",
    questions: [
      {
        question: "Do I need a reservation?",
        answer:
          "Walk-ins are always welcome, but we recommend reserving for dinner and weekend services to guarantee your table.",
      },
      {
        question: "How far in advance can I book?",
        answer:
          "Reservations open 30 days in advance. For celebrations or parties of 8 or more, we invite you to reach out earlier so we can plan together.",
      },
      {
        question: "Do you accommodate dietary restrictions?",
        answer:
          "Absolutely. Let us know when booking or speak with your server—we can adapt menus for allergies, vegetarian, vegan, and gluten-free guests.",
      },
    ],
  },
  {
    title: "Menu & ingredients",
    badge: "Seasonal",
    questions: [
      {
        question: "Is your menu seasonal?",
        answer:
          "Our menu shifts with the Baltic seasons. We collaborate with farmers and foragers, so dishes evolve as produce becomes available.",
      },
      {
        question: "Do you offer vegetarian and vegan options?",
        answer:
          "Yes. Each menu features dedicated vegetarian dishes, and our chefs are happy to craft vegan courses with advance notice.",
      },
      {
        question: "Can I view the menu before visiting?",
        answer:
          "Current menus are published online and refreshed weekly. We also share daily specials through our social media channels.",
      },
    ],
  },
  {
    title: "Orders & takeaway",
    badge: "To-go",
    questions: [
      {
        question: "Do you offer takeaway or delivery?",
        answer:
          "Takeaway is available to collect from the restaurant. For business orders we can prepare invoices and organise scheduled pickups.",
      },
      {
        question: "How do I place a takeaway order?",
        answer:
          "Order online through our website or give us a call. Most orders are ready within 20–30 minutes depending on service volume.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept cash, major credit cards, and contactless payments. Invoices for corporate orders can be settled within 24 hours.",
      },
    ],
  },
  {
    title: "Location & hours",
    badge: "Visit",
    questions: [
      {
        question: "Where are you located?",
        answer:
          "You&apos;ll find us in Tallinn Old Town with nearby parking and convenient public transport links. Our locations page includes maps and directions.",
      },
      {
        question: "What are your opening hours?",
        answer:
          "Service hours vary seasonally. Check the locations page or call us for the latest schedule before you arrive.",
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-2xl border border-border/60 bg-muted/20 p-5 transition hover:border-border hover:bg-muted/40">
      <summary className="flex cursor-pointer items-center justify-between gap-4 text-left [&::-webkit-details-marker]:hidden">
        <span className="text-base font-semibold text-foreground">{question}</span>
        <span className="text-sm font-medium text-primary transition group-open:rotate-45">+</span>
      </summary>
      <p className="mt-3 text-sm text-muted-foreground">{answer}</p>
    </details>
  );
}

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-6 py-16">
      <section className="space-y-6 text-center md:text-left">
        <Badge className="mx-auto md:mx-0" variant="outline">
          Frequently asked questions
        </Badge>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Questions &amp; answers</h1>
          <p className="text-base text-muted-foreground md:max-w-2xl">
            Discover everything you need to know about dining with us—from reservations to takeaway and special requests.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        {categories.map((category) => (
          <Card key={category.title}>
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <CardTitle>{category.title}</CardTitle>
                <Badge variant="subtle">{category.badge}</Badge>
              </div>
              <CardDescription>
                {category.title === "Reservations & dining"
                  ? "Plan the perfect visit to our Old Town dining room."
                  : category.title === "Menu & ingredients"
                    ? "Explore how we source and craft every dish."
                    : category.title === "Orders & takeaway"
                      ? "Enjoy Kiisi at home or at the office."
                      : "Know when to visit and how to find us."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.questions.map((question) => (
                <FAQItem key={question.question} question={question.question} answer={question.answer} />
              ))}
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <Card className="text-center">
          <CardHeader className="space-y-3">
            <CardTitle className="text-2xl">Still curious?</CardTitle>
            <CardDescription>
              Can&apos;t find what you&apos;re looking for? Our guest relations team is happy to help plan your next visit.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Email us at
              <a href="mailto:hello@restorankiisi.ee" className="font-medium text-primary">
                &nbsp;hello@restorankiisi.ee
              </a>
              &nbsp;or call +372 555 12345.
            </p>
            <p>
              Prefer to chat in person? Stop by between 15:00 and 17:00 daily and we&apos;ll be ready with recommendations.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
