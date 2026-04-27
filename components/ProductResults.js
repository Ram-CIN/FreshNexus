import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import { mapOpenFoodProduct } from "@/lib/products";

const SEARCH_URLS = [
  "https://world.openfoodfacts.net/cgi/search.pl",
  "https://world.openfoodfacts.org/cgi/search.pl",
];
const PAGE_SIZE = 20;

async function getProducts({ query, category, page }) {
  try {
    let json = null;

    for (const searchUrl of SEARCH_URLS) {
      const url = new URL(searchUrl);
      url.searchParams.set("search_terms", query || "grocery");
      url.searchParams.set("json", "1");
      url.searchParams.set("page", String(page));
      url.searchParams.set("page_size", String(PAGE_SIZE));
      url.searchParams.set(
        "fields",
        "code,product_name,brands,quantity,categories_tags,nutrition_grades,image_front_url,image_url"
      );

      if (category) {
        url.searchParams.set("tagtype_0", "categories");
        url.searchParams.set("tag_contains_0", "contains");
        url.searchParams.set("tag_0", category);
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Basic ${Buffer.from("off:off").toString("base64")}`,
          "User-Agent": "FreshNexus/1.0 (contact: hello@freshnexus.local)",
        },
        cache: "no-store",
      });

      if (response.ok) {
        json = await response.json();
        break;
      }
    }

    if (!json) {
      return {
        products: [],
        totalCount: 0,
        totalPages: 1,
      };
    }

    const products = Array.isArray(json.products)
      ? json.products.map(mapOpenFoodProduct)
      : [];
    const totalCount = Number(json.count) || products.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

    return {
      products,
      totalCount,
      totalPages,
    };
  } catch {
    return {
      products: [],
      totalCount: 0,
      totalPages: 1,
    };
  }
}

export default async function ProductResults({ query, category, page }) {
  const { products, totalCount, totalPages } = await getProducts({
    query,
    category,
    page,
  });

  return (
    <>
      <p className="mb-6 text-brand-body text-sm">
        {totalCount.toLocaleString()} products
        {query ? ` matching "${query}"` : ""}
        {category ? ` in ${category.replaceAll("-", " ")}` : ""}
      </p>

      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {products.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>

          <Pagination
            page={Math.min(page, totalPages)}
            totalPages={totalPages}
            query={query}
            category={category}
          />
        </>
      ) : (
        <div className="border border-dashed border-brand-body/30 rounded-xl p-6 text-center text-brand-body">
          No products found. Try another search or category.
        </div>
      )}
    </>
  );
}
