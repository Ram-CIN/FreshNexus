import ProductGridShimmer from "@/components/ProductGridShimmer";
import SliderShimmer from "@/components/SliderShimmer";

export default function Loading() {
  return (
    <>
      <SliderShimmer />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-8 w-48 rounded shimmer mb-3" />
            <div className="h-4 w-64 rounded shimmer" />
          </div>
          <div className="h-10 w-40 rounded-lg shimmer" />
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-9 w-24 rounded-full shimmer" />
          ))}
        </div>

        <ProductGridShimmer count={18} />
      </div>
    </>
  );
}
