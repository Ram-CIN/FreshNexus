"use client";

import { BarChart3, Search, ShoppingCart, User, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { count, isCartOpen, items, removeFromCart, setIsCartOpen } = useCart();
  const [isPending, startTransition] = useTransition();
  const [term, setTerm] = useState(searchParams.get("q") || "");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setTerm(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateCatalog = useCallback(
    (nextValue, mode = "push") => {
      const params = new URLSearchParams(searchParams.toString());
      const nextTerm = nextValue.trim();

      if (nextTerm) {
        params.set("q", nextTerm);
      } else {
        params.delete("q");
      }

      params.set("page", "1");

      startTransition(() => {
        const href = `/?${params.toString()}`;

        if (mode === "replace") {
          router.replace(href);
        } else {
          router.push(href);
        }
      });
    },
    [router, searchParams]
  );

  useEffect(() => {
    const nextTerm = term.trim();

    if (nextTerm === (searchParams.get("q") || "")) {
      return;
    }

    const timer = window.setTimeout(() => {
      updateCatalog(nextTerm, "replace");
    }, 600);

    return () => window.clearTimeout(timer);
  }, [term, searchParams, updateCatalog]);

  useEffect(() => {
    const nextTerm = term.trim();

    if (nextTerm.length < 2) {
      setSuggestions([]);
      setSuggestionsLoading(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        setSuggestionsLoading(true);

        const response = await fetch(
          `/api/suggestions?q=${encodeURIComponent(nextTerm)}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          setSuggestions([]);
          return;
        }

        const json = await response.json();
        setSuggestions(Array.isArray(json.suggestions) ? json.suggestions : []);
      } catch {
        if (!controller.signal.aborted) {
          setSuggestions([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setSuggestionsLoading(false);
        }
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [term]);

  function handleSearch(event) {
    event.preventDefault();
    setShowSuggestions(false);
    updateCatalog(term);
  }

  function handleSuggestionClick(value) {
    setTerm(value);
    setShowSuggestions(false);
    updateCatalog(value);
  }

  function renderSearchInput(name) {
    return (
      <>
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-body"
          size={18}
        />
        <input
          type="search"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            window.setTimeout(() => setShowSuggestions(false), 150);
          }}
          placeholder='Search for "banana"'
          className="w-full rounded-xl border border-brand-body/30 py-2 pl-10 pr-4 text-brand-heading focus:outline-none focus:ring-2 focus:ring-brand-heading/30"
        />
        {showSuggestions && term.trim().length >= 2 ? (
          <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-xl border border-brand-body/20 bg-white shadow-lg">
            {suggestionsLoading ? (
              <div className="p-3 space-y-2">
                <div className="h-4 w-3/4 rounded shimmer" />
                <div className="h-4 w-1/2 rounded shimmer" />
                <div className="h-4 w-2/3 rounded shimmer" />
              </div>
            ) : suggestions.length > 0 ? (
              <div>
                {suggestions.map((item) => (
                  <button
                    key={`${name}-${item.name}`}
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSuggestionClick(item.name)}
                    className="block w-full px-4 py-3 text-left text-sm hover:bg-brand-body/10"
                  >
                    <span className="font-medium text-brand-heading">
                      {item.name}
                    </span>
                    {item.brand ? (
                      <span className="ml-2 text-xs text-brand-body">
                        {item.brand}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-3 text-sm text-brand-body">
                No suggestions found
              </div>
            )}
          </div>
        ) : null}
      </>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-300 ease-out ${
        isScrolled
          ? "border-brand-body/20 bg-white/95 shadow-lg shadow-brand-heading/10 backdrop-blur-xl"
          : "border-transparent bg-white/80 shadow-none backdrop-blur-md"
      }`}
    >
      {isPending ? <div className="h-1 shimmer" /> : null}

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-brand-heading">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={200} height={88} />
          </Link>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex-1 hidden md:flex justify-center"
        >
          <div className="w-full max-w-xl relative">
            {renderSearchInput("desktop")}
          </div>
        </form>

        <Link
          className="hidden h-10 items-center gap-2 rounded-lg border border-brand-body/30 px-3 text-sm font-semibold text-brand-heading transition hover:border-brand-heading hover:text-brand-body sm:inline-flex"
          href="/analytics"
        >
          <BarChart3 size={16} />
          Analytics
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Login */}
          <div className="flex flex-col items-center text-sm cursor-pointer text-brand-heading">
            <User size={20} />
            <span className="text-xs">Login</span>
          </div>

          {/* Cart */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative flex flex-col items-center text-sm cursor-pointer text-brand-heading text-white!"
              aria-expanded={isCartOpen}
              aria-label="Open cart"
            >
              <ShoppingCart className="text-[#0d756f]!" size={20} />
              <span className="text-xs">Cart</span>

              {/* Badge */}
              <span className="absolute -top-1 -right-2 min-w-4 rounded-full bg-brand-heading px-1.5 text-center text-[10px] leading-4 text-white!">
                {count}
              </span>
            </button>

            {isCartOpen ? (
              <div className="absolute right-0 top-full mt-3 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-brand-body/20 bg-white shadow-xl">
                <div className="border-b border-brand-body/10 px-4 py-3">
                  <p className="text-sm font-semibold text-brand-heading">Cart</p>
                  <p className="text-xs text-brand-body">
                    {count} {count === 1 ? "item" : "items"}
                  </p>
                </div>

                {items.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 border-b border-brand-body/10 px-4 py-3 last:border-b-0"
                      >
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-brand-body/10">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="48px"
                            className="object-contain p-1"
                            unoptimized={item.image?.startsWith("http")}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-brand-heading">
                            {item.name}
                          </p>
                          <p className="flex items-center gap-3 text-xs text-brand-body">
                            <span>
                              Qty {item.quantity} - ${item.price}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-brand-body transition hover:text-brand-heading"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 className="w-[15px]" />
                            </button>
                          </p>
                         
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center text-sm text-brand-body">
                    Your cart is empty
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <form onSubmit={handleSearch} className="md:hidden px-4 pb-3">
        <div className="relative">
          {renderSearchInput("mobile")}
        </div>
      </form>
    </header>
  );
}
