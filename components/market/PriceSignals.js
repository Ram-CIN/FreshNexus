import { AlertTriangle } from "lucide-react";
import { priceSignals } from "@/components/market/marketData";

const toneClass = {
  good: "bg-emerald-50 text-emerald-700 border-emerald-100",
  watch: "bg-amber-50 text-amber-800 border-amber-100",
  alert: "bg-rose-50 text-rose-700 border-rose-100",
};

export default function PriceSignals() {
  return (
    <section
      aria-labelledby="price-signals-title"
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center gap-2">
        <AlertTriangle aria-hidden="true" size={20} className="text-amber-600" />
        <h2 id="price-signals-title" className="text-lg font-bold text-slate-950">
          Price signals
        </h2>
      </div>
      <div className="mt-5 divide-y divide-slate-100">
        {priceSignals.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <span className="text-sm font-medium text-slate-700">{item.name}</span>
            <span className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${toneClass[item.tone]}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
