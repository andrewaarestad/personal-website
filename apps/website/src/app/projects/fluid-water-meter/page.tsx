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
import { GitHubButton } from "@/components/ui/github-button";

export const metadata: Metadata = {
  title: "FLUID Water Meter - Andrew Aarestad",
  description:
    "I cofounded a hardware startup to build an ultrasonic water meter for homes. We built a full IoT platform from sensor firmware to cloud ML, and learned the hard way that great technology isn't enough.",
};

export default function FLUIDWaterMeterPage() {
  // Generate sample water flow data for visualization
  const waterFlowData = generateWaterFlowData();

  return (
    <PostLayout>
      {[
        // Section 1: Title
        <div key="title" className="mb-8">
          <H1Section text="FLUID Water Meter" />
        </div>,

        // Section 2: Introduction
        <TextSection
          key="intro"
          text={`I cofounded FLUID in 2015 to build a water monitor
            for homeowners. Clamp it onto a pipe, no plumber
            needed, and it'd track your usage and catch leaks.
            Residential water damage costs billions a year,
            but the monitoring systems that existed were
            expensive commercial products. We thought we
            could do it cheaper with ultrasonic sensors.

            We started with an off-the-shelf meter to learn
            the physics, ran a Kickstarter, then ground
            through 3D-printed prototypes to injection-molded
            production. Over three years I built everything
            from signal processing firmware to cloud ML
            pipelines. We shipped about 100 devices. The
            technology worked. The business didn't.`}
        />,

        <div key="github" className="text-center">
          <GitHubButton
            text="View on GitHub"
            url="https://github.com/andrewaarestad/fluid-code"
          />
        </div>,

        // Section 5: The Technical Challenge
        <H2Section key="challenge-heading" text="The Technical Challenge" />,

        // Section 6: Ultrasonic challenges with image
        <TextImageSection
          key="ultrasonic-challenge"
          text={`Ultrasonic flow measurement has been around
            for decades, but getting it to work reliably in
            people's houses is a different story. The concept
            is simple enough: send sound waves upstream and
            downstream, measure the time difference,
            calculate flow.

            In practice, there are factors that make it challenging.
            Transducer alignment, temperature changes, and air bubbles 
            are just a few of the engineering headaches.`}
          imageUrl="/img/clamp-on-flow-time-of-flight.jpg"
          imageAlt="Diagram showing clamp-on ultrasonic flow measurement using time-of-flight"
          layout="image-left"
        />,

        // Section 7: What We Built
        <H2Section key="built-heading" text="What We Built" />,

        // Section 8: Tech stack enumeration
        <TextSection key="built-text">
          <p>
            <strong>Hardware:</strong> Clamp-on ultrasonic sensor, injection-molded enclosure,
            custom PCBs, FPGA signal processing, power management
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
            <strong>ML:</strong> Anomaly detection for leaks, usage pattern classification, training
            on calibration data
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
          description={
            "5 minutes of ultrasonic data at 1Hz showing " +
            "household usage: faucet at 30s, toilet flush " +
            "at 90s, shower at 2.5min. The signal processing " +
            "pipeline extracted these patterns from noisy " +
            "sensor data in real time."
          }
        >
          <WaterFlowChart data={waterFlowData} height={400} enableArea={true} />
        </DataVisualizationSection>,

        // Section 10: Engineering Deep Dive
        <H2Section key="engineering-heading" text="Engineering Deep Dive" />,

        // Section 11: Signal Processing
        <TextImageSection
          key="signal-processing"
          text={`The hardest part of the whole project was
            getting accurate flow readings from noisy
            ultrasonic signals on hardware with real power
            constraints.

            We used Kalman filtering to estimate true flow
            by combining measurements over time. The filter
            maintains a state estimate and updates as new
            readings arrive, weighing each measurement by
            its reliability. This helped smooth out the
            noise from air bubbles, turbulence, and
            temperature swings.`}
          imageUrl="/img/ultrasonic.jpg"
          imageAlt="Ultrasonic transducers used for signal processing and flow measurement"
          layout="image-right"
        />,

        // Section 12: Machine Learning Analytics
        <TextImageSection
          key="ml-analytics"
          text={`Leak detection isn't just about measuring
            flow. It's pattern recognition.

            We trained ML models on data from the
            calibration lab. PLC-automated valves created
            labeled datasets with known flow rates, which
            gave us ground truth for training and validation.
            The anomaly detection models learned each
            household's baseline usage and flagged deviations.
            A running toilet looks like sustained low flow.
            A pinhole leak creates a constant baseline shift.
            The trick was distinguishing these from legitimate
            use like filling a bathtub.`}
          imageUrl="/img/washing_machine.png"
          imageAlt="FLUID water meter installed on a washing machine water line"
          layout="image-left"
        />,

        // Section 13: Fleet Management
        <TextImageSection
          key="fleet-management"
          text={`Once a device is mounted on someone's water
            line, you can't exactly ask them to ship it back
            for a firmware update. Everything has to work
            remotely or it doesn't work at all. A botched
            update can't brick someone's device, rollbacks
            have to work every time, and remote diagnostics
            need to actually tell you what's going on.

            The thing I'm most proud of technically is that
            we built OTA updates for not just the
            microcontroller but the FPGA that handled the
            ultrasonic measurements. We could remotely deploy
            entirely new signal processing logic to the
            hardware itself.`}
          imageUrl="/img/meter_cad.jpg"
          imageAlt="CAD rendering of the FLUID water meter design"
          layout="image-left"
        />,

        // Section 14: Manufacturing & Hardware
        <H2Section key="manufacturing-heading" text="Manufacturing & Hardware" />,

        // Section 15: Manufacturing challenges
        <TextSection
          key="manufacturing-text"
          text={`This is where I really learned that hardware
            has fundamentally different economics than
            software.

            Injection molding tooling costs tens of
            thousands of dollars before you make a single
            part. PCB manufacturers want 1,000+ boards.
            Component suppliers have their own MOQs. The
            math only works at volume, but reaching
            volume requires capital you don't have yet.
            You end up constantly negotiating batch sizes
            against unit economics against cash flow.`}
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
          text={`The technology worked. That wasn't the
            problem. We explored partnerships, additional
            funding rounds, and alternative go-to-market
            strategies, but we couldn't bridge the gap
            between where we were and the volume we needed.
            The company wound down around 2018.

            It's a common story in hardware startups, and
            living through it taught me something I
            couldn't have learned any other way: building
            something that works and building a viable
            business are two very different problems.`}
        />,

        // Section 19: What I Learned
        <H2Section key="lessons-heading" text="What I Learned" />,

        // Section 20: Lessons learned
        <TextSection key="lessons">
          <p>
            <strong>Signal Processing:</strong> Getting clean data out of noisy sensors was harder
            than I expected. Kalman filtering helped enormously but needed extensive calibration.
            Temperature compensation mattered way more than I&apos;d anticipated. The lab and the
            real world were very different places.
          </p>
          <p>
            <strong>Machine Learning:</strong> Getting labeled data was harder than building models.
            The calibration lab was the single most important thing we built. Usage patterns turned
            out to be more diverse than we planned for. &quot;Normal&quot; varies a lot from
            household to household.
          </p>
          <p>
            <strong>Hardware Business:</strong> Design for manufacturing can&apos;t be bolted on at
            the end. And solving the technical risk doesn&apos;t solve the business risk.
            They&apos;re completely separate problems that need separate strategies.
          </p>
          <p>
            <strong>Wearing Every Hat:</strong> One person can build a surprising amount of a system
            if you manage scope carefully and delegate the specialized work. Full-stack in this
            context meant knowing enough about each layer to make good decisions, not being expert
            at everything.
          </p>
        </TextSection>,

        // Section 21: Conclusion
        <TextSection
          key="conclusion"
          text={`FLUID taught me more about building real
            systems than anything else I've worked on.
            Ultrasonic physics, ML pipelines, manufacturing
            economics, startup fundraising.. I got a crash
            course in all of it.`}
        />,
      ]}
    </PostLayout>
  );
}
