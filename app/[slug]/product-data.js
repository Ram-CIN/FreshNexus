import { mapOpenFoodProduct } from "@/lib/products";

const PRODUCT_URL = "https://world.openfoodfacts.net/api/v2/product";
const SEARCH_URL = "https://world.openfoodfacts.net/cgi/search.pl";

function getHeaders() {
  return {
    Accept: "application/json",
    Authorization: `Basic ${Buffer.from("off:off").toString("base64")}`,
    "User-Agent": "FreshNexus/1.0 (contact: hello@freshnexus.local)",
  };
}

async function getProductByCode(code) {
  if (!code) {
    return null;
  }

  try {
    const response = await fetch(`${PRODUCT_URL}/${code}.json`, {
      headers: getHeaders(),
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const json = await response.json();

    return json.product ? mapOpenFoodProduct(json.product, code) : null;
  } catch {
    return null;
  }
}

async function getProductBySlug(slug) {
  try {
    const url = new URL(SEARCH_URL);
    url.searchParams.set("search_terms", slug.replaceAll("-", " "));
    url.searchParams.set("json", "1");
    url.searchParams.set("page", "1");
    url.searchParams.set("page_size", "1");
    url.searchParams.set(
      "fields",
      "code,product_name,brands,quantity,categories_tags,nutrition_grades,ingredients_text,image_front_url,image_url"
    );

    const response = await fetch(url, {
      headers: getHeaders(),
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const json = await response.json();
    const product = Array.isArray(json.products) ? json.products[0] : null;

    return product ? mapOpenFoodProduct(product, slug) : null;
  } catch {
    return null;
  }
}

export async function getProduct(params, searchParams) {
  const { slug } = await params;
  const query = await searchParams;
  const code = typeof query?.code === "string" ? query.code : "";

  return (await getProductByCode(code)) || (await getProductBySlug(slug));
}

