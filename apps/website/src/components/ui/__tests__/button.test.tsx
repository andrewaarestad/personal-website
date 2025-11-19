import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../button";

describe("Button", () => {
  describe("Brand semantic variants", () => {
    it("renders brand variant with correct classes", () => {
      render(<Button variant="brand">Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-brand");
      expect(button).toHaveClass("hover:bg-brand-dark");
    });

    it("renders info variant with correct classes", () => {
      render(<Button variant="info">Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-brand-secondary");
      expect(button).toHaveClass("hover:bg-brand-secondary-dark");
    });

    it("renders highlight variant with correct classes", () => {
      render(<Button variant="highlight">Click me</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-highlight");
      expect(button).toHaveClass("hover:bg-highlight-dark");
    });

    it("renders emphasis variant with correct classes", () => {
      render(<Button variant="emphasis">Click me</Button>);
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
      expect(button).toHaveClass("h-10");
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
    it("combines semantic variant with size", () => {
      render(
        <Button variant="brand" size="lg">
          Click me
        </Button>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-brand");
      expect(button).toHaveClass("h-10");
    });

    it("combines semantic variant with custom className", () => {
      render(
        <Button variant="info" className="custom-class">
          Click me
        </Button>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-brand-secondary");
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
      render(
        <Button type="submit" disabled>
          Submit
        </Button>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
      expect(button).toBeDisabled();
    });
  });
});
