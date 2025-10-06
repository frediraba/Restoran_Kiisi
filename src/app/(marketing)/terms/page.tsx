import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const sections = [
  {
    title: "Acceptance of terms",
    description:
      "By accessing or using the Restoran Kiisi website, reservations platform, or services, you agree to these Terms of Service. If you do not agree, please refrain from using our services.",
  },
  {
    title: "Reservations and bookings",
    subsections: [
      {
        subtitle: "Reservation policy",
        items: [
          "Reservations are subject to availability and restaurant capacity",
          "We hold tables for 15 minutes past the reserved time",
          "Large party bookings may require a deposit or credit card guarantee",
          "Cancellations should be made at least 24 hours in advance",
        ],
      },
      {
        subtitle: "Modifications and cancellations",
        items: [
          "Adjustments must be made via our website or by calling the restaurant",
          "No-shows may incur a cancellation fee for larger groups",
          "We reserve the right to modify or cancel reservations due to unforeseen circumstances",
        ],
      },
    ],
  },
  {
    title: "Orders and payment",
    subsections: [
      {
        subtitle: "Order terms",
        items: [
          "All prices are subject to change without notice",
          "Menu items and availability may vary",
          "Orders are prepared in the sequence they are received",
          "Ready times are estimates and may shift based on kitchen volume",
        ],
      },
      {
        subtitle: "Payment policy",
        items: [
          "Payment is due at the time of service unless otherwise agreed",
          "We accept cash, major credit cards, and contactless payments",
          "Invoice-by-email orders must be settled within 24 hours",
          "All prices include applicable taxes",
        ],
      },
    ],
  },
  {
    title: "Gift cards",
    items: [
      "Gift cards do not expire and may be redeemed across all Restoran Kiisi locations",
      "Cards cannot be exchanged for cash or replaced if lost or stolen",
      "Change is provided for purchases below the remaining balance",
      "Additional terms may apply to promotional or corporate gift card programmes",
    ],
  },
  {
    title: "User conduct",
    description: "Guests agree not to misuse the website or services. This includes refraining from activities that:",
    items: [
      "Violate any applicable laws or regulations",
      "Transmit harmful, offensive, or inappropriate content",
      "Interfere with the operation or security of our website and systems",
      "Attempt to gain unauthorised access to our infrastructure",
    ],
  },
  {
    title: "Limitation of liability",
    description:
      "Restoran Kiisi is not liable for indirect, incidental, special, consequential, or punitive damages arising from your access to or use of our services, to the extent permitted by law.",
  },
  {
    title: "Intellectual property",
    description:
      "All content on this site—including text, graphics, logos, imagery, and software—is the property of Restoran Kiisi and protected by copyright and other intellectual property laws.",
  },
  {
    title: "Privacy",
    description:
      "Your privacy is important to us. Our Privacy Policy explains how we collect, use, and safeguard personal information. By using our services you also agree to the terms outlined there.",
  },
  {
    title: "Governing law",
    description:
      "These terms are governed by and construed in accordance with the laws of Estonia, without regard to conflicts of law principles.",
  },
  {
    title: "Changes to terms",
    description:
      "We may update these terms from time to time. Changes take effect immediately upon posting. Continued use of our services constitutes acceptance of the revised terms.",
  },
];

const contactDetails = [
  { label: "Email", value: "legal@restorankiisi.ee" },
  { label: "Phone", value: "+372 555 12345" },
  { label: "Address", value: "Tallinn Old Town, Estonia" },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-6 py-16">
      <section className="space-y-6 text-center md:text-left">
        <Badge className="mx-auto md:mx-0" variant="outline">
          Terms of service
        </Badge>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Our guest agreement</h1>
          <p className="text-base text-muted-foreground md:max-w-2xl">
            Last updated: <strong>October 6, 2025</strong>. These terms keep every experience with Restoran Kiisi respectful, safe, and memorable.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader className="space-y-3">
              <CardTitle>{section.title}</CardTitle>
              {section.description ? <CardDescription>{section.description}</CardDescription> : null}
            </CardHeader>
            {section.subsections ? (
              <CardContent className="space-y-6 text-sm text-muted-foreground">
                {section.subsections.map((subsection) => (
                  <div key={subsection.subtitle} className="space-y-3">
                    <p className="text-sm font-semibold text-foreground">{subsection.subtitle}</p>
                    <ul className="space-y-2">
                      {subsection.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            ) : section.items ? (
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            ) : null}
          </Card>
        ))}
      </section>

      <section>
        <Card>
          <CardHeader className="space-y-3">
            <CardTitle>Contact us</CardTitle>
            <CardDescription>
              Questions about these terms? Reach out and our management team will respond promptly.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
            {contactDetails.map((detail) => (
              <div key={detail.label} className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{detail.label}</p>
                <p className="mt-2 text-sm font-medium text-foreground">{detail.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
