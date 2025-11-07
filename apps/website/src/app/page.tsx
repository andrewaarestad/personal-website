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
            This site is built using a design-first workflow with AI assistance.
            Learn about the phases, explore interactive mood boards, and see the
            meta-project of building a website about someone who builds websites.
          </p>
        </div>

        <div className="p-8 bg-gradient-to-br from-vermillion-light/30 via-blue-light/30 to-gold-light/30 rounded-xl border-2 border-border-default hover:border-vermillion transition-colors">
          <h3 className="text-h5 font-bold text-black mb-3">
            Explore the Full Design Journey
          </h3>
          <p className="text-body text-text-secondary mb-6 max-w-2xl">
            Dive into the complete design process, from brand foundation to
            implementation. See the 5-phase workflow, explore interactive mood boards,
            and understand how AI collaboration shapes modern web development.
          </p>
          <Link href="/design-process">
            <Button size="lg" className="bg-vermillion hover:bg-vermillion-dark">
              View Design Process →
            </Button>
          </Link>
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
