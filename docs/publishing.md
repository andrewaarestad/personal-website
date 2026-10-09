# Publishing Guide

Every project, experiment and article on this site is a **bespoke React route**. The publishing
infrastructure only adds _metadata_ around those routes; it never renders page bodies.

One registry entry feeds:

| Output                                  | Source                                             |
| --------------------------------------- | -------------------------------------------------- |
| `<title>`, description, canonical, OG/X | `src/lib/publishing/metadata.ts`                   |
| JSON-LD (`Article` / `BlogPosting`)     | `src/lib/publishing/json-ld.ts`, `<ContentJsonLd>` |
| Byline (kind, author, dates, tags)      | `src/components/content-meta.tsx`                  |
| `/projects` index                       | `src/app/projects/page.tsx`                        |
| `/sitemap.xml`, `/robots.txt`           | `src/app/sitemap.ts`, `src/app/robots.ts`          |
| `/feed.xml` (RSS 2.0)                   | `src/app/feed.xml/route.ts`                        |

All paths above are relative to `apps/website/`. The canonical origin is
`https://www.andrewaarestad.com` (the apex domain redirects to `www`); see `src/lib/site.ts`.

## Publishing a new page

### 1. Build the page as a normal route

```tsx
// apps/website/src/app/projects/my-experiment/page.tsx
import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/publishing/metadata";
import { ContentMeta } from "@/components/content-meta";
import { ContentJsonLd } from "@/components/json-ld";
import { PostLayout, H1Section, TextSection } from "@/components/post-layout";

const PAGE_PATH = "/projects/my-experiment";

export const metadata: Metadata = getPageMetadata(PAGE_PATH);

export default function MyExperimentPage() {
  return (
    <>
      <ContentJsonLd path={PAGE_PATH} />
      <PostLayout>
        {[
          <div key="title" className="mb-8">
            <H1Section text="My Experiment" />
            <ContentMeta path={PAGE_PATH} className="mt-6" />
          </div>,
          <TextSection key="intro" text="…" />,
        ]}
      </PostLayout>
    </>
  );
}
```

`PostLayout` is optional; any layout works. Keep the page a Server Component and put
`"use client"` only on the interactive widgets it embeds, so the article text is in the
prerendered HTML.

### 2. Register its metadata

```ts
// apps/website/src/content/registry.ts
{
  slug: "my-experiment",
  path: "/projects/my-experiment",
  kind: "experiment",                 // project | research | article | experiment
  title: "My Experiment",
  summary: "One or two sentences for search results and link previews.",
  listingSummary: "Optional longer blurb for the /projects card.",
  publishedAt: "2026-10-09",          // the day it actually goes live
  projectPeriod: { start: "2026", ongoing: true },
  authors: [DEFAULT_AUTHOR],
  tags: ["simulation"],
  repositoryUrl: "https://github.com/…",
  image: { url: "/img/my-experiment.png", alt: "…", fit: "cover" },
  // status: "draft",                 // hides it from index, sitemap and feed; adds noindex
},
```

That's all. The index, sitemap and feed pick the entry up automatically. Pages under
`/projects/` appear on the `/projects` index; pages elsewhere still get sitemap, feed and metadata
support.

If a page calls `getPageMetadata` for an unregistered path, the build fails with a clear error.
The registry is also validated at import time (unique slugs/paths, valid dates,
`updatedAt >= publishedAt`), so bad data fails the build.

## Date rules

- **`publishedAt`**: the date the page first went public. Set it only when you know it. Never
  substitute a build, commit, project-start or "today" date.
- **`updatedAt`**: only for substantive editorial changes (new findings, rewritten sections), not
  typo fixes or code deploys. Requires `publishedAt`.
- **`projectPeriod`**: when the _work_ happened. It is displayed as "Project: 2015–2018" and is
  never emitted as `datePublished`.

Undated entries:

- render without a "Published" label;
- are omitted from JSON-LD `datePublished`, Open Graph `article:published_time` and sitemap
  `lastmod`;
- are **excluded from `/feed.xml`** (RSS items need a `pubDate`, and we won't invent one);
- are listed on `/projects` after all dated entries, in registry declaration order.

Outstanding historical dates are tracked in [DATE_VERIFICATION.md](./DATE_VERIFICATION.md).

## Pages without a registry entry

Non-editorial routes (`/`, `/projects`) set their canonical with `siteAlternates(path)` from
`src/lib/publishing/metadata.ts`. It also re-declares the RSS link, because Next.js replaces a
layout's `alternates` rather than merging it when a page sets its own. Add public non-registry
routes to `STATIC_SITEMAP_PATHS` in `src/app/sitemap.ts`.
