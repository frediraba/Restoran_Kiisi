"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type NavigationLink = {
  id: string;
  label: string;
  href: string;
  type: "PRIMARY" | "SECONDARY" | "MOBILE";
  icon?: string | null;
  badge?: string | null;
};

type NavigationBarProps = {
  primary: NavigationLink[];
  secondary: NavigationLink[];
  mobile: NavigationLink[];
};

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

function isActivePath(pathname: string, href: string) {
  const current = normalizePath(pathname || "/");
  const target = normalizePath(href);
  if (target === "/") {
    return current === "/";
  }
  return current === target || current.startsWith(`${target}/`);
}

export function NavigationBar({ primary, secondary, mobile }: NavigationBarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 rounded-full border border-transparent px-3 py-1 transition hover:border-border/80"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-bold uppercase tracking-tight text-primary">
            RK
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-semibold text-foreground">Restoran Kiisi</span>
            <span className="text-xs font-medium text-muted-foreground">Estonian tasting rooms</span>
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-2 md:flex">
          {primary.map((link) => {
            const active = isActivePath(pathname ?? "/", link.href);
            const emphasize = link.label.toLowerCase() === "reserve";
            return (
              <Link
                key={link.id}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  buttonClasses({
                    variant: active ? "default" : emphasize ? "default" : "ghost",
                    size: "sm",
                  }),
                  "h-10 rounded-full px-5",
                  !active && !emphasize && "text-muted-foreground",
                )}
              >
                <span>{link.label}</span>
                {link.badge ? <Badge variant="outline">{link.badge}</Badge> : null}
              </Link>
            );
          })}
        </nav>
        <nav aria-label="Secondary" className="hidden items-center gap-3 text-sm text-muted-foreground lg:flex">
          {secondary.map((link) => {
            const active = isActivePath(pathname ?? "/", link.href);
            return (
              <Link
                key={link.id}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-2 transition hover:text-foreground",
                  active && "bg-muted text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <nav
        aria-label="Mobile"
        className="flex items-center justify-around border-t border-border/60 bg-background px-2 py-3 md:hidden"
      >
        {mobile.map((link) => {
          const active = isActivePath(pathname ?? "/", link.href);
          return (
            <Link
              key={link.id}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-w-0 flex-col items-center gap-1 rounded-full px-3 py-2 text-xs font-medium transition",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span>{link.label}</span>
              {link.badge ? <span className="text-[10px] uppercase tracking-widest text-primary">{link.badge}</span> : null}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
