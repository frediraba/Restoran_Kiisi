import { Suspense } from "react";

import { SiteFooter, SiteHeader } from "@/components/navigation/site-header";
import { SkeletonFooter, SkeletonHeader } from "@/components/navigation/skeletons";

export const runtime = "nodejs";
export const preferredRegion = "fra1";

export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white via-primary/5 to-white pb-24 text-foreground md:pb-0">
      <Suspense fallback={<SkeletonHeader />}>
        <SiteHeader />
      </Suspense>
      <main className="flex-1 bg-transparent">{children}</main>
      <Suspense fallback={<SkeletonFooter />}>
        <SiteFooter />
      </Suspense>
    </div>
  );
}
