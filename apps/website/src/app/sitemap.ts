import type { MetadataRoute } from "next";
import { getPublishedEntries } from "@/content";
import { absoluteUrl } from "@/lib/site";

/** Public, non-registry routes worth indexing. Registry pages are added automatically. */
export const STATIC_SITEMAP_PATHS = ["/", "/projects"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = STATIC_SITEMAP_PATHS.map((path) => ({
    url: absoluteUrl(path),
  }));

  const contentRoutes: MetadataRoute.Sitemap = getPublishedEntries().map((entry) => {
    // Only emit lastModified when an editorial date is actually known.
    const lastModified = entry.updatedAt ?? entry.publishedAt;
    return { url: absoluteUrl(entry.path), ...(lastModified ? { lastModified } : {}) };
  });

  return [...staticRoutes, ...contentRoutes];
}
