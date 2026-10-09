/**
 * Site-wide publishing constants.
 *
 * The apex domain (andrewaarestad.com) 307-redirects to www in production,
 * so the www hostname is the canonical origin for every absolute URL we emit
 * (canonical links, Open Graph, JSON-LD, sitemap, RSS).
 */
export const SITE_URL = "https://www.andrewaarestad.com";

export const SITE_NAME = "Andrew Aarestad";

export const SITE_DESCRIPTION =
  "A modern personal website built with Next.js and AI-assisted development";

export const DEFAULT_AUTHOR = { name: "Andrew Aarestad", url: SITE_URL } as const;

/** Existing social preview image, used when an entry has no image of its own. */
export const DEFAULT_OG_IMAGE = "/img/andrew_head.jpg";

export const FEED_PATH = "/feed.xml";

export const FEED_TITLE = `${SITE_NAME} — Projects & Writing`;

/** Converts a site-relative path (e.g. "/projects/foo") into an absolute canonical URL. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
