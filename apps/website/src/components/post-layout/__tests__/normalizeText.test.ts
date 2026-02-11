import { describe, it, expect } from "vitest";
import { normalizeText } from "../normalizeText";

describe("normalizeText", () => {
  it("returns a single paragraph for simple text", () => {
    expect(normalizeText("Hello world")).toEqual(["Hello world"]);
  });

  it("collapses single newlines to spaces", () => {
    expect(normalizeText("Hello\nworld")).toEqual(["Hello world"]);
  });

  it("collapses multiple spaces", () => {
    expect(normalizeText("Hello    world")).toEqual(["Hello world"]);
  });

  it("splits on double newlines into paragraphs", () => {
    expect(normalizeText("Para one\n\nPara two")).toEqual(["Para one", "Para two"]);
  });

  it("handles indented template literals", () => {
    const text = `First paragraph that wraps
      across multiple lines with
      indentation from template literal.

      Second paragraph also
      with indentation.`;
    expect(normalizeText(text)).toEqual([
      "First paragraph that wraps across multiple lines with indentation from template literal.",
      "Second paragraph also with indentation.",
    ]);
  });

  it("discards empty paragraphs from triple newlines", () => {
    expect(normalizeText("Para one\n\n\nPara two")).toEqual(["Para one", "Para two"]);
  });

  it("trims leading and trailing whitespace", () => {
    expect(normalizeText("  Hello world  ")).toEqual(["Hello world"]);
  });

  it("handles empty string", () => {
    expect(normalizeText("")).toEqual([]);
  });

  it("handles whitespace-only string", () => {
    expect(normalizeText("   \n\n   ")).toEqual([]);
  });

  it("handles tabs and mixed whitespace", () => {
    expect(normalizeText("Hello\t\tworld")).toEqual(["Hello world"]);
  });
});
