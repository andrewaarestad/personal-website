import { contentEntries } from "./registry";
import type { ContentEntry, ContentKind, ProjectPeriod } from "./types";

export type {
  ContentAuthor,
  ContentEntry,
  ContentImage,
  ContentKind,
  ContentStatus,
  ProjectPeriod,
} from "./types";
export { contentEntries } from "./registry";

export const CONTENT_KIND_LABELS: Record<ContentKind, string> = {
  project: "Project",
  research: "Research",
  article: "Article",
  experiment: "Experiment",
};

const ISO_DATE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const PERIOD_DATE = /^\d{4}(-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?)?$/;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** True for a real calendar date in YYYY-MM-DD form (rejects e.g. 2026-02-30). */
export function isIsoDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function isPeriodDate(value: string): boolean {
  if (!PERIOD_DATE.test(value)) return false;
  return value.length === 10 ? isIsoDate(value) : true;
}

export function isPublished(entry: ContentEntry): boolean {
  return (entry.status ?? "published") === "published";
}

/**
 * Validates registry data. Returns a list of human-readable problems
 * (empty when valid).
 */
export function validateEntries(entries: readonly ContentEntry[]): string[] {
  const errors: string[] = [];
  const seenPaths = new Set<string>();
  const seenSlugs = new Set<string>();

  for (const entry of entries) {
    const id = entry.path || entry.slug || "(unknown entry)";

    if (!entry.title.trim()) errors.push(`${id}: title is required`);
    if (!entry.summary.trim()) errors.push(`${id}: summary is required`);
    if (entry.authors.length === 0) errors.push(`${id}: at least one author is required`);

    if (!SLUG.test(entry.slug)) errors.push(`${id}: slug "${entry.slug}" is not URL-safe`);
    if (seenSlugs.has(entry.slug)) errors.push(`${id}: duplicate slug "${entry.slug}"`);
    seenSlugs.add(entry.slug);

    if (!entry.path.startsWith("/") || (entry.path !== "/" && entry.path.endsWith("/"))) {
      errors.push(`${id}: path must start with "/" and have no trailing slash`);
    }
    if (seenPaths.has(entry.path)) errors.push(`${id}: duplicate path "${entry.path}"`);
    seenPaths.add(entry.path);

    if (entry.publishedAt !== undefined && !isIsoDate(entry.publishedAt)) {
      errors.push(`${id}: publishedAt "${entry.publishedAt}" is not a valid YYYY-MM-DD date`);
    }
    if (entry.updatedAt !== undefined) {
      if (!isIsoDate(entry.updatedAt)) {
        errors.push(`${id}: updatedAt "${entry.updatedAt}" is not a valid YYYY-MM-DD date`);
      } else if (entry.publishedAt === undefined) {
        errors.push(`${id}: updatedAt requires a verified publishedAt`);
      } else if (entry.updatedAt < entry.publishedAt) {
        errors.push(`${id}: updatedAt must be on or after publishedAt`);
      }
    }

    const period = entry.projectPeriod;
    if (period) {
      for (const key of ["start", "end"] as const) {
        const value = period[key];
        if (value !== undefined && !isPeriodDate(value)) {
          errors.push(`${id}: projectPeriod.${key} "${value}" must be YYYY, YYYY-MM or YYYY-MM-DD`);
        }
      }
      if (period.start && period.end && period.end < period.start) {
        errors.push(`${id}: projectPeriod.end must not precede projectPeriod.start`);
      }
      if (period.ongoing && period.end) {
        errors.push(`${id}: projectPeriod cannot be both ongoing and have an end`);
      }
    }
  }

  return errors;
}

/**
 * Stable listing order:
 * 1. Entries with `publishedAt`, newest first (ties keep declaration order).
 * 2. Undated entries afterwards, in registry declaration order.
 *
 * Undated entries are never assigned a synthetic date.
 */
export function sortEntries(entries: readonly ContentEntry[]): ContentEntry[] {
  const dated = entries.filter((entry) => entry.publishedAt);
  const undated = entries.filter((entry) => !entry.publishedAt);
  // Array.prototype.sort is stable, so equal dates keep declaration order.
  dated.sort((a, b) => (b.publishedAt as string).localeCompare(a.publishedAt as string));
  return [...dated, ...undated];
}

export function getPublishedEntries(entries: readonly ContentEntry[] = contentEntries) {
  return sortEntries(entries.filter(isPublished));
}

/** Published entries with a verified publication date — the RSS feed set. */
export function getFeedEntries(entries: readonly ContentEntry[] = contentEntries) {
  return getPublishedEntries(entries).filter((entry) => entry.publishedAt);
}

/** Entries shown on the /projects index: published pages under /projects/. */
export function getProjectIndexEntries(entries: readonly ContentEntry[] = contentEntries) {
  return getPublishedEntries(entries).filter((entry) => entry.path.startsWith("/projects/"));
}

export function getEntryByPath(
  path: string,
  entries: readonly ContentEntry[] = contentEntries
): ContentEntry | undefined {
  return entries.find((entry) => entry.path === path);
}

export function getEntryBySlug(
  slug: string,
  entries: readonly ContentEntry[] = contentEntries
): ContentEntry | undefined {
  return entries.find((entry) => entry.slug === slug);
}

/** Like getEntryByPath, but fails the build loudly when a page isn't registered. */
export function requireEntry(path: string): ContentEntry {
  const entry = getEntryByPath(path);
  if (!entry) {
    throw new Error(`No content registry entry for "${path}". Add one to src/content/registry.ts.`);
  }
  return entry;
}

/** Formats a project period for display, e.g. "2015–2018", "2022–present", "from 2022". */
export function formatProjectPeriod(period: ProjectPeriod | undefined): string | undefined {
  if (!period) return undefined;
  const { start, end, ongoing } = period;
  const startYear = start?.slice(0, 4);
  const endYear = end?.slice(0, 4);

  if (startYear && ongoing) return `${startYear}–present`;
  if (startYear && endYear) return startYear === endYear ? startYear : `${startYear}–${endYear}`;
  if (startYear) return `from ${startYear}`;
  if (endYear) return `until ${endYear}`;
  return undefined;
}

/** Formats an ISO date (YYYY-MM-DD) for display without timezone drift. */
export function formatDisplayDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

const registryErrors = validateEntries(contentEntries);
if (registryErrors.length > 0) {
  throw new Error(`Invalid content registry:\n- ${registryErrors.join("\n- ")}`);
}
