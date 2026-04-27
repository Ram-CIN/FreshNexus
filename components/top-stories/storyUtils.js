export function stripHtml(value) {
  return String(value || "").replace(/<[^>]*>/g, "").trim();
}

export function getHost(url) {
  if (!url) {
    return "Google News";
  }

  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Google News";
  }
}

export function getRelativeTime(value) {
  const date = value ? new Date(value) : null;

  if (!date || Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const seconds = Math.max(1, Math.floor((Date.now() - date.getTime()) / 1000));
  const units = [
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];

  for (const [label, unitSeconds] of units) {
    const count = Math.floor(seconds / unitSeconds);

    if (count >= 1) {
      return `${count} ${label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}
