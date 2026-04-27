
import { getProduct } from "./product-data";

function getMetaDescription(product) {
  const details = [
    product.brand,
    product.size,
    product.category,
    `nutrition grade ${product.nutritionGrade.toUpperCase()}`,
  ].filter(Boolean);

  return `View ${product.name} details on FreshNexus: ${details.join(", ")}.`;
}

export async function generateMetadata({ params, searchParams }) {
  const product = await getProduct(params, searchParams);

  if (!product) {
    return {
      title: "Product Not Found | FreshNexus",
      description: "This grocery product could not be found on FreshNexus.",
    };
  }

  const title = `${product.name} | FreshNexus`;
  const description = getMetaDescription(product);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function AboutUs({ children }) {
  return (
    <>
      {children}
    </>
  );
}
