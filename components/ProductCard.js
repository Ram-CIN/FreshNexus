"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { createProductSlug } from "@/lib/products";

function getFallbackPrice(item) {
  const seed = `${item.id || ""}${item.name || ""}`;
  const hash = seed.split("").reduce((total, char) => total + char.charCodeAt(0), 0);

  return ((hash % 900) / 100 + 1).toFixed(2);
}

export default function ProductCard({ item }) {
  const { addToCart } = useCart();
  const href = `/${createProductSlug(item.name)}`;
  const price = item.price || getFallbackPrice(item);

  function handleAddToCart(event) {
    event.preventDefault();
    event.stopPropagation();

    addToCart({
      id: item.id || href,
      brand: item.brand,
      image: item.image,
      name: item.name,
      price,
      size: item.size,
    });
  }

  return (
    <div className="relative bg-white rounded-2xl border border-brand-body/15 p-4 hover:shadow-lg transition-all duration-300 group">
      <Link href={href} className="block">
        {/* Image */}
        <div className="relative flex justify-center mb-3">
          <Image
            src={item.image}
            alt={item.name}
            width={120}
            height={120}
            className="object-contain h-[110px] group-hover:scale-105 transition"
            unoptimized={item.image?.startsWith("http")}
          />
        </div>

        {/* Brand */}
        <div className="text-xs font-semibold text-brand-body line-clamp-1 font-roboto font-medium">
          {item.brand}
        </div>
    
        {/* Name */}
        <h3 className="mt-1 text-sm font-medium text-brand-heading line-clamp-1">
          {item.name}
        </h3>

        {/* Size */}
        <p className="text-brand-body text-xs">{item.size}</p>

        {/* Price (dummy UI like screenshot) */}
        <div className="mt-2 text-base font-semibold text-brand-heading">
          ${price}
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between mt-2 pr-12">
          <span className="text-xs text-brand-body capitalize line-clamp-1">
            {item.category.slice(0, 10)}
          </span>
        </div>
      </Link>

      {/* Floating Add Button */}
      <button
        type="button"
        onClick={handleAddToCart}
        aria-label={`Add ${item.name} to cart`}
        className="absolute bottom-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-brand-heading text-white text-lg shadow-md hover:bg-brand-body transition"
      >
        +
      </button>
    </div>
  );
}
