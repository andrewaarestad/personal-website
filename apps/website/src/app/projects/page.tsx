import type { Metadata } from "next";
import { PageContainer } from "@/components/ui/page-container";
import { Section } from "@/components/ui/section";
import { ProjectOverview } from "@/components/project-overview";
import { GitHubButton } from "@/components/ui/github-button";
import { ContentMeta } from "@/components/content-meta";
import { getProjectIndexEntries } from "@/content";
import { siteAlternates } from "@/lib/publishing/metadata";

export const metadata: Metadata = {
  title: "Projects - Andrew Aarestad",
  description:
    "Things I've built - production ML systems, IoT devices, experimental algorithms, and technical rabbit holes worth documenting.",
  alternates: siteAlternates("/projects"),
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-canvas">
      {/* Hero Section */}
      <Section className="-mt-[var(--nav-height)] pt-[var(--nav-height)] bg-gradient-to-br from-gradient-brand-subtle via-canvas to-gradient-brand-secondary-subtle">
        <PageContainer>
          <div className="py-16 space-y-6">
            <div className="w-16 h-1 bg-brand" aria-hidden="true" />
            <div>
              <h1 className="text-h1 font-extrabold text-black mb-4">Projects</h1>
              <p className="text-body-lg text-text-secondary max-w-2xl">
                Some of my favorite product launches and experiments.
              </p>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* Projects Grid */}
      <Section>
        <PageContainer>
          {/* Driven by the content registry: dated entries newest-first, then undated
              legacy projects in registry order. See src/content/registry.ts. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {getProjectIndexEntries().map((entry) => (
              <ProjectOverview
                key={entry.path}
                title={entry.title}
                description={entry.listingSummary ?? entry.summary}
                imageUrl={entry.image?.url}
                imageAlt={entry.image?.alt}
                imageFit={entry.image?.fit}
                href={entry.path}
                meta={<ContentMeta entry={entry} showAuthor={false} />}
              />
            ))}
          </div>
        </PageContainer>
      </Section>

      {/* GitHub CTA */}
      <Section className="border-t border-border-light">
        <PageContainer>
          <div className="py-8 text-center">
            <p className="text-body-lg text-text-secondary mb-4">
              Find the code for these projects and more:
            </p>
            <GitHubButton text="View my GitHub profile" url="https://github.com/andrewaarestad" />
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
