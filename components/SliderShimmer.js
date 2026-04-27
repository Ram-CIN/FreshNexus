export default function SliderShimmer() {
  return (
    <section className="w-full py-6 mt-15">
      <div className="flex gap-[18px] overflow-hidden px-4 sm:gap-5 md:gap-[22px] lg:gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-[170px] min-w-[90%] shimmer sm:h-[210px] sm:min-w-[64%] md:h-[290px] md:min-w-[46%] lg:min-w-[40%]"
          />
        ))}
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-2 w-2 rounded-full shimmer" />
        ))}
      </div>
    </section>
  );
}
