import { getFeedEntries } from "@/content";
import { buildRssFeed } from "@/lib/publishing/rss";

export const dynamic = "force-static";

/** RSS feed of published entries with a verified publication date. */
export function GET() {
  return new Response(buildRssFeed(getFeedEntries()), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
