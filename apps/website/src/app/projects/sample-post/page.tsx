import type { Metadata } from "next";
import {
  PostLayout,
  H1Section,
  H2Section,
  TextSection,
  ImageSection,
  TextImageSection,
  DataVisualizationSection,
} from "@/components/post-layout";
import { WaterFlowChart } from "@/components/charts/WaterFlowChart";
import { generateWaterFlowData } from "@/lib/sample-data";

export const metadata: Metadata = {
  title: "Sample Post - PostLayout Demo - Andrew Aarestad",
  description:
    "A demonstration of the PostLayout system showcasing all available section types and layouts.",
};

export default function SamplePostPage() {
  // Generate sample water flow data (5 minutes at 1Hz)
  const waterFlowData = generateWaterFlowData();

  return (
    <PostLayout>
      {[
        // Section 1: Title
        <H1Section key="title" text="[SAMPLE] Building a Real-Time Anomaly Detection System" />,

        // Section 2: Introduction
        <TextSection
          key="intro"
          text="This sample post demonstrates the PostLayout component system. While the content is illustrative, it showcases how project pages can combine text, images, and headings to tell compelling technical stories."
        />,

        // Section 3: Context Image
        <ImageSection
          key="hero-image"
          imageUrl="https://placehold.co/1200x600/4F46E5/FFFFFF/png?text=System+Architecture"
          alt="Sample system architecture diagram"
        />,

        // Section 4: Problem Statement
        <H2Section key="problem-heading" text="The Challenge" />,

        // Section 5: Problem Description
        <TextSection
          key="problem-text"
          text="Modern distributed systems generate massive volumes of telemetry data—metrics, logs, and traces flowing from thousands of services. Identifying anomalous behavior in this haystack is critical for maintaining reliability, but traditional threshold-based alerting creates alert fatigue and misses subtle, multivariate patterns."
        />,

        // Section 6: Text with Image (image on left)
        <TextImageSection
          key="approach-1"
          text="Our approach combined unsupervised learning with domain expertise. We built a multi-stage pipeline that first reduced dimensionality using autoencoders, then applied isolation forests for anomaly scoring. The system learned normal behavior patterns from historical data, adapting continuously as system characteristics evolved."
          imageUrl="https://placehold.co/800x600/7C3AED/FFFFFF/png?text=ML+Pipeline"
          imageAlt="Machine learning pipeline diagram"
          layout="image-left"
        />,

        // Section 7: Implementation Heading
        <H2Section key="implementation-heading" text="Technical Implementation" />,

        // Section 8: Implementation Description
        <TextSection
          key="implementation-text"
          text="The system was built on a streaming architecture using Apache Kafka for ingestion and Apache Flink for real-time processing. Models were trained using Python's scikit-learn and deployed via TensorFlow Serving. We implemented a feature store using Redis to maintain rolling windows of metrics for inference, enabling sub-second detection latency even at scale."
        />,

        // Section 9: Interactive Data Visualization
        <DataVisualizationSection
          key="flow-visualization"
          title="Real-Time Flow Detection"
          description="Interactive visualization showing 5 minutes of ultrasonic flow measurement data sampled at 1Hz. The chart demonstrates typical household water usage patterns including faucet usage, toilet flush, and shower events detected by our IoT sensor system."
        >
          <WaterFlowChart data={waterFlowData} height={400} enableArea={true} />
        </DataVisualizationSection>,

        // Section 10: Text with Image (image on right)
        <TextImageSection
          key="results-1"
          text="In production, the system achieved 94% precision and 89% recall on a labeled test set of known incidents. More importantly, it detected several critical issues hours before they would have triggered traditional alerts, including a gradual memory leak in a payment service and cascading failures in a microservices mesh."
          imageUrl="https://placehold.co/800x600/10B981/FFFFFF/png?text=Performance+Metrics"
          imageAlt="System performance metrics dashboard"
          layout="image-right"
        />,

        // Section 11: Results Image
        <ImageSection
          key="dashboard-image"
          imageUrl="https://placehold.co/1200x600/F59E0B/FFFFFF/png?text=Monitoring+Dashboard"
          alt="Real-time monitoring dashboard"
        />,

        // Section 12: Impact Heading
        <H2Section key="impact-heading" text="Impact and Lessons Learned" />,

        // Section 13: Impact Text
        <TextSection
          key="impact-text"
          text="The deployment reduced mean time to detection (MTTD) by 73% while cutting false positive alerts by 82%. This translated to fewer middle-of-the-night pages for on-call engineers and faster incident response. The project demonstrated that thoughtful ML application—combining domain knowledge with algorithmic sophistication—can meaningfully improve operational excellence."
        />,

        // Section 14: Final Text with Image
        <TextImageSection
          key="lessons-1"
          text="Key lessons included the importance of model explainability (we added SHAP values to help engineers understand why alerts fired), the need for continuous retraining pipelines to handle concept drift, and the value of close collaboration between ML engineers and SREs throughout development."
          imageUrl="https://placehold.co/800x600/EC4899/FFFFFF/png?text=Team+Collaboration"
          imageAlt="Cross-functional team collaboration"
          layout="image-left"
        />,

        // Section 15: Conclusion
        <TextSection
          key="conclusion"
          text="This sample post demonstrates the flexibility of the PostLayout system. Real project pages can leverage these components to create engaging, visually rich narratives combining text, images, and interactive data visualizations. The modular design makes it easy to compose pages that are both informative and beautiful."
        />,
      ]}
    </PostLayout>
  );
}
