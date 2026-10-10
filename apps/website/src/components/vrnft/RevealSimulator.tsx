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
  insiderTargets,
  mintInsider,
  mintPublic,
  mintedCount,
  randomSeed,
  rarityRanksFromSeed,
  sameMap,
  shortHex,
  tiersFromRanks,
  type Owner,
  type Tier,
} from "./lib/reveal";

export type RevealMode = "typical" | "vrnft";

export interface RevealSimulatorProps {
  /** Classes for the outer wrapper. The simulator draws no card of its own. */
  className?: string;
}

type Phase = "minting" | "requesting" | "revealing" | "revealed";

const GRID_SIZE = Math.sqrt(COLLECTION_SIZE); // 10 × 10
const MINT_BATCH = 25;
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

/** Founder's-view tint before reveal (Common tokens are left plain to keep the signal clear). */
const TIER_TINT: Record<Tier, string> = {
  legendary: "border-warning bg-warning/25 dark:bg-warning/40",
  rare: "border-brand-secondary bg-brand-secondary/25 dark:bg-brand-secondary/40",
  uncommon: "border-highlight bg-highlight/20 dark:bg-highlight/30",
  common: "",
};

const MODES: { value: RevealMode; label: string; blurb: string }[] = [
  {
    value: "typical",
    label: "Typical reveal",
    blurb:
      "The rarity map is generated off-chain before the drop. Reveal just makes it public, but the team has had it all along.",
  },
  {
    value: "vrnft",
    label: "vrnft reveal",
    blurb:
      "Tokens mint with no rarity attached. After mint-out the owner calls reveal(), Chainlink VRF returns one random seed, and a shuffle seeded by it assigns every rank.",
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
 * Mint a 100-token collection, peek with "Founder's view", optionally steer the rare IDs to
 * friends, then reveal. In typical mode the map existed from deploy, so insiders can target it;
 * in vrnft mode the map is created from a VRF seed after mint-out and anyone can recompute it.
 *
 * @example
 * ```tsx
 * <DataVisualizationSection title="Try it">
 *   <RevealSimulator />
 * </DataVisualizationSection>
 * ```
 */
export function RevealSimulator({ className }: RevealSimulatorProps) {
  const [mode, setMode] = useState<RevealMode>("typical");
  const [phase, setPhase] = useState<Phase>("minting");
  const [owners, setOwners] = useState<(Owner | null)[]>(() => emptyOwners());
  const [founderView, setFounderView] = useState(false);
  /** Typical mode: the map baked in at "deploy". Created on the client to avoid hydration drift. */
  const [deployRanks, setDeployRanks] = useState<number[] | null>(null);
  /** The map being shown after reveal (either mode). */
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

  const minted = mintedCount(owners);
  const mintedOut = minted === COLLECTION_SIZE;
  const isMinting = phase === "minting";
  const deployTiers = useMemo(
    () => (deployRanks ? tiersFromRanks(deployRanks) : null),
    [deployRanks]
  );
  const revealTiers = useMemo(
    () => (revealRanks ? tiersFromRanks(revealRanks) : null),
    [revealRanks]
  );
  const showFounderTint = mode === "typical" && founderView && isMinting && deployTiers !== null;
  const insiderCount = deployTiers ? insiderTargets(owners, deployTiers).length : 0;
  const friendsCount = owners.filter((owner) => owner === "friends").length;

  const reset = useCallback(
    (nextMode: RevealMode = mode) => {
      clearTimers();
      setMode(nextMode);
      setPhase("minting");
      setOwners(emptyOwners());
      setRevealRanks(null);
      setSeed(null);
      setCascadeStep(0);
      setVerified(null);
      setCopied(false);
      // A fresh "deploy": typical drops get a new pre-baked map.
      setDeployRanks(rarityRanksFromSeed(randomSeed()));
    },
    [clearTimers, mode]
  );

  const mint = (amount: number) => setOwners((current) => mintPublic(current, amount));

  const insiderMint = () => {
    if (mode !== "typical" || !deployTiers) return;
    setOwners((current) => mintInsider(current, deployTiers));
  };

  const runCascade = (reduced: boolean) => {
    if (reduced) {
      setCascadeStep(CASCADE_STEPS);
      setPhase("revealed");
      return;
    }
    setPhase("revealing");
    for (let step = 1; step <= CASCADE_STEPS; step++) {
      timersRef.current.push(
        setTimeout(() => {
          setCascadeStep(step);
          if (step === CASCADE_STEPS) setPhase("revealed");
        }, step * CASCADE_STEP_MS)
      );
    }
  };

  const reveal = () => {
    if (!mintedOut || !isMinting) return;
    const reduced = prefersReducedMotion();
    if (mode === "typical") {
      // Nothing random happens here: the map was decided at deploy.
      setRevealRanks(deployRanks ?? rarityRanksFromSeed(randomSeed()));
      setCascadeStep(CASCADE_STEPS);
      setPhase("revealed");
      return;
    }
    setPhase("requesting");
    const fulfil = () => {
      const vrfSeed = randomSeed();
      setSeed(vrfSeed);
      setRevealRanks(rarityRanksFromSeed(vrfSeed));
      runCascade(reduced);
    };
    if (reduced) fulfil();
    else timersRef.current.push(setTimeout(fulfil, VRF_DELAY_MS));
  };

  const verify = () => {
    if (!seed || !revealRanks) return;
    setVerified(sameMap(rarityRanksFromSeed(seed), revealRanks));
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
    if (phase === "revealed") {
      return mode === "typical"
        ? "Revealed. This is the same map the team had since deploy."
        : "Revealed. Every rank came from one seed nobody knew during the mint.";
    }
    if (mintedOut) return "Sold out. The owner can now call reveal().";
    const base = `Minted ${minted} / ${COLLECTION_SIZE}.`;
    return mode === "typical"
      ? `${base} Rarity is already fixed, just hidden.`
      : `${base} No token has a rarity yet.`;
  }, [phase, mode, mintedOut, minted]);

  const revealedTierCounts = revealTiers ? countTiers(revealTiers) : null;
  const holdings =
    mode === "typical" && revealTiers && phase === "revealed"
      ? friendsHoldings(owners, revealTiers)
      : null;

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
      friendsCount > 0 ? `, ${friendsCount} to the friends wallet` : ""
    }, not yet revealed.${showFounderTint ? " Founder's view is tinting the pre-baked rarity map." : ""}`;
  }, [revealTiers, phase, friendsCount, owners, minted, showFounderTint]);

  const activeMode = MODES.find((m) => m.value === mode) ?? MODES[0];

  return (
    <div className={cn("w-full text-left", className)}>
      {/* Mode toggle */}
      <div
        role="group"
        aria-label="Reveal model"
        className="inline-flex w-full rounded-lg border border-border-light bg-canvas p-1 sm:w-auto"
      >
        {MODES.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            aria-pressed={mode === value}
            onClick={() => mode !== value && reset(value)}
            className={cn(
              "flex-1 rounded-md px-3 py-1.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:flex-none",
              mode === value
                ? "bg-surface text-text-primary shadow-sm ring-1 ring-border-light"
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">{activeMode?.blurb}</p>

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
                {phase === "minting" ? "Mint" : phase === "revealed" ? "Revealed" : "Reveal"}
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
          {mode === "vrnft" && phase !== "minting" && (
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

          {/* Controls */}
          <div className="flex flex-wrap gap-2">
            {isMinting ? (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => mint(MINT_BATCH)}
                  disabled={mintedOut}
                >
                  Mint {MINT_BATCH}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => mint(COLLECTION_SIZE)}
                  disabled={mintedOut}
                >
                  Mint all
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={insiderMint}
                  disabled={mode !== "typical" || insiderCount === 0}
                  aria-describedby="reveal-sim-founder-note"
                  title={
                    mode === "typical"
                      ? "Mint the Legendary and Rare token IDs to a friends wallet before the public"
                      : "No rarity map exists yet, so there is nothing to target"
                  }
                >
                  Insider mint
                </Button>
                <Button size="sm" onClick={reveal} disabled={!mintedOut}>
                  Reveal
                </Button>
              </>
            ) : (
              mode === "vrnft" &&
              seed && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={verify}
                  disabled={phase !== "revealed"}
                >
                  Verify
                </Button>
              )
            )}
            <Button size="sm" variant="ghost" onClick={() => reset()}>
              Reset
            </Button>
          </div>

          {/* Founder's view */}
          {isMinting && (
            <div>
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-text-primary">
                <input
                  type="checkbox"
                  checked={founderView}
                  onChange={(event) => setFounderView(event.target.checked)}
                  className="h-4 w-4 cursor-pointer accent-[hsl(var(--brand))]"
                />
                Founder&apos;s view
              </label>
              <p
                id="reveal-sim-founder-note"
                className="mt-1 text-xs leading-relaxed text-text-secondary"
              >
                {mode === "typical"
                  ? founderView
                    ? "Tinted tiles are the pre-baked rarity map, visible to the team on every token, minted or not. Insider mint sends the Legendary and Rare IDs to friends."
                    : "The team can see the full rarity map before anyone mints. Turn this on to see what they see."
                  : founderView
                    ? "No rarity map exists yet — it's created at reveal, so there is nothing to see and nothing to leak."
                    : "Insider mint is unavailable: no rarity map exists until reveal."}
              </p>
            </div>
          )}

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
