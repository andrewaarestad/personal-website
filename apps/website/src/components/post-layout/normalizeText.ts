/**
 * Normalizes text content for post-layout components.
 *
 * Splits text on double newlines (paragraph breaks) and collapses
 * whitespace within each paragraph. This allows content authors to
 * wrap lines freely in source code without those line breaks
 * appearing in the rendered output.
 *
 * - Double newlines (\n\n) create separate paragraphs
 * - Single newlines and runs of whitespace collapse to a single space
 * - Leading/trailing whitespace per paragraph is trimmed
 * - Empty paragraphs are discarded
 */
export function normalizeText(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((para) => para.replace(/\s+/g, " ").trim())
    .filter((para) => para.length > 0);
}
