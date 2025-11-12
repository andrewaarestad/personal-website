import { PageContainer } from "@/components/ui/page-container";
import { Section } from "@/components/ui/section";
import type { PostSection } from "./types";

export interface PostLayoutProps {
  /**
   * Array of PostSection components to render
   */
  children: PostSection[];
  /**
   * Optional className for the main container
   */
  className?: string;
}

/**
 * PostLayout - A consistent layout component for project/post pages
 *
 * Accepts an array of PostSection components and renders them in a
 * vertically stacked layout with consistent spacing and styling.
 *
 * @example
 * ```tsx
 * <PostLayout>
 *   {[
 *     <H1Section key="title" text="My Project" />,
 *     <TextSection key="intro" text="This is an introduction..." />,
 *     <ImageSection key="img1" imageUrl="/path/to/image.jpg" />,
 *   ]}
 * </PostLayout>
 * ```
 */
export function PostLayout({ children, className }: PostLayoutProps) {
  return (
    <main className={`min-h-screen bg-canvas ${className || ""}`}>
      <Section spacing="none">
        <PageContainer size="medium">
          <div className="py-12 space-y-12">
            {children.map((child) => (
              <div key={child.key}>
                {child}
              </div>
            ))}
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
