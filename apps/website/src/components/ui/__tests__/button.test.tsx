import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../button";

describe("Button", () => {
  describe("Brand color variants", () => {
    it("renders vermillion variant with correct classes", () => {
      render(<Button variant="vermillion">Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-vermillion");
      expect(button).toHaveClass("hover:bg-vermillion-dark");
    });

    it("renders blue variant with correct classes", () => {
      render(<Button variant="blue">Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-blue");
      expect(button).toHaveClass("hover:bg-blue-dark");
    });

    it("renders gold variant with correct classes", () => {
      render(<Button variant="gold">Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-gold");
      expect(button).toHaveClass("hover:bg-gold-dark");
    });

    it("renders black variant with correct classes", () => {
      render(<Button variant="black">Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-black");
      expect(button).toHaveClass("hover:bg-black/90");
    });
  });

  describe("Existing variants", () => {
    it("renders default variant", () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("renders outline variant with correct classes", () => {
      render(<Button variant="outline">Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border");
    });

    it("renders ghost variant with correct classes", () => {
      render(<Button variant="ghost">Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("hover:bg-accent");
    });
  });

  describe("Size variants", () => {
    it("renders default size", () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-9");
    });

    it("renders small size with correct classes", () => {
      render(<Button size="sm">Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-8");
    });

    it("renders large size with correct classes", () => {
      render(<Button size="lg">Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-10");
    });
  });

  describe("Combining variants", () => {
    it("combines brand color variant with size", () => {
      render(<Button variant="vermillion" size="lg">Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-vermillion");
      expect(button).toHaveClass("h-10");
    });

    it("combines brand color variant with custom className", () => {
      render(<Button variant="blue" className="custom-class">Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-blue");
      expect(button).toHaveClass("custom-class");
    });
  });

  describe("Accessibility", () => {
    it("renders as a semantic button element", () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole("button");
      expect(button.tagName).toBe("BUTTON");
    });

    it("preserves button content", () => {
      render(<Button>Test Content</Button>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("accepts and forwards HTML button attributes", () => {
      render(<Button type="submit" disabled>Submit</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
      expect(button).toBeDisabled();
    });
  });
});
