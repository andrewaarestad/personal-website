import type { Metadata } from "next";
import { HomepageHero } from "@/components/homepage-hero";

export const metadata: Metadata = {
  title: "Mobile Hero Component | Design Preview",
  description: "Mood board preview for homepage hero component on mobile screens",
};

export default function MobileHeroPreview() {
  return (
    <main className="min-h-screen bg-canvas">
      {/* Preview Header */}
      <header className="border-b border-border-default bg-surface sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-h3 font-bold text-black">Mobile Hero Component Preview</h1>
          <p className="text-body text-text-secondary mt-2">
            Above-the-fold hero component for homepage — optimized for mobile
          </p>
        </div>
      </header>

      {/* Design Notes */}
      <section className="container mx-auto px-6 py-8 border-b border-border-light">
        <div className="max-w-3xl">
          <h2 className="text-h5 font-semibold text-black mb-3">Design Intent</h2>
          <p className="text-body text-text-secondary mb-4">
            This hero component follows the brand voice guidelines: dry but genuine, technical but
            accessible, conversational professional. Three variants explore different approaches to
            the opening message.
          </p>
          <div className="grid gap-3 text-body-sm text-text-secondary">
            <div>
              <span className="font-semibold text-black">Variant 1:</span> Direct introduction with
              personality
            </div>
            <div>
              <span className="font-semibold text-black">Variant 2:</span> Problem-solver focus
            </div>
            <div>
              <span className="font-semibold text-black">Variant 3:</span> Understated expert
              (recommended)
            </div>
          </div>
        </div>
      </section>

      {/* Variant 1: Direct */}
      <section className="border-b-8 border-border-light">
        <div className="container mx-auto px-6 py-8 bg-surface">
          <h3 className="text-h6 font-semibold text-black mb-2">Variant 1: Direct Intro</h3>
          <p className="text-body-sm text-text-secondary mb-6 max-w-2xl">
            Uses first person with straightforward introduction. The &quot;since before it was a
            household term&quot; adds dry humor without being jokey. Brand accent line provides
            visual anchor.
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <HomepageHero variant="direct" showAccent={true} />
        </div>
      </section>

      {/* Variant 2: Problem Solver */}
      <section className="border-b-8 border-border-light">
        <div className="container mx-auto px-6 py-8 bg-surface">
          <h3 className="text-h6 font-semibold text-black mb-2">Variant 2: Problem Solver</h3>
          <p className="text-body-sm text-text-secondary mb-6 max-w-2xl">
            Emphasizes the &quot;pragmatic&quot; brand pillar. Opens with what you DO, not who you
            are. Three-dot accent references the color palette (brand, brand-secondary, highlight).
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <HomepageHero variant="problem-solver" showAccent={true} />
        </div>
      </section>

      {/* Variant 3: Understated (Recommended) */}
      <section className="border-b-8 border-border-light">
        <div className="container mx-auto px-6 py-8 bg-surface">
          <h3 className="text-h6 font-semibold text-black mb-2">
            Variant 3: Understated Expert{" "}
            <span className="text-brand text-body-sm">(Recommended)</span>
          </h3>
          <p className="text-body-sm text-text-secondary mb-6 max-w-2xl">
            Super concise headline with personality. &quot;15+ years shipping&quot; is concrete and
            aligns with voice guide. Follows &quot;start with big picture, add depth&quot; pattern.
            Highlight accent line is subtle and warm.
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <HomepageHero variant="understated" showAccent={true} />
        </div>
      </section>

      {/* Mobile Comparison */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-h4 font-bold text-black mb-6">Mobile-First Approach</h2>
        <div className="max-w-2xl space-y-6">
          <div>
            <h3 className="text-h6 font-semibold text-black mb-2">Vertical Rhythm</h3>
            <p className="text-body text-text-secondary">
              All variants use generous spacing between headline, subtext, and CTA. This ensures
              comfortable reading on small screens without feeling cramped.
            </p>
          </div>
          <div>
            <h3 className="text-h6 font-semibold text-black mb-2">Typography Hierarchy</h3>
            <p className="text-body text-text-secondary">
              Headlines use <code className="text-code font-mono">text-h1</code> (3rem/48px) with
              tight line-height. Body text uses{" "}
              <code className="text-code font-mono">text-body-lg</code> (1.125rem/18px) for
              comfortable reading.
            </p>
          </div>
          <div>
            <h3 className="text-h6 font-semibold text-black mb-2">Color Accents</h3>
            <p className="text-body text-text-secondary">
              Subtle gradient background (brand to brand-secondary) provides visual interest without
              overwhelming. Accent elements use brand colors (brand, brand-secondary, highlight) as
              small visual anchors.
            </p>
          </div>
          <div>
            <h3 className="text-h6 font-semibold text-black mb-2">Voice & Tone</h3>
            <p className="text-body text-text-secondary mb-3">
              All variants avoid hype language and performative enthusiasm. They&apos;re
              conversational professional—like talking with a knowledgeable colleague over coffee.
            </p>
            <div className="bg-surface border border-border-light rounded-lg p-4 space-y-2">
              <p className="text-body-sm text-text-primary">
                <span className="font-semibold">✅ Good:</span> &quot;15+ years shipping&quot;
                (concrete, specific)
              </p>
              <p className="text-body-sm text-text-primary">
                <span className="font-semibold">❌ Avoid:</span> &quot;Passionate about ML&quot;
                (performative)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="container mx-auto px-6 py-12 border-t border-border-light">
        <div className="max-w-2xl">
          <h2 className="text-h4 font-bold text-black mb-4">Next Steps</h2>
          <ul className="space-y-3 text-body text-text-secondary">
            <li>
              1. <span className="font-semibold text-black">Review</span> the three variants on
              actual mobile devices
            </li>
            <li>
              2. <span className="font-semibold text-black">Choose</span> the variant that best
              captures your voice
            </li>
            <li>
              3. <span className="font-semibold text-black">Iterate</span> on copy if needed (mix
              and match elements)
            </li>
            <li>
              4. <span className="font-semibold text-black">Finalize</span> accent style (line,
              dots, or minimal)
            </li>
            <li>
              5. <span className="font-semibold text-black">Implement</span> on actual homepage
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
