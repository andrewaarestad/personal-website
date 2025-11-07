import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { HomepageHero } from "../homepage-hero";

// Mock the Button component to avoid testing shadcn/ui internals
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, className, ...props }: any) => (
    <button className={className} {...props}>
      {children}
    </button>
  ),
}));

describe("HomepageHero", () => {
  describe("Variant rendering", () => {
    it("renders direct variant by default", () => {
      render(<HomepageHero />);

      // Check for h1 heading (all variants have one)
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();

      // Check for flexible match on "Andrew" which is unique to direct variant
      expect(heading).toHaveTextContent(/andrew/i);
    });

    it("renders direct variant when explicitly set", () => {
      render(<HomepageHero variant="direct" />);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent(/andrew/i);
    });

    it("renders problem-solver variant when specified", () => {
      render(<HomepageHero variant="problem-solver" />);

      const heading = screen.getByRole("heading", { level: 1 });
      // Problem-solver has different text than the other variants
      expect(heading).toHaveTextContent(/intelligent systems/i);
    });

    it("renders understated variant when specified", () => {
      render(<HomepageHero variant="understated" />);

      const heading = screen.getByRole("heading", { level: 1 });
      // Understated variant has specific text
      expect(heading).toHaveTextContent(/ML engineer/i);
    });
  });

  describe("Accent decoration", () => {
    it("shows accent decoration by default", () => {
      const { container } = render(<HomepageHero />);

      // Check for aria-hidden accent element
      const accent = container.querySelector('[aria-hidden="true"]');
      expect(accent).toBeInTheDocument();
    });

    it("shows accent decoration when showAccent is true", () => {
      const { container } = render(<HomepageHero showAccent={true} />);

      const accent = container.querySelector('[aria-hidden="true"]');
      expect(accent).toBeInTheDocument();
    });

    it("hides accent decoration when showAccent is false", () => {
      const { container } = render(<HomepageHero showAccent={false} />);

      const accent = container.querySelector('[aria-hidden="true"]');
      expect(accent).not.toBeInTheDocument();
    });
  });

  describe("Component structure", () => {
    it("renders as a semantic section element", () => {
      const { container } = render(<HomepageHero />);

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("contains a button element", () => {
      render(<HomepageHero />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("has proper heading hierarchy with h1", () => {
      render(<HomepageHero />);

      // Verify h1 exists (semantic structure)
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
    });
  });

  describe("All variants have consistent structure", () => {
    it("direct variant has button", () => {
      render(<HomepageHero variant="direct" />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("problem-solver variant has button", () => {
      render(<HomepageHero variant="problem-solver" />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("understated variant has button", () => {
      render(<HomepageHero variant="understated" />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });
});
