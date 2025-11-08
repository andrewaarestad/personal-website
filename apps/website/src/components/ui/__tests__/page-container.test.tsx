import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageContainer } from "../page-container";

describe("PageContainer", () => {
  describe("Size variants", () => {
    it("renders wide variant by default", () => {
      render(<PageContainer data-testid="container">Content</PageContainer>);
      const container = screen.getByTestId("container");
      expect(container).toHaveClass("max-w-5xl");
    });

    it("renders narrow variant with correct max-width", () => {
      render(<PageContainer size="narrow" data-testid="container">Content</PageContainer>);
      const container = screen.getByTestId("container");
      expect(container).toHaveClass("max-w-2xl");
    });

    it("renders medium variant with correct max-width", () => {
      render(<PageContainer size="medium" data-testid="container">Content</PageContainer>);
      const container = screen.getByTestId("container");
      expect(container).toHaveClass("max-w-3xl");
    });

    it("renders wide variant with correct max-width", () => {
      render(<PageContainer size="wide" data-testid="container">Content</PageContainer>);
      const container = screen.getByTestId("container");
      expect(container).toHaveClass("max-w-5xl");
    });

    it("renders full variant with correct max-width", () => {
      render(<PageContainer size="full" data-testid="container">Content</PageContainer>);
      const container = screen.getByTestId("container");
      expect(container).toHaveClass("max-w-7xl");
    });
  });

  describe("Base styles", () => {
    it("applies container classes", () => {
      render(<PageContainer data-testid="container">Content</PageContainer>);
      const container = screen.getByTestId("container");
      expect(container).toHaveClass("container");
      expect(container).toHaveClass("mx-auto");
      expect(container).toHaveClass("px-6");
    });
  });

  describe("Custom className", () => {
    it("accepts and merges custom className", () => {
      render(<PageContainer className="custom-class" data-testid="container">Content</PageContainer>);
      const container = screen.getByTestId("container");
      expect(container).toHaveClass("custom-class");
      expect(container).toHaveClass("container");
    });
  });

  describe("Semantic HTML", () => {
    it("renders as a div element", () => {
      render(<PageContainer data-testid="container">Content</PageContainer>);
      const container = screen.getByTestId("container");
      expect(container.tagName).toBe("DIV");
    });

    it("preserves children content", () => {
      render(<PageContainer>Test Content</PageContainer>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });
  });

  describe("HTML attributes", () => {
    it("forwards HTML div attributes", () => {
      render(
        <PageContainer data-testid="container" id="my-container" role="region">
          Content
        </PageContainer>
      );
      const container = screen.getByTestId("container");
      expect(container).toHaveAttribute("id", "my-container");
      expect(container).toHaveAttribute("role", "region");
    });
  });
});
