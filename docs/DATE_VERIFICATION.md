# Date & Content Verification Checklist

Publication dates follow the owner's decision that **the commit (merge to `main`) that landed the
substantive page** is the publication date. Placeholder or "coming soon" versions don't count.
`updatedAt` is set only for substantive editorial rewrites, not formatting or meta-description
tweaks.

## Publication dates (resolved)

| Page                                       | `publishedAt`      | `updatedAt`        | Notes                                                                                                                                                   |
| ------------------------------------------ | ------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/projects/rna-decay-kinetics`             | `2026-05-22` (#42) | —                  | #43 only changed the meta description.                                                                                                                  |
| `/projects/fluid-water-meter`              | `2025-11-18` (#33) | `2026-07-16` (#43) | #26 (2025-11-09) was a short overview. #43 rewrote the narrative (wind-down date, corrected claims). The #38 rewrite (2026-02-11) is superseded by #43. |
| `/projects/ambient-temperature-estimation` | `2026-05-22` (#42) | —                  | Earlier versions (#20/#26/#38) were a "Coming Soon" placeholder.                                                                                        |
| `/design-process`                          | `2025-11-07` (#17) | —                  | Later edits were layout and formatting tweaks.                                                                                                          |

- [x] RNA decay kinetics `publishedAt`
- [x] FLUID water meter `publishedAt` / `updatedAt`
- [x] Ambient temperature estimation `publishedAt`
- [x] Design process `publishedAt`

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
