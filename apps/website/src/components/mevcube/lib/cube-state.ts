/**
 * Pure (DOM- and WebGL-free) Rubik's cube state model.
 *
 * Ported from the MevCube frontend, which was in turn based on
 * https://github.com/Aaron-Bird/rubiks-cube (MIT License, Copyright (c) Aaron-Bird).
 *
 * State string format (54 chars, "URFDLB" facelet order — the same format used by
 * Kociemba-style solvers and by the MevCube contract):
 *
 *   index  0- 8  U face (white)
 *   index  9-17  R face (red)
 *   index 18-26  F face (green)
 *   index 27-35  D face (yellow)
 *   index 36-44  L face (orange)
 *   index 45-53  B face (blue)
 *
 * Each character is the face letter whose colour currently occupies that facelet,
 * so the solved cube is "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB".
 */

import type { Axis, AxisValue, Face, NotationBase, NotationExtra, Toward } from "./types";

export const FACES: readonly Face[] = ["U", "R", "F", "D", "L", "B"];

export const SOLVED_STATE = "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB";

/** Facelet index cycles applied (clockwise) for each base move. */
const NOTATION_SWAP_TABLE: Record<
  NotationBase,
  readonly (readonly [number, number, number, number])[]
> = {
  L: [
    [0, 18, 27, 53],
    [3, 21, 30, 50],
    [6, 24, 33, 47],
    [36, 38, 44, 42],
    [37, 41, 43, 39],
  ],
  M: [
    [1, 19, 28, 52],
    [4, 22, 31, 49],
    [7, 25, 34, 46],
  ],
  R: [
    [20, 2, 51, 29],
    [23, 5, 48, 32],
    [26, 8, 45, 35],
    [9, 11, 17, 15],
    [10, 14, 16, 12],
  ],
  U: [
    [9, 18, 36, 45],
    [10, 19, 37, 46],
    [11, 20, 38, 47],
    [0, 2, 8, 6],
    [1, 5, 7, 3],
  ],
  E: [
    [39, 21, 12, 48],
    [40, 22, 13, 49],
    [41, 23, 14, 50],
  ],
  D: [
    [15, 51, 42, 24],
    [16, 52, 43, 25],
    [17, 53, 44, 26],
    [27, 29, 35, 33],
    [28, 32, 34, 30],
  ],
  F: [
    [6, 9, 29, 44],
    [7, 12, 28, 41],
    [8, 15, 27, 38],
    [18, 20, 26, 24],
    [19, 23, 25, 21],
  ],
  S: [
    [3, 10, 32, 43],
    [4, 13, 31, 40],
    [5, 16, 30, 37],
  ],
  B: [
    [2, 36, 33, 17],
    [1, 39, 34, 14],
    [0, 42, 35, 11],
    [45, 47, 53, 51],
    [46, 50, 52, 48],
  ],
};

/** Which layer (axis + coordinate) each base move turns, and its clockwise direction. */
const AXIS_TABLE: Record<NotationBase, readonly [Axis, AxisValue, Toward]> = {
  L: ["x", -1, 1],
  M: ["x", 0, 1],
  R: ["x", 1, -1],
  D: ["y", -1, 1],
  E: ["y", 0, 1],
  U: ["y", 1, -1],
  B: ["z", -1, 1],
  S: ["z", 0, -1],
  F: ["z", 1, -1],
};

/** Reverse lookup: layer (axis, -1|0|1) -> base move and its clockwise direction. */
const LAYER_NOTATION_TABLE: Record<Axis, readonly (readonly [NotationBase, Toward])[]> = {
  x: [
    ["L", 1],
    ["M", 1],
    ["R", -1],
  ],
  y: [
    ["D", 1],
    ["E", 1],
    ["U", -1],
  ],
  z: [
    ["B", 1],
    ["S", -1],
    ["F", -1],
  ],
};

const NOTATION_BASES = Object.keys(AXIS_TABLE) as NotationBase[];
// Weighted like the original: quarter turns are more likely than half turns.
const NOTATION_EXTRAS: readonly NotationExtra[] = ["", "'", "2", "", "'"];

