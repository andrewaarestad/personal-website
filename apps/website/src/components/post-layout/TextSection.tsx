import type { TextSectionProps } from "./types";

/**
 * TextSection - Body text section for post pages
 *
 * Renders paragraph text with consistent styling and spacing.
 * Supports multi-line text content.
 *
 * @example
 * ```tsx
 * <TextSection
 *   key="intro"
 *   text="This project explores the intersection of machine learning and IoT..."
 * />
 * ```
 */
export function TextSection({ text }: TextSectionProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <p className="text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap">{text}</p>
    </div>
  );
}
