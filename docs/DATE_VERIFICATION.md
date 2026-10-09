# Date & Content Verification Checklist

The content registry (`apps/website/src/content/registry.ts`) leaves `publishedAt` unset for every
existing page. Git history shows when code merged, but not when a page was first public or
announced. Production deploy history (Vercel) wasn't reachable when this was written. Until each
date is confirmed, these pages show no "Published" date and are **omitted from `/feed.xml`**, which
currently has no items.

To confirm a date, set `publishedAt` (and optionally `updatedAt`) on the entry and tick the box.

## Publication dates (owner confirmation needed)

| Page                                       | Evidence from git (merge to `main`, US Central)                                                                                 | Candidate `publishedAt`    |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `/projects/rna-decay-kinetics`             | Full page added in #42 on 2026-05-22. Copy-only edits in #43 (2026-07-16).                                                      | `2026-05-22`?              |
| `/projects/fluid-water-meter`              | Placeholder in #26 (2025-11-09); full article in #33 (2025-11-18); copy revisions in #38–#40 (2026-02-11) and #43 (2026-07-16). | `2025-11-18`?              |
| `/projects/ambient-temperature-estimation` | Placeholder from #20/#26 (2025-11-08/09); expanded in #38 (2026-02-11); full article in #42 (2026-05-22).                       | `2026-05-22`? (or earlier) |
| `/design-process`                          | Evolving since #17 (2025-11-07). It's a living page, so it may be better left undated.                                          | leave unset?               |

- [ ] RNA decay kinetics `publishedAt`
- [ ] FLUID water meter `publishedAt` (and whether the 2026 copy revisions count as a substantive
      `updatedAt`)
- [ ] Ambient temperature estimation `publishedAt`
- [ ] Design process: dated or intentionally undated

## Project periods

| Page                | Stored                    | Source in page copy                                 | Question                                          |
| ------------------- | ------------------------- | --------------------------------------------------- | ------------------------------------------------- |
| FLUID               | `2015`–`2018`             | "I cofounded FLUID in 2015…", "…wound down in 2018" | Confirm. See the Kickstarter inconsistency below. |
| RNA decay kinetics  | start `2022`, end unknown | "Starting in 2022, I have been collaborating…"      | Ongoing (`ongoing: true`) or ended (which year)?  |
| Ambient temperature | not stored                | No dates in copy                                    | When did this work happen?                        |
| Design process      | not stored                | —                                                   | Add `start: "2025"`, `ongoing: true`?             |

- [ ] RNA period end / ongoing
- [ ] Ambient temperature period
- [ ] Design process period

## Content decisions (spotted during the audit, not changed)

- [ ] **FLUID Kickstarter year.** The intro says "I cofounded FLUID in 2015 on Kickstarter", but
      the timeline lists the Kickstarter campaign under **2016**.
- [ ] **Ambient temperature card vs. article.** The `/projects` card (`listingSummary`) describes
      "multi-sensor data fusion… a network of weather stations using cell phones", while the article
      describes a single-thermistor physics estimator. Both strings were kept verbatim.
- [ ] **Tags.** The proposed tags for each entry come from page copy. Confirm or edit.
- [ ] **Content kinds.** RNA = `research`; FLUID and ambient = `project`; design process =
      `article` (emits `BlogPosting` JSON-LD). Confirm.
- [ ] **`/projects/sample-post`** is publicly reachable. It's now registered as a `draft`
      (`noindex`, excluded from sitemap/index/feed). Keep, move, or delete it?
- [ ] **`/theme-test` and `/design-preview/*`** aren't in the sitemap. `/theme-test` is indexable
      and has two `<h1>` elements. Add `noindex`, or remove it?
