import type { Metadata } from "next";
import { PageContainer } from "@/components/ui/page-container";
import { Section } from "@/components/ui/section";
import { ProjectOverview } from "@/components/project-overview";
import { GitHubButton } from "@/components/ui/github-button";

export const metadata: Metadata = {
  title: "Projects - Andrew Aarestad",
  description:
    "Things I've built - production ML systems, IoT devices, experimental algorithms, and technical rabbit holes worth documenting.",
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectOverview
              title="FLUID Water Meter"
              description="Co-founded an IoT platform to detect water leaks in homes before they became expensive disasters. Built ultrasonic flow meter, telemetry infrastructure, app/web platforms, ML models and other fun stuff."
              imageUrl="/img/kickstarter_meter.jpg"
              imageAlt="FLUID Water Meter - IoT water monitoring platform"
              projectSlug="fluid-water-meter"
            />

            <ProjectOverview
              title="Ambient Temperature Estimation"
              description="Multi-sensor data fusion system for ambient temperature estimation. Combined physical/statistical modeling with edge inference to create a network of weather stations using cell phones. Open sourced the key tech."
              imageUrl="/img/ambient_calibration.png"
              imageAlt="Ambient Temperature Estimation"
              projectSlug="ambient-temperature-estimation"
            />
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
            <GitHubButton
              text="View my GitHub profile"
              url="https://github.com/andrewaarestad"
            />
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
