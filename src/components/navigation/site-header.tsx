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
    <footer className="border-t border-primary/15 bg-gradient-to-br from-white via-primary/5 to-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-foreground">Restoran Kiisi</p>
          <p className="text-xs text-primary/80">Seasonal cuisine from Tallinn Old Town.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-xs">
          <Link href="/privacy" className="transition hover:text-primary">
            Privacy
          </Link>
          <Link href="/terms" className="transition hover:text-primary">
            Terms
          </Link>
          <Link href="/contact" className="transition hover:text-primary">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
