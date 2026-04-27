"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRightLeft,
  Calculator,
  RefreshCcw,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import RateSkeleton from "@/components/currency/RateSkeleton";

const API_BASE = "https://api.frankfurter.dev/v2";
const PRIMARY_QUOTES = ["INR", "EUR", "GBP", "CAD", "SEK", "NOK", "DKK"];
const POPULAR_CURRENCIES = [
  { code: "EUR", name: "Euro", accent: "bg-blue-600" },
  { code: "USD", name: "American dollar", accent: "bg-sky-700" },
  { code: "GBP", name: "British Pound", accent: "bg-indigo-700" },
  { code: "CAD", name: "Canadian dollar", accent: "bg-rose-600" },
  { code: "SEK", name: "Swedish kroner", accent: "bg-blue-500" },
  { code: "NOK", name: "Norwegian kroner", accent: "bg-red-600" },
  { code: "DKK", name: "Danish kroner", accent: "bg-red-500" },
];
const CONVERT_FROM = ["USD", "EUR", "GBP", "INR"];
const CONVERT_TO = ["INR", "USD", "EUR", "GBP"];

function formatNumber(value, options = {}) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "--";
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4,
    ...options,
  }).format(Number(value));
}

function getRatesDate(payload) {
  if (Array.isArray(payload)) {
    return payload[0]?.date;
  }

  return payload?.date;
}

