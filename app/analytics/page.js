import MarketInsightsDashboard from "@/components/MarketInsightsDashboard";

export const metadata = {
  title: "Market Insights Dashboard | FreshNexus Grocery Analytics",
  description:
    "Track grocery market demand, category performance, inventory signals, price movement, and real-time platform insights for FreshNexus.",
  alternates: {
    canonical: "/analytics",
  },
};

export default function MarketInsights() {
  return <MarketInsightsDashboard />;
}
