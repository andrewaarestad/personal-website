import type { H1SectionProps } from "./types";

/**
 * H1Section - Primary heading section for post pages
 *
 * Renders a large, bold heading with consistent styling.
 * Typically used once at the top of a post for the main title.
 *
 * @example
 * ```tsx
 * <H1Section key="title" text="Building a Modern IoT Platform" />
 * ```
 */
export function H1Section({ text }: H1SectionProps) {
  return (
    <div className="space-y-6">
      <div className="w-16 h-1 bg-brand" aria-hidden="true" />
      <h1 className="text-h1 font-extrabold text-black">{text}</h1>
    </div>
  );
}
