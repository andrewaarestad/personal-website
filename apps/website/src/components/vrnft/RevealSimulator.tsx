"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  COLLECTION_SIZE,
  DEMO_TIERS,
  TIER_LABELS,
  TIER_ORDER,
  countTiers,
  emptyOwners,
  friendsHoldings,
  buyRaresSecondary,
  insiderTargets,
  mintInsider,
  mintPublic,
  mintedCount,
  randomSeed,
  rarityRanksFromSeed,
  sameMap,
  secondaryTargets,
  shortHex,
  tiersFromRanks,
  type Owner,
  type Tier,
} from "./lib/reveal";

export type ScenarioId = "insider-mint" | "secondary-buy" | "vrnft";

export interface RevealSimulatorProps {
  /** Classes for the outer wrapper. The simulator draws no card of its own. */
  className?: string;
}

type Phase = "minting" | "requesting" | "revealing" | "revealed";

const GRID_SIZE = Math.sqrt(COLLECTION_SIZE); // 10 × 10
/** The cascade sweeps the grid diagonally: one step per anti-diagonal. */
const CASCADE_STEPS = GRID_SIZE * 2 - 1;
const CASCADE_STEP_MS = 50;
const VRF_DELAY_MS = 800;

const TIER_TOTALS = Object.fromEntries(
  DEMO_TIERS.map(({ tier, count }) => [tier, count])
) as Record<Tier, number>;

/** Solid fill once a tier is revealed. */
const TIER_FILL: Record<Tier, string> = {
  legendary: "bg-warning border-warning",
  rare: "bg-brand-secondary border-brand-secondary",
  uncommon: "bg-highlight border-highlight",
  common: "bg-text-tertiary/30 border-transparent",
};

/** The team's view of the pre-baked map before reveal (Common tokens are left plain). */
const TIER_TINT: Record<Tier, string> = {
  legendary: "border-warning bg-warning/25 dark:bg-warning/40",
  rare: "border-brand-secondary bg-brand-secondary/25 dark:bg-brand-secondary/40",
  uncommon: "border-highlight bg-highlight/20 dark:bg-highlight/30",
  common: "",
};

type StepId =
  | "peek"
  | "insiderMint"
  | "insiderMintBlind"
  | "publicMint"
  | "insiderBuy"
  | "reveal"
  | "verify";

interface StepDef {
  id: StepId;
  /** What the step list calls this step. */
  label: string;
  /** The primary button's label while this is the next step. */
  action: string;
}

interface ScenarioDef {
  id: ScenarioId;
  /** Short name on the scenario picker. */
  title: string;
  /** Which reveal model the scenario uses, shown under the title. */
  model: string;
  blurb: string;
  steps: StepDef[];
}

/** How many tokens insiders mint blind in the vrnft scenario (same as the rares they target elsewhere). */
const BLIND_MINT = 10;

const PEEK: StepDef = {
  id: "peek",
  label: "Team looks at the rarity map",
  action: "Peek at the map",
};

const SCENARIOS: ScenarioDef[] = [
  {
    id: "insider-mint",
    title: "Insiders mint the rares",
    model: "Typical reveal",
    blurb:
      "The rarity map is made before the drop. The team can see which token IDs will be rare and mint them for friends before the public sale.",
    steps: [
      PEEK,
      { id: "insiderMint", label: "Insiders mint the rare IDs", action: "Insiders mint the rares" },
      { id: "publicMint", label: "Public mints the rest", action: "Public mints the rest" },
      { id: "reveal", label: "Reveal", action: "Reveal" },
    ],
  },
  {
    id: "secondary-buy",
    title: "Insiders buy the rares",
    model: "Typical reveal",
    blurb:
      "The public mints the whole collection. Before the reveal, insiders use the map to buy the rare tokens on OpenSea from holders who don't know what they have.",
    steps: [
      { id: "publicMint", label: "Public mints out", action: "Public mints out" },
      PEEK,
      {
        id: "insiderBuy",
        label: "Insiders buy the rares on OpenSea",
        action: "Buy the rares on OpenSea",
      },
      { id: "reveal", label: "Reveal", action: "Reveal" },
    ],
  },
  {
    id: "vrnft",
    title: "Insiders get random tokens",
    model: "vrnft reveal",
    blurb:
      "No rarity exists until the reveal, when a Chainlink VRF seed shuffles every rank. Insiders can still mint early, but they can only get random tokens.",
    steps: [
      PEEK,
      {
        id: "insiderMintBlind",
        label: `Insiders mint ${BLIND_MINT} tokens`,
        action: `Insiders mint ${BLIND_MINT} tokens`,
      },
      { id: "publicMint", label: "Public mints the rest", action: "Public mints the rest" },
      { id: "reveal", label: "Reveal with Chainlink VRF", action: "Request VRF reveal" },
      { id: "verify", label: "Verify the map from the seed", action: "Verify" },
    ],
  },
];

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * RevealSimulator - interactive comparison of a typical NFT rarity reveal and vrnft's.
 *
 * Three guided scenarios over a 100-token collection, each a short sequence of steps with one
 * "next step" button: insiders minting the rare IDs before the public (typical reveal), insiders
 * buying the rares on OpenSea before the reveal (typical reveal), and insiders minting early under
 * vrnft, where the map doesn't exist until a VRF seed shuffles it after mint-out.
 *
 * @example
 * ```tsx
 * <DataVisualizationSection title="Try it">
 *   <RevealSimulator />
 * </DataVisualizationSection>
 * ```
 */
