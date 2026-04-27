import { ArrowDown, ArrowUp } from "lucide-react";

export default function TrendPill({ trend, change }) {
  const isUp = trend === "up";
  const Icon = isUp ? ArrowUp : ArrowDown;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${
        isUp ? "bg-emerald-50 text-emerald-700" : "bg-orange-50 text-orange-700"
      }`}
    >
      <Icon aria-hidden="true" size={13} />
      {change}
    </span>
  );
}
