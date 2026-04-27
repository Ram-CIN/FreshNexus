export default function StorySkeleton({ limit }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {Array.from({ length: limit }).map((_, index) => (
        <div key={index} className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="h-4 w-24 rounded shimmer" />
          <div className="mt-5 h-5 w-full rounded shimmer" />
          <div className="mt-3 h-5 w-3/4 rounded shimmer" />
          <div className="mt-6 h-4 w-32 rounded shimmer" />
        </div>
      ))}
    </div>
  );
}
