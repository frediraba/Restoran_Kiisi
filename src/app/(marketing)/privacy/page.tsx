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
    title: "Information we collect",
    description:
      "We gather details you share with us directly as well as information that helps us keep the website secure and easy to use.",
    subsections: [
      {
        subtitle: "Personal information",
        items: [
          "Name and contact information (email, phone number)",
          "Reservation, order history, and guest preferences",
          "Dietary notes and special requests",
          "Payment details processed securely via third parties",
        ],
      },
      {
        subtitle: "Automatically collected information",
        items: [
          "Website usage data and analytics",
          "Device details such as browser, operating system, and language",
          "IP address and general location",
          "Cookies and similar tracking technologies",
        ],
      },
    ],
  },
  {
    title: "How we use your information",
    description: "Your information allows us to deliver a refined dining experience and keep you informed about Kiisi.",
    items: [
      "Process reservations, orders, and event enquiries",
      "Communicate about your dining experience and service updates",
      "Share menu news and seasonal offers when you opt in",
      "Improve our website, menus, and hospitality through feedback",
      "Comply with legal obligations and maintain security",
    ],
  },
  {
    title: "Information sharing",
    description:
      "We respect your privacy—your personal details are only shared in limited circumstances when necessary to operate our services.",
    items: [
      "With your explicit consent",
      "With trusted service providers supporting reservations, payments, and communications",
      "When required by law or to protect the rights and safety of our guests and team",
      "In the event of a business transfer or acquisition",
    ],
  },
  {
    title: "Data security",
    description:
      "We implement administrative, technical, and physical safeguards to protect your personal information. While no internet transmission is entirely risk-free, we continually review our practices to keep your data safe.",
  },
  {
    title: "Your rights",
    description:
      "Depending on your location, you may have certain rights regarding the personal information we hold about you.",
    items: [
      "Access and review the information we store",
      "Request corrections to inaccurate details",
      "Ask for deletion where permitted by law",
      "Object to or restrict certain processing activities",
      "Withdraw consent for marketing communications at any time",
    ],
  },
  {
    title: "Cookies and tracking",
    description:
      "We use cookies to improve performance, analyse traffic, and personalise content. You can adjust your browser settings to manage or disable cookies, though this may impact some site features.",
  },
  {
    title: "Changes to this policy",
    description:
      "We may update this policy periodically. When we make material changes, we&apos;ll update the date above and, when appropriate, notify you directly.",
  },
];

const contactDetails = [
  { label: "Email", value: "privacy@restorankiisi.ee" },
  { label: "Phone", value: "+372 555 12345" },
  { label: "Address", value: "Tallinn Old Town, Estonia" },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-6 py-16">
      <section className="space-y-6 text-center md:text-left">
        <Badge className="mx-auto md:mx-0" variant="outline">
          Privacy policy
        </Badge>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Your privacy matters</h1>
          <p className="text-base text-muted-foreground md:max-w-2xl">
            Last updated: <strong>October 6, 2025</strong>. We are committed to protecting your personal information and being transparent about how it&apos;s used.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardHeader className="space-y-3">
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
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
              Have questions about this policy or how we handle your information? We&apos;re here to help.
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
