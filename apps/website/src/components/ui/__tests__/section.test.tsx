import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section } from "../section";

describe("Section", () => {
  describe("Spacing variants", () => {
    it("renders medium spacing by default", () => {
      render(<Section data-testid="section">Content</Section>);
      const section = screen.getByTestId("section");
      expect(section).toHaveClass("py-16");
    });

    it("renders no spacing with none variant", () => {
      render(
        <Section spacing="none" data-testid="section">
          Content
        </Section>
      );
      const section = screen.getByTestId("section");
      expect(section).not.toHaveClass("py-8");
      expect(section).not.toHaveClass("py-16");
      expect(section).not.toHaveClass("py-24");
    });

    it("renders small spacing with correct classes", () => {
      render(
        <Section spacing="small" data-testid="section">
          Content
        </Section>
      );
      const section = screen.getByTestId("section");
      expect(section).toHaveClass("py-8");
    });

    it("renders medium spacing with correct classes", () => {
      render(
        <Section spacing="medium" data-testid="section">
          Content
        </Section>
      );
      const section = screen.getByTestId("section");
      expect(section).toHaveClass("py-16");
    });

    it("renders large spacing with correct classes", () => {
      render(
        <Section spacing="large" data-testid="section">
          Content
        </Section>
      );
      const section = screen.getByTestId("section");
      expect(section).toHaveClass("py-24");
    });
  });

  describe("Base styles", () => {
    it("applies full-width class", () => {
      render(<Section data-testid="section">Content</Section>);
      const section = screen.getByTestId("section");
      expect(section).toHaveClass("w-full");
    });
  });

  describe("Custom className", () => {
    it("accepts and merges custom className", () => {
      render(
        <Section className="custom-class" data-testid="section">
          Content
        </Section>
      );
      const section = screen.getByTestId("section");
      expect(section).toHaveClass("custom-class");
      expect(section).toHaveClass("w-full");
    });
  });

  describe("Semantic HTML", () => {
    it("renders as a semantic section element", () => {
      render(<Section data-testid="section">Content</Section>);
      const section = screen.getByTestId("section");
      expect(section.tagName).toBe("SECTION");
    });

    it("preserves children content", () => {
      render(<Section>Test Content</Section>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("HTML attributes", () => {
    it("forwards HTML section attributes", () => {
      render(
        <Section data-testid="section" id="my-section" aria-label="Main section">
          Content
        </Section>
      );
      const section = screen.getByTestId("section");
      expect(section).toHaveAttribute("id", "my-section");
      expect(section).toHaveAttribute("aria-label", "Main section");
    });
  });
});
