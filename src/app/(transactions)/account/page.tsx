import { cookies } from "next/headers";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <div className="relative mx-auto max-w-3xl px-6 py-16">
        <div className="pointer-events-none absolute inset-x-10 top-10 h-48 rounded-full bg-primary/15 blur-3xl" />
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
    <div className="relative mx-auto max-w-6xl space-y-10 px-6 py-12">
      <div className="pointer-events-none absolute inset-x-10 -top-12 h-64 rounded-full bg-primary/10 blur-3xl" />
      <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-white via-primary/10 to-white shadow-[0_30px_80px_rgba(255,125,0,0.18)]">
        <div className="pointer-events-none absolute -right-24 top-0 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
        <CardHeader className="relative z-10 flex flex-col gap-4 pb-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <CardTitle className="text-3xl md:text-4xl">Your Kiisi account</CardTitle>
            <CardDescription>
              Manage personal details, preferred locations, and how we keep you in the loop about special moments.
            </CardDescription>
            <p className="text-sm font-medium text-foreground">Welcome back, {greetingName}!</p>
          </div>
          <AccountSignOutButton />
        </CardHeader>
        <CardFooter className="relative z-10 grid gap-4 border-t border-primary/20 bg-primary/5 px-8 py-6 text-sm text-muted-foreground backdrop-blur md:grid-cols-3">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.24em]">Orders</p>
            <p className="text-lg font-semibold text-foreground">{recentOrders.length}</p>
            <p>Recorded moments of Kiisi at home.</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.24em]">Reservations</p>
            <p className="text-lg font-semibold text-foreground">{recentReservations.length}</p>
            <p>Dining experiences planned with us.</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.24em]">Updates</p>
            <p className="text-lg font-semibold text-foreground">
              {profile.marketingOptIn ? "Subscribed" : "Not subscribed"}
            </p>
            <p>{profile.marketingOptIn ? "You're on the list for seasonal news." : "Opt in below to hear about new menus."}</p>
          </div>
        </CardFooter>
      </Card>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <AccountForm
          profile={profile}
          locations={locations.map((location) => ({ slug: location.slug, name: location.name }))}
        />
        <div className="space-y-6">
          <Card className="border-primary/15 bg-white/95 shadow-xl shadow-primary/10">
            <CardHeader>
              <CardTitle className="text-xl">Recent orders</CardTitle>
              <CardDescription>Revisit your latest takeaway celebrations from Kiisi.</CardDescription>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-primary/20 bg-primary/5 px-6 py-10 text-center text-sm text-muted-foreground">
                  <p>No orders yet. Ready for your first takeaway feast?</p>
                </div>
              ) : (
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {recentOrders.map((order) => (
                    <li
                      key={order.id}
                      className="rounded-2xl border border-primary/15 bg-gradient-to-br from-white via-primary/5 to-white p-5 shadow-sm shadow-primary/10"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p className="text-base font-semibold text-foreground">{order.location.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.createdAt).toLocaleString()} · {order.serviceType.toLowerCase()}
                          </p>
                        </div>
                        <Badge variant="outline" className="rounded-xl border-primary/40 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                          EUR {formatCurrency(order.total)}
                        </Badge>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span>Status</span>
                        <Badge variant="subtle" className="rounded-lg px-3 py-1 capitalize">
                          {order.status.toLowerCase()}
                        </Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
          <Card className="border-primary/15 bg-white/95 shadow-xl shadow-primary/10">
            <CardHeader>
              <CardTitle className="text-xl">Reservations</CardTitle>
              <CardDescription>Track your upcoming and past dining room experiences.</CardDescription>
            </CardHeader>
            <CardContent>
              {recentReservations.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-primary/20 bg-primary/5 px-6 py-10 text-center text-sm text-muted-foreground">
                  <p>No reservations booked yet. We would love to host you soon.</p>
                </div>
              ) : (
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {recentReservations.map((reservation) => (
                    <li
                      key={reservation.id}
                      className="rounded-2xl border border-primary/15 bg-gradient-to-br from-white via-primary/5 to-white p-5 shadow-sm shadow-primary/10"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p className="text-base font-semibold text-foreground">{reservation.location.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(reservation.requestedAt).toLocaleString()} · Party of {reservation.partySize}
                          </p>
                        </div>
                        <Badge variant="outline" className="rounded-xl border-accent/40 bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
                          {reservation.status.toLowerCase()}
                        </Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
