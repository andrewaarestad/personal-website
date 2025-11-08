import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomepageHero } from "@/components/homepage-hero";
import { HomepageContactInfo } from "@/components/homepage-contact-info";
import { PageContainer } from "@/components/ui/page-container";
import { Section } from "@/components/ui/section";
import { FeatureCard } from "@/components/ui/feature-card";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-canvas">
      {/* Hero Section - Variant 1: Direct */}
      <HomepageHero />

      {/* Contact Info Section */}
      <HomepageContactInfo />

      {/* Design Process Section */}
      <Section>
        <PageContainer>
          <div className="mb-12">
            <h2 className="text-h3 font-bold text-black mb-3">Design Process</h2>
            <p className="text-body-lg text-text-secondary max-w-2xl">
              This site is built using a design-first workflow with AI assistance.
              Learn about the phases, explore interactive mood boards, and see the
              meta-project of building a website about someone who builds websites.
            </p>
          </div>

          <FeatureCard border="brand">
            <h3 className="text-h5 font-bold text-black mb-3">
              Explore the Full Design Journey
            </h3>
            <p className="text-body text-text-secondary mb-6 max-w-2xl">
              Dive into the complete design process, from brand foundation to
              implementation. See the 5-phase workflow, explore interactive mood boards,
              and understand how AI collaboration shapes modern web development.
            </p>
            <Link href="/design-process">
              <Button size="lg" variant="brand">
                View Design Process →
              </Button>
            </Link>
          </FeatureCard>
        </PageContainer>
      </Section>
    </main>
  );
}
