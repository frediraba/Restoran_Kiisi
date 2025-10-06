export default function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-neutral-900">Frequently Asked Questions</h1>
        <p className="text-sm text-neutral-500">
          Find answers to common questions about dining at Restoran Kiisi.
        </p>
      </header>

      <div className="space-y-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-neutral-900">Reservations & Dining</h2>
            
            <div className="space-y-4">
              <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-2">Do I need a reservation?</h3>
                <p className="text-sm text-neutral-600">
                  While walk-ins are welcome, we highly recommend making a reservation, especially for dinner service 
                  and weekend dining. You can make reservations online or by calling us directly.
                </p>
              </div>

              <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-2">How far in advance can I make a reservation?</h3>
                <p className="text-sm text-neutral-600">
                  Reservations can be made up to 30 days in advance. For special occasions or large groups, 
                  we recommend booking as early as possible.
                </p>
              </div>

              <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-2">Do you accommodate dietary restrictions?</h3>
                <p className="text-sm text-neutral-600">
                  Yes, we're happy to accommodate dietary restrictions and allergies. Please inform us when 
                  making your reservation or speak with your server about any specific needs.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-neutral-900">Menu & Food</h2>
            
            <div className="space-y-4">
              <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-2">Is your menu seasonal?</h3>
                <p className="text-sm text-neutral-600">
                  Yes, our menu changes seasonally to feature the freshest local ingredients. We work closely 
                  with Estonian farmers and producers to bring you authentic, seasonal flavors.
                </p>
              </div>

              <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-2">Do you offer vegetarian and vegan options?</h3>
                <p className="text-sm text-neutral-600">
                  Absolutely! We have several vegetarian and vegan dishes on our menu, and our chefs can 
                  modify many other dishes to meet your dietary preferences.
                </p>
              </div>

              <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-2">Can I see the menu before visiting?</h3>
                <p className="text-sm text-neutral-600">
                  Yes, you can view our current menu on our website. We also post daily specials on our 
                  social media channels.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-neutral-900">Orders & Takeaway</h2>
            
            <div className="space-y-4">
              <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-2">Do you offer takeaway or delivery?</h3>
                <p className="text-sm text-neutral-600">
                  Yes, we offer takeaway orders that you can pick up at the restaurant. We also provide 
                  invoice-by-email service for business orders.
                </p>
              </div>

              <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-2">How do I place a takeaway order?</h3>
                <p className="text-sm text-neutral-600">
                  You can place takeaway orders through our website or by calling the restaurant directly. 
                  Orders are typically ready within 20-30 minutes.
                </p>
              </div>

              <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-2">What payment methods do you accept?</h3>
                <p className="text-sm text-neutral-600">
                  We accept cash, all major credit cards, and contactless payments. For takeaway orders, 
                  you can pay on-site or request an invoice by email.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-neutral-900">Location & Hours</h2>
            
            <div className="space-y-4">
              <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-2">Where are you located?</h3>
                <p className="text-sm text-neutral-600">
                  We're located in the heart of Tallinn Old Town, easily accessible by public transport 
                  and with nearby parking options. Check our locations page for detailed directions.
                </p>
              </div>

              <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-2">What are your opening hours?</h3>
                <p className="text-sm text-neutral-600">
                  Our hours vary by day and season. Please check our locations page for current opening 
                  hours, or call us directly for the most up-to-date information.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Still Have Questions?</h2>
          <p className="text-sm text-neutral-600 mb-6">
            Can't find the answer you're looking for? Our team is here to help. Contact us directly 
            and we'll be happy to assist you.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
            >
              Contact Us
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
    </div>
  );
}
