import type { ReactElement, ReactNode } from "react";

/**
 * Base interface for all post sections
 */
export interface PostSectionProps {}

/**
 * Type for post section components
 * These can be any React element that includes a key prop
 */
export type PostSection = ReactElement<PostSectionProps>;

/**
 * Layout options for TextImageSection
 */
export type TextImageSectionLayout = "image-left" | "image-right";

/**
 * Props for H1Section component
 */
export interface H1SectionProps extends PostSectionProps {
  text: string;
}

/**
 * Props for H2Section component
 */
export interface H2SectionProps extends PostSectionProps {
  text: string;
}

/**
 * Props for TextSection component
 * Supports either text prop (for plain text) or children (for rich HTML content)
 */
export interface TextSectionProps extends PostSectionProps {
  text?: string;
  children?: ReactNode;
}

/**
 * Props for ImageSection component
 */
export interface ImageSectionProps extends PostSectionProps {
  imageUrl: string;
  alt?: string;
}

/**
 * Props for TextImageSection component
 * Supports either text prop (for plain text) or children (for rich HTML content)
 */
export interface TextImageSectionProps extends PostSectionProps {
  text?: string;
  children?: ReactNode;
  imageUrl: string;
  imageAlt?: string;
  layout: TextImageSectionLayout;
}

/**
 * Props for DataVisualizationSection component
 */
export interface DataVisualizationSectionProps extends PostSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
}
