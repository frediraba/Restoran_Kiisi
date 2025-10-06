'use client';

import React from "react";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type NavigationLink = {
  id: string;
  label: string;
  href: string;
  type: 'PRIMARY' | 'SECONDARY' | 'MOBILE';
  icon?: string | null;
  badge?: string | null;
};

type NavigationBarProps = {
  primary: NavigationLink[];
  secondary: NavigationLink[];
  mobile: NavigationLink[];
};

export function NavigationBar({ primary, secondary, mobile }: NavigationBarProps) {
  const pathname = usePathname();

  return (
    <header className="border-b border-neutral-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-neutral-900">
          Restoran Kiisi
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {primary.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.id}
                href={link.href}
                className={
                  'text-sm font-medium transition-colors ' +
                  (isActive ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900')
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <nav aria-label="Secondary" className="hidden gap-4 text-xs text-neutral-500 lg:flex">
          {secondary.map((link) => (
            <Link key={link.id} href={link.href} className="hover:text-neutral-900">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <nav aria-label="Mobile" className="flex items-center justify-around border-t border-neutral-200 bg-white px-4 py-3 md:hidden">
        {mobile.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.id}
              href={link.href}
              className={
                'flex flex-col items-center text-xs font-medium transition-colors ' +
                (isActive ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900')
              }
            >
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
