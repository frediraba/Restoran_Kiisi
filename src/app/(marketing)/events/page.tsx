export default function EventsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-neutral-900">Private Events</h1>
        <p className="text-sm text-neutral-500">
          Host your special occasions in the intimate atmosphere of Restoran Kiisi.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Private Dining</h2>
          <p className="text-sm text-neutral-600">
            Reserve our private dining room for intimate gatherings of up to 12 guests. 
            Enjoy personalized service and a curated menu in an exclusive setting.
          </p>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>• Seating for 8-12 guests</li>
            <li>• Custom tasting menu</li>
            <li>• Wine pairing recommendations</li>
            <li>• Dedicated service staff</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Restaurant Buyout</h2>
          <p className="text-sm text-neutral-600">
            Take over the entire restaurant for larger celebrations. Perfect for milestone 
            birthdays, engagement parties, or corporate dinners.
          </p>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>• Full restaurant capacity (40 guests)</li>
            <li>• Exclusive use of the space</li>
            <li>• Custom event planning</li>
            <li>• Flexible timing options</li>
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900">Event Packages</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-neutral-900 mb-2">Intimate Gathering</h3>
            <p className="text-sm text-neutral-600 mb-3">Perfect for small celebrations</p>
            <ul className="space-y-1 text-xs text-neutral-600">
              <li>• Up to 8 guests</li>
              <li>• 3-course menu</li>
              <li>• Wine selection</li>
              <li>• 3-hour reservation</li>
            </ul>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-neutral-900 mb-2">Private Dining</h3>
            <p className="text-sm text-neutral-600 mb-3">Exclusive room experience</p>
            <ul className="space-y-1 text-xs text-neutral-600">
              <li>• Up to 12 guests</li>
              <li>• 5-course tasting menu</li>
              <li>• Wine pairing</li>
              <li>• 4-hour reservation</li>
            </ul>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-neutral-900 mb-2">Full Buyout</h3>
            <p className="text-sm text-neutral-600 mb-3">Complete restaurant experience</p>
            <ul className="space-y-1 text-xs text-neutral-600">
              <li>• Up to 40 guests</li>
              <li>• Custom menu design</li>
              <li>• Full bar service</li>
              <li>• Flexible duration</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Plan Your Event</h2>
        <p className="text-sm text-neutral-600 mb-6">
          Ready to create a memorable dining experience? Contact our events team to discuss your vision and receive a personalized proposal.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
          >
            Contact Events Team
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
