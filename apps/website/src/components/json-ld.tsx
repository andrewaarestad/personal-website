import { requireEntry } from "@/content";
import { buildArticleJsonLd, serializeJsonLd } from "@/lib/publishing/json-ld";

/**
 * Emits Article/BlogPosting structured data for a registered page.
 * Renders on the server, so it is present in the prerendered HTML.
 */
export function ContentJsonLd({ path }: { path: string }) {
  const entry = requireEntry(path);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildArticleJsonLd(entry)) }}
    />
  );
}
