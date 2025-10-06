export default function CareersPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-neutral-900">Careers</h1>
        <p className="text-sm text-neutral-500">
          Join our passionate team and help us create exceptional dining experiences in Tallinn.
        </p>
      </header>

      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Why Work at Restoran Kiisi?</h2>
          <p className="text-sm text-neutral-600">
            At Restoran Kiisi, we believe that great food comes from great people. We're looking for 
            passionate individuals who share our commitment to excellence, creativity, and authentic 
            Estonian cuisine.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900">Kitchen Positions</h3>
            <div className="space-y-3">
              <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
                <h4 className="font-semibold text-neutral-900">Sous Chef</h4>
                <p className="text-sm text-neutral-600 mt-1">Lead our kitchen team in creating innovative seasonal dishes</p>
                <p className="text-xs text-neutral-500 mt-2">Full-time • Tallinn Old Town</p>
              </div>
              <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
                <h4 className="font-semibold text-neutral-900">Line Cook</h4>
                <p className="text-sm text-neutral-600 mt-1">Prepare and plate dishes in our fast-paced kitchen environment</p>
                <p className="text-xs text-neutral-500 mt-2">Full-time • Tallinn Old Town</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900">Front of House</h3>
            <div className="space-y-3">
              <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
                <h4 className="font-semibold text-neutral-900">Server</h4>
                <p className="text-sm text-neutral-600 mt-1">Provide exceptional service and create memorable dining experiences</p>
                <p className="text-xs text-neutral-500 mt-2">Part-time/Full-time • Tallinn Old Town</p>
              </div>
              <div className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
                <h4 className="font-semibold text-neutral-900">Host/Hostess</h4>
                <p className="text-sm text-neutral-600 mt-1">Welcome guests and manage reservations in our warm atmosphere</p>
                <p className="text-xs text-neutral-500 mt-2">Part-time • Tallinn Old Town</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">Benefits & Perks</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>• Competitive salary and tips</li>
              <li>• Flexible scheduling</li>
              <li>• Staff meals and discounts</li>
              <li>• Professional development opportunities</li>
            </ul>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>• Collaborative team environment</li>
              <li>• Opportunities for growth</li>
              <li>• Health and wellness benefits</li>
              <li>• Employee recognition programs</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Apply Today</h2>
          <p className="text-sm text-neutral-600 mb-6">
            Ready to join our team? Send us your resume and cover letter, or stop by the restaurant 
            to speak with our manager about current opportunities.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
            >
              Apply Online
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
