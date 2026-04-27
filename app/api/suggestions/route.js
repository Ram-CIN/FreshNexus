import { NextResponse } from "next/server";

const SUGGEST_URL = "https://world.openfoodfacts.net/cgi/search.pl";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const url = new URL(SUGGEST_URL);
    url.searchParams.set("search_terms", query);
    url.searchParams.set("json", "1");
    url.searchParams.set("page", "1");
    url.searchParams.set("page_size", "6");
    url.searchParams.set("fields", "product_name,brands");

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${Buffer.from("off:off").toString("base64")}`,
        "User-Agent": "FreshNexus/1.0 (contact: hello@freshnexus.local)",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ suggestions: [] });
    }

    const json = await response.json();
    const suggestions = Array.isArray(json.products)
      ? json.products
          .map((product) => ({
            name: product.product_name?.trim(),
            brand: product.brands?.split(",")[0]?.trim(),
          }))
          .filter((product) => product.name)
          .filter(
            (product, index, list) =>
              list.findIndex((item) => item.name === product.name) === index
          )
      : [];

    return NextResponse.json({ suggestions });
  } catch {
    return NextResponse.json({ suggestions: [] });
  }
}
