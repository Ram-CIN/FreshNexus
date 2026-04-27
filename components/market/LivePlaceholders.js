import { RefreshCcw } from "lucide-react";
import { liveFeeds } from "@/components/market/marketData";

export default function LivePlaceholders() {
  return (
    <section
      aria-labelledby="live-data-title"
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 id="live-data-title" className="text-lg font-bold text-slate-950">
            Real-time data queue
          </h2>
          <p className="mt-1 text-sm text-slate-500">Placeholders for live API and stream updates.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700">
          <RefreshCcw aria-hidden="true" size={13} />
          Live
        </span>
      </div>

      <div className="mt-5 space-y-3" aria-live="polite">
        {liveFeeds.map((item) => (
          <div key={item} className="rounded-lg border border-slate-200 p-3">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <p className="text-sm font-medium text-slate-700">{item}</p>
            </div>
            <div className="mt-3 h-2 rounded-full shimmer" />
          </div>
        ))}
      </div>
    </section>
  );
}
