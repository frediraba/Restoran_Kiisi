import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Restoran Kiisi',
  description: 'Seasonal Nordic cuisine served from Tallinn Old Town.',
  openGraph: {
    title: 'Restoran Kiisi',
    description: 'Discover seasonal menus, reserve a table, or plan catering with Restoran Kiisi.',
    url: 'https://restorankiisi.ee',
    siteName: 'Restoran Kiisi',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-neutral-50 text-neutral-900">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
