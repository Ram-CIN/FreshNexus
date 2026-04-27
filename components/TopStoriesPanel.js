"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Radio,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import StoryCard from "@/components/top-stories/StoryCard";
import StorySkeleton from "@/components/top-stories/StorySkeleton";
import { getHost, stripHtml } from "@/components/top-stories/storyUtils";

const RSS_URL =
  "https://news.google.com/rss/search?q=grocery+market+trends&hl=en-IN&gl=IN&ceid=IN:en";
const RSS_JSON_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
  RSS_URL
)}`;
const STORY_LIMIT = 6;

export default function TopStoriesPanel() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTopStories(signal) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(RSS_JSON_URL, { signal });

      if (!response.ok) {
        throw new Error("Unable to load grocery trend news.");
      }

      const json = await response.json();

      if (json.status !== "ok" || !Array.isArray(json.items)) {
        throw new Error("News feed did not return articles.");
      }

      const nextStories = json.items.slice(0, STORY_LIMIT).map((item) => ({
        id: item.guid || item.link || item.title,
        title: stripHtml(item.title),
        description: stripHtml(item.description),
        link: item.link,
        pubDate: item.pubDate,
        source: item.author || getHost(item.link),
      }));

      setStories(nextStories);
    } catch (caughtError) {
      if (!signal.aborted) {
        setError(caughtError.message || "Unable to load grocery trend news.");
        setStories([]);
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    loadTopStories(controller.signal);

    return () => controller.abort();
  }, []);

  const lastUpdated = useMemo(
    () =>
      new Intl.DateTimeFormat("en", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date()),
    [stories]
  );

  return (
    <section
      aria-labelledby="top-stories-title"
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-emerald-700">
            <Radio aria-hidden="true" size={16} />
            Top story
          </p>
          <h2
            id="top-stories-title"
            className="mt-2 text-2xl font-bold tracking-normal text-slate-950"
          >
            Grocery market trend headlines
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Live Google News results for grocery market trends, converted from
            RSS to JSON for fast dashboard cards.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            const controller = new AbortController();
            loadTopStories(controller.signal);
          }}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-700"
        >
          <RefreshCcw aria-hidden="true" size={16} />
          Refresh
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex items-center gap-2">
          <Sparkles aria-hidden="true" size={15} className="text-emerald-700" />
          Source: Google News RSS via rss2json
        </span>
        <span>Updated {lastUpdated}</span>
      </div>

      <div className="mt-5">
        {error ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
            {error}
          </div>
        ) : loading ? (
          <StorySkeleton limit={STORY_LIMIT} />
        ) : stories.length ? (
          <div className="grid gap-4 lg:grid-cols-3">
            {stories.map((story, index) => (
              <StoryCard key={story.id} story={story} index={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm font-medium text-slate-500">
            No grocery trend stories are available right now.
          </div>
        )}
      </div>
    </section>
  );
}
