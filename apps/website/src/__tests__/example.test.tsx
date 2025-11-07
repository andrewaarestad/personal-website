import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "../app/page";

describe("HomePage", () => {
  it("renders the hero section with main heading", () => {
    render(<HomePage />);
    // Check for presence of main heading containing "Andrew" - not exact text
    // This allows copy to evolve without breaking tests
    const heading = screen.getByRole("heading", { name: /andrew/i, level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it("displays the design process section", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: /design process/i })).toBeInTheDocument();
  });

  it("displays the technology stack", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: /next\.js 15/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /turborepo/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /shadcn\/ui ready/i })).toBeInTheDocument();
  });
});
