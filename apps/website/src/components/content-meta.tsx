import {
  CONTENT_KIND_LABELS,
  formatDisplayDate,
  formatProjectPeriod,
  requireEntry,
  type ContentEntry,
} from "@/content";
import { cn } from "@/lib/utils";

export interface ContentMetaProps {
  /** Pathname of a registered page. */
  path?: string;
  /** Or pass an entry directly (e.g. in listings). */
  entry?: ContentEntry;
  /** Hide the author (useful in listings where every item has the same author). */
  showAuthor?: boolean;
  showTags?: boolean;
  className?: string;
}

/**
 * Byline for registered content: kind, author, publication/update dates,
 * a separately labelled project period, and tags.
 *
 * Unknown dates are omitted, never guessed.
 */
export function ContentMeta({
  path,
  entry: entryProp,
  showAuthor = true,
  showTags = true,
  className,
}: ContentMetaProps) {
  const entry = entryProp ?? (path ? requireEntry(path) : undefined);
  if (!entry) return null;

  const period = formatProjectPeriod(entry.projectPeriod);
  const authors = entry.authors.map((author) => author.name).join(", ");
  const items: React.ReactNode[] = [
    <span key="kind" className="font-semibold text-brand">
      {CONTENT_KIND_LABELS[entry.kind]}
    </span>,
  ];
  if (showAuthor) items.push(<span key="author">By {authors}</span>);
  if (entry.publishedAt) {
    items.push(
      <span key="published">
        Published <time dateTime={entry.publishedAt}>{formatDisplayDate(entry.publishedAt)}</time>
      </span>
    );
  }
  if (entry.updatedAt) {
    items.push(
      <span key="updated">
        Updated <time dateTime={entry.updatedAt}>{formatDisplayDate(entry.updatedAt)}</time>
      </span>
    );
  }
  if (period) items.push(<span key="period">Project: {period}</span>);

  return (
    <div className={cn("space-y-3 text-body-sm text-text-secondary", className)}>
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => (
          <span key={index} className="inline-flex items-center gap-2">
            {index > 0 && (
              <span className="text-text-tertiary" aria-hidden="true">
                ·
              </span>
            )}
            {item}
          </span>
        ))}
      </p>
      {showTags && entry.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label="Tags">
          {entry.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-border-light px-2 py-0.5 text-xs text-text-secondary"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
