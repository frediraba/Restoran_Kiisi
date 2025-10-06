"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonClasses } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const emblemGradientId = useId();
  const accentGradientId = useId();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-primary/10 bg-white/90 shadow-[0_8px_24px_rgba(255,125,0,0.08)] backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          aria-hidden
        />
        <div className="relative mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-4 px-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-4 rounded-full border border-primary/10 bg-white/70 px-3 py-1 shadow-[0_6px_20px_rgba(255,125,0,0.12)] transition hover:border-primary/20 hover:bg-white"
          >
            <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary via-amber-500 to-orange-600 shadow-[0_4px_16px_rgba(255,125,0,0.3)] transition-transform group-hover:scale-105">
              <span className="absolute inset-0 rounded-full border border-white/40 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="absolute inset-[2px] rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.7),rgba(255,255,255,0)_55%)]" />
              <span className="absolute inset-[1px] rounded-full border border-white/30 opacity-80" aria-hidden />
              <svg
                aria-hidden
                viewBox="0 0 64 64"
                className="relative h-7 w-7 drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]"
              >
                <defs>
                  <linearGradient id={emblemGradientId} x1="16" y1="12" x2="58" y2="54" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#fff6e8" />
                    <stop offset="0.45" stopColor="#ffe4c7" />
                    <stop offset="1" stopColor="#ffd19b" />
                  </linearGradient>
                  <linearGradient id={accentGradientId} x1="22" y1="16" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
                    <stop offset="0.35" stopColor="#fff7e8" stopOpacity="0.6" />
                    <stop offset="1" stopColor="#ffd4a1" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <path
                  d="M18 16h12.5c9.5 0 14.5 5 14.5 11.8 0 7-4.8 12-13.6 12h-2.5l15.8 19.2h-7.4L24.5 39.7V54H18V16Zm12.4 18.9h2.3c5.1 0 8-2.7 8-7 0-4.2-2.9-6.6-7.9-6.6h-2.4v13.6Z"
                  fill={`url(#${emblemGradientId})`}
                />
                <path
                  d="M41.5 16h6V29l9.5-13h7.4L52.8 33l12.4 21h-7.2l-8.5-14.8V54h-6V16Z"
                  fill={`url(#${accentGradientId})`}
                />
              </svg>
            </span>
            <span className="flex flex-col items-center justify-center text-center leading-tight">
              <span className="text-base font-semibold text-foreground transition-colors group-hover:text-primary">Restoran Kiisi</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {primary.map((link) => {
              const active = isActivePath(pathname ?? "/", link.href);
              const variant = active ? "default" : "outline";

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    buttonClasses({
                      variant,
                      size: "sm",
                    }),
                    "h-10 rounded-full px-5 shadow-sm",
                    active
                      ? "shadow-[0_12px_30px_rgba(255,125,0,0.28)]"
                      : "border border-primary/40 bg-white/80 text-primary hover:border-primary/60 hover:bg-primary/10",
                  )}
                >
                  <span>{link.label}</span>
                  {link.badge ? <Badge variant="outline">{link.badge}</Badge> : null}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Separator orientation="vertical" className="h-6 bg-primary/20" />
            <nav aria-label="Secondary" className="flex items-center gap-2 text-xs">
              {secondary.map((link) => {
                const active = isActivePath(pathname ?? "/", link.href);
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-2.5 py-1.5 transition",
                      active
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-2xl border border-primary/20 bg-white/80 text-primary shadow-sm md:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span className="sr-only">Toggle navigation</span>
            <span
              className={cn(
                "absolute h-0.5 w-6 rounded-full bg-foreground transition-all",
                mobileOpen ? "translate-y-0 rotate-45" : "-translate-y-2",
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-6 rounded-full bg-foreground transition-all",
                mobileOpen ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-6 rounded-full bg-foreground transition-all",
                mobileOpen ? "translate-y-0 -rotate-45" : "translate-y-2",
              )}
            />
          </Button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-primary/15 bg-white/95 shadow-[0_20px_40px_rgba(255,125,0,0.12)] md:hidden" role="dialog" aria-modal>
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-6">
              <div className="grid gap-2">
                {primary.map((link) => {
                  const active = isActivePath(pathname ?? "/", link.href);
                  const emphasize = link.label.toLowerCase() === "reserve";
                  return (
                    <Link
                      key={link.id}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm font-semibold transition",
                        active
                          ? "bg-primary text-primary-foreground shadow-[0_12px_30px_rgba(255,125,0,0.24)]"
                          : emphasize
                            ? "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
                            : "border-primary/10 bg-white/70 text-foreground hover:border-primary/30 hover:bg-primary/10",
                      )}
                    >
                      <span>{link.label}</span>
                      {link.badge ? <Badge>{link.badge}</Badge> : null}
                    </Link>
                  );
                })}
              </div>

              {secondary.length ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary/70">
                      Discover
                    </span>
                    <Separator className="flex-1 bg-primary/20" />
                  </div>
                  <div className="grid gap-2">
                    {secondary.map((link) => {
                      const active = isActivePath(pathname ?? "/", link.href);
                      return (
                        <Link
                          key={link.id}
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "rounded-2xl px-4 py-3 text-sm font-medium transition",
                            active
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                          )}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : null}

            </div>
          </div>
        ) : null}
      </header>

      {mobile.length ? (
        <nav
          aria-label="Mobile navigation"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/20 bg-white/95 pb-[env(safe-area-inset-bottom)] pb-2 pt-1 shadow-[0_-8px_24px_rgba(255,125,0,0.12)] backdrop-blur md:hidden"
        >
          <div className="mx-auto flex max-w-6xl items-stretch justify-between px-2 py-1">
            {mobile.map((link) => {
              const active = isActivePath(pathname ?? "/", link.href);
              return (
                <Link
                  key={`mobile-tab-${link.id}`}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex flex-1 flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs font-medium transition",
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-primary",
                  )}
                >
                  <span>{link.label}</span>
                  {link.badge ? (
                    <Badge variant="outline" className="text-[10px]">
                      {link.badge}
                    </Badge>
                  ) : null}
                  <span
                    className={cn(
                      "mt-1 h-1 w-8 rounded-full transition",
                      active ? "bg-primary" : "bg-primary/10",
                    )}
                    aria-hidden
                  />
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </>
  );
}
