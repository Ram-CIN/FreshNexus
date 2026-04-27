import Link from "next/link";

function getPageHref(page, query, category) {
  const params = new URLSearchParams();

  if (query) {
    params.set("q", query);
  }

  if (category) {
    params.set("category", category);
  }

  params.set("page", String(page));

  return `/?${params.toString()}`;
}

export default function Pagination({ page, totalPages, query, category }) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
    const start = Math.max(1, Math.min(page - 2, totalPages - 4));
    return start + index;
  });

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <Link
        href={getPageHref(Math.max(1, page - 1), query, category)}
        aria-disabled={page === 1}
        className={`rounded-lg border px-3 py-2 text-sm ${
          page === 1
            ? "pointer-events-none text-brand-body/40"
            : "text-brand-body hover:border-brand-heading hover:text-brand-heading"
        }`}
      >
        Prev
      </Link>

      {pages.map((pageNumber) => (
        <Link
          key={pageNumber}
          href={getPageHref(pageNumber, query, category)}
          className={`rounded-lg border px-3 py-2 text-sm ${
            pageNumber === page
              ? "border-brand-heading bg-brand-heading text-white"
              : "text-brand-body hover:border-brand-heading hover:text-brand-heading"
          }`}
        >
          {pageNumber}
        </Link>
      ))}

      <Link
        href={getPageHref(Math.min(totalPages, page + 1), query, category)}
        aria-disabled={page === totalPages}
        className={`rounded-lg border px-3 py-2 text-sm ${
          page === totalPages
            ? "pointer-events-none text-brand-body/40"
            : "text-brand-body hover:border-brand-heading hover:text-brand-heading"
        }`}
      >
        Next
      </Link>
    </div>
  );
}
