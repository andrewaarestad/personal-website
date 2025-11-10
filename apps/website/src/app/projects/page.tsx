import type { Metadata } from "next";
import { PageContainer } from "@/components/ui/page-container";
import { Section } from "@/components/ui/section";
import { ProjectOverview } from "@/components/project-overview";

export const metadata: Metadata = {
  title: "Projects - Andrew Aarestad",
  description: "Things I've built - production ML systems, IoT devices, experimental algorithms, and technical rabbit holes worth documenting.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-canvas">
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-gradient-brand-subtle via-canvas to-gradient-brand-secondary-subtle">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectOverview
              title="FLUID Water Meter"
              description="Co-founded an IoT platform to detect water leaks in homes before they became expensive disasters. Built ultrasonic flow meter, telemetry infrastructure, app/web platforms, ML models and other fun stuff."
              imageUrl="https://placehold.co/800x600/4F46E5/FFFFFF/png?text=FLUID+Water+Meter"
              imageAlt="FLUID Water Meter - IoT water monitoring platform"
              projectSlug="fluid-water-meter"
            />

            <ProjectOverview
              title="Ambient Temperature Estimation"
              description="Multi-sensor data fusion system for ambient temperature estimation. Combines statistical modeling with ML to extract signal from noise. Shipped to production with open source components."
              imageUrl="https://placehold.co/800x600/7C3AED/FFFFFF/png?text=Temperature+Estimation"
              imageAlt="Ambient Temperature Estimation"
              projectSlug="ambient-temperature-estimation"
            />
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
