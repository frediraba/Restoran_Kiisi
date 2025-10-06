import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account · Restoran Kiisi",
  description: "Manage your Restoran Kiisi profile, preferences, and reservations.",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
