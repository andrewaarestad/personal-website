import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomepageHero } from "@/components/homepage-hero";
import { HomepageContactInfo } from "@/components/homepage-contact-info";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-canvas">
      {/* Hero Section - Variant 1: Direct */}
      <HomepageHero />

      {/* Contact Info Section */}
      <HomepageContactInfo />

      {/* Design Process Section */}
      <section className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="mb-12">
          <h2 className="text-h3 font-bold text-black mb-3">Design Process</h2>
          <p className="text-body-lg text-text-secondary max-w-2xl">
            This site is built using a design-first workflow with AI assistance. Explore the mood boards and design explorations below.
          </p>
        </div>

        <div className="space-y-6">
          {/* Mobile Hero Component Link */}
          <div className="p-8 bg-surface rounded-xl border-2 border-border-default hover:border-blue transition-colors">
            <h3 className="text-h5 font-bold text-black mb-3">Mobile Hero Component</h3>
            <p className="text-body text-text-secondary mb-6 max-w-2xl">
              Preview the homepage hero component designed for mobile screens. Three variants
              following brand voice guidelines: direct, problem-solver, and understated expert.
            </p>
            <Link href="/design-preview/mobile-hero">
              <Button size="lg" className="bg-blue hover:bg-blue-dark text-white">
                View Mobile Hero →
              </Button>
            </Link>
          </div>

          {/* Design System Mood Board Link */}
          <div className="p-8 bg-gradient-to-br from-vermillion-light/30 via-blue-light/30 to-gold-light/30 rounded-xl border border-border-default hover:border-vermillion transition-colors">
            <h3 className="text-h5 font-bold text-black mb-3">Design System Mood Board</h3>
            <p className="text-body text-text-secondary mb-6 max-w-2xl">
              Check out the comprehensive design system showcasing colors, typography, components,
              and real-world examples. Built with the art studio aesthetic.
            </p>
            <Link href="/design-preview/v1-initial">
              <Button size="lg" className="bg-vermillion hover:bg-vermillion-dark">
                View Mood Board →
              </Button>
            </Link>
          </div>

          {/* Color Exploration Link */}
          <div className="p-8 bg-surface rounded-xl border-2 border-border-default hover:border-gold transition-colors">
            <h3 className="text-h5 font-bold text-black mb-3">Color Palette Exploration</h3>
            <p className="text-body text-text-secondary mb-6 max-w-2xl">
              Explore 10 different color palette variations to find the perfect combination.
              Compare vermillion with emerald, teal, purple, and more accent color options.
            </p>
            <Link href="/design-preview/color-exploration">
              <Button size="lg" variant="outline" className="border-2 border-gold hover:bg-gold hover:text-white">
                Explore Color Options →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="bg-surface border-t border-border-light">
        <div className="container mx-auto px-6 py-16 max-w-5xl">
          <h2 className="text-h4 font-bold text-black mb-8">Built With</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border border-border-default rounded-lg bg-canvas hover:border-vermillion transition-colors">
              <h3 className="font-semibold text-h6 mb-2 text-black-accent">Next.js 15</h3>
              <p className="text-body-sm text-text-secondary">
                Modern React framework with App Router and Server Components
              </p>
            </div>
            <div className="p-6 border border-border-default rounded-lg bg-canvas hover:border-blue transition-colors">
              <h3 className="font-semibold text-h6 mb-2 text-black-accent">Turborepo</h3>
              <p className="text-body-sm text-text-secondary">
                High-performance build system for monorepos
              </p>
            </div>
            <div className="p-6 border border-border-default rounded-lg bg-canvas hover:border-gold transition-colors">
              <h3 className="font-semibold text-h6 mb-2 text-black-accent">shadcn/ui Ready</h3>
              <p className="text-body-sm text-text-secondary">
                Configured for beautiful UI components
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
