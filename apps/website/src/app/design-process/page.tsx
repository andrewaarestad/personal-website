import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";
import { Section } from "@/components/ui/section";
import { FeatureCard } from "@/components/ui/feature-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Process | Andrew Aarestad",
  description:
    "A transparent look at building a personal website using design-first workflows and AI-assisted development. Explore the phases, mood boards, and the meta-project of showcasing web development through a developer's personal site.",
  openGraph: {
    title: "Design Process | Andrew Aarestad",
    description:
      "Building a website about someone who builds websites - a transparent look at design-first workflows and AI collaboration.",
  },
};

export default function DesignProcessPage() {
  return (
    <main className="min-h-screen bg-canvas">
      {/* Hero Section */}
      <Section>
        <PageContainer>
          <div className="mb-16">
            <h1 className="text-h2 font-bold text-black mb-4">Design Process</h1>
            <p className="text-h5 text-text-secondary max-w-3xl font-normal">
              This site is built using a design-first workflow with AI assistance. Explore the
              phases, mood boards, and the recursive journey of building a website about someone who
              builds websites.
            </p>
          </div>

          {/* Meta-Project Section */}
          <div className="mb-16">
            <h2 className="text-h3 font-bold text-black mb-6">A Meta-Project</h2>
            <div className="space-y-4 text-body text-text-secondary max-w-3xl">
              <p>
                This website is inherently recursive: it's a personal site for a web developer,
                built to showcase the very skills it represents. Rather than just presenting a
                finished product, I'm documenting the entire design and development process—making
                the work itself part of the portfolio.
              </p>
              <p>
                Transparency is a core value here. Every design decision, iteration, and pivot is
                preserved in the mood boards below. This approach transforms a standard portfolio
                into a living demonstration of design-first thinking, AI-assisted development, and
                iterative refinement.
              </p>
              <p>
                By building in public and treating the process as content, this project becomes more
                than a website—it's proof of concept for modern web development practices, showing
                how thoughtful design and AI collaboration can work together to create something
                meaningful.
              </p>
            </div>
          </div>

          {/* Visual Timeline Section */}
          <div className="mb-16">
            <h2 className="text-h3 font-bold text-black mb-8">The Design-First Workflow</h2>
            <div className="space-y-8">
              {/* Timeline Visual */}
              <div className="relative">
                {/* Vertical line connector - hidden on mobile, shown on md+ */}
                <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand via-brand-secondary to-highlight" />

                {/* Phase 1: Brand Foundation */}
                <div className="relative flex gap-6 mb-8">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-brand flex items-center justify-center text-white font-bold text-h5 z-10 border-4 border-canvas">
                    1
                  </div>
                  <div className="flex-grow pt-2">
                    <h3 className="text-h5 font-bold text-black mb-2">Brand Foundation</h3>
                    <p className="text-body text-text-secondary">
                      Define mission, persona, voice & tone, and core values. Establish the identity
                      before any visual work begins.
                    </p>
                  </div>
                </div>

                {/* Phase 2: Visual System */}
                <div className="relative flex gap-6 mb-8">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-brand-secondary flex items-center justify-center text-white font-bold text-h5 z-10 border-4 border-canvas">
                    2
                  </div>
                  <div className="flex-grow pt-2">
                    <h3 className="text-h5 font-bold text-black mb-2">Visual System</h3>
                    <p className="text-body text-text-secondary">
                      Create color palettes, typography scales, spacing systems, and component
                      patterns. Build the design language.
                    </p>
                  </div>
                </div>

                {/* Phase 3: Mood Boards */}
                <div className="relative flex gap-6 mb-8">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-highlight flex items-center justify-center text-white font-bold text-h5 z-10 border-4 border-canvas">
                    3
                  </div>
                  <div className="flex-grow pt-2">
                    <h3 className="text-h5 font-bold text-black mb-2">Interactive Mood Boards</h3>
                    <p className="text-body text-text-secondary">
                      Deploy working previews to Vercel for real-world testing. See designs in
                      context, not just in Figma.
                    </p>
                  </div>
                </div>

                {/* Phase 4: Iteration */}
                <div className="relative flex gap-6 mb-8">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-brand flex items-center justify-center text-white font-bold text-h5 z-10 border-4 border-canvas">
                    4
                  </div>
                  <div className="flex-grow pt-2">
                    <h3 className="text-h5 font-bold text-black mb-2">Review & Refine</h3>
                    <p className="text-body text-text-secondary">
                      Gather feedback, test on devices, refine the approach. Repeat until the design
                      feels right.
                    </p>
                  </div>
                </div>

                {/* Phase 5: Implementation */}
                <div className="relative flex gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-brand-secondary flex items-center justify-center text-white font-bold text-h5 z-10 border-4 border-canvas">
                    5
                  </div>
                  <div className="flex-grow pt-2">
                    <h3 className="text-h5 font-bold text-black mb-2">Build & Deploy</h3>
                    <p className="text-body text-text-secondary">
                      Implement the approved design with production-quality code. The design system
                      guides every component.
                    </p>
                  </div>
                </div>
              </div>

              {/* Why This Approach */}
              <FeatureCard background="gradient-reverse" border="light" className="mt-12">
                <h3 className="text-h5 font-bold text-black mb-3">Why Design-First?</h3>
                <p className="text-body text-text-secondary">
                  Starting with design prevents scope creep, ensures visual consistency, and creates
                  a clear roadmap for implementation. By validating design decisions early through
                  mood boards, we avoid costly refactors and maintain quality throughout the
                  development process.
                </p>
              </FeatureCard>
            </div>
          </div>

          {/* Explore Design Evolution Section */}
          <div className="mb-16">
            <h2 className="text-h3 font-bold text-black mb-6">Explore the Design Evolution</h2>
            <p className="text-body-lg text-text-secondary mb-8 max-w-2xl">
              Check out the interactive mood boards that showcase different phases of the design
              process. Each represents real explorations and iterations.
            </p>

            <div className="space-y-6">
              {/* Mobile Hero Component Link */}
              <FeatureCard background="surface" border="info">
                <h3 className="text-h5 font-bold text-black mb-3">Mobile Hero Component</h3>
                <p className="text-body text-text-secondary mb-6 max-w-2xl">
                  Preview the homepage hero component designed for mobile screens. Three variants
                  following brand voice guidelines: direct, problem-solver, and understated expert.
                </p>
                <Link href="/design-preview/mobile-hero">
                  <Button size="lg" variant="info">
                    View Mobile Hero →
                  </Button>
                </Link>
              </FeatureCard>

              {/* Design System Mood Board Link */}
              <FeatureCard border="brand">
                <h3 className="text-h5 font-bold text-black mb-3">Design System Mood Board</h3>
                <p className="text-body text-text-secondary mb-6 max-w-2xl">
                  Check out the comprehensive design system showcasing colors, typography,
                  components, and real-world examples. Built with the art studio aesthetic.
                </p>
                <Link href="/design-preview/v1-initial">
                  <Button size="lg" variant="brand">
                    View Mood Board →
                  </Button>
                </Link>
              </FeatureCard>

              {/* Color Exploration Link */}
              <FeatureCard background="surface" border="highlight">
                <h3 className="text-h5 font-bold text-black mb-3">Color Palette Exploration</h3>
                <p className="text-body text-text-secondary mb-6 max-w-2xl">
                  Explore 10 different color palette variations to find the perfect combination.
                  Compare vermillion with emerald, teal, purple, and more accent color options.
                </p>
                <Link href="/design-preview/color-exploration">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-highlight hover:bg-highlight hover:text-white"
                  >
                    Explore Color Options →
                  </Button>
                </Link>
              </FeatureCard>
            </div>
          </div>

          {/* AI-Assisted Development Section */}
          <div className="mb-16">
            <h2 className="text-h3 font-bold text-black mb-6">Built with AI Collaboration</h2>
            <div className="space-y-4 text-body text-text-secondary max-w-3xl">
              <p>
                This entire project is built using Claude Code, demonstrating how AI can assist in
                the full development lifecycle—from design exploration to production deployment. The
                AI helps maintain consistency, suggests improvements, and accelerates implementation
                while I guide the creative direction and make final decisions.
              </p>
              <p>
                The workflow balances AI assistance with human creativity: Claude handles repetitive
                tasks, enforces code quality, and explores design variations, while I focus on
                strategy, user experience, and the narrative. This collaboration model represents a
                practical approach to modern web development, where AI augments rather than replaces
                human expertise.
              </p>
              <p>
                <strong className="text-black">This project is open source.</strong> Check out the
                full codebase on GitHub to see the implementation details, commit history, and
                AI-assisted development workflow in action.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="https://github.com/andrewaarestad/personal-website"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="emphasis">
                  View on GitHub →
                </Button>
              </Link>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="mb-16">
            <h2 className="text-h3 font-bold text-black mb-6">Built With</h2>
            <p className="text-body-lg text-text-secondary mb-8 max-w-2xl">
              This project uses modern web technologies and tools to deliver a fast, scalable, and
              maintainable personal site.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard
                background="canvas"
                border="light"
                padding="compact"
                className="hover:border-brand"
              >
                <h3 className="font-semibold text-h6 mb-2 text-black-accent">Next.js 15</h3>
                <p className="text-body-sm text-text-secondary">
                  Modern React framework with App Router and Server Components
                </p>
              </FeatureCard>
              <FeatureCard
                background="canvas"
                border="light"
                padding="compact"
                className="hover:border-brand-secondary"
              >
                <h3 className="font-semibold text-h6 mb-2 text-black-accent">Turborepo</h3>
                <p className="text-body-sm text-text-secondary">
                  High-performance build system for monorepos
                </p>
              </FeatureCard>
              <FeatureCard
                background="canvas"
                border="light"
                padding="compact"
                className="hover:border-highlight"
              >
                <h3 className="font-semibold text-h6 mb-2 text-black-accent">shadcn/ui Ready</h3>
                <p className="text-body-sm text-text-secondary">
                  Configured for beautiful UI components
                </p>
              </FeatureCard>
            </div>
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
