import type { Metadata } from "next";
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

        <TextSection
          key="intro"
          text={`mevcube was a single Rubik's cube that lived in a
            smart contract. There was exactly one of it, anyone
            could turn it, and its state was whatever the chain
            said it was. The rules fit in a sentence: solve the
            cube if it needs solving, or scramble it if it's
            already solved.

            The cube was the game, but it wasn't really the
            point. I wanted to see whether a game mechanic could
            be wired into an on-chain incentive mechanism so that
            the two pulled in the same direction — specifically,
            whether the clout of solving a puzzle in public could
            hold its own against the purely financial incentives
            that drive MEV bots. Underneath that sat a question I
            kept coming back to: how do you scramble a puzzle
            fairly on a machine that, by design, can't do
            anything random?`}
        />,

        <DataVisualizationSection
          key="cube"
          title="The cube"
          description="The original front end's visualization, running locally with no chain behind it. Drag a face to turn a layer, drag the background to orbit."
        >
          <MevCube />
        </DataVisualizationSection>,

        <div key="github-top" className="flex flex-wrap justify-center gap-4">
          <GitHubButton text="Contracts" url={CONTRACTS_URL} />
          <GitHubButton text="Front end" url={FRONTEND_URL} />
        </div>,

        <H2Section key="state-heading" text="A cube in 54 bytes" />,

        <TextSection key="state">
          <p className={paragraphClass}>
            The whole puzzle is a 54-byte string in contract storage — one byte per sticker, six
            faces of nine, each byte a face letter. A solved cube looks like this:
          </p>
          <pre className={codeBlockClass}>
            {"UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB"}
          </pre>
          <p className={paragraphClass}>
            Every turn of a layer is just a permutation of those indices. The contract stores each
            move as a handful of 4-cycles — the four stickers that trade places as the layer rotates
            — and applies them in place. An uppercase letter turns a layer one way and lowercase
            turns it back, so a player submits a whole sequence as one string:
          </p>
          <pre className={codeBlockClass}>{'move("RUrURUUr")'}</pre>
          <p className={paragraphClass}>
            Checking for a solution is cheap: if five faces are each a single color, the sixth has
            to be too, so <code>isSolved()</code> only walks five of them. Keeping the state this
            dumb meant the front end and the contract could agree on it byte-for-byte, and the 3D
            view above is just a renderer for that string.
          </p>
        </TextSection>,

        <H2Section key="loop-heading" text="The incentive loop" />,

        <TextSection
          key="loop"
          text={`A puzzle that stays solved isn't a game, so the
            contract needed a reason for someone to mess it up
            again. Every call to move() required a fixed solver
            fee (0.1 MATIC), which stayed in the contract.
            scramble() could only be called on a solved cube; it
            applied 30 pseudo-random turns and paid the entire
            contract balance to whoever called it.

            That closes the loop. Solvers pay to play and get
            nothing on-chain for it except a Solved event with
            their address and their solution — a spot on the
            leaderboard. Scramblers get paid, and they're
            competing for a pot that grows with every attempt.
            Scrambling is mechanical, which made it exactly the
            kind of job I expected bots to take: watch for a
            solved cube, race to call scramble(), collect.`}
        />,

        <H2Section key="random-heading" text="Pseudorandom scrambling" />,

        <TextSection key="random">
          <p className={paragraphClass}>
            A blockchain is deterministic on purpose: every node replays every transaction and has
            to arrive at exactly the same state. That rules out real randomness. What a contract can
            do is hash inputs that are hard to choose in advance and treat the output as if it were
            random. <code>scramble()</code> seeds itself from the caller&apos;s address and the
            current block number, hashes that seed together with the move index for each of 30
            turns, and maps each hash onto one of the nine layers:
          </p>
          <pre className={codeBlockClass}>
            {`seed = encode(4, msg.sender, block.number)
for i in 0..29:
    layer = uniform(keccak256(seed, i), 9)
    turn(layer)`}
          </pre>
          <p className={paragraphClass}>
            The <code>uniform</code> step is a small library by Brendan Asselstine that re-hashes
            any value that would bias the modulo, so all nine layers come up equally often. The
            result looks random. It isn&apos;t: the entire scramble is fixed the moment the inputs
            are known, and anyone can simulate it before the transaction lands. A scrambler can even
            shop for a scramble they like by trying different addresses or waiting for a different
            block.
          </p>
          <p className={paragraphClass}>
            The commit history is a short tour of how easy this is to get wrong. The first version
            hashed the literal string <code>&quot;Hello&quot;</code>, so every scramble was the same
            scramble. The next derived one seed per call and reused it for every turn, which turned
            the same layer 30 times. Mixing the move index into each hash fixed that. Along the way
            I also tried drawing the number of turns from a bell curve, borrowing a trick from the
            Gaussian Protocol NFT project: sum sixteen pseudorandom bytes and let the central limit
            theorem do the rest. My port passed the same offset on all sixteen draws, so it summed
            one byte sixteen times and produced no bell curve at all. It was replaced by a fixed 30
            turns, which is more than any position needs to be solved.
          </p>
          <p className={paragraphClass}>
            The principled fix is a verifiable randomness oracle such as Chainlink VRF, which
            returns a random value together with a proof that it wasn&apos;t tampered with. I was
            working with VRF on a separate project, an NFT collection whose rarity was locked in by
            a VRF reveal, and found it hard to get working. Requests are asynchronous and answered
            in a later transaction, each one costs LINK, and a local test chain has no oracle node
            to answer them. It never made it into mevcube. For a cube, predictable scrambles are
            mostly harmless, since scrambling is just a reset. Once randomness decides who gets
            paid, where it comes from matters a lot more.
          </p>
        </TextSection>,

        <H2Section key="mev-heading" text="Where the MEV comes in" />,

        <TextSection
          key="mev"
          text={`MEV — maximal extractable value — is the profit
            available to whoever controls or can influence
            transaction ordering. On a public chain, a pending
            transaction sits in the mempool for everyone to
            read before it's mined.

            mevcube left that door open on purpose. A solution
            is just calldata, so the moment a player broadcasts
            one, any bot watching the mempool can copy it,
            outbid the gas, and land the solve first. The
            scramble bounty has the same shape: once a solving
            move is pending, a bot can line up a scramble() to
            land right behind it in the same block.

            So the experiment was a question of which incentive
            wins. A bot that steals a solution pays the same fee
            the player would have and earns nothing directly —
            the only payoff is the leaderboard entry, which is
            worthless to a bot. The bounty is the only real money
            in the system, and it flows to whoever resets the
            board for the next player. If the design worked, bots
            would end up doing the janitorial work of scrambling
            while humans competed for credit. If it didn't, the
            whole thing would collapse into bots front-running
            each other.`}
        />,

        <H2Section key="stack-heading" text="How it was built" />,

        <TextSection
          key="stack"
          text={`The contract is Solidity 0.8, developed and tested
            with Hardhat — most of the test suite is just
            asserting that each move produces the right sticker
            permutation, because an off-by-one there quietly
            corrupts the cube forever. It was deployed to
            Polygon's Mumbai testnet, where transactions were
            cheap enough to make a per-move fee feel like a game
            mechanic rather than a tax.

            The front end is React with Redux, ethers and web3
            for wallet and contract access, and three.js for the
            cube. It polled the contract for state and recent
            Solved events, let you explore moves locally before
            committing to them, and then submitted the sequence
            as a single transaction. The 3D cube is adapted from
            Aaron Bird's open-source rubiks-cube visualization,
            reworked to read and write the contract's string
            format.`}
        />,

        <div key="github-bottom" className="flex flex-wrap justify-center gap-4">
          <GitHubButton text="Contracts" url={CONTRACTS_URL} />
          <GitHubButton text="Front end" url={FRONTEND_URL} />
        </div>,
      ]}
    </PostLayout>
  );
}
