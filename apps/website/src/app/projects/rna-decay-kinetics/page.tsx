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
          text={`Through Sense AI, I collaborated with the Ameres
            lab at Max Perutz Labs in Vienna on a study of how
            cells decide which RNAs to throw away. My role on
            the project was cross-functional ML and modeling
            IC: I worked directly with the wet-lab scientists,
            took their experimental time-course data, iterated
            with them on the underlying mathematical model, and
            shipped the implementation that made it scale from
            a single substrate to the 4,096 unique sequences
            assayed in parallel. The kinetic modeling was a
            three-person effort (with David Mörsdorf and
            Benjamin Jordan), and the results are the
            quantitative spine of the paper.`}
        />,

        <div key="preprint-top" className="text-center">
          <ExternalLinkButton text="Read the preprint on bioRxiv" url={PREPRINT_URL} />
        </div>,

        <H2Section key="problem-heading" text="The Problem" />,

        <TextSection
          key="problem"
          text={`Cells flag broken or unwanted RNAs for
            destruction by tacking short strings of uridines
            ("U-tails") onto their 3' ends. An enzyme called
            Tailor adds those U's one at a time; a downstream
            nuclease called Dis3l2 reads the resulting tail and
            decides whether to chew the RNA up. The biological
            puzzle: Tailor doesn't just paste on a long poly-U
            tract, it produces short, surprisingly precise tails
            of about four U's. How does an enzyme that adds
            nucleotides one by one count to four?

            To answer that, the lab ran tailing reactions on
            4,096 distinct RNA substrates in parallel, sampled
            the products at a dozen timepoints, and sequenced
            them. The result was, for each substrate, a
            time-resolved distribution over intermediate states
            U₀, U₁, U₂, … U₁₀. Buried in that data are the
            per-step rate constants k₁ through k₁₀ — how fast
            Tailor adds the first uridine, the second, and so on
            — but you can only recover them by fitting a
            kinetic model.`}
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
            converged with RMSE under 0.06 across the full
            substrate pool, which is what made every downstream
            biological claim in the paper quantitative rather
            than qualitative.`}
        />,

        <ImageSection
          key="residuals-image"
          imageUrl="/img/ACGATC_6NTailing_residuals.png"
          alt="Model fit and residuals for the ACGATC substrate, showing measured intermediate fractions over time and the fitted first-order kinetic curves."
        />,

        <H2Section key="result-heading" text="What it revealed" />,

        <TextSection
          key="result"
          text={`Once we had per-step rate constants for every
            substrate, a striking pattern fell out: Tailor's
            kinetics aren't constant. The fits showed a
            reproducible "burst-halt-ramp" signature — the
            first couple of uridines go on fast (burst), the
            third and fourth go on much more slowly (halt),
            and only after that does processive elongation
            take over (ramp). The slowdown is where the
            "count" happens. By engineering substrates that
            already carried pre-installed U's at the 3' end,
            we showed the halt tracks the number of uridines
            already present, not the substrate sequence — the
            enzyme is sensing its own product. That's the
            mechanism behind the short, discrete tails
            Dis3l2 needs to commit an RNA to decay. None of
            this is visible in the bulk data; it only emerges
            once you have step-resolved rate constants on
            thousands of substrates.`}
        />,

        <H2Section key="bonus-heading" text="A second model" />,

        <TextSection
          key="bonus"
          text={`A separate piece of the modeling work
            addressed why Tailor doesn't run away into long
            poly-U tails under realistic conditions. In the
            cell, Tailor sees not just UTP but also ATP, CTP,
            and GTP, and it occasionally mis-incorporates a
            non-uridine that effectively caps the tail. I
            built a chain-termination model that predicts
            average tail length given the observed
            mis-incorporation frequency. Under equal-NTP
            conditions the model matched the data well
            (R² = 0.76); under physiological NTP
            concentrations it predicted much longer tails
            than were actually observed (R² = 0.13). That
            mismatch wasn't a failure — it was the result.
            It established that chain termination alone can't
            account for the kinetic slowdown seen in cells;
            non-productive ATP binding also competes with
            UTP at the active site, and the model's failure
            is what quantifies that.`}
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
