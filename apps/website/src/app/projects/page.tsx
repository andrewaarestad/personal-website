import type { Metadata } from "next";
import { PageContainer } from "@/components/ui/page-container";
import { Section } from "@/components/ui/section";
import { ProjectOverview } from "@/components/project-overview";

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
            <a
              href="https://github.com/andrewaarestad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              View my GitHub profile
            </a>
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
