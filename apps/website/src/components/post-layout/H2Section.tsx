import type { H2SectionProps } from "./types";

/**
 * H2Section - Secondary heading section for post pages
 *
 * Renders a medium-sized heading for major sections within a post.
 * Use for breaking content into distinct sections.
 *
 * @example
 * ```tsx
 * <H2Section key="overview" text="Project Overview" />
 * ```
 */
export function H2Section({ text }: H2SectionProps) {
  return <h2 className="text-h2 font-bold text-black pt-4">{text}</h2>;
}
