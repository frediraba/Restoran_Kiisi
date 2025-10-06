"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          aria-hidden
        />
        <div className="relative mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-4 px-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-4 rounded-full border border-transparent bg-background/40 px-3 py-1 transition hover:border-border/70 hover:bg-background/70"
          >
            <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 text-sm font-black uppercase tracking-[0.35em] text-primary-foreground shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-transform group-hover:scale-105">
              <span className="absolute inset-0 rounded-full border border-white/40 opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="relative">RK</span>
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
                    "h-10 rounded-full px-5 ring-1 ring-border/60",
                    active
                      ? "ring-2 ring-primary/30"
                      : "border-primary/50 text-primary hover:border-primary/60 hover:bg-primary/10 hover:text-primary",
                  )}
                >
                  <span>{link.label}</span>
                  {link.badge ? <Badge variant="outline">{link.badge}</Badge> : null}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Separator orientation="vertical" className="h-6" />
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
                      active ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
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
            className="relative h-10 w-10 md:hidden"
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
          <div className="border-t border-border/60 bg-background/95 shadow-lg md:hidden" role="dialog" aria-modal>
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
                        "flex items-center justify-between rounded-2xl border border-border/60 px-4 py-3 text-sm font-semibold transition",
                        active
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : emphasize
                            ? "bg-primary/10 text-primary hover:bg-primary/20"
                            : "bg-muted/40 text-foreground hover:bg-muted",
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
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Discover
                    </span>
                    <Separator className="flex-1" />
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
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                          )}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {mobile.length ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Quick links
                    </span>
                    <Separator className="flex-1" />
                  </div>
                  <div className="grid gap-2">
                    {mobile.map((link) => {
                      const active = isActivePath(pathname ?? "/", link.href);
                      return (
                        <Link
                          key={link.id}
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "rounded-2xl border border-border/50 px-4 py-3 text-sm font-medium transition",
                            active
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:border-border hover:bg-muted/40 hover:text-foreground",
                          )}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span>{link.label}</span>
                            {link.badge ? <Badge variant="outline">{link.badge}</Badge> : null}
                          </div>
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
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 pb-[env(safe-area-inset-bottom)] pb-2 pt-1 shadow-[0_-6px_18px_rgba(15,23,42,0.08)] backdrop-blur md:hidden"
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
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground",
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
                      active ? "bg-primary" : "bg-transparent",
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
