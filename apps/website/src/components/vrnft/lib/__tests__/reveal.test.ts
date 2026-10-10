import { describe, expect, it } from "vitest";
import {
  COLLECTION_SIZE,
  DEMO_TIERS,
  bytesToHex,
  countTiers,
  emptyOwners,
  expandSeed,
  fisherYates,
  friendsHoldings,
  hexToBytes32,
  insiderTargets,
  mintInsider,
  mintPublic,
  mintedCount,
  rarityRanksFromSeed,
  sameMap,
  sha256,
  shortHex,
  tierForRank,
  tiersFromRanks,
} from "../reveal";

const SEED_A = "0x3f9a5b1c7d2e4f60918273645546372819a0b1c2d3e4f5061728394a5b6cc21e";
const SEED_B = "0x0000000000000000000000000000000000000000000000000000000000000001";

/** Fixed, distinct seeds for statistical checks (deterministic, so never flaky). */
const seedFor = (k: number) => bytesToHex(sha256(new TextEncoder().encode(`seed-${k}`)));

describe("sha256", () => {
  it("matches the FIPS 180-4 test vectors", () => {
    expect(bytesToHex(sha256(new TextEncoder().encode("abc")))).toBe(
      "0xba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
    );
    expect(bytesToHex(sha256(new Uint8Array()))).toBe(
      "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    );
    // Two-block message (56 bytes forces padding into a second block).
    expect(
      bytesToHex(
        sha256(new TextEncoder().encode("abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq"))
      )
    ).toBe("0x248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1");
  });
});

describe("seed helpers", () => {
  it("round-trips hex and left-pads short values to 32 bytes", () => {
    expect(bytesToHex(hexToBytes32(SEED_A))).toBe(SEED_A);
    expect(bytesToHex(hexToBytes32("0x1"))).toBe(SEED_B);
    expect(() => hexToBytes32("0xnothex")).toThrow();
  });

  it("shortens a seed for display", () => {
    expect(shortHex(SEED_A)).toBe("0x3f9a…c21e");
  });

  it("expands one seed into distinct per-token values", () => {
    const values = expandSeed(SEED_A, 10);
    expect(values).toHaveLength(10);
    expect(new Set(values.map(String)).size).toBe(10);
    expect(expandSeed(SEED_A, 10)).toEqual(values);
  });
});

describe("rarityRanksFromSeed", () => {
  it("is deterministic: the same seed always gives the same map", () => {
    expect(rarityRanksFromSeed(SEED_A)).toEqual(rarityRanksFromSeed(SEED_A));
    expect(sameMap(rarityRanksFromSeed(SEED_A), rarityRanksFromSeed(SEED_A))).toBe(true);
  });

  it("is a permutation: every rank appears exactly once", () => {
    for (const seed of [SEED_A, SEED_B, seedFor(1), seedFor(2)]) {
      const ranks = rarityRanksFromSeed(seed);
      expect(ranks).toHaveLength(COLLECTION_SIZE);
      expect([...ranks].sort((a, b) => a - b)).toEqual(
        Array.from({ length: COLLECTION_SIZE }, (_, i) => i + 1)
      );
    }
  });

  it("gives different maps for different seeds", () => {
    const maps = Array.from({ length: 20 }, (_, k) => rarityRanksFromSeed(seedFor(k)));
    const unique = new Set(maps.map((ranks) => ranks.join(",")));
    expect(unique.size).toBe(maps.length);
    expect(sameMap(rarityRanksFromSeed(SEED_A), rarityRanksFromSeed(SEED_B))).toBe(false);
  });
});

describe("fisherYates", () => {
  it("does not mutate its input", () => {
    const items = [1, 2, 3, 4];
    fisherYates(items, expandSeed(SEED_A, 4));
    expect(items).toEqual([1, 2, 3, 4]);
  });

  it("produces every permutation of 4 items about equally often", () => {
    const runs = 2400; // 24 permutations → 100 expected each
    const counts = new Map<string, number>();
    for (let k = 0; k < runs; k++) {
      const key = fisherYates(["a", "b", "c", "d"], expandSeed(seedFor(k), 4)).join("");
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    expect(counts.size).toBe(24);
    for (const count of counts.values()) {
      expect(count).toBeGreaterThan(60);
      expect(count).toBeLessThan(140);
    }
  });

  it("places the Legendary ranks evenly across token positions", () => {
    // Over 400 maps, each of the 10 deciles of the grid should hold ~10% of rank 1.
    const deciles = new Array<number>(10).fill(0);
    for (let k = 0; k < 400; k++) {
      const decile = Math.floor(rarityRanksFromSeed(seedFor(k)).indexOf(1) / 10);
      deciles[decile] = (deciles[decile] ?? 0) + 1;
    }
    for (const count of deciles) {
      expect(count).toBeGreaterThan(15);
      expect(count).toBeLessThan(70);
    }
  });
});

describe("tiers", () => {
  it("maps ranks to the scaled-down demo tiers", () => {
    expect(tierForRank(1)).toBe("legendary");
    expect(tierForRank(2)).toBe("legendary");
    expect(tierForRank(3)).toBe("rare");
    expect(tierForRank(10)).toBe("rare");
    expect(tierForRank(11)).toBe("uncommon");
    expect(tierForRank(30)).toBe("uncommon");
    expect(tierForRank(31)).toBe("common");
    expect(tierForRank(100)).toBe("common");
  });

  it("matches the contract's cut-offs when given them", () => {
    const contractTiers = [
      { tier: "legendary", count: 10 },
      { tier: "rare", count: 90 },
      { tier: "uncommon", count: 900 },
      { tier: "common", count: Infinity },
    ] as const;
    expect(tierForRank(10, contractTiers)).toBe("legendary");
    expect(tierForRank(11, contractTiers)).toBe("rare");
    expect(tierForRank(1000, contractTiers)).toBe("uncommon");
    expect(tierForRank(1001, contractTiers)).toBe("common");
  });

  it("produces exactly the configured count per tier for any seed", () => {
    const expected = Object.fromEntries(DEMO_TIERS.map(({ tier, count }) => [tier, count]));
    for (const seed of [SEED_A, SEED_B, seedFor(7)]) {
      expect(countTiers(tiersFromRanks(rarityRanksFromSeed(seed)))).toEqual(expected);
    }
  });
});

describe("minting", () => {
  const tiers = tiersFromRanks(rarityRanksFromSeed(SEED_A));

  it("mints public batches lowest token ID first", () => {
    let owners = mintPublic(emptyOwners(), 25);
    expect(mintedCount(owners)).toBe(25);
    expect(owners.slice(0, 25).every((o) => o === "public")).toBe(true);
    owners = mintPublic(owners, 1000);
    expect(mintedCount(owners)).toBe(COLLECTION_SIZE);
  });

  it("insider mint takes exactly the Legendary and Rare token IDs", () => {
    const owners = mintInsider(emptyOwners(), tiers);
    const friends = owners.flatMap((owner, i) => (owner === "friends" ? [i] : []));
    const rareIds = tiers.flatMap((tier, i) =>
      tier === "legendary" || tier === "rare" ? [i] : []
    );
    expect(friends).toEqual(rareIds);
    expect(friends).toHaveLength(10);
    expect(friendsHoldings(owners, tiers)).toEqual({
      legendary: 2,
      rare: 8,
      uncommon: 0,
      common: 0,
    });
  });

  it("insider mint skips tokens the public already minted, and public mint skips friends", () => {
    const publicFirst = mintPublic(emptyOwners(), 50);
    const targets = insiderTargets(publicFirst, tiers);
    expect(targets.every((i) => i >= 50)).toBe(true);

    const afterInsider = mintInsider(emptyOwners(), tiers);
    const afterPublic = mintPublic(afterInsider, COLLECTION_SIZE);
    expect(afterPublic.filter((o) => o === "friends")).toHaveLength(10);
    expect(mintedCount(afterPublic)).toBe(COLLECTION_SIZE);
  });
});
