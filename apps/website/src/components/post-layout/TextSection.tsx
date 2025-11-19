import type { TextSectionProps } from "./types";

/**
 * TextSection - Body text section for post pages
 *
 * Renders paragraph text with consistent styling and spacing.
 * Supports both plain text (via text prop) and rich HTML content (via children).
 *
 * @example
 * ```tsx
 * // Plain text with newlines
 * <TextSection
 *   key="intro"
 *   text="This project explores the intersection of machine learning and IoT..."
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
    <div className="prose prose-lg max-w-none">
      {text ? (
        <p className="text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap">
          {text}
        </p>
      ) : (
        <div className="text-body-lg text-text-secondary leading-relaxed [&_p]:whitespace-pre-wrap">
          {children}
        </div>
      )}
    </div>
  );
}
