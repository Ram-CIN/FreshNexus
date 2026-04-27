export default function RateSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="grid grid-cols-[1fr_96px_92px] gap-3 border-b border-slate-200 px-4 py-3 sm:grid-cols-[1fr_140px_120px]">
        <div className="h-4 w-20 rounded shimmer" />
        <div className="h-4 w-16 rounded shimmer" />
        <div className="ml-auto h-4 w-14 rounded shimmer" />
      </div>
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-[1fr_96px_92px] items-center gap-3 border-b border-slate-100 px-4 py-4 last:border-b-0 sm:grid-cols-[1fr_140px_120px]"
        >
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full shimmer" />
            <div className="h-4 w-36 rounded shimmer" />
          </div>
          <div className="h-5 w-16 rounded-full shimmer" />
          <div className="ml-auto h-4 w-16 rounded shimmer" />
        </div>
      ))}
    </div>
  );
}
