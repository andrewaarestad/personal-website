import { describe, it, expect } from "vitest";
import {
  contentEntries,
  formatDisplayDate,
  formatProjectPeriod,
  getEntryByPath,
  getFeedEntries,
  getProjectIndexEntries,
  getPublishedEntries,
  isIsoDate,
  sortEntries,
  validateEntries,
  type ContentEntry,
} from "@/content";

function entry(overrides: Partial<ContentEntry>): ContentEntry {
  return {
    slug: "example",
    path: "/projects/example",
    kind: "project",
    title: "Example",
    summary: "An example entry.",
    authors: [{ name: "Andrew Aarestad" }],
    tags: [],
    ...overrides,
  };
}

describe("content registry", () => {
  it("is valid", () => {
    expect(validateEntries(contentEntries)).toEqual([]);
  });

  it("registers every inventoried editorial page", () => {
    for (const path of [
      "/projects/rna-decay-kinetics",
      "/projects/fluid-water-meter",
      "/projects/ambient-temperature-estimation",
      "/design-process",
    ]) {
      expect(getEntryByPath(path)?.status ?? "published").toBe("published");
    }
  });

  it("keeps the sample post out of public listings", () => {
    const paths = getPublishedEntries().map((e) => e.path);
    expect(paths).not.toContain("/projects/sample-post");
  });

  it("does not use a project period year as a publication date", () => {
    for (const e of contentEntries) {
      if (e.publishedAt && e.projectPeriod?.start) {
        expect(e.publishedAt.startsWith(e.projectPeriod.start)).toBe(false);
      }
    }
  });
});

describe("validateEntries", () => {
  it("rejects duplicate paths and slugs", () => {
    const errors = validateEntries([entry({}), entry({})]);
    expect(errors.some((e) => e.includes("duplicate path"))).toBe(true);
    expect(errors.some((e) => e.includes("duplicate slug"))).toBe(true);
  });

  it("rejects malformed and impossible dates", () => {
    expect(validateEntries([entry({ publishedAt: "2026/01/01" })])).toHaveLength(1);
    expect(validateEntries([entry({ publishedAt: "2026-02-30" })])).toHaveLength(1);
    expect(validateEntries([entry({ projectPeriod: { start: "around 2015" } })])).toHaveLength(1);
  });

  it("requires updatedAt >= publishedAt", () => {
    expect(
      validateEntries([entry({ publishedAt: "2026-05-01", updatedAt: "2026-04-01" })])
    ).toHaveLength(1);
    expect(
      validateEntries([entry({ publishedAt: "2026-05-01", updatedAt: "2026-05-01" })])
    ).toEqual([]);
  });

  it("rejects updatedAt without a verified publishedAt", () => {
    expect(validateEntries([entry({ updatedAt: "2026-04-01" })])).toHaveLength(1);
  });

  it("rejects inverted project periods and bad paths", () => {
    expect(
      validateEntries([entry({ projectPeriod: { start: "2018", end: "2015" } })])
    ).toHaveLength(1);
    expect(validateEntries([entry({ path: "projects/example/" })])).toHaveLength(1);
  });
});

describe("ordering", () => {
  const a = entry({ slug: "a", path: "/projects/a", publishedAt: "2026-01-01" });
  const b = entry({ slug: "b", path: "/projects/b" });
  const c = entry({ slug: "c", path: "/projects/c", publishedAt: "2026-06-01" });
  const d = entry({ slug: "d", path: "/projects/d" });
  const draft = entry({
    slug: "e",
    path: "/projects/e",
    publishedAt: "2026-09-01",
    status: "draft",
  });
  const other = entry({ slug: "f", path: "/about", publishedAt: "2026-07-01" });

  it("sorts dated newest-first, then undated in declaration order", () => {
    expect(sortEntries([b, a, d, c]).map((e) => e.slug)).toEqual(["c", "a", "b", "d"]);
  });

  it("excludes drafts from published listings and the feed", () => {
    const all = [a, b, c, d, draft, other];
    expect(getPublishedEntries(all).map((e) => e.slug)).not.toContain("e");
    expect(getFeedEntries(all).map((e) => e.slug)).toEqual(["f", "c", "a"]);
  });

  it("limits the project index to /projects/ pages", () => {
    expect(getProjectIndexEntries([a, other]).map((e) => e.slug)).toEqual(["a"]);
  });
});

describe("formatting", () => {
  it("formats project periods with explicit semantics", () => {
    expect(formatProjectPeriod({ start: "2015", end: "2018" })).toBe("2015–2018");
    expect(formatProjectPeriod({ start: "2022", ongoing: true })).toBe("2022–present");
    expect(formatProjectPeriod({ start: "2022" })).toBe("from 2022");
    expect(formatProjectPeriod({ start: "2020-03", end: "2020-11" })).toBe("2020");
    expect(formatProjectPeriod(undefined)).toBeUndefined();
  });

  it("formats dates without timezone drift", () => {
    expect(formatDisplayDate("2026-01-01")).toBe("January 1, 2026");
  });

  it("validates ISO dates", () => {
    expect(isIsoDate("2024-02-29")).toBe(true);
    expect(isIsoDate("2023-02-29")).toBe(false);
  });
});
