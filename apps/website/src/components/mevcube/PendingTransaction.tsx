import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toContractMoves } from "./lib/cube-state";

/** The contract's fixed per-call fee, shown for context. */
const SOLVER_FEE = "0.1 MATIC";

export interface PendingTransactionProps {
  /** Queued turns in Singmaster notation, oldest first. */
  moves: readonly string[];
  /** Whether applying the queued turns leaves every face a single colour. */
  solves: boolean;
  /** Drop the queue and put the cube back where it started. */
  onDiscard: () => void;
  className?: string;
}

/**
 * PendingTransaction - the `move()` call a player's turns would send to the contract.
 *
 * Mirrors the original mevcube front end, where turns were queued locally and then
 * submitted as a single transaction. Each chip is one turn; the code line is the exact
 * calldata string the contract would receive.
 */
export function PendingTransaction({
  moves,
  solves,
  onDiscard,
  className,
}: PendingTransactionProps) {
  const calldata = toContractMoves(moves);
  const hasMoves = moves.length > 0;

  return (
    <div
      className={cn("rounded-lg border border-border-light bg-canvas p-4 text-left", className)}
      aria-live="polite"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
          Pending transaction
        </span>
        <span className="text-xs text-text-tertiary">
          {hasMoves
            ? `${moves.length} ${moves.length === 1 ? "turn" : "turns"} · ${SOLVER_FEE} fee`
            : `${SOLVER_FEE} fee per call`}
        </span>
      </div>

      <code className="mt-2 block overflow-x-auto whitespace-nowrap font-mono text-sm text-text-primary">
        move(&quot;
        <span className={hasMoves ? "text-brand" : "text-text-tertiary"}>{calldata}</span>
        &quot;)
      </code>

      {hasMoves ? (
        <>
          <ol className="mt-3 flex flex-wrap gap-1.5" aria-label="Queued turns">
            {moves.map((move, index) => (
              <li
                key={index}
                className={cn(
                  "rounded border px-1.5 py-0.5 font-mono text-xs",
                  index === moves.length - 1
                    ? "border-brand bg-brand-light text-brand-dark"
                    : "border-border-light bg-surface text-text-secondary"
                )}
                title={`${move} → "${toContractMoves([move])}"`}
              >
                {move}
              </li>
            ))}
          </ol>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p
              className={cn(
                "text-sm",
                solves ? "font-medium text-highlight-dark" : "text-text-secondary"
              )}
            >
              {solves
                ? "This call solves the cube and would emit Solved(you, solution)."
                : "Not solved yet. Keep turning, or discard to start over."}
            </p>
            <Button size="sm" variant="outline" onClick={onDiscard}>
              Discard
            </Button>
          </div>
        </>
      ) : (
        <p className="mt-3 text-sm text-text-secondary">
          Turn a layer to queue it. Each turn becomes one letter of the string the contract
          receives.
        </p>
      )}
    </div>
  );
}
