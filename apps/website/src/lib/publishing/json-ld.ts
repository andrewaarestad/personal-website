import type { ContentEntry } from "@/content";
import { DEFAULT_OG_IMAGE, absoluteUrl } from "@/lib/site";

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };
export type JsonLdObject = { [key: string]: JsonLdValue };

/**
 * schema.org type per content kind. Only first-person articles are
 * BlogPostings; project and research write-ups are Articles.
 */
function schemaType(entry: ContentEntry): "Article" | "BlogPosting" {
  return entry.kind === "article" ? "BlogPosting" : "Article";
}

/**
 * Builds Article/BlogPosting JSON-LD for a registry entry. Dates are included
 * only when verified; a project period is never used as datePublished.
 */
export function buildArticleJsonLd(entry: ContentEntry): JsonLdObject {
  const url = absoluteUrl(entry.path);
  const data: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": schemaType(entry),
    headline: entry.title,
    description: entry.summary,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: entry.authors.map((author) => ({
      "@type": "Person",
      name: author.name,
      ...(author.url ? { url: author.url } : {}),
    })),
    image: absoluteUrl(entry.image?.url ?? DEFAULT_OG_IMAGE),
  };

  if (entry.publishedAt) data.datePublished = entry.publishedAt;
  if (entry.updatedAt) data.dateModified = entry.updatedAt;
  if (entry.tags.length > 0) data.keywords = entry.tags.join(", ");
  if (entry.paperUrl) data.citation = entry.paperUrl;

  return data;
}

/**
 * Serializes JSON-LD for safe inlining in a <script> tag: escapes characters
 * that could close the script element or break parsing in HTML.
 */
export function serializeJsonLd(data: JsonLdObject): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
