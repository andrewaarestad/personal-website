import type { Metadata } from "next";
import { PageContainer } from "@/components/ui/page-container";
import { Section } from "@/components/ui/section";
import { ProjectOverview } from "@/components/project-overview";

export const metadata: Metadata = {
  title: "Projects - Andrew Aarestad",
  description: "Portfolio of projects showcasing TypeScript, Python, and C++ development.",
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
                A collection of projects spanning machine learning, full-stack development,
                and systems programming. Each project showcases different aspects of
                building intelligent systems that actually ship.
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
              title="AI-Powered Analytics Platform"
              description="A cloud-scale machine learning pipeline for real-time data analytics. Built with Python, TensorFlow, and deployed on AWS. Features automated model training, A/B testing infrastructure, and comprehensive monitoring."
              imageUrl="https://placehold.co/800x600/4F46E5/FFFFFF/png?text=AI+Analytics"
              imageAlt="AI-Powered Analytics Platform"
              projectSlug="ai-analytics-platform"
            />

            <ProjectOverview
              title="Embedded Signal Processing System"
              description="Firmware-level signal processing for IoT devices. Implemented in C++ with real-time constraints, featuring adaptive filtering algorithms and low-power optimization. Deployed on ARM Cortex-M processors."
              imageUrl="https://placehold.co/800x600/7C3AED/FFFFFF/png?text=Signal+Processing"
              imageAlt="Embedded Signal Processing System"
              projectSlug="signal-processing-system"
            />
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
