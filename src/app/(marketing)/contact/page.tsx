export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Contact Restoran Kiisi</h1>
        <p className="text-sm text-neutral-500">
          Reach our reservations team or events specialists. We reply within one business day.
        </p>
      </header>
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-semibold">General inquiries</h2>
          <p className="mt-2 text-sm text-neutral-500">call +372 5555 1234 or email hello@restorankiisi.ee</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Reservations</h2>
          <p className="mt-2 text-sm text-neutral-500">
            Reserve online at <a className="text-amber-600" href="/reserve">restorankiisi.ee/reserve</a> or email seats@restorankiisi.ee
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Catering & Events</h2>
          <p className="mt-2 text-sm text-neutral-500">events@restorankiisi.ee · +372 5555 9876</p>
        </div>
      </section>
      <section className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-500">
        <p>
          Looking to partner or book the whole venue? Share your event requirements and our team will prepare a proposal within 48 hours.
        </p>
      </section>
    </div>
  );
}
