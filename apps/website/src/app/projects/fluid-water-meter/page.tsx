import type { Metadata } from "next";
import { PageContainer } from "@/components/ui/page-container";
import { Section } from "@/components/ui/section";
import { FeatureCard } from "@/components/ui/feature-card";

export const metadata: Metadata = {
  title: "FLUID Water Meter - Andrew Aarestad",
  description: "Co-founded and led development of an IoT water monitoring platform applying signal processing, state estimation, and machine learning to real-world sensor data.",
};

export default function FLUIDWaterMeterPage() {
  return (
    <main className="min-h-screen bg-canvas">
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-gradient-brand-subtle via-canvas to-gradient-brand-secondary-subtle">
        <PageContainer>
          <div className="py-20 space-y-8">
            <div className="w-16 h-1 bg-brand" aria-hidden="true" />
            <div>
              <h1 className="text-h1 font-extrabold text-black mb-6">
                FLUID Water Meter
              </h1>
              <p className="text-h3 text-text-secondary max-w-3xl">
                Co-founded and led development of an IoT water monitoring platform applying
                signal processing, state estimation, and machine learning to real-world sensor data.
              </p>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* Overview Section */}
      <Section>
        <PageContainer>
          <div className="space-y-8">
            <div>
              <h2 className="text-h2 font-bold text-black mb-4">Project Overview</h2>
              <p className="text-body-lg text-text-secondary max-w-3xl">
                FLUID was an IoT water monitoring platform designed to help homeowners and businesses
                detect leaks, monitor usage patterns, and prevent water damage. The system combined
                ultrasonic flow sensing with advanced signal processing and machine learning to provide
                accurate, real-time water monitoring across thousands of deployed devices.
              </p>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* Key Accomplishments */}
      <Section className="bg-surface">
        <PageContainer>
          <div className="space-y-8">
            <h2 className="text-h2 font-bold text-black">Key Accomplishments</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard background="canvas" border="light" padding="default">
                <div className="space-y-3">
                  <h3 className="text-h4 font-bold text-black">State Estimation & Signal Processing</h3>
                  <p className="text-body text-text-secondary">
                    Developed ultrasonic state estimation algorithms using Kalman filtering and
                    real-time signal processing to achieve accurate flow measurement in challenging
                    field conditions.
                  </p>
                </div>
              </FeatureCard>

              <FeatureCard background="canvas" border="light" padding="default">
                <div className="space-y-3">
                  <h3 className="text-h4 font-bold text-black">Machine Learning for Leak Detection</h3>
                  <p className="text-body text-text-secondary">
                    Built statistical and ML models for leak detection and usage pattern analysis
                    across thousands of deployed devices, enabling proactive alerting and water
                    conservation insights.
                  </p>
                </div>
              </FeatureCard>

              <FeatureCard background="canvas" border="light" padding="default">
                <div className="space-y-3">
                  <h3 className="text-h4 font-bold text-black">AWS-Based Data Pipelines</h3>
                  <p className="text-body text-text-secondary">
                    Architected cloud infrastructure ingesting and processing high-frequency telemetry
                    from lab and field sensors, handling data from thousands of devices in real-time.
                  </p>
                </div>
              </FeatureCard>

              <FeatureCard background="canvas" border="light" padding="default">
                <div className="space-y-3">
                  <h3 className="text-h4 font-bold text-black">Automated Test Infrastructure</h3>
                  <p className="text-body text-text-secondary">
                    Created labeled datasets via automated test facilities with PLC-controlled water
                    systems to support ML model training and validation at scale.
                  </p>
                </div>
              </FeatureCard>

              <FeatureCard background="canvas" border="light" padding="default">
                <div className="space-y-3">
                  <h3 className="text-h4 font-bold text-black">Product Engineering & DevOps</h3>
                  <p className="text-body text-text-secondary">
                    Directed product engineering including OTA firmware updates, device provisioning,
                    and telemetry infrastructure to ensure reliable operation across deployed fleet.
                  </p>
                </div>
              </FeatureCard>

              <FeatureCard background="canvas" border="light" padding="default">
                <div className="space-y-3">
                  <h3 className="text-h4 font-bold text-black">Hardware Development Oversight</h3>
                  <p className="text-body text-text-secondary">
                    Oversaw contract development of hardware components including custom PCBs,
                    FPGA programming, and enclosures, bridging software and hardware domains.
                  </p>
                </div>
              </FeatureCard>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* Tech Stack */}
      <Section>
        <PageContainer>
          <div className="space-y-8">
            <h2 className="text-h2 font-bold text-black">Tech Stack</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "C++",
                "Python",
                "Node.js",
                "React Native",
                "FPGA",
                "AWS IoT",
                "Kalman Filtering",
                "Signal Processing"
              ].map((tech) => (
                <div
                  key={tech}
                  className="px-4 py-3 bg-surface border border-border-light rounded-lg text-center"
                >
                  <span className="text-body font-medium text-black">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* Technical Highlights */}
      <Section className="bg-surface">
        <PageContainer>
          <div className="space-y-8">
            <h2 className="text-h2 font-bold text-black">Technical Highlights</h2>

            <div className="space-y-6 max-w-3xl">
              <div className="space-y-3">
                <h3 className="text-h4 font-bold text-black">Embedded Systems Development</h3>
                <p className="text-body text-text-secondary">
                  Developed firmware in C++ for resource-constrained IoT devices, implementing
                  real-time signal processing algorithms with strict power and memory constraints.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-h4 font-bold text-black">Cloud-Scale Data Processing</h3>
                <p className="text-body text-text-secondary">
                  Built scalable AWS infrastructure using IoT Core, Lambda, and DynamoDB to handle
                  telemetry ingestion, processing, and storage for thousands of devices generating
                  high-frequency sensor data.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-h4 font-bold text-black">Machine Learning in Production</h3>
                <p className="text-body text-text-secondary">
                  Deployed ML models for anomaly detection and usage pattern classification,
                  trained on labeled datasets generated through automated test infrastructure and
                  validated against real-world field data.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-h4 font-bold text-black">Full-Stack IoT Platform</h3>
                <p className="text-body text-text-secondary">
                  Built end-to-end IoT platform spanning embedded firmware, cloud infrastructure,
                  data pipelines, ML models, and mobile applications, demonstrating versatility
                  across the entire technology stack.
                </p>
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