function getFriendlyDate(value) {
  if (!value) {
    return "Latest available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Latest available";
  }

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getPreviousDateString(value) {
  const sourceDate = value ? new Date(value) : new Date();

  if (Number.isNaN(sourceDate.getTime())) {
    sourceDate.setTime(Date.now());
  }

  sourceDate.setDate(sourceDate.getDate() - 7);
  return sourceDate.toISOString().slice(0, 10);
}

function findRate(payload, currency) {
  if (!payload) {
    return null;
  }

  if (currency === "USD") {
    return 1;
  }

  if (Array.isArray(payload)) {
    const item = payload.find((rate) => rate.quote === currency);
    return typeof item?.rate === "number" ? item.rate : null;
  }

  const mappedRate = payload.rates?.[currency];

  if (typeof mappedRate === "number") {
    return mappedRate;
  }

  if (payload.quote === currency && typeof payload.rate === "number") {
    return payload.rate;
  }

  if (typeof payload.rate === "number") {
    return payload.rate;
  }

  return null;
}

export default function CurrencyExchangePanel() {
  const [ratesData, setRatesData] = useState(null);
  const [previousData, setPreviousData] = useState(null);
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [converted, setConverted] = useState(null);
  const [loading, setLoading] = useState(true);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState("");

  async function loadRates(signal) {
    setLoading(true);
    setError("");

    try {
      const quotes = PRIMARY_QUOTES.join(",");
      const latestUrl = `${API_BASE}/rates?base=USD&quotes=${quotes}`;
      const latestResponse = await fetch(latestUrl, { signal });

      if (!latestResponse.ok) {
        throw new Error("Unable to load latest exchange rates.");
      }

      const latest = await latestResponse.json();
      const previousDateString = getPreviousDateString(getRatesDate(latest));
      const previousUrl = `${API_BASE}/rates?date=${previousDateString}&base=USD&quotes=${quotes}`;
      const previousResponse = await fetch(previousUrl, { signal });
      const previous = previousResponse.ok ? await previousResponse.json() : null;

      setRatesData(latest);
      setPreviousData(previous);
    } catch (caughtError) {
      if (!signal.aborted) {
        setError(caughtError.message || "Exchange rates are unavailable.");
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    loadRates(controller.signal);

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function convertCurrency() {
      const numericAmount = Number(amount);

      if (!numericAmount || numericAmount <= 0 || fromCurrency === toCurrency) {
        setConverted(fromCurrency === toCurrency ? numericAmount : null);
        return;
      }

      setConverting(true);

      try {
        const url = `${API_BASE}/rate/${fromCurrency}/${toCurrency}`;
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error("Conversion failed.");
        }

        const json = await response.json();
        const unitRate = findRate(json, toCurrency);
        setConverted(unitRate ? unitRate * numericAmount : null);
      } catch {
        if (!controller.signal.aborted) {
          setConverted(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setConverting(false);
        }
      }
    }

    const timer = window.setTimeout(convertCurrency, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [amount, fromCurrency, toCurrency]);

  const rateCards = useMemo(() => {
    if (!ratesData) {
      return [];
    }

    return POPULAR_CURRENCIES.map((currency) => {
      const value = findRate(ratesData, currency.code);
      const previous = findRate(previousData, currency.code);
      const movement =
        value && previous ? ((value - previous) / previous) * 100 : null;

      return {
        ...currency,
        value,
        movement,
      };
    });
  }, [previousData, ratesData]);

  const primaryInrRate = findRate(ratesData, "INR");
  const ratesDate = getRatesDate(ratesData);

  return (
    <section
      aria-labelledby="currency-exchange-title"
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
        <div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-emerald-700">
                Live currency exchange
              </p>
              <h2
                id="currency-exchange-title"
                className="mt-2 text-2xl font-bold tracking-normal text-slate-950"
              >
                USD-based rates for grocery import planning
              </h2>
             
            </div>

            <button
              type="button"
              onClick={() => {
                const controller = new AbortController();
                loadRates(controller.signal);
              }}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-700"
            >
              <RefreshCcw aria-hidden="true" size={16} />
              Refresh
            </button>
          </div>

          <div className="mt-6 rounded-lg border border-emerald-100 bg-emerald-50 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-800">
                  1 USD to INR
                </p>
                <p className="mt-2 text-4xl font-bold text-slate-950 sm:text-5xl">
                  {loading ? "--" : formatNumber(primaryInrRate)}
                </p>
              </div>
              <div className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                {getFriendlyDate(ratesDate)}
              </div>
            </div>
          </div>

          <div className="mt-5">
            {error ? (
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
                {error}
              </div>
            ) : loading ? (
              <RateSkeleton />
            ) : (
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                <div className="grid grid-cols-[1fr_96px_92px] gap-3 border-b border-slate-200 px-4 py-3 text-sm font-bold text-slate-950 sm:grid-cols-[1fr_140px_120px]">
                  <span>Currency</span>
                  <span>
                    Change <span className="ml-1 text-[10px] font-bold text-rose-600">LIVE*</span>
                  </span>
                  <span className="text-right">Rate</span>
                </div>
                {rateCards.map((rate) => {
                  const isUp = rate.movement === null || rate.movement >= 0;
                  const Icon = isUp ? TrendingUp : TrendingDown;

                  return (
                    <div
                      key={rate.code}
                      className="grid grid-cols-[1fr_96px_92px] items-center gap-3 border-b border-slate-100 px-4 py-4 last:border-b-0 sm:grid-cols-[1fr_140px_120px]"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white! shadow-sm ${rate.accent}`}
                          aria-hidden="true"
                        >
                          {rate.code}
                        </span>
                        <p className="truncate text-sm font-semibold text-white! sm:text-base">
                          {rate.code} - {rate.name}
                        </p>
                      </div>

                      <div
                        className={`inline-flex w-fit items-center gap-1 rounded-full text-sm font-semibold ${
                          isUp ? "text-emerald-700" : "text-rose-600"
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full text-white! ${
                            isUp ? "bg-emerald-600" : "bg-rose-500"
                          }`}
                        >
                          <Icon aria-hidden="true" size={12} />
                        </span>
                        <span>
                          {rate.movement === null
                            ? "Live"
                            : `${isUp ? "+" : "-"}${formatNumber(
                                Math.abs(rate.movement),
                                { maximumFractionDigits: 2 }
                              )}%`}
                        </span>
                      </div>

                      <p className="text-right text-sm font-semibold text-slate-950 sm:text-base">
                        {formatNumber(rate.value)}
                      </p>
                    </div>
                  );
                })}
                <p className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
                  Change compares the latest available rate with the rate from 7 days earlier.
                </p>
              </div>
            )}
          </div>
        </div>

        <aside className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-2">
            <Calculator aria-hidden="true" size={20} className="text-emerald-700" />
            <h3 className="text-lg font-bold text-slate-950">Quick converter</h3>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Use this for supplier quotes, import invoices, or category margin
            checks.
          </p>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Amount</span>
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-base font-semibold text-slate-950 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
              />
            </label>

            <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">From</span>
                <select
                  value={fromCurrency}
                  onChange={(event) => setFromCurrency(event.target.value)}
                  className="mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-950 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                >
                  {CONVERT_FROM.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </label>
              <ArrowRightLeft
                aria-hidden="true"
                className="mb-3 text-slate-400"
                size={18}
              />
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">To</span>
                <select
                  value={toCurrency}
                  onChange={(event) => setToCurrency(event.target.value)}
                  className="mt-2 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-950 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                >
                  {CONVERT_TO.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-sm font-medium text-slate-500">Converted value</p>
              <p className="mt-2 text-3xl font-bold text-slate-950" aria-live="polite">
                {converting ? "Updating..." : `${formatNumber(converted)} ${toCurrency}`}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
