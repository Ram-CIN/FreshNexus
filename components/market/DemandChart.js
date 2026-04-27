import { BarChart3 } from "lucide-react";
import { categoryDemand } from "@/components/market/marketData";

export default function DemandChart() {
  return (
    <section
      aria-labelledby="category-demand-title"
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 id="category-demand-title" className="text-lg font-bold text-slate-950">
            Category demand
          </h2>
          <p className="mt-1 text-sm text-slate-500">Indexed against the current week.</p>
        </div>
        <BarChart3 aria-hidden="true" className="text-emerald-700" size={22} />
      </div>

      <div className="mt-6 space-y-5">
        {categoryDemand.map((item) => (
          <div key={item.name}>
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="font-medium text-slate-700">{item.name}</span>
              <span className="font-semibold text-slate-950">
                {item.value} <span className="text-slate-400">({item.change})</span>
              </span>
            </div>
            <div
              className="h-3 overflow-hidden rounded-full bg-slate-100"
              role="img"
              aria-label={`${item.name} demand index ${item.value}`}
            >
              <div
                className="h-full rounded-full bg-emerald-600"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