function isNotationBase(value: string | undefined): value is NotationBase {
  return value !== undefined && value in AXIS_TABLE;
}

/** Split a whitespace separated move sequence ("R U' F2") into individual moves. */
export function parseMoves(sequence: string): string[] {
  return sequence.trim().split(/\s+/).filter(Boolean);
}

/** Returns true when `state` is a 54-char URFDLB string with 9 of each face letter. */
export function isValidState(state: string): boolean {
  if (state.length !== 54) return false;
  const counts: Record<string, number> = {};
  for (const ch of state) {
    if (!FACES.includes(ch as Face)) return false;
    counts[ch] = (counts[ch] ?? 0) + 1;
  }
  return FACES.every((face) => counts[face] === 9);
}

/** Apply a single move or a move sequence to a state string, returning the new state. */
export function applyMoves(state: string, sequence: string): string {
  const colors = state.split("");
  for (const move of parseMoves(sequence)) {
    const base = move[0];
    const extra = move.slice(1);
    if (!isNotationBase(base)) throw new Error(`Unknown move: ${move}`);

    let toward: Toward = 1;
    let times = 1;
    if (extra === "'") toward = -1;
    else if (extra === "2") times = 2;
    else if (extra !== "") throw new Error(`Unknown move: ${move}`);

    for (let t = 0; t < times; t++) {
      for (const cycle of NOTATION_SWAP_TABLE[base]) {
        swapFaceColor(colors, cycle, toward);
      }
    }
  }
  return colors.join("");
}

function swapFaceColor(
  colors: string[],
  [a, b, c, d]: readonly [number, number, number, number],
  toward: Toward
) {
  const aColor = colors[a]!;
  if (toward === -1) {
    colors[a] = colors[b]!;
    colors[b] = colors[c]!;
    colors[c] = colors[d]!;
    colors[d] = aColor;
  } else {
    colors[a] = colors[d]!;
    colors[d] = colors[c]!;
    colors[c] = colors[b]!;
    colors[b] = aColor;
  }
}

/** Invert a single move: R -> R', R' -> R, R2 -> R2. */
export function invertMove(move: string): string {
  if (move.endsWith("'")) return move.slice(0, -1);
  if (move.endsWith("2")) return move;
  return `${move}'`;
}

/** Invert a move sequence (reversed order, each move inverted). */
export function invertMoves(sequence: string): string {
  return parseMoves(sequence).reverse().map(invertMove).join(" ");
}

/**
 * Convert a move to the layer rotation it represents:
 * [axis, layer coordinate (-1|0|1), rotation in radians].
 */
export function toRotation(move: string): [Axis, AxisValue, number] {
  const trimmed = move.trim();
  const base = trimmed[0];
  const extra = trimmed.slice(1);
  if (!isNotationBase(base)) throw new Error(`Unknown move: ${move}`);

  const [axis, axisValue, toward] = AXIS_TABLE[base];
  let rad = (Math.PI / 2) * toward;
  if (extra === "'") rad *= -1;
  else if (extra === "2") rad *= 2;
  else if (extra !== "") throw new Error(`Unknown move: ${move}`);
  return [axis, axisValue, rad];
}

/**
 * Convert a finished drag (layer + number of signed quarter turns) back into notation.
 * Returns e.g. "R'" or "U U" (two quarter turns), or "" for no net rotation.
 */
export function getNotation(axis: Axis, value: AxisValue, quarterTurns: number): string {
  const layer = LAYER_NOTATION_TABLE[axis][value + 1];
  const turns = ((quarterTurns % 4) + 4) % 4;
  if (!layer || turns === 0) return "";
  const [base, clockwise] = layer;
  // Positive radians about the axis == `clockwise` direction for this layer.
  if (turns === 2) return `${base}2`;
  const isClockwise = (turns === 1 ? 1 : -1) * clockwise > 0;
  return isClockwise ? base : `${base}'`;
}

