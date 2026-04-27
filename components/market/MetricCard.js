import TrendPill from "@/components/market/TrendPill";

export default function MetricCard({ item }) {
  const Icon = item.icon;

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-600">{item.label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{item.value}</p>
        </div>
        <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
          <Icon aria-hidden="true" size={20} />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-500">{item.detail}</p>
        <TrendPill trend={item.trend} change={item.change} />
      </div>
    </article>
  );
}
