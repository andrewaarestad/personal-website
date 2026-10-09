import { DEFAULT_AUTHOR } from "@/lib/site";
import type { ContentEntry } from "./types";

/**
 * Publishing registry: the single source of truth for page metadata.
 *
 * Plain data only — never import page or interactive components here.
 *
 * Dates policy (see docs/DATE_VERIFICATION.md):
 * - `publishedAt` is set only when the original public publication date is
 *   verified. Never fall back to the build, commit, project-start or current date.
 * - `projectPeriod` records when the work happened, sourced from the page copy.
 *
 * Declaration order is the display order for entries without `publishedAt`.
 */
export const contentEntries: readonly ContentEntry[] = [
  {
    slug: "rna-decay-kinetics",
    path: "/projects/rna-decay-kinetics",
    kind: "research",
    title: "Modeling RNA Decay Kinetics",
    summary:
      "Cross-functional ML and modeling work with the Ameres lab at Max Perutz Labs: fitting reaction-kinetic models to RNA tailing data.",
    listingSummary:
      "Cross-functional ML and modeling work with the Ameres lab at Max Perutz Labs. Built the C++/TypeScript/Python pipeline that fit reaction-kinetic models to high-throughput RNA tailing data across 4,096 substrates, revealing how the enzyme Tailor encodes RNA decay competence.",
    // Page copy: "Starting in 2022, I have been collaborating…". End/ongoing unconfirmed.
    projectPeriod: { start: "2022" },
    authors: [DEFAULT_AUTHOR],
    tags: ["kinetic modeling", "computational biology", "C++"],
    paperUrl: "https://www.biorxiv.org/content/10.64898/2026.03.27.714668v1",
    image: {
      url: "/img/ACGATC_6NTailing_residuals.png",
      alt: "Model fit and residuals for an RNA tailing substrate, showing fitted first-order kinetic curves over measured time-course data.",
      fit: "contain",
    },
  },
  {
    slug: "fluid-water-meter",
    path: "/projects/fluid-water-meter",
    kind: "project",
    title: "FLUID Water Meter",
    summary:
      "I cofounded a hardware startup to build an ultrasonic water meter for homes. We built a full IoT platform from sensor firmware to cloud ML, and learned the hard way that great technology isn't enough.",
    listingSummary:
      "Co-founded an IoT platform to detect water leaks in homes before they became expensive disasters. Built ultrasonic flow meter, telemetry infrastructure, app/web platforms, ML models and other fun stuff.",
    // Page copy: "I cofounded FLUID in 2015…" and "…the company wound down in 2018."
    projectPeriod: { start: "2015", end: "2018" },
    authors: [DEFAULT_AUTHOR],
    tags: ["IoT", "hardware", "signal processing", "machine learning"],
    repositoryUrl: "https://github.com/andrewaarestad/fluid-code",
    image: {
      url: "/img/kickstarter_meter.jpg",
      alt: "FLUID Water Meter - IoT water monitoring platform",
    },
  },
  {
    slug: "ambient-temperature-estimation",
    path: "/projects/ambient-temperature-estimation",
    kind: "project",
    title: "Ambient Temperature Estimation",
    summary:
      "A physics-based thermal estimator that recovers ambient temperature from device temperature alone, calibrated in Python and deployed in C++ to edge devices.",
    listingSummary:
      "Multi-sensor data fusion system for ambient temperature estimation. Combined physical/statistical modeling with edge inference to create a network of weather stations using cell phones. Open sourced the key tech.",
    // Project period not stated in page copy — needs owner confirmation.
    authors: [DEFAULT_AUTHOR],
    tags: ["embedded", "physical modeling", "C++", "open source"],
    repositoryUrl: "https://github.com/parameter-estimation/ambient-temperature-estimation",
    image: {
      url: "/img/ambient_calibration.png",
      alt: "Ambient Temperature Estimation",
      fit: "contain",
    },
  },
  {
    slug: "design-process",
    path: "/design-process",
    kind: "article",
    title: "Design Process",
    summary:
      "A transparent look at building a personal website using design-first workflows and AI-assisted development. Explore the phases, mood boards, and the meta-project of showcasing web development through a developer's personal site.",
    authors: [DEFAULT_AUTHOR],
    tags: ["design systems", "AI-assisted development", "Next.js"],
    repositoryUrl: "https://github.com/andrewaarestad/personal-website",
  },
  {
    slug: "sample-post",
    path: "/projects/sample-post",
    kind: "article",
    title: "Sample Post - PostLayout Demo",
    summary:
      "A demonstration of the PostLayout system showcasing all available section types and layouts.",
    authors: [DEFAULT_AUTHOR],
    tags: [],
    // Component demo, not editorial content: kept out of listings, feed and sitemap.
    status: "draft",
  },
];
