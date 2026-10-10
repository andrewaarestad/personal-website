/**
 * Pure logic for the vrnft reveal simulator.
 *
 * Mirrors how vrnft assigns rarity after mint-out:
 *   1. One 256-bit random seed arrives from Chainlink VRF.
 *   2. The seed is expanded into one value per token: hash(abi.encode(seed, i)).
 *   3. A Fisher–Yates shuffle driven by those values assigns every token a unique rarity rank.
 *   4. Ranks map to tiers (the contract uses 1–10 Legendary, 11–100 Rare, 101–1000 Uncommon).
 *
 * The contract hashes with keccak256. The browser has no built-in keccak, so this module uses
 * SHA-256 as an equivalent stand-in: the construction (hash of the 64-byte ABI encoding of
 * `seed` and `i`) is identical, only the hash function differs. Everything here is synchronous
 * and deterministic: the same seed always produces the same rarity map.
 */

export type Tier = "legendary" | "rare" | "uncommon" | "common";

export interface TierSize {
  tier: Tier;
  /** How many tokens get this tier. Tiers are assigned to the lowest ranks first. */
  count: number;
}

/** Tokens in the demo collection (a 10 × 10 grid). */
export const COLLECTION_SIZE = 100;

/**
 * Demo tier sizes for 100 tokens, scaled down from the contract's 10 / 100 / 1000 cut-offs.
 * Ranks 1–2 Legendary, 3–10 Rare, 11–30 Uncommon, 31–100 Common.
 */
export const DEMO_TIERS: readonly TierSize[] = [
  { tier: "legendary", count: 2 },
  { tier: "rare", count: 8 },
  { tier: "uncommon", count: 20 },
  { tier: "common", count: 70 },
];

/** The cut-offs used by the on-chain contract, for reference. */
export const CONTRACT_TIER_CUTOFFS = { legendary: 10, rare: 100, uncommon: 1000 } as const;

export const TIER_ORDER: readonly Tier[] = ["legendary", "rare", "uncommon", "common"];

export const TIER_LABELS: Record<Tier, string> = {
  legendary: "Legendary",
  rare: "Rare",
  uncommon: "Uncommon",
  common: "Common",
};

/* -------------------------------------------------------------------------------------------- */
/* SHA-256 (FIPS 180-4), small synchronous implementation                                       */
/* -------------------------------------------------------------------------------------------- */

const K = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]);

const rotr = (x: number, n: number) => (x >>> n) | (x << (32 - n));

/** SHA-256 digest of `data`. */
export function sha256(data: Uint8Array): Uint8Array {
  const bitLength = data.length * 8;
  const paddedLength = Math.ceil((data.length + 9) / 64) * 64;
  const padded = new Uint8Array(paddedLength);
  padded.set(data);
  padded[data.length] = 0x80;
  const view = new DataView(padded.buffer);
  // Message length in bits as a 64-bit big-endian integer (inputs here are far below 2^32 bits).
  view.setUint32(paddedLength - 8, Math.floor(bitLength / 2 ** 32));
  view.setUint32(paddedLength - 4, bitLength >>> 0);

  const h = new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ]);
  const w = new Uint32Array(64);

  for (let offset = 0; offset < paddedLength; offset += 64) {
    for (let t = 0; t < 16; t++) w[t] = view.getUint32(offset + t * 4);
    for (let t = 16; t < 64; t++) {
      const w15 = w[t - 15] ?? 0;
      const w2 = w[t - 2] ?? 0;
      const s0 = rotr(w15, 7) ^ rotr(w15, 18) ^ (w15 >>> 3);
      const s1 = rotr(w2, 17) ^ rotr(w2, 19) ^ (w2 >>> 10);
      w[t] = ((w[t - 16] ?? 0) + s0 + (w[t - 7] ?? 0) + s1) >>> 0;
    }

    let a = h[0] ?? 0;
    let b = h[1] ?? 0;
    let c = h[2] ?? 0;
    let d = h[3] ?? 0;
    let e = h[4] ?? 0;
    let f = h[5] ?? 0;
    let g = h[6] ?? 0;
    let hh = h[7] ?? 0;
    for (let t = 0; t < 64; t++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (hh + S1 + ch + (K[t] ?? 0) + (w[t] ?? 0)) >>> 0;
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) >>> 0;
      hh = g;
      g = f;
      f = e;
      e = (d + temp1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) >>> 0;
    }

    const working = [a, b, c, d, e, f, g, hh];
    working.forEach((value, i) => {
      h[i] = ((h[i] ?? 0) + value) >>> 0;
    });
  }

  const out = new Uint8Array(32);
  const outView = new DataView(out.buffer);
  h.forEach((word, i) => outView.setUint32(i * 4, word));
  return out;
}

/* -------------------------------------------------------------------------------------------- */
/* Seeds                                                                                        */
/* -------------------------------------------------------------------------------------------- */

