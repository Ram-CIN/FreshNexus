import ShimmerBox from "@/components/product-detail/ShimmerBox";

export default function ProductDetailLoading() {
  return (
    <div className="bg-white text-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-5">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <ShimmerBox className="h-4 w-16 rounded" />
            <ShimmerBox className="h-4 w-28 rounded" />
            <ShimmerBox className="h-4 w-36 rounded" />
            <ShimmerBox className="h-4 w-44 rounded" />
          </div>
          <ShimmerBox className="h-8 w-28 rounded-full" />
        </div>

        <div className="grid gap-6 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.95fr)]">
          <section className="grid gap-3 sm:grid-cols-[84px_1fr]">
            <div className="flex gap-3 overflow-x-auto sm:flex-col sm:overflow-visible">
              {Array.from({ length: 5 }).map((_, index) => (
                <ShimmerBox key={index} className="h-20 w-20 shrink-0 rounded-md" />
              ))}
            </div>

            <ShimmerBox className="min-h-[420px] rounded-md border border-slate-200" />
          </section>

          <section>
            <div className="flex items-start justify-between gap-4">
              <div className="w-full">
                <ShimmerBox className="h-4 w-24 rounded" />
                <ShimmerBox className="mt-3 h-8 w-4/5 rounded" />
                <ShimmerBox className="mt-3 h-8 w-3/5 rounded" />
              </div>
              <ShimmerBox className="h-8 w-20 rounded-full" />
            </div>

            <div className="mt-5 space-y-2">
              <ShimmerBox className="h-4 w-20 rounded" />
              <ShimmerBox className="h-8 w-44 rounded" />
              <ShimmerBox className="h-4 w-56 rounded" />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <ShimmerBox className="h-14 flex-1 rounded-md" />
              <ShimmerBox className="h-14 flex-1 rounded-md" />
            </div>

            <div className="mt-8">
              <ShimmerBox className="h-5 w-32 rounded" />
              <div className="mt-3 space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <ShimmerBox key={index} className="h-[74px] rounded-md" />
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="grid gap-6 border-t border-dashed border-slate-200 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.95fr)]">
          <section>
            <ShimmerBox className="h-6 w-28 rounded" />
            <div className="mt-3 flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <ShimmerBox key={index} className="h-9 w-36 rounded-full" />
              ))}
            </div>
          </section>
          <section>
            <ShimmerBox className="h-6 w-28 rounded" />
            <ShimmerBox className="mt-3 h-32 rounded-md" />
          </section>
        </div>
      </div>
    </div>
  );
}
