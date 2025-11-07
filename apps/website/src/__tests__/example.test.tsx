import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "../app/page";

describe("HomePage", () => {
  it("renders the hero section with main heading", () => {
    render(<HomePage />);
    const heading = screen.getByRole("heading", { name: /I'm Andrew Aarestad/i });
    expect(heading).toBeInTheDocument();
  });

  it("displays the design process section with title and subtitle", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: /design process/i })).toBeInTheDocument();
    expect(
      screen.getByText(/This site is built using a design-first workflow/i),
    ).toBeInTheDocument();
  });

  it("displays link to design process page", () => {
    render(<HomePage />);
    const link = screen.getByRole("link", { name: /View Design Process/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/design-process");
  });

  it("displays the technology stack", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: /next\.js 15/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /turborepo/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /shadcn\/ui ready/i })).toBeInTheDocument();
  });
});
