import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { RevealSimulator } from "../RevealSimulator";

describe("RevealSimulator", () => {
  beforeEach(() => {
    // Reduced motion makes the VRF wait and the cascade instant.
    vi.stubGlobal(
      "matchMedia",
      vi.fn((query: string) => ({
        matches: query.includes("reduce"),
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
      }))
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("only enables Reveal after mint-out", () => {
    render(<RevealSimulator />);
    const revealButton = screen.getByRole("button", { name: "Reveal" });
    expect(revealButton).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Mint 25" }));
    expect(screen.getByText(/Minted 25 \/ 100/)).toBeInTheDocument();
    expect(revealButton).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Mint all" }));
    expect(revealButton).toBeEnabled();
  });

  it("typical mode: insider mint lets friends hold every Legendary and Rare", () => {
    render(<RevealSimulator />);
    fireEvent.click(screen.getByRole("button", { name: "Insider mint" }));
    fireEvent.click(screen.getByRole("button", { name: "Mint all" }));
    fireEvent.click(screen.getByRole("button", { name: "Reveal" }));
    expect(screen.getByText("Friends hold 2/2 Legendary, 8/8 Rare.")).toBeInTheDocument();
  });

  it("vrnft mode: insider mint is unavailable and the revealed map verifies", () => {
    render(<RevealSimulator />);
    fireEvent.click(screen.getByRole("button", { name: "vrnft reveal" }));
    expect(screen.getByRole("button", { name: "Insider mint" })).toBeDisabled();
    fireEvent.click(screen.getByLabelText("Founder's view"));
    expect(screen.getByText(/No rarity map exists yet/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Mint all" }));
    fireEvent.click(screen.getByRole("button", { name: "Reveal" }));
    expect(screen.getByTitle(/^0x[0-9a-f]{64}$/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Verify" }));
    expect(screen.getByText("✓ Recomputed from seed — same map")).toBeInTheDocument();
  });

  it("switching modes resets the simulation", () => {
    render(<RevealSimulator />);
    fireEvent.click(screen.getByRole("button", { name: "Mint all" }));
    fireEvent.click(screen.getByRole("button", { name: "vrnft reveal" }));
    expect(screen.getByText(/Minted 0 \/ 100/)).toBeInTheDocument();
  });
});
