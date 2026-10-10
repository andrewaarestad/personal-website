import type { Metadata } from "next";
import Link from "next/link";
import { getPageMetadata } from "@/lib/publishing/metadata";
import { ContentMeta } from "@/components/content-meta";
import { ContentJsonLd } from "@/components/json-ld";
import {
  PostLayout,
  H1Section,
  H2Section,
  TextSection,
  DataVisualizationSection,
} from "@/components/post-layout";
import { GitHubButton } from "@/components/ui/github-button";
import { RevealSimulator } from "@/components/vrnft/RevealSimulator";

const PAGE_PATH = "/projects/vrnft";

export const metadata: Metadata = getPageMetadata(PAGE_PATH);

const REPO_URL = "https://github.com/andrewaarestad/vrnft";

const codeBlockClass =
  "my-6 overflow-x-auto rounded-md bg-surface border border-border-light p-4 text-body text-text-primary font-mono";
const paragraphClass = "text-body-lg text-text-secondary leading-relaxed";

export default function VrnftPage() {
  return (
    <PostLayout>
      {[
        <div key="title" className="mb-8">
          <ContentJsonLd path={PAGE_PATH} />
          <H1Section text="vrnft" />
          <ContentMeta path={PAGE_PATH} className="mt-6" />
        </div>,

        <TextSection key="intro">
          <p className={paragraphClass}>
            vrnft is a sample NFT contract with a verifiably random rarity reveal. I built it out of
            frustration with how NFT drops worked in 2021.
          </p>
          <p className={paragraphClass}>
            The pattern was always the same. A collection mints with every token hidden, and once it
            sells out the project &quot;reveals&quot; which tokens are rare. On paper that&apos;s a
            lottery. In practice the rarity map was usually generated before the mint even started,
            which meant the founders could know exactly which token IDs were going to be valuable
            and make sure their friends ended up holding them. Every big reveal seemed to come with
            a round of insider accusations, and there was no way for a buyer to tell whether they
            were justified.
          </p>
          <p className={paragraphClass}>
            I wanted to show that a reveal could be done so that nobody, the founders included,
            could know the rarity of any token until it was revealed for everyone at once.
          </p>
        </TextSection>,

        <DataVisualizationSection
          key="simulator"
          title="Try both reveals"
          description="Mint the collection, then reveal it. In the typical reveal the rarity map exists from the start, so the founder's view can see it and insiders can mint the rare tokens first. In the vrnft reveal there is nothing to see until a random seed arrives."
        >
          <RevealSimulator />
        </DataVisualizationSection>,

        <div key="github-top" className="text-center">
          <GitHubButton text="View on GitHub" url={REPO_URL} />
        </div>,

        <H2Section key="typical-heading" text="How a reveal usually worked" />,

        <TextSection
          key="typical"
          text={`Most collections generated their art and traits
            off-chain ahead of time, assigned them to token IDs,
            and uploaded the metadata somewhere the contract would
            point to after the reveal. The reveal itself was just
            the project switching that pointer on.

            That puts the whole rarity map in the hands of whoever
            generated it, before a single token is sold. Even if
            the team behaves perfectly, buyers have to take their
            word for it. And a team that wants to reward early
            supporters, or itself, only has to mint the right IDs
            before the public sale opens.`}
        />,

        <H2Section key="mechanism-heading" text="A reveal nobody can see coming" />,

        <TextSection key="mechanism">
          <p className={paragraphClass}>
            vrnft flips the order. Tokens mint as plain sequential IDs with no rarity attached,
            because no rarity exists yet. Once the collection sells out, the owner calls{" "}
            <code>reveal()</code>, which asks Chainlink VRF for a single random number. VRF answers
            in a later transaction with the number and a cryptographic proof that it wasn&apos;t
            chosen or tampered with by anyone, including the oracle.
          </p>
          <p className={paragraphClass}>
            When that number arrives, the contract expands it into one value per token and runs a
            Fisher–Yates shuffle over the collection. Every token ends up with a unique rarity rank,
            and the rank maps to a tier:
          </p>
          <pre className={codeBlockClass}>
            {`rank 1–10       Legendary
rank 11–100     Rare
rank 101–1000   Uncommon
rank 1001+      Common`}
          </pre>
          <p className={paragraphClass}>
            The owner still decides when to reveal, but not what the reveal produces. And because
            the seed is public and the shuffle is deterministic, anyone can recompute the whole
            rarity map from the seed and check it against what the contract says.
          </p>
          <p className={paragraphClass}>
            It&apos;s the same problem I ran into with the scrambles in{" "}
            <Link href="/projects/mevcube">mevcube</Link>: a blockchain can&apos;t produce
            randomness on its own, so anything that needs to be fair has to bring it in from
            somewhere it can be verified.
          </p>
        </TextSection>,

        <H2Section key="cost-heading" text="What it costs" />,

        <TextSection
          key="cost"
          text={`Verifiable randomness isn't free. Each VRF request
            costs LINK, 0.1 per reveal in this contract, so the
            contract has to hold LINK before it can reveal. The
            request is also asynchronous: reveal() only asks, and
            the collection stays unrevealed until the oracle
            answers in a separate transaction.

            That makes it awkward to test. A local chain has no
            oracle to answer the request, so the tests ran against
            a fork of Ethereum mainnet, swapping ETH for LINK
            through Uniswap to fund the contract first.`}
        />,

        <H2Section key="market-heading" text="Nobody was asking for this" />,

        <TextSection
          key="market"
          text={`I never deployed a collection on top of vrnft, and
            the reason wasn't technical. The more I looked at the
            market, the clearer it was that there wasn't one for a
            fairer reveal.

            NFT buyers mostly followed the people driving the
            projects: the artists and influencers with an audience.
            If a popular artist announced a drop, it sold out, and
            nobody cared which contract it ran on or how the
            reveal worked. Fairness was a feature I cared about,
            not one buyers were willing to choose a project for.`}
        />,

        <div key="github-bottom" className="text-center">
          <GitHubButton text="View on GitHub" url={REPO_URL} />
        </div>,
      ]}
    </PostLayout>
  );
}