/**
 * Encode moves in the MevCube contract's `move(string)` format: one letter per quarter
 * turn, uppercase for a clockwise turn and lowercase for counter-clockwise, so
 * ["R", "U'", "F2"] -> "RuFF". The contract shares this module's swap table, so the
 * encoded string produces the same state on-chain.
 */
export function toContractMoves(moves: readonly string[]): string {
  return moves
    .flatMap(parseMoves)
    .map((move) => {
      const base = move[0];
      const extra = move.slice(1);
      if (!isNotationBase(base)) throw new Error(`Unknown move: ${move}`);
      if (extra === "") return base;
      if (extra === "'") return base.toLowerCase();
      if (extra === "2") return base + base;
      throw new Error(`Unknown move: ${move}`);
    })
    .join("");
}

/**
 * Mirrors the contract's `isSolved()`: every face is a single colour. Slice moves can
 * move the centres, so a solved cube need not equal SOLVED_STATE.
 */
export function isSolvedState(state: string): boolean {
  for (let face = 0; face < 6; face++) {
    const first = state[face * 9];
    for (let i = 1; i < 9; i++) {
      if (state[face * 9 + i] !== first) return false;
    }
  }
  return true;
}

/** A random single move, e.g. "R", "M'", "U2". */
export function randomMove(rng: () => number = Math.random): string {
  const base = NOTATION_BASES[Math.floor(rng() * NOTATION_BASES.length)]!;
  const extra = NOTATION_EXTRAS[Math.floor(rng() * NOTATION_EXTRAS.length)]!;
  return base + extra;
}

/** A random scramble that never turns the same layer twice in a row. */
export function generateScramble(length = 20, rng: () => number = Math.random): string[] {
  const moves: string[] = [];
  while (moves.length < length) {
    const move = randomMove(rng);
    if (moves.length > 0 && moves[moves.length - 1]![0] === move[0]) continue;
    moves.push(move);
  }
  return moves;
}

export interface Cubelet {
  x: AxisValue;
  y: AxisValue;
  z: AxisValue;
  /** 0..26, ordered top layer first. */
  num: number;
  type: "corner" | "edge" | "center" | "core";
  /** Face letter (colour) shown on each outward-facing side of this cubelet. */
  colors: Partial<Record<Face, Face>>;
}

/**
 * Map a 54-char state to the 27 cubelets with the sticker colour on each visible side.
 * This is the bridge between the flat state string and the 3D model.
 */
export function stateToCubelets(state: string): Cubelet[] {
  const faceColor = {} as Record<Face, string[]>;
  FACES.forEach((face, i) => {
    faceColor[face] = state.slice(i * 9, i * 9 + 9).split("");
  });
  const pick = (face: Face, i: number) => faceColor[face][i] as Face;

  const cubelets: Cubelet[] = [];
  let num = 0;
  for (let y = 1; y >= -1; y--) {
    for (let z = -1; z <= 1; z++) {
      for (let x = -1; x <= 1; x++) {
        const nonZero = [x, y, z].filter(Boolean).length;
        const type =
          nonZero === 3 ? "corner" : nonZero === 2 ? "edge" : nonZero === 1 ? "center" : "core";
        const colors: Cubelet["colors"] = {};

        if (y === 1) colors.U = pick("U", num);
        if (y === -1) {
          const n = num - 18;
          colors.D = pick("D", Math.floor((8 - n) / 3) * 3 + (3 - ((8 - n) % 3)) - 1);
        }
        if (x === 1) {
          const n = (num + 1) / 3 - 1;
          colors.R = pick("R", Math.floor(n / 3) * 3 + (3 - (n % 3)) - 1);
        }
        if (x === -1) colors.L = pick("L", num / 3);
        if (z === 1) colors.F = pick("F", Math.floor((num - 6) / 7) + ((num - 6) % 7));
        if (z === -1) {
          const n = Math.floor(num / 7) + (num % 7);
          colors.B = pick("B", Math.floor(n / 3) * 3 + (3 - (n % 3)) - 1);
        }

        cubelets.push({ x, y, z, num, type, colors } as Cubelet);
        num++;
      }
    }
  }
  return cubelets;
}
