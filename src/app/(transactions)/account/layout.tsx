import type { Metadata } from "next";

import TransactionsLayout from "@/app/(transactions)/layout";

export const metadata: Metadata = {
  title: "Account · Restoran Kiisi",
  description: "Manage your Restoran Kiisi profile, preferences, and reservations.",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TransactionsLayout>{children}</TransactionsLayout>;
}
