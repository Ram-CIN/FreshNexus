import { ArrowUpRight, Clock3, Newspaper } from "lucide-react";
import { getHost, getRelativeTime } from "@/components/top-stories/storyUtils";

export default function StoryCard({ story, index }) {
  return (
    <article className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white!">
            {index + 1}
          </span>
          <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold uppercase text-emerald-700">
            Top story
          </span>
        </div>
        <a
          href={story.link}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${story.title}`}
          className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-emerald-700"
        >
          <ArrowUpRight aria-hidden="true" size={18} />
        </a>
      </div>

      <h3 className="mt-5 line-clamp-3 text-lg font-bold leading-6 text-black!">
        <a
          href={story.link}
          target="_blank"
          rel="noreferrer"
          className="hover:text-emerald-700"
        >
          {story.title}
        </a>
      </h3>

      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
        {story.description || "Grocery market update from Google News."}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-600">
        <span className="inline-flex items-center gap-1.5">
          <Newspaper aria-hidden="true" size={15} className="text-emerald-700" />
          {story.source || getHost(story.link)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 aria-hidden="true" size={15} className="text-slate-400" />
          {getRelativeTime(story.pubDate)}
        </span>
      </div>
    </article>
  );
}
