/**
 * Publishing metadata types.
 *
 * Entries describe a page; they never render it. Each bespoke route under
 * `src/app` owns its own layout and copy and looks up its entry by path.
 */

export type ContentKind = "project" | "research" | "article" | "experiment";

export type ContentStatus = "draft" | "published";

export interface ContentAuthor {
  name: string;
  url?: string;
}

/**
 * When the underlying work happened. This is NOT a publication date and is
 * never emitted as `datePublished`.
 *
 * Values are a year ("2015"), year-month ("2015-06") or ISO date ("2015-06-01").
 */
export interface ProjectPeriod {
  start?: string;
  /** Absent means "unknown" unless `ongoing` is set. */
  end?: string;
  ongoing?: boolean;
}

export interface ContentImage {
  /** Site-relative path (e.g. "/img/foo.png") or absolute URL. */
  url: string;
  alt: string;
  /** How the index card should fit the image. Defaults to "cover". */
  fit?: "cover" | "contain";
}

export interface ContentEntry {
  /** Unique, URL-safe identifier. Usually the last path segment. */
  slug: string;
  /** Absolute pathname of the page, e.g. "/projects/example". No trailing slash. */
  path: string;
  kind: ContentKind;
  title: string;
  /** Short description used for <meta name="description">, Open Graph, JSON-LD and RSS. */
  summary: string;
  /** Optional longer blurb for index cards. Falls back to `summary`. */
  listingSummary?: string;
  /** ISO date (YYYY-MM-DD) the page was first made public. Only set when verified. */
  publishedAt?: string;
  /** ISO date of the last substantive editorial update. Not for routine code deploys. */
  updatedAt?: string;
  projectPeriod?: ProjectPeriod;
  authors: ContentAuthor[];
  tags: string[];
  repositoryUrl?: string;
  paperUrl?: string;
  image?: ContentImage;
  /** Defaults to "published". Drafts are excluded from listings, feeds and the sitemap. */
  status?: ContentStatus;
}
