import type { Metadata } from "next";
import { PageContainer } from "@/components/ui/page-container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Ambient Temperature Estimation - Andrew Aarestad",
  description: "Machine learning system for estimating ambient temperature from sensor data.",
};

export default function AmbientTemperatureEstimationPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <Section className="bg-gradient-to-br from-gradient-brand-subtle via-canvas to-gradient-brand-secondary-subtle">
        <PageContainer>
          <div className="py-20 space-y-8 text-center">
            <div className="w-16 h-1 bg-brand mx-auto" aria-hidden="true" />
            <div>
              <h1 className="text-h1 font-extrabold text-black mb-6">
                Ambient Temperature Estimation
              </h1>
              <p className="text-h4 text-text-secondary max-w-2xl mx-auto mb-12">Coming Soon</p>
              <p className="text-body-lg text-text-secondary max-w-2xl mx-auto mb-6">
                This project showcase is currently in development. Check back soon for detailed
                information about the machine learning approach, sensor fusion techniques, and
                results of this temperature estimation system.
              </p>
              <div className="max-w-xl mx-auto text-left space-y-4">
                <p className="text-body text-text-secondary">
                  <span className="font-semibold text-black">Project Preview:</span> Machine
                  learning system for estimating ambient temperature from multi-sensor data,
                  featuring data fusion algorithms and statistical modeling.
                </p>
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
