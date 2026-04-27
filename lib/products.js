export function createProductSlug(name) {
  return (
    name
      ?.toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "product"
  );
}

export function mapOpenFoodProduct(product, fallbackId = "product") {
  return {
    id: product.code || fallbackId,
    barcode: product.code,
    name: product.product_name || "Unnamed product",
    brand: product.brands || "Open Food Facts",
    size: product.quantity || "Quantity not listed",
    category:
      product.categories_tags?.[0]?.replace("en:", "").replaceAll("-", " ") ||
      "grocery",
    categories:
      product.categories_tags
        ?.slice(0, 8)
        .map((category) => category.replace("en:", "").replaceAll("-", " ")) ||
      [],
    nutritionGrade: product.nutrition_grades || "unknown",
    ingredients: product.ingredients_text || "Ingredients not listed",
    image: product.image_front_url || product.image_url || "/products/img-new.png",
  };
}
