export default function ProductGridShimmer({ count = 12 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl p-4 bg-white overflow-hidden"
        >
          <div className="mx-auto mb-3 h-[120px] w-[120px] rounded-lg shimmer" />
          <div className="h-3 w-20 rounded shimmer mb-3" />
          <div className="h-4 w-full rounded shimmer mb-2" />
          <div className="h-3 w-16 rounded shimmer mb-2" />
          <div className="h-3 w-24 rounded shimmer mb-4" />
          <div className="flex items-center justify-between">
            <div className="h-4 w-14 rounded shimmer" />
            <div className="h-8 w-14 rounded-lg shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}
