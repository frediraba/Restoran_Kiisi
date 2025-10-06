import Link from "next/link";

import { getNavigation } from "@/lib/data";
import { NavigationBar } from "./navigation-bar";

export async function SiteHeader() {
  const navigation = await getNavigation();

  return (
    <NavigationBar
      primary={navigation.primary.map((link) => ({ ...link, id: link.id }))}
      secondary={navigation.secondary.map((link) => ({ ...link, id: link.id }))}
      mobile={navigation.mobile.map((link) => ({ ...link, id: link.id }))}
    />
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-neutral-900">Restoran Kiisi</p>
          <p className="text-xs">Seasonal cuisine from Tallinn Old Town.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs">
          <Link href="/privacy" className="hover:text-neutral-900">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-neutral-900">
            Terms
          </Link>
          <Link href="/contact" className="hover:text-neutral-900">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
