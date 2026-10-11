import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { RevealSimulator } from "../RevealSimulator";

/** Click the single primary "next step" button, asserting its label first. */
function next(label: string) {
  fireEvent.click(screen.getByRole("button", { name: label }));
}

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

  it("offers exactly one next step at a time and marks progress", () => {
    render(<RevealSimulator />);
    const steps = screen.getByRole("list", { name: "Steps" });
    expect(steps.querySelector('[aria-current="step"]')).toHaveTextContent(
      "Team looks at the rarity map"
    );
    expect(screen.queryByRole("button", { name: "Reveal" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start over" })).toBeDisabled();

    next("Peek at the map");
    expect(steps.querySelector('[aria-current="step"]')).toHaveTextContent(
      "Insiders mint the rare IDs"
    );
    expect(screen.queryByRole("button", { name: "Peek at the map" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start over" })).toBeEnabled();
  });

  it("scenario 1: insiders mint the rares and hold all of them after reveal", () => {
    render(<RevealSimulator />);
    next("Peek at the map");
    next("Insiders mint the rares");
    expect(screen.getByText(/Insiders minted the 10 Legendary and Rare/)).toBeInTheDocument();
    next("Public mints the rest");
    next("Reveal");
    expect(screen.getByText("Friends hold 2/2 Legendary, 8/8 Rare.")).toBeInTheDocument();
    expect(screen.getByText(/Scenario complete/)).toBeInTheDocument();
  });

  it("scenario 2: insiders buy the rares on OpenSea after the public mints out", () => {
    render(<RevealSimulator />);
    fireEvent.click(screen.getByRole("button", { name: /Insiders buy the rares/ }));
    next("Public mints out");
    expect(screen.getByText(/The public minted all 100 tokens/)).toBeInTheDocument();
    next("Peek at the map");
    next("Buy the rares on OpenSea");
    expect(screen.getByText(/Insiders bought 10 tokens on OpenSea/)).toBeInTheDocument();
    next("Reveal");
    expect(screen.getByText("Friends hold 2/2 Legendary, 8/8 Rare.")).toBeInTheDocument();
  });

  it("scenario 3: vrnft insiders mint blind, and the revealed map verifies", () => {
    render(<RevealSimulator />);
    fireEvent.click(screen.getByRole("button", { name: /Insiders get random tokens/ }));
    next("Peek at the map");
    expect(screen.getByText(/nothing to see/)).toBeInTheDocument();
    next("Insiders mint 10 tokens");
    next("Public mints the rest");
    next("Request VRF reveal");
    expect(screen.getByTitle(/^0x[0-9a-f]{64}$/)).toBeInTheDocument();
    expect(screen.getByText(/Chance alone gives 10 random tokens about 0.2/)).toBeInTheDocument();
    next("Verify");
    expect(screen.getByText("✓ Recomputed from seed — same map")).toBeInTheDocument();
    expect(screen.getByText(/Scenario complete/)).toBeInTheDocument();
  });

  it("switching scenarios and Start over reset progress", () => {
    render(<RevealSimulator />);
    next("Peek at the map");
    next("Insiders mint the rares");
    fireEvent.click(screen.getByRole("button", { name: /Insiders get random tokens/ }));
    expect(screen.getByRole("button", { name: "Peek at the map" })).toBeInTheDocument();
    next("Peek at the map");
    fireEvent.click(screen.getByRole("button", { name: "Start over" }));
    expect(screen.getByRole("button", { name: "Peek at the map" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start over" })).toBeDisabled();
  });
});
