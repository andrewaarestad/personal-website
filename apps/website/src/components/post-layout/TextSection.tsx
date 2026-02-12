import { normalizeText } from "./normalizeText";
import type { TextSectionProps } from "./types";

/**
 * TextSection - Body text section for post pages
 *
 * Renders paragraph text with consistent styling and spacing.
 * Supports both plain text (via text prop) and rich HTML content (via children).
 *
 * The text prop normalizes whitespace so authors can wrap lines freely
 * in source code. Double newlines create separate paragraphs.
 *
 * @example
 * ```tsx
 * // Plain text - wrap freely, double newline = new paragraph
 * <TextSection
 *   key="intro"
 *   text={`This project explores the intersection
 *     of machine learning and IoT sensors.
 *
 *     We built a complete platform from scratch.`}
 * />
 *
 * // Rich HTML content
 * <TextSection key="intro">
 *   <p><strong>Hardware:</strong> Custom sensors and firmware</p>
 * </TextSection>
 * ```
 */
export function TextSection({ text, children }: TextSectionProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {text ? (
        normalizeText(text).map((paragraph, index) => (
          <p
            key={index}
            className="text-body-lg text-text-secondary leading-relaxed"
          >
            {paragraph}
          </p>
        ))
      ) : (
        <div className="text-body-lg text-text-secondary leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}
