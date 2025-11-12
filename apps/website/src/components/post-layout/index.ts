/**
 * Post Layout System
 *
 * A flexible component system for creating beautiful, consistent project pages.
 * Each post is composed of reusable PostSection components arranged in a PostLayout.
 */

export { PostLayout } from "./PostLayout";
export { H1Section } from "./H1Section";
export { H2Section } from "./H2Section";
export { TextSection } from "./TextSection";
export { ImageSection } from "./ImageSection";
export { TextImageSection } from "./TextImageSection";

export type {
  PostSection,
  PostSectionProps,
  H1SectionProps,
  H2SectionProps,
  TextSectionProps,
  ImageSectionProps,
  TextImageSectionProps,
  TextImageSectionLayout,
} from "./types";
