import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TextSection } from "../TextSection";

describe("TextSection", () => {
  it("renders single paragraph text", () => {
    render(<TextSection text="Hello world" />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders multiple paragraphs from double newlines", () => {
    render(<TextSection text={"Para one\n\nPara two"} />);
    expect(screen.getByText("Para one")).toBeInTheDocument();
    expect(screen.getByText("Para two")).toBeInTheDocument();
  });

  it("collapses single newlines within paragraphs", () => {
    render(<TextSection text={"Hello\nworld"} />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders children when no text prop", () => {
    render(
      <TextSection>
        <p>Child content</p>
      </TextSection>
    );
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });
});
