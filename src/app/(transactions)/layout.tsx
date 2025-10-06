import { Suspense } from "react";

import { SiteFooter, SiteHeader } from "@/components/navigation/site-header";
import { SkeletonFooter, SkeletonHeader } from "@/components/navigation/skeletons";

export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 pb-24 text-neutral-900 md:pb-0">
      <Suspense fallback={<SkeletonHeader />}>
        <SiteHeader />
      </Suspense>
      <main className="flex-1 bg-neutral-50">{children}</main>
      <Suspense fallback={<SkeletonFooter />}>
        <SiteFooter />
      </Suspense>
    </div>
  );
}
