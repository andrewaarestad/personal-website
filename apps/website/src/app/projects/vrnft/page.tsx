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
            vrnft is a sample NFT contract with a verifiably random rarity reveal. I built it as an
            experiment with randomness in a blockchain setting. It was also a proof that there is a
            better way to do NFT drops in 2021.
          </p>
          <p className={paragraphClass}>
            If you paid attention to the space at that time you will remember the pattern: a new
            collection would get hyped, buyers would go and mint all the tokens, then they would do
            the big reveal. The reveal was a map that said which tokens were rare and what
            attributes they had. If you were lucky the tokens you minted would be at the top of the
            chart.
          </p>
          <p className={paragraphClass}>
            The problem: collection founders could get a sneak peek at the map. Seems crazy in
            retrospect but it was standard practice for collections to use rarity maps that were
            essentially just a spreadsheet the founders would upload. In other words, even if they
            acted with complete honesty, there was no way for the community to be confident that no
            insider trading had taken place.
          </p>
          <p className={paragraphClass}>
            I wanted to show that a reveal could be done so that nobody could know the rarity of any
            token until the reveal, and it could be provably random.
          </p>
        </TextSection>,

        <DataVisualizationSection
          key="simulator"
          title="Try both reveals"
          description="Mint the collection below, then reveal it. In the typical reveal the rarity map existed from the start, so the founders can see it and insiders can acquire the rare tokens first. In the vrnft reveal there is nothing to see until the random seed is generated."
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
            the project locking in that pointer.

            Since they controlled the rarity map pre-reveal,
            duplicitous founders could steer their friends toward
            the valuable tokens. Sometimes this meant minting
            specific tokens, other times it meant buying valuable
            tokens second-hand before the reveal. It was not
            uncommon for projects to have accusations of insider
            trading, with wallets suspiciously holding multiple
            valuable mints or OpenSea purchases.`}
        />,

        <H2Section key="mechanism-heading" text="A reveal nobody can game" />,

        <TextSection key="mechanism">
          <p className={paragraphClass}>
            vrnft flips the order. Tokens mint as plain sequential IDs with no rarity attached. Once
            the collection sells out, the owner calls <code>reveal()</code>, which asks Chainlink
            VRF for a single random number. VRF answers in a later transaction with the number and a
            cryptographic proof that it wasn&apos;t chosen or tampered with by anyone, including the
            oracle.
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
            the seed is public, the shuffle is deterministic, and the contract is open, anyone can
            verify that the rarity was not gamed.
          </p>
          <p className={paragraphClass}>
            It&apos;s the same mechanism I explored with the cube scrambles in{" "}
            <Link href="/projects/mevcube">mevcube</Link>: a blockchain can&apos;t produce
            randomness, so any reordering done will be pseudorandom without some external seed.
          </p>
        </TextSection>,

        <H2Section key="cost-heading" text="What it costs" />,

        <TextSection key="cost">
          <p className={paragraphClass}>
            Verifiable randomness isn&apos;t free. Each VRF request is serviced by the Chainlink
            oracles, so the contract has to hold LINK tokens before it can reveal. The request is
            asynchronous: <code>reveal()</code> pays for the seed in one transaction, and the
            collection stays unrevealed until the oracle answers in a separate transaction.
          </p>
          <p className={paragraphClass}>
            That makes it awkward to test. A local chain has no oracle to answer the request, so I
            tested against a fork of Ethereum mainnet, swapping ETH for LINK through Uniswap to fund
            the contract first.
          </p>
        </TextSection>,

        <H2Section key="market-heading" text="Nobody was asking for this" />,

        <TextSection
          key="market"
          text={`I still think this is a useful concept, but it
            never got used in a serious collection.

            At the end of the day, NFT buyers mostly followed the
            people driving the projects: the artists and
            influencers with an audience. If a popular artist
            announced a drop, it sold out, and nobody cared which
            contract it ran on or how the reveal worked.`}
        />,

        <div key="github-bottom" className="text-center">
          <GitHubButton text="View on GitHub" url={REPO_URL} />
        </div>,
      ]}
    </PostLayout>
  );
}
