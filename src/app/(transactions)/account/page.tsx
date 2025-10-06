import { cookies } from "next/headers";

import { auth } from "@/lib/auth";
import { getLocations } from "@/lib/data";
import { prisma } from "@/lib/prisma-client";

import { AccountForm } from "./account-form";
import { AccountSignInForm } from "./sign-in-form";
import { AccountSignOutButton } from "./sign-out-button";

function formatCurrency(value: unknown) {
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    if (!Number.isNaN(parsed)) {
      return parsed.toFixed(2);
    }
  }
  if (value && typeof value === "object" && "toNumber" in value && typeof value.toNumber === "function") {
    return value.toNumber().toFixed(2);
  }
  return "0.00";
}

export default async function AccountPage() {
  const session = await auth();
  const cookieStore = await cookies();
  const cookieEmail = cookieStore.get("kiisi-session")?.value;
  const authenticatedEmail = session?.user?.email ?? cookieEmail;

  if (!authenticatedEmail) {
    return (
      <div className="mx-auto max-w-md space-y-6 px-6 py-12">
        <header className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900">Sign in to Kiisi</h1>
          <p className="text-sm text-neutral-500">Access your reservations, preferences, and order history.</p>
        </header>
        <AccountSignInForm />
      </div>
    );
  }

  const email = authenticatedEmail.toLowerCase();
  const locations = await getLocations();
  let profile = await prisma.guestProfile.findUnique({
    where: { email },
  });

  if (!profile) {
    profile = await prisma.guestProfile.create({
      data: {
        email,
        passwordHash: "",
        marketingOptIn: false,
      },
    });
  }

  const greetingName = profile.firstName ?? session?.user?.name ?? email;

  const [recentOrders, recentReservations] = await Promise.all([
    prisma.orderSession.findMany({
      where: { guestProfileId: profile.id },
      include: { location: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.reservationRequest.findMany({
      where: { guestProfileId: profile.id },
      include: { location: true },
      orderBy: { requestedAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-6 py-12">
      <header className="space-y-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-neutral-900">Your account</h1>
            <p className="text-sm text-neutral-500">
              Manage personal details, preferred location, and contact preferences.
            </p>
            <p className="text-sm font-medium text-neutral-900">Welcome back, {greetingName}!</p>
          </div>
          <AccountSignOutButton />
        </div>
      </header>
      <AccountForm
        profile={profile}
        locations={locations.map((location) => ({ slug: location.slug, name: location.name }))}
      />
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900">Recent orders</h2>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-neutral-500">No orders yet. Ready for your first takeaway?</p>
        ) : (
          <ul className="space-y-3 text-sm text-neutral-600">
            {recentOrders.map((order) => (
              <li key={order.id} className="rounded-lg border border-neutral-200 bg-white px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-neutral-900">{order.location.name}</p>
                    <p className="text-xs text-neutral-500">
                      {new Date(order.createdAt).toLocaleString()} - {order.serviceType.toLowerCase()}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-neutral-900">
                    EUR {formatCurrency(order.total)}
                  </p>
                </div>
                <p className="mt-2 text-xs uppercase tracking-wide text-neutral-500">
                  Status: {order.status.toLowerCase()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900">Reservations</h2>
        {recentReservations.length === 0 ? (
          <p className="text-sm text-neutral-500">No reservations booked yet.</p>
        ) : (
          <ul className="space-y-3 text-sm text-neutral-600">
            {recentReservations.map((reservation) => (
              <li key={reservation.id} className="rounded-lg border border-neutral-200 bg-white px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-neutral-900">{reservation.location.name}</p>
                    <p className="text-xs text-neutral-500">
                      {new Date(reservation.requestedAt).toLocaleString()} - Party of {reservation.partySize}
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-wide text-neutral-500">
                    {reservation.status.toLowerCase()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
