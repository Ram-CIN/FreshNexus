import { Tag } from "lucide-react";

export default function DetailRow({ label, value, detail, active = false, icon: Icon = Tag }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-md border p-4 ${
        active
          ? "border-lime-500 bg-lime-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${
            active ? "bg-lime-100 text-lime-700" : "bg-slate-100 text-slate-600"
          }`}
        >
          <Icon aria-hidden="true" size={18} />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-slate-950">{label}</p>
          <p className="truncate text-sm text-slate-500">{detail}</p>
        </div>
      </div>
      <p className="shrink-0 text-right text-sm font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}
