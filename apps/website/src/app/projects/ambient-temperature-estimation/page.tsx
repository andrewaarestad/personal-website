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
              <a
                href="https://github.com/parameter-estimation/ambient-temperature-estimation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            </div>
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
