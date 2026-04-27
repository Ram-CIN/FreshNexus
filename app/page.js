import Link from "next/link";
import { Suspense } from "react";
import ProductGridShimmer from "@/components/ProductGridShimmer";
import ProductResults from "@/components/ProductResults";
import Slider from "@/components/Slider";
import SliderShimmer from "@/components/SliderShimmer";


export const dynamic = "force-dynamic";

const CATEGORIES = [
  { label: "All", value: "" },
  { label: "Beverages", value: "beverages" },
  { label: "Snacks", value: "snacks" },
  { label: "Dairy", value: "dairies" },
  { label: "Breakfast", value: "breakfasts" },
  { label: "Fruits", value: "fruits" },
  { label: "Chocolate", value: "chocolates" },
];

function toPositivePage(value) {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function getCategoryHref(query, category) {
  const params = new URLSearchParams();

  if (query) {
    params.set("q", query);
  }

  if (category) {
    params.set("category", category);
  }

  params.set("page", "1");

  return `/?${params.toString()}`;
}

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const query = typeof params?.q === "string" ? params.q.trim() : "";
  const category =
    typeof params?.category === "string" ? params.category.trim() : "";
  const page = toPositivePage(params?.page);
  const resultsKey = `${query}-${category}-${page}`;

  return (

    <>
<Suspense fallback={<SliderShimmer />}>
  <Slider />
</Suspense>
 <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-roboto font-medium text-brand-heading">Grocery Catalog</h1>
        </div>
      </div>

     <div className="mb-6 flex flex-wrap gap-3">
        {CATEGORIES.map((item) => {
          const isActive = item.value === category;

          return (
            <Link
              key={item.label}
              href={getCategoryHref(query, item.value)}
              className={`px-5 py-2.5 text-sm font-medium rounded-full border transition-all duration-200 shadow-sm
              ${
                isActive
                  ? "bg-brand-heading text-white border-brand-heading shadow-md"
                  : "bg-white text-brand-body border-brand-body/25 hover:border-brand-heading hover:text-brand-heading hover:shadow"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>  

      <Suspense
        key={resultsKey}
        fallback={
          <>
            <div className="mb-6 h-4 w-64 rounded shimmer" />
            <ProductGridShimmer count={20} />
          </>
        }
      >
        <ProductResults query={query} category={category} page={page} />
      </Suspense>
    </div>
    </>
   
  );
}
