import { DEFAULT_AUTHOR } from "@/lib/site";
import type { ContentEntry } from "./types";

/**
 * Publishing registry: the single source of truth for page metadata.
 *
 * Plain data only — never import page or interactive components here.
 *
 * Dates policy (see docs/DATE_VERIFICATION.md):
 * - `publishedAt` is set only when the original publication date is confirmed.
 *   For legacy pages the owner confirmed the commit that landed the substantive
 *   page. Never fall back to the build, project-start or current date.
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
    // Commit date of the full page (#42), confirmed by the owner as the publication date.
    publishedAt: "2026-05-22",
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
    // Full article (#33). The earlier #26 version was a short overview page.
    publishedAt: "2025-11-18",
    // Narrative rewrite (#43): wind-down date and corrected claims.
    updatedAt: "2026-07-16",
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
    // Full article (#42). Earlier versions were a "Coming Soon" placeholder.
    publishedAt: "2026-05-22",
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
    slug: "mevcube",
    path: "/projects/mevcube",
    kind: "experiment",
    title: "mevcube",
    summary:
      "A single Rubik's cube stored in a smart contract: an experiment in whether leaderboard clout could offset MEV bot incentives, and in how to scramble fairly on a deterministic machine.",
    listingSummary:
      "One shared Rubik's cube whose state lived on-chain. Solvers paid a fee for leaderboard clout; the fees funded a bounty for bots to re-scramble it. An experiment in aligning incentive mechanisms with game mechanics, and in pseudorandom scrambling on-chain.",
    // publishedAt: set to the merge date of the PR that lands this page.
    // Commit history in both repos runs Feb–Jun 2022.
    projectPeriod: { start: "2022", end: "2022" },
    authors: [DEFAULT_AUTHOR],
    tags: ["Solidity", "MEV", "pseudorandomness", "mechanism design", "three.js"],
    repositoryUrl: "https://github.com/andrewaarestad/mevcube-contracts",
    image: {
      url: "/img/mevcube.png",
      alt: "A partially scrambled 3D Rubik's cube rendered with three.js.",
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
    // First commit of the page (#17).
    publishedAt: "2025-11-07",
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
