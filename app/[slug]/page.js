import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  Check,
  ChevronRight,
  Home,
  ImageIcon,
  Leaf,
  Package,
  Share2,
  ShoppingBasket,
  Tag,
  Zap,
} from "lucide-react";
import DetailRow from "@/components/product-detail/DetailRow";
import ProductThumbnail from "@/components/product-detail/ProductThumbnail";
import { getProduct } from "./product-data";

export const dynamic = "force-dynamic";

function formatLabel(value) {
  return value
    ? value.replace(/\s+/g, " ").trim()
    : "Not listed";
}

export default async function ProductDetail({ params, searchParams }) {
  const product = await getProduct(params, searchParams);

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/" className="text-sm font-medium text-purple-600">
          Back to catalog
        </Link>
        <div className="mt-6 rounded-xl border border-dashed p-8 text-center text-gray-500">
          Product details were not found.
        </div>
      </div>
    );
  }

  const nutritionGrade = product.nutritionGrade?.toUpperCase();
  const primaryCategory = product.categories[0] || product.category;
  const highlights = [
    product.brand,
    product.size,
    nutritionGrade ? `Nutrition grade ${nutritionGrade}` : null,
    primaryCategory,
  ].filter(Boolean);

  return (
    <div className="bg-white text-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-5">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-slate-600"
          >
            <Link href="/" className="inline-flex items-center gap-1 hover:text-lime-700">
              <Home aria-hidden="true" size={15} />
              Home
            </Link>
            <ChevronRight aria-hidden="true" size={14} className="text-slate-400" />
            <span>{formatLabel(primaryCategory)}</span>
            <ChevronRight aria-hidden="true" size={14} className="text-slate-400" />
            <span>{formatLabel(product.brand)}</span>
            <ChevronRight aria-hidden="true" size={14} className="text-slate-400" />
            <span className="font-semibold text-slate-950">{product.name}</span>
          </nav>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Share on</span>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700">
              <Share2 aria-hidden="true" size={16} />
            </button>
          </div>
        </div>

        <div className="grid gap-6 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.95fr)]">
          <section className="grid gap-3 sm:grid-cols-[84px_1fr]">
            <div className="flex gap-3 overflow-x-auto sm:flex-col sm:overflow-visible">
              <ProductThumbnail active>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                  unoptimized={product.image?.startsWith("http")}
                />
              </ProductThumbnail>
              <ProductThumbnail>
                <Leaf aria-hidden="true" className="text-lime-700" size={28} />
              </ProductThumbnail>
              <ProductThumbnail>
                <Tag aria-hidden="true" className="text-slate-600" size={28} />
              </ProductThumbnail>
              <ProductThumbnail>
                <Package aria-hidden="true" className="text-slate-600" size={28} />
              </ProductThumbnail>
              <ProductThumbnail>
                <ImageIcon aria-hidden="true" className="text-slate-500" size={28} />
              </ProductThumbnail>
            </div>

            <div className="flex min-h-[420px] items-center justify-center rounded-md border border-slate-200 bg-white p-6">
              <Image
                src={product.image}
                alt={product.name}
                width={560}
                height={560}
                className="max-h-[560px] w-full object-contain"
                unoptimized={product.image?.startsWith("http")}
                priority
              />
            </div>
          </section>

          <section>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-500 underline decoration-slate-300 underline-offset-4">
                  {product.brand}
                </p>
                <h1 className="mt-2 text-2xl font-bold leading-tight text-slate-950 md:text-3xl">
                  {product.name}
                </h1>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-lime-50 px-3 py-1.5 text-xs font-bold text-lime-700">
                <Zap aria-hidden="true" size={13} />
                LIVE
              </span>
            </div>

            <div className="mt-4 space-y-1">
              <p className="text-sm text-slate-500">Quantity</p>
              <p className="text-2xl font-bold text-slate-950">{product.size}</p>
              <p className="text-sm text-lime-700">Open Food Facts verified data</p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-md bg-red-600 px-5 text-base font-bold text-white transition hover:bg-red-700">
                <ShoppingBasket aria-hidden="true" size={19} />
                Add to basket
              </button>
              <button className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 text-base font-semibold text-slate-800 transition hover:border-slate-500">
                <Bookmark aria-hidden="true" size={19} />
                Save for later
              </button>
            </div>

            <div className="mt-8">
              <h2 className="text-base font-bold text-slate-950">Product options</h2>
              <div className="mt-3 space-y-3">
                <DetailRow
                  active
                  label={product.size}
                  value="Selected"
                  detail="Current pack size"
                  icon={Package}
                />
                <DetailRow
                  label="Nutri grade"
                  value={nutritionGrade || "N/A"}
                  detail="Nutrition rating from API"
                  icon={Leaf}
                />
                <DetailRow
                  label="Barcode"
                  value={product.barcode || "N/A"}
                  detail="Product identifier"
                  icon={Tag}
                />
                <DetailRow
                  label="Category"
                  value={formatLabel(primaryCategory)}
                  detail="Primary grocery category"
                  icon={Check}
                />
              </div>
            </div>
          </section>
        </div>

        <div className="grid gap-6 border-t border-dashed border-slate-200 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.95fr)]">
          <section>
            <h2 className="text-lg font-bold text-slate-950">Highlights</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium capitalize text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950">Ingredients</h2>
            <p className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
              {product.ingredients}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
