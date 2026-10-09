import { describe, expect, it } from "vitest";
import {
  SOLVED_STATE,
  applyMoves,
  generateScramble,
  getNotation,
  invertMove,
  invertMoves,
  isValidState,
  stateToCubelets,
  toRotation,
} from "../cube-state";

const ALL_MOVES = ["L", "M", "R", "D", "E", "U", "B", "S", "F"].flatMap((b) => [
  b,
  `${b}'`,
  `${b}2`,
]);

/** Deterministic PRNG so scramble tests are reproducible. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe("cube-state", () => {
  it("recognises the solved state as valid", () => {
    expect(isValidState(SOLVED_STATE)).toBe(true);
  });

  it("rejects malformed states", () => {
    expect(isValidState("")).toBe(false);
    expect(isValidState(SOLVED_STATE.slice(1))).toBe(false);
    expect(isValidState("X" + SOLVED_STATE.slice(1))).toBe(false);
    // 54 valid letters but 10 U and 8 R
    expect(isValidState("U" + SOLVED_STATE.slice(0, 9) + SOLVED_STATE.slice(11))).toBe(false);
  });

  it.each(ALL_MOVES)("move %s followed by its inverse returns to solved", (move) => {
    const moved = applyMoves(SOLVED_STATE, move);
    expect(moved).not.toBe(SOLVED_STATE);
    expect(isValidState(moved)).toBe(true);
    expect(applyMoves(moved, invertMove(move))).toBe(SOLVED_STATE);
  });

  it.each(["L", "M", "R", "D", "E", "U", "B", "S", "F"])("four %s turns are the identity", (b) => {
    expect(applyMoves(SOLVED_STATE, `${b} ${b} ${b} ${b}`)).toBe(SOLVED_STATE);
  });

  it("R brings the F colour onto the right column of the U face", () => {
    const state = applyMoves(SOLVED_STATE, "R");
    // U face right column (indices 2,5,8) now shows the F colour.
    expect([state[2], state[5], state[8]]).toEqual(["F", "F", "F"]);
    // The R face itself keeps its colour.
    expect(state.slice(9, 18)).toBe("RRRRRRRRR");
  });

  it("produces a valid 54-char state with 9 of each colour after a scramble", () => {
    const rng = mulberry32(42);
    for (let i = 0; i < 25; i++) {
      const scramble = generateScramble(20, rng);
      expect(scramble).toHaveLength(20);
      for (let j = 1; j < scramble.length; j++) {
        expect(scramble[j]![0]).not.toBe(scramble[j - 1]![0]);
      }
      const state = applyMoves(SOLVED_STATE, scramble.join(" "));
      expect(state).toHaveLength(54);
      expect(isValidState(state)).toBe(true);
      expect(applyMoves(state, invertMoves(scramble.join(" ")))).toBe(SOLVED_STATE);
    }
  });

  it("getNotation inverts toRotation for every quarter and half turn", () => {
    for (const move of ALL_MOVES) {
      const [axis, value, rad] = toRotation(move);
      const quarters = Math.round(rad / (Math.PI / 2));
      const notation = getNotation(axis, value, quarters);
      expect(applyMoves(SOLVED_STATE, notation)).toBe(applyMoves(SOLVED_STATE, move));
    }
    expect(getNotation("x", 1, 0)).toBe("");
    expect(getNotation("x", 1, 4)).toBe("");
  });

  it("maps a state to 27 cubelets with 54 stickers", () => {
    const cubelets = stateToCubelets(SOLVED_STATE);
    expect(cubelets).toHaveLength(27);
    const stickers = cubelets.flatMap((c) => Object.entries(c.colors));
    expect(stickers).toHaveLength(54);
    // On a solved cube every sticker shows its own face's colour.
    for (const [face, color] of stickers) expect(color).toBe(face);
  });

  it("throws on unknown moves", () => {
    expect(() => applyMoves(SOLVED_STATE, "X")).toThrow();
    expect(() => toRotation("R3")).toThrow();
  });
});
