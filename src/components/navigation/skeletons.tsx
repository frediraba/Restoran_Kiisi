export function SkeletonHeader() {
  return (
    <div className="animate-pulse border-b border-neutral-200 bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="h-6 w-32 rounded bg-neutral-200" />
        <div className="hidden gap-4 md:flex">
          <div className="h-4 w-16 rounded bg-neutral-200" />
          <div className="h-4 w-20 rounded bg-neutral-200" />
          <div className="h-4 w-14 rounded bg-neutral-200" />
        </div>
        <div className="hidden gap-3 lg:flex">
          <div className="h-3 w-12 rounded bg-neutral-200" />
          <div className="h-3 w-10 rounded bg-neutral-200" />
        </div>
      </div>
      <div className="flex items-center justify-around border-t border-neutral-200 bg-white px-4 py-3 md:hidden">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="h-3 w-10 rounded bg-neutral-200" />
        ))}
      </div>
    </div>
  );
}

export function SkeletonSection() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12">
      <div className="h-8 w-48 rounded bg-neutral-200" />
      <div className="grid gap-6 md:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="space-y-4 rounded-lg border border-neutral-200 bg-white p-6">
            <div className="h-4 w-32 rounded bg-neutral-200" />
            <div className="h-3 w-full rounded bg-neutral-200" />
            <div className="h-3 w-3/4 rounded bg-neutral-200" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonFooter() {
  return (
    <div className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
        <div className="h-4 w-32 rounded bg-neutral-200" />
        <div className="flex gap-4">
          <div className="h-3 w-12 rounded bg-neutral-200" />
          <div className="h-3 w-12 rounded bg-neutral-200" />
          <div className="h-3 w-12 rounded bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}
