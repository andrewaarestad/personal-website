import Image from "next/image";
import type { ImageSectionProps } from "./types";

/**
 * ImageSection - Full-width image section for post pages
 *
 * Renders a responsive image with proper Next.js optimization.
 * Images fill the container width while maintaining aspect ratio.
 *
 * @example
 * ```tsx
 * <ImageSection
 *   key="hero"
 *   imageUrl="/images/project-hero.jpg"
 *   alt="Project hero image showing the final product"
 * />
 * ```
 */
export function ImageSection({ imageUrl, alt = "Project image" }: ImageSectionProps) {
  return (
    <div className="aspect-square w-full max-w-[500px] mx-auto rounded-lg overflow-hidden bg-white p-6 border border-border-light">
      <div className="relative w-full h-full">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
    </div>
  );
}
