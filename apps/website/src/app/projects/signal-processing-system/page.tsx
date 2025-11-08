import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/ui/page-container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Embedded Signal Processing System - Andrew Aarestad",
  description: "Firmware-level signal processing for IoT devices implemented in C++.",
};

export default function SignalProcessingSystemPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <Section className="bg-gradient-to-br from-gradient-brand-subtle via-canvas to-gradient-brand-secondary-subtle">
        <PageContainer>
          <div className="py-20 space-y-8 text-center">
            <div className="w-16 h-1 bg-brand mx-auto" aria-hidden="true" />
            <div>
              <h1 className="text-h1 font-extrabold text-black mb-6">
                Embedded Signal Processing System
              </h1>
              <p className="text-h4 text-text-secondary max-w-2xl mx-auto mb-12">
                Coming Soon
              </p>
              <p className="text-body-lg text-text-secondary max-w-2xl mx-auto mb-8">
                This project showcase is currently in development. Check back soon for
                detailed information about the firmware architecture, real-time signal
                processing algorithms, and optimization techniques used in this embedded system.
              </p>
              <Link href="/projects">
                <Button variant="brand" size="lg">
                  ← Back to Projects
                </Button>
              </Link>
            </div>
          </div>
        </PageContainer>
      </Section>
    </main>
  );
}