export function bytesToHex(bytes: Uint8Array): string {
  return `0x${Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}

/** Parse a 0x-prefixed (or bare) hex string of up to 32 bytes into a 256-bit big-endian word. */
export function hexToBytes32(hex: string): Uint8Array {
  const clean = hex.startsWith("0x") || hex.startsWith("0X") ? hex.slice(2) : hex;
  if (!/^[0-9a-fA-F]{1,64}$/.test(clean)) {
    throw new Error(`Invalid seed: expected up to 64 hex characters, got "${hex}"`);
  }
  const padded = clean.padStart(64, "0");
  const bytes = new Uint8Array(32);
  for (let i = 0; i < 32; i++) bytes[i] = parseInt(padded.slice(i * 2, i * 2 + 2), 16);
  return bytes;
}

/** A fresh 256-bit seed, standing in for the number Chainlink VRF returns. */
export function randomSeed(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes);
}

/** "0x3f9a…c21e" */
export function shortHex(hex: string, chars = 4): string {
  const clean = hex.startsWith("0x") ? hex.slice(2) : hex;
  if (clean.length <= chars * 2) return `0x${clean}`;
  return `0x${clean.slice(0, chars)}…${clean.slice(-chars)}`;
}

/* -------------------------------------------------------------------------------------------- */
/* Expansion + shuffle                                                                          */
/* -------------------------------------------------------------------------------------------- */

/**
 * Expand one seed into `n` pseudo-random 256-bit values: value[i] = H(abi.encode(seed, i)).
 * `abi.encode(uint256, uint256)` is the two words concatenated big-endian, 64 bytes in all.
 */
export function expandSeed(seedHex: string, n: number): bigint[] {
  const seed = hexToBytes32(seedHex);
  const input = new Uint8Array(64);
  input.set(seed, 0);
  const view = new DataView(input.buffer);
  const values: bigint[] = [];
  for (let i = 0; i < n; i++) {
    view.setUint32(60, i); // i fits in the low 4 bytes of the second word
    values.push(BigInt(bytesToHex(sha256(input))));
  }
  return values;
}

/**
 * Unbiased Fisher–Yates shuffle (forward variant) of a copy of `items`.
 * At step i, j is drawn uniformly from [i, n) using value[i] mod (n − i); with 256-bit values
 * the modulo bias is below 2^-249 and irrelevant.
 */
export function fisherYates<T>(items: readonly T[], values: readonly bigint[]): T[] {
  const result = items.slice();
  const n = result.length;
  if (values.length < n) throw new Error("Not enough random values for the shuffle");
  for (let i = 0; i < n - 1; i++) {
    const j = i + Number((values[i] ?? 0n) % BigInt(n - i));
    const picked = result[j] as T;
    result[j] = result[i] as T;
    result[i] = picked;
  }
  return result;
}

/**
 * The rarity map for a collection: `ranks[i]` is the rarity rank (1 = rarest) of token ID i + 1.
 * Every rank from 1 to `size` appears exactly once.
 */
export function rarityRanksFromSeed(seedHex: string, size = COLLECTION_SIZE): number[] {
  const ranks = Array.from({ length: size }, (_, i) => i + 1);
  return fisherYates(ranks, expandSeed(seedHex, size));
}

/* -------------------------------------------------------------------------------------------- */
/* Tiers                                                                                        */
/* -------------------------------------------------------------------------------------------- */

/** Tier for a rank, assigning the rarest tier to the lowest ranks. */
export function tierForRank(rank: number, tiers: readonly TierSize[] = DEMO_TIERS): Tier {
  let ceiling = 0;
  for (const { tier, count } of tiers) {
    ceiling += count;
    if (rank <= ceiling) return tier;
  }
  return tiers[tiers.length - 1]?.tier ?? "common";
}

/** Tier per token, in token order. */
export function tiersFromRanks(
  ranks: readonly number[],
  tiers: readonly TierSize[] = DEMO_TIERS
): Tier[] {
  return ranks.map((rank) => tierForRank(rank, tiers));
}

export function countTiers(tiers: readonly Tier[]): Record<Tier, number> {
  const counts: Record<Tier, number> = { legendary: 0, rare: 0, uncommon: 0, common: 0 };
  for (const tier of tiers) counts[tier]++;
  return counts;
}

/** Whether two rarity maps assign identical ranks to every token. */
export function sameMap(a: readonly number[], b: readonly number[]): boolean {
  return a.length === b.length && a.every((rank, i) => rank === b[i]);
}

/* -------------------------------------------------------------------------------------------- */
/* Minting                                                                                      */
/* -------------------------------------------------------------------------------------------- */

export type Owner = "public" | "friends";

/** Who minted each token (index = token ID − 1), or null while unminted. */
export type Owners = ReadonlyArray<Owner | null>;

export function emptyOwners(size = COLLECTION_SIZE): (Owner | null)[] {
  return Array.from({ length: size }, () => null);
}

/** Public mint: the next `amount` unminted token IDs, lowest first. */
export function mintPublic(owners: Owners, amount: number): (Owner | null)[] {
  const next = owners.slice();
  let remaining = amount;
  for (let i = 0; i < next.length && remaining > 0; i++) {
    if (next[i] === null) {
      next[i] = "public";
      remaining--;
    }
  }
  return next;
}

/**
 * Token indices an insider would grab when the rarity map already exists: every still-unminted
 * token whose tier is Legendary or Rare.
 */
export function insiderTargets(owners: Owners, tiers: readonly Tier[]): number[] {
  const targets: number[] = [];
  tiers.forEach((tier, i) => {
    if ((tier === "legendary" || tier === "rare") && owners[i] === null) targets.push(i);
  });
  return targets;
}

/** Mint the insider targets to the friends wallet. */
export function mintInsider(owners: Owners, tiers: readonly Tier[]): (Owner | null)[] {
  const next = owners.slice();
  for (const i of insiderTargets(owners, tiers)) next[i] = "friends";
  return next;
}

export function mintedCount(owners: Owners): number {
  return owners.reduce((sum, owner) => sum + (owner === null ? 0 : 1), 0);
}

/** How many tokens of each tier the friends wallet holds. */
export function friendsHoldings(owners: Owners, tiers: readonly Tier[]): Record<Tier, number> {
  return countTiers(tiers.filter((_, i) => owners[i] === "friends"));
}
