import type { Metadata } from "next";
import {
  PostLayout,
  H1Section,
  H2Section,
  TextSection,
  ImageSection,
} from "@/components/post-layout";
import { ExternalLinkButton } from "@/components/ui/external-link-button";

export const metadata: Metadata = {
  title: "Modeling RNA Decay Kinetics - Andrew Aarestad",
  description:
    "Cross-functional ML and modeling work with the Ameres lab at Max Perutz Labs: fitting reaction-kinetic models to high-throughput RNA tailing data to reveal how the enzyme Tailor encodes RNA decay competence.",
};

const PREPRINT_URL = "https://www.biorxiv.org/content/10.64898/2026.03.27.714668v1";

export default function RnaDecayKineticsPage() {
  return (
    <PostLayout>
      {[
        <div key="title" className="mb-8">
          <H1Section text="Modeling RNA Decay Kinetics" />
        </div>,

        <TextSection
          key="intro"
          text={`Starting in 2022, I have been collaborating with a team at the Ameres
            lab at Max Perutz Labs in Vienna on a study of how
            cells decide which RNAs to throw away. My role on
            the project was cross-functional ML and model engineering:
            I worked directly with the experimentalists to
            translate their time-course assays into a kinetic
            model, refined the model with them as the data
            came in, and built the implementation that scaled
            it from a single substrate to the 4,096 unique
            sequences they ran in parallel. The kinetic modeling was a
            three-person effort (with David Mörsdorf and
            Benjamin Jordan), and the resulting framework
            underpins much of the paper's analysis.`}
        />,

        <div key="preprint-top" className="text-center">
          <ExternalLinkButton text="Read the preprint on bioRxiv" url={PREPRINT_URL} />
        </div>,

        <H2Section key="problem-heading" text="The Problem" />,

        <TextSection
          key="problem"
          text={`The biology, at a high level: an enzyme called
            Tailor modifies RNA molecules by adding short runs
            of nucleotides to their 3' ends one at a time,
            and the lab wanted to understand the kinetics of
            that process in detail. The experimental setup ran
            tailing reactions on 4,096 distinct RNA substrates
            in parallel, sampling and sequencing the products
            at a series of timepoints. The result was a
            time-resolved distribution over intermediate states
            (U₀, U₁, U₂, … U₁₀) for every substrate.

            Buried in that data are the per-step rate constants
            k₁ through k₁₀ — how fast Tailor adds the first
            nucleotide, the second, and so on — but you can
            only recover them by fitting a kinetic model. That
            was my piece of the project: a model and an
            implementation that could pull step-resolved rate
            constants out of the time-course data, for all
            4,096 substrates, fast enough to iterate on.`}
        />,

        <H2Section key="approach-heading" text="The Approach" />,

        <TextSection
          key="approach"
          text={`We modeled uridylation as a chain of
            irreversible pseudo-first-order reactions
            (Uₙ → Uₙ₊₁), giving a small system of ODEs per
            substrate with ten unknown rate constants. For each
            of the 4,096 substrates we solved the ODEs
            numerically with a 4th–5th order Runge-Kutta
            integrator and fit the ten rate constants by
            constrained nonlinear least squares
            (Nelder-Mead simplex) against the sequencing time
            series. Across replicates and experimental
            conditions that's tens of thousands of independent
            fits, so the inner solver had to be fast: I built
            it in C++ on top of Boost.odeint and NLOpt, then
            wrapped it in TypeScript and Python so the rest of
            the team could orchestrate runs, prep data, and
            slice results without touching the C++. The fits
            converged stably across the substrate pool, which
            is what made the downstream analysis possible.`}
        />,

        <ImageSection
          key="residuals-image"
          imageUrl="/img/ACGATC_6NTailing_residuals.png"
          alt="Model fit and residuals for the ACGATC substrate, showing measured intermediate fractions over time and the fitted first-order kinetic curves."
        />,

        <H2Section key="result-heading" text="Why this approach mattered" />,

        <TextSection
          key="result"
          text={`Step-resolved rate constants are a different
            object than the bulk averages you get from the raw
            time courses. With one rate constant per step per
            substrate, you can compare how an enzyme behaves
            on its first nucleotide addition versus its fifth,
            line that up against substrate features, and ask
            whether the kinetics are constant or change as
            the reaction proceeds — questions that aren't
            answerable from bulk data alone. The interesting
            biological patterns in the paper live in that
            higher-resolution view, and the fitted rate
            constants are what made that view possible. The
            specific findings are best read in the preprint.`}
        />,

        <H2Section key="status-heading" text="Status" />,

        <TextSection
          key="status"
          text={`The paper is currently a preprint on bioRxiv
            and hasn't yet been through peer review. The
            modeling code will be linked here once the
            project's repository is public — for now, the
            preprint is the best entry point.`}
        />,

        <div key="preprint-bottom" className="text-center">
          <ExternalLinkButton text="Read the preprint on bioRxiv" url={PREPRINT_URL} />
        </div>,
      ]}
    </PostLayout>
  );
}
