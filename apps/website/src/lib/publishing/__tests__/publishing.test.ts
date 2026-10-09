import { describe, it, expect } from "vitest";
import type { ContentEntry } from "@/content";
import { buildEntryMetadata, getPageMetadata } from "../metadata";
import { buildArticleJsonLd, serializeJsonLd } from "../json-ld";
import { buildRssFeed, escapeXml } from "../rss";

const base: ContentEntry = {
  slug: "example",
  path: "/projects/example",
  kind: "research",
  title: "Kinetics & <Models>",
  summary: 'Fitting "rate" constants & more.',
  authors: [{ name: "Andrew Aarestad", url: "https://www.andrewaarestad.com" }],
  tags: ["modeling", "C++"],
  projectPeriod: { start: "2022" },
  image: { url: "/img/example.png", alt: "Example" },
};

describe("buildEntryMetadata", () => {
  it("sets canonical, RSS alternate, Open Graph and Twitter fields", () => {
    const metadata = buildEntryMetadata(base);
    expect(metadata.title).toBe("Kinetics & <Models> - Andrew Aarestad");
    expect(metadata.description).toBe(base.summary);
    expect(metadata.alternates?.canonical).toBe("/projects/example");
    expect(metadata.alternates?.types).toHaveProperty("application/rss+xml");
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      url: "https://www.andrewaarestad.com/projects/example",
      images: [{ url: "/img/example.png", alt: "Example" }],
    });
    expect(metadata.openGraph).not.toHaveProperty("publishedTime");
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
    expect(metadata.robots).toBeUndefined();
  });

  it("includes verified dates and marks drafts noindex", () => {
    const metadata = buildEntryMetadata({
      ...base,
      publishedAt: "2026-05-22",
      updatedAt: "2026-07-16",
      status: "draft",
    });
    expect(metadata.openGraph).toMatchObject({
      publishedTime: "2026-05-22",
      modifiedTime: "2026-07-16",
    });
    expect(metadata.robots).toMatchObject({ index: false });
  });

  it("falls back to the existing default social image", () => {
    const metadata = buildEntryMetadata({ ...base, image: undefined });
    expect(metadata.openGraph).toMatchObject({ images: [{ url: "/img/andrew_head.jpg" }] });
    expect(metadata.twitter).toMatchObject({ card: "summary" });
  });

  it("throws for unregistered pages", () => {
    expect(() => getPageMetadata("/projects/does-not-exist")).toThrow(/No content registry entry/);
  });
});

describe("buildArticleJsonLd", () => {
  it("emits Article with canonical mainEntityOfPage and no invented dates", () => {
    const data = buildArticleJsonLd(base);
    expect(data).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: base.title,
      mainEntityOfPage: { "@id": "https://www.andrewaarestad.com/projects/example" },
      image: "https://www.andrewaarestad.com/img/example.png",
      author: [{ "@type": "Person", name: "Andrew Aarestad" }],
    });
    expect(data).not.toHaveProperty("datePublished");
    expect(data).not.toHaveProperty("dateModified");
  });

  it("uses BlogPosting for articles and includes known dates", () => {
    const data = buildArticleJsonLd({ ...base, kind: "article", publishedAt: "2026-05-22" });
    expect(data["@type"]).toBe("BlogPosting");
    expect(data.datePublished).toBe("2026-05-22");
  });

  it("serializes safely for inline <script> tags", () => {
    const json = serializeJsonLd({ headline: "</script><script>alert(1)</script> &  " });
    expect(json).not.toContain("<");
    expect(json).not.toContain(">");
    expect(json).not.toContain(" ");
    expect(JSON.parse(json).headline).toBe("</script><script>alert(1)</script> &  ");
  });
});

describe("buildRssFeed", () => {
  const parse = (xml: string) => new DOMParser().parseFromString(xml, "application/xml");

  it("produces well-formed XML with escaped, absolute, newest-first items", () => {
    const xml = buildRssFeed([
      { ...base, slug: "new", path: "/projects/new", publishedAt: "2026-06-01" },
      { ...base, slug: "old", path: "/projects/old", publishedAt: "2026-01-15" },
    ]);
    const doc = parse(xml);
    expect(doc.getElementsByTagName("parsererror")).toHaveLength(0);

    const items = Array.from(doc.getElementsByTagName("item"));
    expect(items.map((i) => i.getElementsByTagName("link")[0]?.textContent)).toEqual([
      "https://www.andrewaarestad.com/projects/new",
      "https://www.andrewaarestad.com/projects/old",
    ]);
    const first = items[0]!;
    expect(first.getElementsByTagName("title")[0]?.textContent).toBe(base.title);
    expect(first.getElementsByTagName("guid")[0]?.getAttribute("isPermaLink")).toBe("true");
    expect(first.getElementsByTagName("pubDate")[0]?.textContent).toBe(
      "Mon, 01 Jun 2026 00:00:00 GMT"
    );
    expect(doc.getElementsByTagName("lastBuildDate")[0]?.textContent).toBe(
      "Mon, 01 Jun 2026 00:00:00 GMT"
    );
  });

  it("omits undated entries and stays valid when empty", () => {
    const xml = buildRssFeed([base]);
    const doc = parse(xml);
    expect(doc.getElementsByTagName("parsererror")).toHaveLength(0);
    expect(doc.getElementsByTagName("item")).toHaveLength(0);
    expect(doc.getElementsByTagName("lastBuildDate")).toHaveLength(0);
  });

  it("is deterministic", () => {
    const entries = [{ ...base, publishedAt: "2026-06-01" }];
    expect(buildRssFeed(entries)).toBe(buildRssFeed(entries));
  });

  it("escapes XML special characters", () => {
    expect(escapeXml(`<a href="x">Tom & Jerry's</a>`)).toBe(
      "&lt;a href=&quot;x&quot;&gt;Tom &amp; Jerry&apos;s&lt;/a&gt;"
    );
  });
});
