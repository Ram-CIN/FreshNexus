import { Clock3 } from "lucide-react";
import CurrencyExchangePanel from "@/components/CurrencyExchangePanel";
import MetricCard from "@/components/market/MetricCard";
import PriceSignals from "@/components/market/PriceSignals";
import RegionalTable from "@/components/market/RegionalTable";
import TopStoriesPanel from "@/components/TopStoriesPanel";
import { stats } from "@/components/market/marketData";

export default function MarketInsightsDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 mt-30  md:mt-20">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:px-6">
        <header className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700">
            <Clock3 aria-hidden="true" size={15} />
            Updated every few minutes
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
            Market Insights Dashboard
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Monitor grocery demand, pricing pressure, inventory health, and category movement from one fast, readable analytics view.
          </p>
        </header>

        <section aria-label="Market summary" className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <MetricCard key={item.label} item={item} />
          ))}
        </section>

        <div className="mt-6">
          <CurrencyExchangePanel />
        </div>

        <div className="mt-6">
          <TopStoriesPanel />
        </div>

        <div className="mt-6">
          <RegionalTable />
        </div>

      </div>
    </div>
  );
}
