import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContentMeta } from "../content-meta";
import type { ContentEntry } from "@/content";

const entry: ContentEntry = {
  slug: "example",
  path: "/projects/example",
  kind: "project",
  title: "Example",
  summary: "Summary",
  authors: [{ name: "Andrew Aarestad" }],
  tags: ["IoT", "hardware"],
  projectPeriod: { start: "2015", end: "2018" },
};

describe("ContentMeta", () => {
  it("labels the project period separately and omits unknown publication dates", () => {
    render(<ContentMeta entry={entry} />);
    expect(screen.getByText("Project")).toBeInTheDocument();
    expect(screen.getByText("By Andrew Aarestad")).toBeInTheDocument();
    expect(screen.getByText("Project: 2015–2018")).toBeInTheDocument();
    expect(screen.queryByText(/Published/)).not.toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Tags" })).toHaveTextContent("IoT");
  });

  it("shows verified publication and update dates with machine-readable <time>", () => {
    const { container } = render(
      <ContentMeta entry={{ ...entry, publishedAt: "2026-05-22", updatedAt: "2026-07-16" }} />
    );
    expect(screen.getByText(/Published/)).toHaveTextContent("Published May 22, 2026");
    expect(screen.getByText(/Updated/)).toHaveTextContent("Updated July 16, 2026");
    const times = Array.from(container.querySelectorAll("time")).map((t) =>
      t.getAttribute("dateTime")
    );
    expect(times).toEqual(["2026-05-22", "2026-07-16"]);
  });

  it("renders the registered entry for a page path", () => {
    render(<ContentMeta path="/projects/fluid-water-meter" />);
    expect(screen.getByText("Project: 2015–2018")).toBeInTheDocument();
  });
});
