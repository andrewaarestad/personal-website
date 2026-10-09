import type { Metadata } from "next";
import { requireEntry, type ContentEntry } from "@/content";
import { DEFAULT_OG_IMAGE, FEED_PATH, FEED_TITLE, SITE_NAME, absoluteUrl } from "@/lib/site";

/**
 * Next.js merges metadata shallowly, so a page that sets `alternates` replaces
 * the layout's. Every page that sets a canonical URL must also re-declare the
 * RSS alternate, which this helper does.
 */
export function siteAlternates(path: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: path,
    types: { "application/rss+xml": [{ url: FEED_PATH, title: FEED_TITLE }] },
  };
}

export function pageTitle(title: string): string {
  return `${title} - ${SITE_NAME}`;
}

/** Maps a registry entry to Next.js Metadata (title, description, canonical, OG, Twitter). */
export function buildEntryMetadata(entry: ContentEntry): Metadata {
  const title = pageTitle(entry.title);
  const image = entry.image
    ? { url: entry.image.url, alt: entry.image.alt }
    : { url: DEFAULT_OG_IMAGE, alt: SITE_NAME };
  const isDraft = entry.status === "draft";

  return {
    title,
    description: entry.summary,
    authors: entry.authors,
    keywords: entry.tags.length > 0 ? entry.tags : undefined,
    alternates: siteAlternates(entry.path),
    ...(isDraft ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "article",
      url: absoluteUrl(entry.path),
      siteName: SITE_NAME,
      title,
      description: entry.summary,
      images: [image],
      ...(entry.publishedAt ? { publishedTime: entry.publishedAt } : {}),
      ...(entry.updatedAt ? { modifiedTime: entry.updatedAt } : {}),
      authors: entry.authors.map((author) => author.url ?? author.name),
      ...(entry.tags.length > 0 ? { tags: entry.tags } : {}),
    },
    twitter: {
      card: entry.image ? "summary_large_image" : "summary",
      title,
      description: entry.summary,
      images: [image.url],
    },
  };
}

/** Metadata for a registered page, looked up by pathname. Throws if unregistered. */
export function getPageMetadata(path: string): Metadata {
  return buildEntryMetadata(requireEntry(path));
}