export function RevealSimulator({ className }: RevealSimulatorProps) {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("insider-mint");
  /** Number of completed steps in the current scenario. */
  const [stepsDone, setStepsDone] = useState(0);
  const [phase, setPhase] = useState<Phase>("minting");
  const [owners, setOwners] = useState<(Owner | null)[]>(() => emptyOwners());
  /** What the last completed step did, in a sentence. */
  const [message, setMessage] = useState<string | null>(null);
  /** Typical reveal: the map baked in at "deploy". Created on the client to avoid hydration drift. */
  const [deployRanks, setDeployRanks] = useState<number[] | null>(null);
  /** The map being shown after reveal (either model). */
  const [revealRanks, setRevealRanks] = useState<number[] | null>(null);
  const [seed, setSeed] = useState<string | null>(null);
  const [cascadeStep, setCascadeStep] = useState(0);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => {
    setDeployRanks(rarityRanksFromSeed(randomSeed()));
    return clearTimers;
  }, [clearTimers]);

  const scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIOS[0]!;
  const isVrnft = scenario.id === "vrnft";
  const steps = scenario.steps;
  const nextStep = steps[stepsDone] ?? null;
  const busy = phase === "requesting" || phase === "revealing";
  const minted = mintedCount(owners);
  const peeked = steps.slice(0, stepsDone).some((step) => step.id === "peek");

  const deployTiers = useMemo(
    () => (deployRanks ? tiersFromRanks(deployRanks) : null),
    [deployRanks]
  );
  const revealTiers = useMemo(
    () => (revealRanks ? tiersFromRanks(revealRanks) : null),
    [revealRanks]
  );
  const showFounderTint = !isVrnft && peeked && phase === "minting" && deployTiers !== null;
  const friendsCount = owners.filter((owner) => owner === "friends").length;

  const reset = useCallback(
    (nextScenario: ScenarioId = scenarioId) => {
      clearTimers();
      setScenarioId(nextScenario);
      setStepsDone(0);
      setPhase("minting");
      setOwners(emptyOwners());
      setMessage(null);
      setRevealRanks(null);
      setSeed(null);
      setCascadeStep(0);
      setVerified(null);
      setCopied(false);
      // A fresh "deploy": typical drops get a new pre-baked map.
      setDeployRanks(rarityRanksFromSeed(randomSeed()));
    },
    [clearTimers, scenarioId]
  );

  const runCascade = (reduced: boolean, done: () => void) => {
    if (reduced) {
      setCascadeStep(CASCADE_STEPS);
      setPhase("revealed");
      done();
      return;
    }
    setPhase("revealing");
    for (let step = 1; step <= CASCADE_STEPS; step++) {
      timersRef.current.push(
        setTimeout(() => {
          setCascadeStep(step);
          if (step === CASCADE_STEPS) {
            setPhase("revealed");
            done();
          }
        }, step * CASCADE_STEP_MS)
      );
    }
  };

  const revealNow = () => {
    const reduced = prefersReducedMotion();
    if (!isVrnft) {
      // Nothing random happens here: the map was decided at deploy.
      setRevealRanks(deployRanks ?? rarityRanksFromSeed(randomSeed()));
      setCascadeStep(CASCADE_STEPS);
      setPhase("revealed");
      setMessage("Revealed. It's the same map the team has had since deploy.");
      setStepsDone((n) => n + 1);
      return;
    }
    setPhase("requesting");
    setMessage(null);
    const fulfil = () => {
      const vrfSeed = randomSeed();
      setSeed(vrfSeed);
      setRevealRanks(rarityRanksFromSeed(vrfSeed));
      runCascade(reduced, () => {
        setMessage("Revealed. Every rank came from one seed that nobody knew during the mint.");
        setStepsDone((n) => n + 1);
      });
    };
    if (reduced) fulfil();
    else timersRef.current.push(setTimeout(fulfil, VRF_DELAY_MS));
  };

  const advance = () => {
    if (!nextStep || busy) return;
    const complete = (text: string) => {
      setMessage(text);
      setStepsDone((n) => n + 1);
    };
    switch (nextStep.id) {
      case "peek":
        complete(
          isVrnft
            ? "There's nothing to see. Rarity is assigned at reveal, so no map exists yet."
            : "The team can see the whole map. Tinted tiles are the Legendary and Rare tokens."
        );
        return;
      case "insiderMint": {
        if (!deployTiers) return;
        const count = insiderTargets(owners, deployTiers).length;
        setOwners(mintInsider(owners, deployTiers));
        complete(
          `Insiders minted the ${count} Legendary and Rare token IDs before the public sale.`
        );
        return;
      }
      case "insiderMintBlind":
        setOwners(mintPublic(owners, BLIND_MINT, "friends"));
        complete(
          `Insiders minted ${BLIND_MINT} tokens early. With no map, they're just the first ${BLIND_MINT} IDs.`
        );
        return;
      case "publicMint": {
        const remaining = COLLECTION_SIZE - minted;
        setOwners(mintPublic(owners, COLLECTION_SIZE));
        complete(
          minted === 0
            ? "The public minted all 100 tokens. Every rarity is already fixed, just hidden from them."
            : `The public minted the remaining ${remaining} tokens. Sold out.`
        );
        return;
      }
      case "insiderBuy": {
        if (!deployTiers) return;
        const count = secondaryTargets(owners, deployTiers).length;
        setOwners(buyRaresSecondary(owners, deployTiers));
        complete(
          `Insiders bought ${count} tokens on OpenSea at floor price. The sellers didn't know they were rare.`
        );
        return;
      }
      case "reveal":
        revealNow();
        return;
      case "verify":
        if (!seed || !revealRanks) return;
        setVerified(sameMap(rarityRanksFromSeed(seed), revealRanks));
        setStepsDone((n) => n + 1);
        return;
    }
  };

  const copySeed = async () => {
    if (!seed) return;
    try {
      await navigator.clipboard.writeText(seed);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const status = useMemo(() => {
    if (phase === "requesting") return "Requesting randomness from Chainlink VRF…";
    if (phase === "revealing") return "Seed received with its proof. Shuffling ranks…";
    if (message) return message;
    return `Press "${steps[0]?.action}" to start.`;
  }, [phase, message, steps]);

  const revealedTierCounts = revealTiers ? countTiers(revealTiers) : null;
  const holdings =
    revealTiers && phase === "revealed" && friendsCount > 0
      ? friendsHoldings(owners, revealTiers)
      : null;
  /** Expected holdings for this many tokens picked at random, for comparison in the vrnft scenario. */
  const expected = (tier: Tier) =>
    ((friendsCount * TIER_TOTALS[tier]) / COLLECTION_SIZE).toLocaleString(undefined, {
      maximumFractionDigits: 1,
    });

  const gridSummary = useMemo(() => {
    if (revealTiers && phase === "revealed") {
      const friendsNote =
        friendsCount > 0
          ? ` Friends wallet holds token IDs ${owners
              .flatMap((owner, i) => (owner === "friends" ? [i + 1] : []))
              .join(", ")}.`
          : "";
      const legendary = revealTiers.flatMap((tier, i) => (tier === "legendary" ? [i + 1] : []));
      return `Revealed collection of ${COLLECTION_SIZE} tokens. Legendary token IDs: ${legendary.join(", ")}.${friendsNote}`;
    }
    return `Collection of ${COLLECTION_SIZE} tokens, ${minted} minted${
      friendsCount > 0 ? `, ${friendsCount} held by the friends wallet` : ""
    }, not yet revealed.${showFounderTint ? " The team's view is tinting the pre-baked rarity map." : ""}`;
  }, [revealTiers, phase, friendsCount, owners, minted, showFounderTint]);

  return (
    <div className={cn("w-full text-left", className)}>
      {/* Scenario picker */}
      <div
        role="group"
        aria-label="Scenario"
        className="grid gap-1 rounded-lg border border-border-light bg-canvas p-1 sm:grid-cols-3"
      >
        {SCENARIOS.map(({ id, title, model }, index) => (
          <button
            key={id}
            type="button"
            aria-pressed={scenario.id === id}
            onClick={() => scenario.id !== id && reset(id)}
            className={cn(
              "flex flex-col justify-start rounded-md px-3 py-2 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              scenario.id === id
                ? "bg-surface shadow-sm ring-1 ring-border-light"
                : "hover:bg-surface/60"
            )}
          >
            <span
              className={cn(
                "block text-sm font-medium",
                scenario.id === id ? "text-text-primary" : "text-text-secondary"
              )}
            >
              {index + 1}. {title}
            </span>
            <span className="block text-xs text-text-tertiary">{model}</span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">{scenario.blurb}</p>

      <div className="mt-5 grid gap-6 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:items-start">
        {/* Token grid */}
        <div className="mx-auto w-full max-w-[320px] md:mx-0">
          <div
            role="img"
            aria-label={gridSummary}
            className="grid gap-[3px]"
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
          >
            {owners.map((owner, i) => {
              const row = Math.floor(i / GRID_SIZE);
              const col = i % GRID_SIZE;
              const revealedTier = revealTiers && row + col < cascadeStep ? revealTiers[i] : null;
              const founderTier = showFounderTint && deployTiers ? deployTiers[i] : null;
              return (
                <div
                  key={i}
                  className={cn(
                    "relative flex aspect-square items-center justify-center rounded-[3px] border font-mono text-[10px] leading-none transition-colors duration-200",
                    revealedTier
                      ? TIER_FILL[revealedTier]
                      : owner
                        ? "border-border-light bg-muted text-text-tertiary"
                        : "border-dashed border-border-default bg-transparent",
                    !revealedTier && founderTier && TIER_TINT[founderTier],
                    !revealedTier &&
                      founderTier &&
                      !owner &&
                      founderTier !== "common" &&
                      "border-dashed"
                  )}
                >
                  {!revealedTier &&
                    owner &&
                    (founderTier === null || founderTier === "common") &&
                    "?"}
                  {owner === "friends" && (
                    <span className="absolute right-[2px] top-[2px] h-1.5 w-1.5 rounded-full bg-text-primary ring-1 ring-surface" />
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-text-tertiary">
            Token #1 top-left to #{COLLECTION_SIZE} bottom-right.
          </p>
        </div>

        {/* Side panel */}
        <div className="min-w-0 space-y-4">
          <div
            aria-live="polite"
            className="rounded-lg border border-border-light bg-canvas px-3 py-2.5 text-sm"
          >
            <div className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">
              <span>
                {phase === "minting" ? "Minted" : phase === "revealed" ? "Revealed" : "Revealing"}
              </span>
              <span className="font-mono normal-case tracking-normal text-text-tertiary">
                {minted}/{COLLECTION_SIZE}
              </span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted" aria-hidden>
              <div
                className={cn(
                  "h-full rounded-full transition-[width] duration-300",
                  phase === "minting" ? "bg-text-tertiary" : "bg-brand-secondary"
                )}
                style={{ width: `${(minted / COLLECTION_SIZE) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-text-primary">{status}</p>
            {holdings && (
              <p className="mt-1 font-medium text-text-primary">
                Friends hold {holdings.legendary}/{TIER_TOTALS.legendary} Legendary, {holdings.rare}
                /{TIER_TOTALS.rare} Rare.
                {isVrnft && (
                  <span className="block font-normal text-text-secondary">
                    Chance alone gives {friendsCount} random tokens about {expected("legendary")}{" "}
                    Legendary and {expected("rare")} Rare.
                  </span>
                )}
              </p>
            )}
            {verified !== null && (
              <p
                className={cn(
                  "mt-1 font-medium",
                  verified ? "text-highlight-dark dark:text-highlight" : "text-error"
                )}
              >
                {verified ? "✓ Recomputed from seed — same map" : "✗ Recomputed map differs"}
              </p>
            )}
          </div>

          {/* Seed */}
          {isVrnft && phase !== "minting" && (
            <div className="rounded-lg border border-border-light bg-canvas px-3 py-2.5">
              <div className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                VRF seed
              </div>
              {seed ? (
                <div className="mt-1 flex items-center justify-between gap-2">
                  <code className="font-mono text-sm text-text-primary" title={seed}>
                    {shortHex(seed)}
                  </code>
                  <button
                    type="button"
                    onClick={copySeed}
                    className="text-xs font-medium text-brand-secondary-dark hover:underline dark:text-brand-secondary"
                    aria-label="Copy full seed"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              ) : (
                <div className="mt-1 animate-pulse font-mono text-sm text-text-tertiary">
                  waiting for fulfillRandomness…
                </div>
              )}
            </div>
          )}

          {/* Steps */}
          <div>
            <ol className="space-y-1.5" aria-label="Steps">
              {steps.map((step, index) => {
                const done = index < stepsDone;
                const current = index === stepsDone;
                return (
                  <li
                    key={step.id}
                    aria-current={current ? "step" : undefined}
                    className={cn(
                      "flex items-center gap-2 text-sm",
                      done
                        ? "text-text-secondary"
                        : current
                          ? "font-medium text-text-primary"
                          : "text-text-tertiary"
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px]",
                        done
                          ? "border-highlight bg-highlight text-white dark:text-text-primary"
                          : current
                            ? "border-brand text-brand"
                            : "border-border-default"
                      )}
                    >
                      {done ? "✓" : index + 1}
                    </span>
                    <span>
                      {step.label}
                      {done && <span className="sr-only"> (done)</span>}
                    </span>
                  </li>
                );
              })}
            </ol>
            <div className="mt-3 flex flex-wrap gap-2">
              {nextStep ? (
                <Button size="sm" onClick={advance} disabled={busy || deployRanks === null}>
                  {nextStep.action}
                </Button>
              ) : (
                <span className="self-center text-sm text-text-secondary">
                  Scenario complete. Try another one above.
                </span>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => reset()}
                disabled={stepsDone === 0 && !busy}
              >
                Start over
              </Button>
            </div>
          </div>

          {/* Legend */}
          <ul
            className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-text-secondary"
            aria-label="Legend"
          >
            {TIER_ORDER.map((tier) => (
              <li key={tier} className="inline-flex items-center gap-1.5">
                <span className={cn("h-3 w-3 rounded-[3px] border", TIER_FILL[tier])} aria-hidden />
                <span>
                  {TIER_LABELS[tier]}{" "}
                  <span className="font-mono text-text-tertiary">
                    {revealedTierCounts && phase === "revealed"
                      ? revealedTierCounts[tier]
                      : TIER_TOTALS[tier]}
                  </span>
                </span>
              </li>
            ))}
            <li className="inline-flex items-center gap-1.5">
              <span
                className="h-3 w-3 rounded-[3px] border border-dashed border-border-default"
                aria-hidden
              />
              Unminted
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span
                className="flex h-3 w-3 items-center justify-center rounded-[3px] border border-border-light bg-muted font-mono text-[8px] leading-none text-text-tertiary"
                aria-hidden
              >
                ?
              </span>
              Minted
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span className="relative h-3 w-3" aria-hidden>
                <span className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-text-primary" />
              </span>
              Friends wallet
            </li>
          </ul>
          <p className="text-xs leading-relaxed text-text-tertiary">
            Tiers are scaled down for {COLLECTION_SIZE} tokens; the contract uses ranks 1–10
            Legendary, 11–100 Rare, 101–1000 Uncommon. The contract hashes with keccak256; this demo
            uses SHA-256 in the same construction.
          </p>
        </div>
      </div>
    </div>
  );
}
