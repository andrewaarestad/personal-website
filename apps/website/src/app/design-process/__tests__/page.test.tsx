import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DesignProcessPage from "../page";

describe("DesignProcessPage", () => {
  it("renders the page title", () => {
    render(<DesignProcessPage />);
    const heading = screen.getByRole("heading", { name: /^Design Process$/i, level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it("displays the meta-project section", () => {
    render(<DesignProcessPage />);
    expect(screen.getByRole("heading", { name: /a meta-project/i })).toBeInTheDocument();
    expect(
      screen.getByText(/This website is inherently recursive/i),
    ).toBeInTheDocument();
  });

  it("displays the design-first workflow section with timeline", () => {
    render(<DesignProcessPage />);
    expect(
      screen.getByRole("heading", { name: /the design-first workflow/i }),
    ).toBeInTheDocument();
    // Check for timeline phases - use getAllByText since some text appears in headings and body
    const phases = [
      /Brand Foundation/i,
      /Visual System/i,
      /Review & Refine/i,
      /Build & Deploy/i,
    ];
    phases.forEach((phase) => {
      expect(screen.getByText(phase)).toBeInTheDocument();
    });
  });

  it("displays the mood board links section", () => {
    render(<DesignProcessPage />);
    expect(
      screen.getByRole("heading", { name: /explore the design evolution/i }),
    ).toBeInTheDocument();
  });

  it("displays all three mood board card links", () => {
    render(<DesignProcessPage />);
    const mobileHeroLink = screen.getByRole("link", { name: /view mobile hero/i });
    const moodBoardLink = screen.getByRole("link", { name: /view mood board/i });
    const colorLink = screen.getByRole("link", { name: /explore color options/i });

    expect(mobileHeroLink).toBeInTheDocument();
    expect(mobileHeroLink).toHaveAttribute("href", "/design-preview/mobile-hero");

    expect(moodBoardLink).toBeInTheDocument();
    expect(moodBoardLink).toHaveAttribute("href", "/design-preview/v1-initial");

    expect(colorLink).toBeInTheDocument();
    expect(colorLink).toHaveAttribute("href", "/design-preview/color-exploration");
  });

  it("displays the AI collaboration section", () => {
    render(<DesignProcessPage />);
    expect(
      screen.getByRole("heading", { name: /built with ai collaboration/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/This entire project is built using Claude Code/i)).toBeInTheDocument();
  });

  it("displays GitHub link", () => {
    render(<DesignProcessPage />);
    const githubLink = screen.getByRole("link", { name: /view on github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/andrewaarestad/personal-website",
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("displays back to home link", () => {
    render(<DesignProcessPage />);
    const homeLink = screen.getByRole("link", { name: /back to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
