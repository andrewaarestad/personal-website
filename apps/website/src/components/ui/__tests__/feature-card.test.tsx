import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeatureCard } from "../feature-card";

describe("FeatureCard", () => {
  describe("Background variants", () => {
    it("renders gradient-primary by default", () => {
      render(<FeatureCard data-testid="card">Content</FeatureCard>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("bg-gradient-to-br");
      expect(card).toHaveClass("from-vermillion-light/30");
    });

    it("renders gradient-primary variant with correct classes", () => {
      render(<FeatureCard background="gradient-primary" data-testid="card">Content</FeatureCard>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("from-vermillion-light/30");
      expect(card).toHaveClass("via-blue-light/30");
      expect(card).toHaveClass("to-gold-light/30");
    });

    it("renders gradient-reverse variant with correct classes", () => {
      render(<FeatureCard background="gradient-reverse" data-testid="card">Content</FeatureCard>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("from-blue-light/30");
      expect(card).toHaveClass("via-gold-light/30");
      expect(card).toHaveClass("to-vermillion-light/30");
    });

    it("renders gradient-subtle variant with correct classes", () => {
      render(<FeatureCard background="gradient-subtle" data-testid="card">Content</FeatureCard>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("from-gradient-vermillion-subtle");
      expect(card).toHaveClass("via-canvas");
      expect(card).toHaveClass("to-gradient-blue-subtle");
    });

    it("renders surface background variant", () => {
      render(<FeatureCard background="surface" data-testid="card">Content</FeatureCard>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("bg-surface");
    });

    it("renders canvas background variant", () => {
      render(<FeatureCard background="canvas" data-testid="card">Content</FeatureCard>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("bg-canvas");
    });
  });

  describe("Border variants", () => {
    it("renders default border by default", () => {
      render(<FeatureCard data-testid="card">Content</FeatureCard>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("border-2");
      expect(card).toHaveClass("border-border-default");
    });

    it("renders no border with none variant", () => {
      render(<FeatureCard border="none" data-testid="card">Content</FeatureCard>);
      const card = screen.getByTestId("card");
      expect(card).not.toHaveClass("border");
      expect(card).not.toHaveClass("border-2");
    });

    it("renders light border variant", () => {
      render(<FeatureCard border="light" data-testid="card">Content</FeatureCard>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("border");
      expect(card).toHaveClass("border-border-default");
    });

    it("renders brand border with hover state", () => {
      render(<FeatureCard border="brand" data-testid="card">Content</FeatureCard>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("border-2");
      expect(card).toHaveClass("hover:border-vermillion");
    });

    it("renders info border with hover state", () => {
      render(<FeatureCard border="info" data-testid="card">Content</FeatureCard>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("hover:border-blue");
    });

    it("renders highlight border with hover state", () => {
      render(<FeatureCard border="highlight" data-testid="card">Content</FeatureCard>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("hover:border-gold");
    });
  });

  describe("Padding variants", () => {
    it("renders default padding by default", () => {
      render(<FeatureCard data-testid="card">Content</FeatureCard>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("p-8");
    });

    it("renders compact padding variant", () => {
      render(<FeatureCard padding="compact" data-testid="card">Content</FeatureCard>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("p-6");
    });

    it("renders default padding variant", () => {
      render(<FeatureCard padding="default" data-testid="card">Content</FeatureCard>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("p-8");
    });

    it("renders spacious padding variant", () => {
      render(<FeatureCard padding="spacious" data-testid="card">Content</FeatureCard>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("p-10");
    });
  });

  describe("Base styles", () => {
    it("applies rounded corners", () => {
      render(<FeatureCard data-testid="card">Content</FeatureCard>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("rounded-xl");
    });

    it("applies transition-colors", () => {
      render(<FeatureCard data-testid="card">Content</FeatureCard>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("transition-colors");
    });
  });

  describe("Combining variants", () => {
    it("combines background, border, and padding variants", () => {
      render(
        <FeatureCard
          background="surface"
          border="info"
          padding="compact"
          data-testid="card"
        >
          Content
        </FeatureCard>
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("bg-surface");
      expect(card).toHaveClass("hover:border-blue");
      expect(card).toHaveClass("p-6");
    });

    it("accepts and merges custom className", () => {
      render(<FeatureCard className="custom-class" data-testid="card">Content</FeatureCard>);
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("custom-class");
      expect(card).toHaveClass("rounded-xl");
    });
  });

  describe("Semantic HTML", () => {
    it("renders as a div element", () => {
      render(<FeatureCard data-testid="card">Content</FeatureCard>);
      const card = screen.getByTestId("card");
      expect(card.tagName).toBe("DIV");
    });

    it("preserves children content", () => {
      render(<FeatureCard>Test Content</FeatureCard>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("HTML attributes", () => {
    it("forwards HTML div attributes", () => {
      render(
        <FeatureCard data-testid="card" id="my-card" role="article">
          Content
        </FeatureCard>
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveAttribute("id", "my-card");
      expect(card).toHaveAttribute("role", "article");
    });
  });
});
