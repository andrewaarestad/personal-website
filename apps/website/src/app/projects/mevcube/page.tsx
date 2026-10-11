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
import { MevCube } from "@/components/mevcube/MevCube";

const PAGE_PATH = "/projects/mevcube";

export const metadata: Metadata = getPageMetadata(PAGE_PATH);

const CONTRACTS_URL = "https://github.com/andrewaarestad/mevcube-contracts";
const FRONTEND_URL = "https://github.com/andrewaarestad/mevcube-frontend";

const codeBlockClass =
  "my-6 overflow-x-auto rounded-md bg-surface border border-border-light p-4 text-body text-text-primary font-mono";
const paragraphClass = "text-body-lg text-text-secondary leading-relaxed";

export default function MevCubePage() {
  return (
    <PostLayout>
      {[
        <div key="title" className="mb-8">
          <ContentJsonLd path={PAGE_PATH} />
          <H1Section text="mevcube" />
          <ContentMeta path={PAGE_PATH} className="mt-6" />
        </div>,

        <TextSection key="intro">
          <p className={paragraphClass}>
            mevcube was a blockchain Rubik&apos;s cube puzzle. There was a single shared cube,
            anyone could turn it, and its state was managed by the smart contract. The rules were
            simple: solve the cube if it needs solving, or scramble it if it&apos;s already solved.
          </p>
          <p className={paragraphClass}>
            This project was an experiment with game mechanics and player incentives. I made this
            shortly after learning about MEV: the world of bots scanning the blockchain for
            arbitrage and frontrunning opportunities. If there were any value to be extracted I knew
            the bots would come. The question was, could this be put to any use?
          </p>
          <p className={paragraphClass}>
            The idea was to balance the incentives by having players pay to solve the puzzle. In
            exchange they would get the clout of solving a puzzle in public. On the other side were
            the bots who would seize the chance to grab a fee by scrambling the cube as soon as they
            saw a solution come through.
          </p>
          <p className={paragraphClass}>
            Wouldn&apos;t the players just scramble the cube immediately after solving it to take
            their fee back? My hypothesis was that MEV bots wouldn&apos;t allow this. MEV bots at
            the time had their fingers on the pulse of Ethereum blockchains and could reorder most
            transactions if it were profitable to do so. If someone solved the cube and immediately
            submitted a scramble transaction, a bot could reorder them to insert their own scramble.
          </p>
        </TextSection>,

        <H2Section key="cube-heading" text="The cube" />,

        <TextSection
          key="cube-intro"
          text={`To give some visualization to this puzzle I made a
            simple web3 frontend that allowed users to see the
            current cube state, connect a wallet, and queue up
            moves to send as a solution.`}
        />,

        <DataVisualizationSection
          key="cube"
          description="The original site is no longer around, but below is a reproduction of the front end without the web3 layer. Drag a face to turn a cube layer and drag the background to rotate. Your turns queue up below as the move() call you would have sent to the contract."
        >
          <MevCube />
        </DataVisualizationSection>,

        <div key="github-top" className="flex flex-wrap justify-center gap-4">
          <GitHubButton text="Contracts" url={CONTRACTS_URL} />
          <GitHubButton text="Front end" url={FRONTEND_URL} />
        </div>,

        <H2Section key="state-heading" text="Storing the cube state on-chain" />,

        <TextSection key="state">
          <p className={paragraphClass}>
            The whole puzzle is represented by a 54-byte string in contract storage, with one byte
            per sticker and six faces of nine stickers. A solved cube looks like this:
          </p>
          <pre className={codeBlockClass}>
            {"UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB"}
          </pre>
          <p className={paragraphClass}>
            Every turn of a layer is just a permutation of this string. The contract handles each
            move as a sequence of 4-cycles and applies them in place. An uppercase letter turns a
            layer one way and lowercase turns it back, so a player submits a whole sequence as one
            string:
          </p>
          <pre className={codeBlockClass}>{'move("RUrURUUr")'}</pre>
          <p className={paragraphClass}>
            The move sequence is what the pending transaction panel under the cube is building. The
            original front end let you build a set of moves and then submit the whole sequence as
            one call.
          </p>
        </TextSection>,

        <H2Section key="loop-heading" text="The incentive loop" />,

        <TextSection key="loop">
          <p className={paragraphClass}>
            A puzzle that stays solved isn&apos;t much fun, so the game needed a reason for someone
            to reset the puzzle. Every call to <code>move()</code> required a fixed solver fee (0.1
            MATIC), which stayed in the contract. <code>scramble()</code> could only be called on a
            solved cube; it applied 30 pseudo-random turns and paid out the entire contract balance
            to whoever called it.
          </p>
          <p className={paragraphClass}>
            So I wanted to create a push-pull mechanism. Solvers pay to play and get nothing for it
            except a Solved event and a spot on the leaderboard. Scramblers get paid, and
            they&apos;re competing for a pot that grows with every attempt. Scrambling takes no
            skill other than vigilance, which made it exactly the kind of job I expected bots to
            take: watch for a solved cube, race to call <code>scramble()</code>, profit.
          </p>
        </TextSection>,

        <H2Section key="random-heading" text="Pseudorandom scrambling" />,

        <TextSection key="random">
          <p className={paragraphClass}>
            A blockchain is deterministic. Every node/validator replays every transaction and has to
            agree on the updates to the global state. That rules out real randomness. What some
            contracts do is hash inputs that are hard to know in advance and treat the output like a
            random seed. <code>scramble()</code> uses things like the caller&apos;s address and the
            current block number, to build pseudorandom moves scrambling the cube:
          </p>
          <pre className={codeBlockClass}>
            {`seed = encode(4, msg.sender, block.number)
for i in 0..29:
    layer = uniform(keccak256(seed, i), 9)
    turn(layer)`}
          </pre>
          <p className={paragraphClass}>
            The <code>uniform</code> step is a small library by Brendan Asselstine that produces a
            uniform distribution over the cube layers.
          </p>
          <p className={paragraphClass}>
            To get true randomness, the solution is to use a verifiable randomness oracle such as
            Chainlink VRF, which returns a random value and a proof that it wasn&apos;t tampered
            with. I was working with VRF on a separate project,{" "}
            <Link href="/projects/vrnft">vrnft</Link>, a sample NFT contract whose rarity was locked
            in by a VRF reveal, but never brought that into mevcube. For the cube, predictable
            scrambles are mostly harmless, since incentives should be orthogonal.
          </p>
        </TextSection>,

        <H2Section key="mev-heading" text="Where the MEV comes in" />,

        <TextSection
          key="mev"
          text={`A bit more on this point. MEV means Maximal
            Extractable Value and refers to the profit available
            to whoever controls or can influence transaction
            ordering. On a public chain, a pending transaction
            sits in the mempool for everyone to read before it's
            mined.

            mevcube left that door open as an experiment to see
            what the asymptotic behavior of bots might be. A
            solution is just calldata, so the moment a player
            broadcasts one, any bot watching the mempool can copy
            it, outbid the gas, and land the solve first. The
            scramble bounty has the same situation: once a solving
            move is pending, a bot can line up a scramble() to
            land right behind it in the same block.

            At the end of the day I never expected this game to
            take off. Solving the cube isn't exactly rocket
            science so the actual clout produced is low. I think
            the law of blockchains is that once something gets
            popular it also gets botted to the max, so chances
            are good things would have fallen apart.

            Still, I think the mechanism here is interesting and
            could be adapted to more serious projects.`}
        />,

        <H2Section key="stack-heading" text="How it was built" />,

        <TextSection
          key="stack"
          text={`The contract is Solidity 0.8, developed and tested
            with Hardhat. It was deployed to Polygon's Mumbai
            testnet, where transactions were cheap and tokens were
            free(ish). I never got around to deploying it to
            mainnet which is a bummer because now Mumbai is gone
            and so is the game history.

            The front end is React with Redux, ethers and web3 for
            wallet and contract access, and three.js for the cube.
            The 3D cube is adapted from Aaron Bird's open-source
            rubiks-cube visualization, reworked to read and write
            the contract's string format.`}
        />,

        <div key="github-bottom" className="flex flex-wrap justify-center gap-4">
          <GitHubButton text="Contracts" url={CONTRACTS_URL} />
          <GitHubButton text="Front end" url={FRONTEND_URL} />
        </div>,
      ]}
    </PostLayout>
  );
}
