import type { Metadata } from "next";
import {
  PostLayout,
  H1Section,
  TextSection,
} from "@/components/post-layout";
import { Badge } from "@/components/ui/badge";
import { GitHubButton } from "@/components/ui/github-button";

export const metadata: Metadata = {
  title: "Ambient Temperature Estimation - Andrew Aarestad",
  description: "Machine learning system for estimating ambient temperature from sensor data.",
};

export default function AmbientTemperatureEstimationPage() {
  return (
    <PostLayout>
      {[
        <div key="title" className="mb-8 flex items-start justify-between">
          <H1Section text="Ambient Temperature Estimation" />
          <Badge className="bg-brand-light text-brand-dark border-0 mt-8 shrink-0">Coming Soon</Badge>
        </div>,

        <TextSection
          key="description"
          text={`This project showcase is currently in development. Check back soon for detailed
            information about the machine learning approach, sensor fusion techniques, and
            results of this temperature estimation system.`}
        />,

        <TextSection key="preview">
          <p>
            <strong>Project Preview:</strong> Machine learning system for estimating ambient
            temperature from multi-sensor data, featuring data fusion algorithms and statistical
            modeling.
          </p>
        </TextSection>,

        <div key="github" className="text-center">
          <GitHubButton
            text="View on GitHub"
            url="https://github.com/parameter-estimation/ambient-temperature-estimation"
          />
        </div>,
      ]}
    </PostLayout>
  );
}
