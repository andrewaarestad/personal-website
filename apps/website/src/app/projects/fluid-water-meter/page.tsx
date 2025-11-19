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
  title: "FLUID Water Meter - Andrew Aarestad",
  description:
    "Built a complete IoT water monitoring platform from ultrasonic sensors to cloud ML pipelines. A technical success that taught hard lessons about hardware startup economics.",
};

export default function FLUIDWaterMeterPage() {
  // Generate sample water flow data for visualization
  const waterFlowData = generateWaterFlowData();

  return (
    <PostLayout>
      {[
        // Section 1: Title
        <H1Section key="title" text="FLUID Water Meter" />,

        // Section 2: Introduction
        <TextSection
          key="intro"
          text={`I cofounded FLUID in 2015 with talented partners to build an IoT water monitoring platform for homeowners. Over three years, with support from investors who believed in our vision, I built everything from ultrasonic signal processing to cloud ML pipelines. We produced about 100 devices and learned invaluable lessons about bringing hardware to market.

Residential water damage costs billions annually, but monitoring systems were expensive commercial products. We saw an opportunity for affordable clamp-on sensors—no plumber required.`}
        />,

        // Section 3: The Journey
        <H2Section key="journey-heading" text="The Journey" />,

        // Section 4: Journey narrative
        <TextSection
          key="journey-text"
          text={`We started with an off-the-shelf ultrasonic meter to learn time-of-flight measurement. Our Kickstarter campaign brought in early supporters who helped fund custom clamp-on sensors with injection-molded enclosures. As the technical lead, I built most of the platform while managing contractors for PCB design, FPGA programming, and mechanical work.

We progressed from 3D-printed prototypes to production units with proper tooling, built a calibration lab for training data, and shipped working devices. While we ultimately didn't reach the scale needed for sustainable manufacturing economics, we're proud of the complete IoT platform we built and grateful for the opportunity to tackle this challenge.`}
        />,

        // Section 5: The Technical Challenge
        <H2Section key="challenge-heading" text="The Technical Challenge" />,

        // Section 6: Ultrasonic challenges with image
        <TextImageSection
          key="ultrasonic-challenge"
          text={`Ultrasonic flow measurement is deceptively hard. Send sound waves upstream and downstream, measure the time difference, calculate flow. Simple in principle.

Real-world conditions complicate everything. Transducer alignment matters—a few degrees off and readings fail. Temperature changes affect sound speed in water. Air bubbles scatter the signal. Partial pipe fill breaks the math. Crosstalk from solid-fluid interfaces adds noise.

We needed reliability across pipe materials (copper, PVC, PEX), diameters (½-inch to 2-inch), varying flow rates, and environmental conditions—all on battery power with strict computational limits.`}
          imageUrl="https://placehold.co/800x600/06B6D4/FFFFFF/png?text=Ultrasonic+Time-of-Flight"
          imageAlt="Ultrasonic transducers measuring time-of-flight for upstream and downstream sound waves"
          layout="image-left"
        />,

        // Section 7: What We Built
        <H2Section key="built-heading" text="What We Built" />,

        // Section 8: Tech stack enumeration
        <TextSection key="built-text">
          <p>
            <strong>Hardware:</strong> Clamp-on ultrasonic sensor, injection-molded enclosure,
            custom PCBs, FPGA signal processing, battery management
          </p>
          <p>
            <strong>Firmware:</strong> C++ real-time signal processing, Kalman filtering,
            temperature compensation, low-power wireless
          </p>
          <p>
            <strong>Calibration Lab:</strong> PLC-controlled water systems generating labeled
            datasets with known flow rates
          </p>
          <p>
            <strong>Cloud:</strong> AWS IoT Core, Lambda, DynamoDB for telemetry processing and
            storage
          </p>
          <p>
            <strong>ML:</strong> Anomaly detection for leaks, usage pattern classification,
            training on calibration data
          </p>
          <p>
            <strong>Apps:</strong> Mobile (iOS/Android), web dashboard, fleet management, OTA
            firmware updates
          </p>
        </TextSection>,

        // Section 9: Interactive flow visualization
        <DataVisualizationSection
          key="flow-visualization"
          title="Real-Time Flow Detection"
          description="5 minutes of ultrasonic data at 1Hz showing household usage: faucet at 30s, toilet flush at 90s, shower at 2.5min. Our signal processing extracted these patterns from noisy sensor data in real-time."
        >
          <WaterFlowChart data={waterFlowData} height={400} enableArea={true} />
        </DataVisualizationSection>,

        // Section 10: Engineering Deep Dive
        <H2Section key="engineering-heading" text="Engineering Deep Dive" />,

        // Section 11: Signal Processing
        <TextImageSection
          key="signal-processing"
          text={`Extracting accurate flow from noisy ultrasonic signals on constrained hardware was the core challenge.

Kalman filtering estimated true flow by combining measurements over time. The filter maintains a state estimate and updates as readings arrive, weighing each by reliability. This handled air bubbles, turbulence, and temperature fluctuations.

The algorithm ran on embedded hardware with milliwatt power budgets. Temperature compensation was critical—sound speed in water changes 0.17% per degree Celsius. We continuously adjusted timing calculations across basement to outdoor conditions.`}
          imageUrl="https://placehold.co/800x600/7C3AED/FFFFFF/png?text=Signal+Processing"
          imageAlt="Raw sensor data processed through Kalman filtering to produce accurate flow estimates"
          layout="image-right"
        />,

        // Section 12: Machine Learning Analytics
        <TextSection
          key="ml-analytics"
          text={`Leak detection requires pattern recognition, not just flow measurement.

We trained ML models on calibration lab data. PLC-automated valves created labeled datasets with known flow rates—ground truth for training and validation. Anomaly detection learned baseline usage per household, then flagged deviations. A running toilet shows sustained low flow. A pinhole leak creates constant baseline. Models distinguished these from legitimate use like filling bathtubs.

Usage classification identified fixtures by signature. Showers: 2-3 GPM sustained. Toilets: sharp spike plus refill. Faucets: intermittent on-off. Irrigation: scheduled high flow. Cloud infrastructure ingested 1Hz telemetry, storing time-series and running batch ML jobs.`}
        />,

        // Section 13: Fleet Management
        <TextImageSection
          key="fleet-management"
          text={`Can't touch deployed devices. Everything works remotely or not at all.

OTA firmware updates became critical. We found bugs, optimized algorithms, added features—all requiring updates to devices in crawl spaces. The system needed to be bulletproof: interrupted updates can't brick devices, rollbacks must work, remote diagnostics essential.

We built device provisioning, health telemetry (battery, signal strength, reliability), and remote configuration. AWS IoT Core handled MQTT messaging, shadow states, and job management. Lambda processed data streams, DynamoDB stored device states.`}
          imageUrl="https://placehold.co/800x600/10B981/FFFFFF/png?text=System+Architecture"
          imageAlt="Device to cloud flow: sensors to AWS IoT Core to Lambda to DynamoDB to dashboard"
          layout="image-left"
        />,

        // Section 14: Manufacturing & Hardware
        <H2Section key="manufacturing-heading" text="Manufacturing & Hardware" />,

        // Section 15: Manufacturing challenges
        <TextSection
          key="manufacturing-text"
          text={`Hardware has fundamentally different economics than software.

Injection molding tooling costs tens of thousands before making a single part. Kickstarter funded initial tooling, but bridging prototype to production requires massive capital. Economics work at volume—but reaching volume needs upfront capital.

MOQs dominate decisions. PCB manufacturers want 1,000+ boards. Injection molding becomes viable around 5,000+ units. Component suppliers have MOQs. You're negotiating batch sizes against unit economics against cash flow.

Managing contractors across mechanical, electrical, and firmware requires tight integration. An enclosure change affects PCB mounting. Firmware optimization might enable smaller batteries, changing mechanical design. We produced 100 devices—enough to validate technology, nowhere near sustainable economics.`}
        />,

        // Section 16: Product Evolution Timeline
        <DataVisualizationSection
          key="timeline"
          title="From Prototype to Production"
          description="Three years from concept to production: off-the-shelf validation, 3D-printed iteration, injection-molded manufacturing."
        >
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-32 pt-1">
                <div className="font-semibold text-sm">2015</div>
                <div className="text-xs text-text-tertiary">Prototype</div>
              </div>
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-brand" />
              <div className="flex-1 pb-8 border-l-2 border-border-light pl-6 -ml-1">
                <h3 className="font-semibold text-base mb-2">Off-the-Shelf Sensor</h3>
                <p className="text-sm text-text-secondary">
                  Commercial ultrasonic meter to validate concept and learn time-of-flight
                  fundamentals.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-32 pt-1">
                <div className="font-semibold text-sm">2016</div>
                <div className="text-xs text-text-tertiary">Campaign</div>
              </div>
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-brand" />
              <div className="flex-1 pb-8 border-l-2 border-border-light pl-6 -ml-1">
                <h3 className="font-semibold text-base mb-2">Kickstarter & 3D Prints</h3>
                <p className="text-sm text-text-secondary">
                  Kickstarter for custom sensor development. Rapid iteration with 3D-printed
                  enclosures. Built calibration lab.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-32 pt-1">
                <div className="font-semibold text-sm">2017-2018</div>
                <div className="text-xs text-text-tertiary">Production</div>
              </div>
              <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-brand" />
              <div className="flex-1 pl-6 -ml-1">
                <h3 className="font-semibold text-base mb-2">Injection-Molded Units</h3>
                <p className="text-sm text-text-secondary">
                  ~100 devices with injection-molded enclosures, custom PCBs, FPGA processing. Full
                  cloud platform, mobile apps, ML analytics deployed.
                </p>
              </div>
            </div>
          </div>
        </DataVisualizationSection>,

        // Section 17: The Scaling Challenge
        <H2Section key="scaling-heading" text="The Scaling Challenge" />,

        // Section 18: Business reality
        <TextSection
          key="scaling-text"
          text={`Hardware startups face a fundamentally different challenge than software. While we succeeded technically—building working sensors, reliable firmware, and scalable cloud infrastructure—we learned that hardware economics require a different playbook.

Tooling, inventory, assembly, testing, and regulatory compliance all demand significant capital before generating revenue. To reach the volumes where unit economics become sustainable, you need either substantial investment or enough pre-orders to fund manufacturing directly. Despite the support of investors who believed in our vision and customers who backed us on Kickstarter, we didn't reach the scale needed to bridge that gap.

The classic challenge: you need volume for viable unit costs, but you need capital to reach volume. Our 100 devices validated the technology, but sustainable manufacturing required thousands. We're grateful to everyone who supported us on this journey—our investors who took a chance on the vision, our Kickstarter backers who believed early, and our team who worked incredibly hard to bring this to life. The experience taught us that in hardware, technical excellence is necessary but not sufficient.`}
        />,

        // Section 19: What I Learned
        <H2Section key="lessons-heading" text="What I Learned" />,

        // Section 20: Lessons learned
        <TextImageSection
          key="lessons"
          imageUrl="https://placehold.co/800x600/F59E0B/FFFFFF/png?text=Calibration+Lab"
          imageAlt="FLUID calibration lab with PLC-controlled water systems and sensor test fixtures"
          layout="image-right"
        >
          <p>
            <strong>Ultrasonic Tech:</strong> Signal processing is as hard as the physics. Kalman
            filtering essential but required extensive calibration. Temperature compensation mattered
            more than expected. Real-world messier than lab.
          </p>
          <p>
            <strong>Machine Learning:</strong> Labeled data harder than models. Calibration lab was
            critical. Usage patterns more diverse than anticipated. Anomaly detection requires
            understanding 'normal'—which varies by household.
          </p>
          <p>
            <strong>Manufacturing:</strong> Tooling and MOQs dominate unit economics.
            Prototype-to-production gap is enormous. Design for manufacturing isn't added later.
            Managing contractors across disciplines requires tight integration.
          </p>
          <p>
            <strong>Startup Economics:</strong> Technical risk differs from business risk. We
            reduced technical risk substantially, but business risk remained. Hardware needs
            different capital structures than software.
          </p>
          <p>
            <strong>Solo Engineering:</strong> One person can build remarkable systems by managing
            scope and delegating specialized work. Full-stack means knowing enough about each layer
            to make good decisions, not being expert at everything.
          </p>
        </TextImageSection>,

        // Section 21: Conclusion
        <TextSection
          key="conclusion"
          text={`FLUID taught me more than any project before or since. We built technology that worked, learned deeply across domains from ultrasonic physics to ML to manufacturing economics, and had the privilege of working with talented cofounders, supportive investors, and early believers who took a chance on our vision.

The experience shaped my approach to production systems. Shipping matters more than perfection. Real-world conditions humble lab results. OTA infrastructure isn't optional for IoT. Business viability requires more than technical excellence.

Three years, 100 devices, countless lessons. I'm grateful for the opportunity to have tackled this challenge and for everyone who made it possible.`}
        />,
      ]}
    </PostLayout>
  );
}
