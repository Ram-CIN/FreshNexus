import {
  Leaf,
  PackageCheck,
  Search,
  TrendingUp,
} from "lucide-react";

export const stats = [
  {
    label: "Search demand",
    value: "128K",
    change: "+12.4%",
    trend: "up",
    detail: "Product searches this week",
    icon: Search,
  },
  {
    label: "Avg basket value",
    value: "INR 1,248",
    change: "+4.8%",
    trend: "up",
    detail: "Across active grocery carts",
    icon: TrendingUp,
  },
  {
    label: "Stock health",
    value: "94%",
    change: "-1.6%",
    trend: "down",
    detail: "Core SKUs available",
    icon: PackageCheck,
  },
  {
    label: "Freshness score",
    value: "88",
    change: "+3 pts",
    trend: "up",
    detail: "Produce quality index",
    icon: Leaf,
  },
];

export const categoryDemand = [
  { name: "Fresh produce", value: 86, change: "+9%" },
  { name: "Dairy", value: 72, change: "+5%" },
  { name: "Snacks", value: 64, change: "+3%" },
  { name: "Beverages", value: 58, change: "-2%" },
  { name: "Pantry staples", value: 77, change: "+7%" },
];

export const priceSignals = [
  { name: "Rice and grains", value: "Stable", tone: "good" },
  { name: "Imported fruit", value: "Rising", tone: "watch" },
  { name: "Cooking oil", value: "Softening", tone: "good" },
  { name: "Premium dairy", value: "Volatile", tone: "alert" },
];

export const liveFeeds = [
  "Refreshing product availability from partner stores",
  "Forecasting weekend demand for fresh produce",
  "Monitoring imported category cost movement",
  "Checking low-stock alerts for high velocity SKUs",
];

export const regionalDemand = [
  { region: "Mumbai", orders: "18.4K", share: 82 },
  { region: "Delhi NCR", orders: "16.9K", share: 76 },
  { region: "Bengaluru", orders: "15.2K", share: 69 },
  { region: "Hyderabad", orders: "11.8K", share: 54 },
];
