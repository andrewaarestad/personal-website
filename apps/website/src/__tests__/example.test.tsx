import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "../app/page";

describe("HomePage", () => {
  it("renders the main heading", () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { name: /personal website/i });
    expect(heading).toBeInTheDocument();
  });

  it("displays the technology stack", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: /next\.js 15/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /turborepo/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /shadcn\/ui ready/i })).toBeInTheDocument();
  });
});
