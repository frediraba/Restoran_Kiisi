export default function GiftCardsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-neutral-900">Gift Cards</h1>
        <p className="text-sm text-neutral-500">
          Share the experience of Restoran Kiisi with someone special. Perfect for any occasion.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Physical Gift Cards</h2>
          <p className="text-sm text-neutral-600">
            Beautifully designed gift cards available for purchase at any of our locations. 
            Each card comes in an elegant presentation box, perfect for gifting.
          </p>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>• Available in €25, €50, €100, and €200 denominations</li>
            <li>• Elegant presentation packaging</li>
            <li>• No expiration date</li>
            <li>• Valid at all Restoran Kiisi locations</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Digital Gift Cards</h2>
          <p className="text-sm text-neutral-600">
            Instant digital gift cards delivered via email. Perfect for last-minute gifts 
            or when you can't visit us in person.
          </p>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li>• Instant email delivery</li>
            <li>• Custom amount options (€10-€500)</li>
            <li>• Personalized message included</li>
            <li>• Easy online redemption</li>
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900">Gift Card Options</h2>
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-amber-600 mb-2">€25</div>
            <p className="text-sm text-neutral-600">Perfect for a casual lunch or coffee break</p>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-amber-600 mb-2">€50</div>
            <p className="text-sm text-neutral-600">Great for a dinner for two</p>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-amber-600 mb-2">€100</div>
            <p className="text-sm text-neutral-600">Ideal for a special celebration</p>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm text-center">
            <div className="text-2xl font-bold text-amber-600 mb-2">€200</div>
            <p className="text-sm text-neutral-600">Perfect for multiple visits or large groups</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Purchase Gift Cards</h2>
        <p className="text-sm text-neutral-600 mb-6">
          Visit any of our locations to purchase physical gift cards, or contact us to arrange 
          digital gift card delivery.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="/locations"
            className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
          >
            Find Locations
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-amber-600 px-6 py-3 text-sm font-semibold text-amber-600 hover:bg-amber-50"
          >
            Contact for Digital Cards
          </a>
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
        <h3 className="font-semibold text-amber-800 mb-2">Terms & Conditions</h3>
        <ul className="space-y-1 text-sm text-amber-700">
          <li>• Gift cards have no expiration date</li>
          <li>• Cannot be exchanged for cash</li>
          <li>• Valid at all Restoran Kiisi locations</li>
          <li>• Lost or stolen cards cannot be replaced</li>
          <li>• Change will be provided for purchases under the card value</li>
        </ul>
      </div>
    </div>
  );
}
