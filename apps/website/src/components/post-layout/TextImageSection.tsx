import Image from "next/image";
import { normalizeText } from "./normalizeText";
import type { TextImageSectionProps } from "./types";

/**
 * TextImageSection - Combined text and image section with flexible layout
 *
 * Renders text alongside an image in a responsive grid layout.
 * Supports two layout modes: image-left and image-right.
 * Supports both plain text (via text prop) and rich HTML content (via children).
 *
 * The text prop normalizes whitespace so authors can wrap lines freely
 * in source code. Double newlines create separate paragraphs.
 *
 * On mobile, the image always appears above the text regardless of layout.
 *
 * @example
 * ```tsx
 * // Plain text - wrap freely, double newline = new paragraph
 * <TextImageSection
 *   key="feature-1"
 *   text={`Our platform uses advanced machine learning
 *     algorithms to process sensor data in real-time.
 *
 *     The architecture handles thousands of events
 *     per second with sub-millisecond latency.`}
 *   imageUrl="/images/ml-architecture.jpg"
 *   imageAlt="Machine learning architecture diagram"
 *   layout="image-left"
 * />
 *
 * // Rich HTML content
 * <TextImageSection
 *   key="feature-1"
 *   imageUrl="/images/ml-architecture.jpg"
 *   imageAlt="Machine learning architecture diagram"
 *   layout="image-left"
 * >
 *   <p><strong>Machine Learning:</strong> Advanced algorithms...</p>
 * </TextImageSection>
 * ```
 */
export function TextImageSection({
  text,
  children,
  imageUrl,
  imageAlt = "Project image",
  layout,
}: TextImageSectionProps) {
  const isImageLeft = layout === "image-left";

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
        isImageLeft ? "" : "md:grid-flow-dense"
      }`}
    >
      {/* Text Content */}
      <div className={`space-y-4 ${isImageLeft ? "md:order-2" : "md:order-1"}`}>
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

      {/* Image */}
      <div
        className={`relative w-full h-[300px] md:h-[350px] rounded-lg overflow-hidden ${
          isImageLeft ? "md:order-1" : "md:order-2"
        }`}
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
