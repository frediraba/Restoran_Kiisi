export default function CateringPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-neutral-900">Catering Services</h1>
        <p className="text-sm text-neutral-500">
          Bring the authentic flavors of Restoran Kiisi to your special events and gatherings.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Corporate Events</h2>
          <p className="text-sm text-neutral-600">
            Professional catering for business meetings, conferences, and corporate celebrations. 
            We provide everything from intimate boardroom lunches to large-scale company events.
          </p>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>• Custom menu planning</li>
            <li>• Professional service staff</li>
            <li>• Dietary accommodation</li>
            <li>• Setup and cleanup included</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Private Celebrations</h2>
          <p className="text-sm text-neutral-600">
            Make your special occasions memorable with our signature dishes. From birthday parties 
            to anniversary dinners, we create personalized experiences for your guests.
          </p>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>• Personalized menu consultation</li>
            <li>• Seasonal ingredient focus</li>
            <li>• Flexible serving options</li>
            <li>• Local delivery available</li>
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Get Started</h2>
        <p className="text-sm text-neutral-600 mb-6">
          Ready to plan your event? Contact our catering team to discuss your needs and receive a custom quote.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
          >
            Contact Catering Team
          </a>
          <a
            href="tel:+37255512345"
            className="inline-flex items-center justify-center rounded-full border border-amber-600 px-6 py-3 text-sm font-semibold text-amber-600 hover:bg-amber-50"
          >
            Call +372 555 12345
          </a>
        </div>
      </div>
    </div>
  );
}
