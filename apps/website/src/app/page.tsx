import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomepageHero } from "@/components/homepage-hero";
import { HomepageContactInfo } from "@/components/homepage-contact-info";
import { PageContainer } from "@/components/ui/page-container";
import { Section } from "@/components/ui/section";
import { FeatureCard } from "@/components/ui/feature-card";
import { ScrollArrow } from "@/components/scroll-arrow";
import { GitHubButton } from "@/components/ui/github-button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section - Variant 1: Direct */}
      <HomepageHero />

      {/* Scroll indicator for initial page load */}
      <ScrollArrow />

      {/* Contact Info Section */}
      <HomepageContactInfo />

      {/* Design Process Section */}
      <Section>
        <PageContainer>
          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
            <div className="md:flex-1">
              <h2 className="text-h3 font-bold text-foreground mb-3 pt-4">Design Process</h2>
              <p className="text-body-lg text-text-secondary">
                This site is built using a design-first workflow with Claude Code's mobile app. Learn about
                the phases, explore interactive mood boards, and see the meta-project of building a
                website about someone who builds websites.
              </p>
            </div>

            <FeatureCard border="brand" className="md:flex-1">
              <h3 className="text-h5 font-bold text-foreground mb-3">
                Explore the Design-First Workflow
              </h3>
              <p className="text-body text-text-secondary mb-6">
                Check out my process for building from brand foundation to implementation. 
                This process mimics what I do with clients by starting with the foundations of
                visual aesthetics and product vision.
              </p>
              <Link href="/design-process">
                <Button variant="brand">View Design Process →</Button>
              </Link>
            </FeatureCard>
          </div>
        </PageContainer>
      </Section>

      {/* Open Source Section */}
      <Section className="bg-card border-t border-border-light">
        <PageContainer>
          <div className="text-center">
            <h2 className="text-h4 font-bold text-foreground mb-4">Open Source</h2>
            <p className="text-body-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              This project is open source. Check out the code, see the commit history, and explore
              how AI-assisted development works in practice.
            </p>
            <GitHubButton
              text="View on GitHub"
              url="https://github.com/andrewaarestad/personal-website"
            />
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
