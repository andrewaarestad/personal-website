import type { ContentEntry } from "@/content";
import { FEED_PATH, FEED_TITLE, SITE_DESCRIPTION, SITE_URL, absoluteUrl } from "@/lib/site";

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RFC 822 date for an ISO calendar date, pinned to 00:00 UTC. */
export function toRfc822(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toUTCString();
}

/**
 * Builds an RSS 2.0 feed. Callers pass only entries with a verified
 * `publishedAt` (see getFeedEntries); undated entries are skipped defensively
 * rather than given a synthetic date. Output is deterministic for a given input.
 */
export function buildRssFeed(entries: readonly ContentEntry[]): string {
  const dated = entries.filter((entry) => entry.publishedAt);
  const newest = dated
    .map((entry) => entry.updatedAt ?? (entry.publishedAt as string))
    .sort()
    .at(-1);

  const items = dated.map((entry) => {
    const url = absoluteUrl(entry.path);
    const categories = entry.tags
      .map((tag) => `      <category>${escapeXml(tag)}</category>`)
      .join("\n");
    return [
      "    <item>",
      `      <title>${escapeXml(entry.title)}</title>`,
      `      <link>${escapeXml(url)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `      <description>${escapeXml(entry.summary)}</description>`,
      `      <pubDate>${toRfc822(entry.publishedAt as string)}</pubDate>`,
      ...entry.authors.map((author) => `      <dc:creator>${escapeXml(author.name)}</dc:creator>`),
      ...(categories ? [categories] : []),
      "    </item>",
    ].join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    "  <channel>",
    `    <title>${escapeXml(FEED_TITLE)}</title>`,
    `    <link>${escapeXml(SITE_URL)}</link>`,
    `    <description>${escapeXml(SITE_DESCRIPTION)}</description>`,
    "    <language>en-us</language>",
    `    <atom:link href="${escapeXml(absoluteUrl(FEED_PATH))}" rel="self" type="application/rss+xml" />`,
    ...(newest ? [`    <lastBuildDate>${toRfc822(newest)}</lastBuildDate>`] : []),
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
