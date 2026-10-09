import { describe, it, expect } from "vitest";
import sitemap from "../sitemap";
import robots from "../robots";
import { GET } from "../feed.xml/route";

describe("sitemap", () => {
  const urls = sitemap().map((entry) => entry.url);

  it("lists canonical www URLs for public pages", () => {
    expect(urls).toEqual(
      expect.arrayContaining([
        "https://www.andrewaarestad.com",
        "https://www.andrewaarestad.com/projects",
        "https://www.andrewaarestad.com/projects/rna-decay-kinetics",
        "https://www.andrewaarestad.com/projects/fluid-water-meter",
        "https://www.andrewaarestad.com/projects/ambient-temperature-estimation",
        "https://www.andrewaarestad.com/design-process",
      ])
    );
    expect(urls.every((url) => url.startsWith("https://www.andrewaarestad.com"))).toBe(true);
  });

  it("excludes drafts and has no duplicates", () => {
    expect(urls).not.toContain("https://www.andrewaarestad.com/projects/sample-post");
    expect(new Set(urls).size).toBe(urls.length);
  });
});

describe("robots", () => {
  it("points at the canonical sitemap", () => {
    expect(robots().sitemap).toBe("https://www.andrewaarestad.com/sitemap.xml");
  });
});

describe("/feed.xml", () => {
  it("serves well-formed RSS", async () => {
    const response = GET();
    expect(response.headers.get("Content-Type")).toContain("application/rss+xml");
    const doc = new DOMParser().parseFromString(await response.text(), "application/xml");
    expect(doc.getElementsByTagName("parsererror")).toHaveLength(0);
    expect(doc.documentElement.tagName).toBe("rss");
  });
});
