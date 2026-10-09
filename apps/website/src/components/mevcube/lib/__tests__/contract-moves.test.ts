import { describe, expect, it } from "vitest";
import { SOLVED_STATE, applyMoves, isSolvedState, toContractMoves } from "../cube-state";

/**
 * Re-implements the contract's move() decoding: each character is one quarter turn,
 * uppercase clockwise and lowercase counter-clockwise.
 */
function applyContractMoves(state: string, calldata: string): string {
  let next = state;
  for (const ch of calldata) {
    const upper = ch.toUpperCase();
    next = applyMoves(next, ch === upper ? upper : `${upper}'`);
  }
  return next;
}

describe("toContractMoves", () => {
  it("encodes quarter turns as single letters", () => {
    expect(toContractMoves(["R", "U'", "F"])).toBe("RuF");
  });

  it("encodes half turns as two clockwise quarter turns", () => {
    expect(toContractMoves(["R2", "M'"])).toBe("RRm");
  });

  it("returns an empty string for no moves", () => {
    expect(toContractMoves([])).toBe("");
  });

  it("rejects unknown moves", () => {
    expect(() => toContractMoves(["X"])).toThrow("Unknown move");
  });

  it("produces the same state as the Singmaster moves it encodes", () => {
    const moves = ["R", "U'", "F2", "M", "E'", "S2", "L'", "D", "B2"];
    expect(applyContractMoves(SOLVED_STATE, toContractMoves(moves))).toBe(
      applyMoves(SOLVED_STATE, moves.join(" "))
    );
  });
});

describe("isSolvedState", () => {
  it("accepts the solved state", () => {
    expect(isSolvedState(SOLVED_STATE)).toBe(true);
  });

  it("rejects a scrambled state", () => {
    expect(isSolvedState(applyMoves(SOLVED_STATE, "R"))).toBe(false);
  });

  it("accepts a solved cube whose centres have moved (slice turns)", () => {
    // M E S style whole-cube reorientations keep every face uniform.
    const reoriented = applyMoves(SOLVED_STATE, "L' M' R");
    expect(reoriented).not.toBe(SOLVED_STATE);
    expect(isSolvedState(reoriented)).toBe(true);
  });
});
