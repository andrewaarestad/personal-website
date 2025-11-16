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
          text="I was a cofounder of FLUID, starting in 2015. We set out to build an IoT water monitoring platform that would help homeowners detect leaks before they became expensive disasters. Over three years, I built everything from ultrasonic signal processing algorithms to cloud ML pipelines, managed a small production run of about 100 devices, and learned hard lessons about the difference between technical risk and business risk.\n\nResidential water damage costs billions annually, but existing monitoring solutions were expensive commercial systems. We saw an opportunity to bring affordable, accurate water monitoring to homes using clamp-on ultrasonic sensors—no plumber required, no cutting pipes."
        />,

        // Section 3: The Journey
        <H2Section key="journey-heading" text="The Journey" />,

        // Section 4: Journey narrative
        <TextSection
          key="journey-text"
          text="We started with an off-the-shelf ultrasonic meter, learning the fundamentals of time-of-flight flow measurement. After proving the concept worked, we launched a Kickstarter campaign to fund development of a custom clamp-on sensor with an injection-molded enclosure.\n\nAs the only engineer on the team, I built most of the technology myself while managing contractors for specialized hardware work—PCB design, FPGA programming, and enclosure design. We progressed from 3D-printed prototypes to production units with proper tooling, built a calibration lab to generate training data, and shipped working devices to early customers.\n\nUltimately, we couldn't secure enough investment or pre-orders to fund a large-scale production run. The company folded, but not before building a remarkably complete IoT platform."
        />,

        // Section 5: The Technical Challenge
        <H2Section key="challenge-heading" text="The Technical Challenge" />,

        // Section 6: Ultrasonic challenges with image
        <TextImageSection
          key="ultrasonic-challenge"
          text="Ultrasonic flow measurement is harder than it looks. The basic principle is elegant: send sound waves upstream and downstream, measure the time difference, calculate flow velocity. But real-world conditions create constant challenges.\n\nTransducer alignment matters enormously. Even a few degrees of misalignment and the signal strength drops, making readings unreliable. Temperature changes affect the speed of sound in water, requiring continuous compensation. Air bubbles scatter the ultrasonic signal. Partially filled pipes violate the 'full pipe' assumption that most flow calculations depend on. Crosstalk from solid-fluid interfaces interferes with the signal you actually want to measure.\n\nWe needed sensors that worked reliably across different pipe materials (copper, PVC, PEX), different diameters (½-inch to 2-inch residential mains), varying flow rates (trickle to full flow), and changing environmental conditions. And it all had to run on battery power with strict computational constraints."
          imageUrl="https://placehold.co/800x600/06B6D4/FFFFFF/png?text=Ultrasonic+Time-of-Flight+Principle"
          imageAlt="Diagram showing ultrasonic transducers measuring time-of-flight for upstream and downstream sound waves in a water pipe"
          layout="image-left"
        />,

        // Section 7: What We Built
        <H2Section key="built-heading" text="What We Built" />,

        // Section 8: Tech stack enumeration
        <TextSection
          key="built-text"
          text="As a solo engineer managing contractors, I built a complete IoT platform:\n\n**Hardware:** Clamp-on ultrasonic flow sensor with injection-molded enclosure, custom PCBs, FPGA-based signal processing, battery power management\n\n**Embedded Firmware:** Real-time signal processing in C++ with strict power budgets, Kalman filtering for state estimation, temperature compensation algorithms, low-power wireless communication\n\n**Calibration Infrastructure:** PLC-controlled water systems generating labeled datasets with known flow rates, automated test sequences, data collection pipelines for model training\n\n**Cloud Platform:** AWS IoT Core for device connectivity, Lambda functions for telemetry processing, DynamoDB for time-series storage, real-time data pipelines handling high-frequency sensor data\n\n**Machine Learning:** Anomaly detection models for leak identification, usage pattern classification (shower, toilet, faucet, irrigation), statistical modeling on sparse time-series data, training on calibration lab datasets\n\n**Applications:** Mobile app (iOS and Android) for homeowners, web dashboard for monitoring and alerts, fleet management software, OTA firmware update system\n\nThe breadth was necessary—IoT systems require orchestrating hardware, embedded software, cloud infrastructure, ML models, and user-facing applications into a coherent whole."
        />,

        // Section 9: Interactive flow visualization
        <DataVisualizationSection
          key="flow-visualization"
          title="Real-Time Flow Detection"
          description="Interactive visualization showing 5 minutes of ultrasonic flow measurement data sampled at 1Hz. The chart demonstrates typical household water usage patterns—faucet usage around the 30-second mark, a toilet flush at 90 seconds, and a shower starting at 2.5 minutes. Our embedded signal processing algorithms had to extract these patterns from noisy sensor data in real-time."
        >
          <WaterFlowChart data={waterFlowData} height={400} enableArea={true} />
        </DataVisualizationSection>,

        // Section 10: Engineering Deep Dive
        <H2Section key="engineering-heading" text="Engineering Deep Dive" />,

        // Section 11: Signal Processing
        <TextImageSection
          key="signal-processing"
          text="The core technical challenge was extracting accurate flow measurements from noisy ultrasonic signals on resource-constrained hardware.\n\nWater meters need to measure flow in real-time, even when the signal is noisy. We implemented Kalman filtering to estimate the true flow rate by combining multiple measurements over time. The Kalman filter maintains a state estimate (predicted flow) and updates it as new sensor readings arrive, weighing each measurement by its estimated reliability.\n\nThis gave us accurate readings even in challenging conditions—air bubbles causing signal dropouts, turbulent flow creating measurement variance, temperature fluctuations affecting signal timing. But the algorithm had to run on embedded hardware with a power budget measured in milliwatts and CPU cycles counted carefully.\n\nTemperature compensation was critical. The speed of sound in water changes about 0.17% per degree Celsius. We embedded a temperature sensor and continuously adjusted our time-of-flight calculations to maintain accuracy across the range of conditions our sensors would encounter in basements, crawl spaces, and outdoor installations."
          imageUrl="https://placehold.co/800x600/7C3AED/FFFFFF/png?text=Signal+Processing+Pipeline"
          imageAlt="Diagram showing raw sensor data being processed through Kalman filtering to produce smooth, accurate flow rate estimates"
          layout="image-right"
        />,

        // Section 12: Machine Learning Analytics
        <TextSection
          key="ml-analytics"
          text="Detecting leaks isn't just about measuring flow—it's about recognizing patterns that indicate problems.\n\nWe built machine learning models trained on data from our calibration lab. By controlling water flow precisely with PLC-automated valves, we generated labeled datasets where we knew exactly what was flowing and when. This ground truth was essential for training and validating our models.\n\nAnomaly detection used statistical modeling to learn baseline usage patterns for each household, then flag deviations. A toilet that runs continuously after a flush shows up as sustained low flow when it should return to zero. A pinhole leak in a supply line creates a constant baseline flow. The models had to distinguish these anomalies from legitimate usage—someone filling a bathtub isn't a leak, even though it's unusual.\n\nUsage pattern classification let us identify different fixtures. Showers run at 2-3 GPM for extended periods. Toilets have a characteristic flush signature—a sharp spike followed by tank refill. Faucets show intermittent on-off patterns. Irrigation systems have scheduled, high-flow patterns. Identifying these patterns helped users understand their water consumption and made leak alerts more specific.\n\nThe cloud infrastructure ingested telemetry from sensors sampling at 1Hz, storing time-series data and running batch ML jobs to update models. We designed for thousands of devices, though our production run topped out around 100."
        />,

        // Section 13: Fleet Management
        <TextImageSection
          key="fleet-management"
          text="One of the hardest lessons: you can't touch devices once they're deployed in customer homes. Everything had to work remotely.\n\nOur OTA (over-the-air) firmware update system became critical during field testing. We found bugs, optimized algorithms, added features—all requiring firmware updates to devices installed in crawl spaces and basements. The update system had to be bulletproof: interrupted updates couldn't brick the device, rollbacks had to work if something went wrong, and we needed remote diagnostics to understand what was happening in the field.\n\nWe built device provisioning systems, telemetry infrastructure for health monitoring (battery level, signal strength, communication reliability), and remote configuration capabilities. Fleet management software let us track every device, monitor telemetry patterns, and identify issues before customers noticed them.\n\nAWS IoT Core handled the device connectivity, providing MQTT messaging for telemetry, shadow states for device configuration, and job management for firmware updates. Lambda functions processed incoming data streams, and DynamoDB stored device states and time-series telemetry."
          imageUrl="https://placehold.co/800x600/10B981/FFFFFF/png?text=System+Architecture"
          imageAlt="Architecture diagram showing device to cloud data flow: sensors to AWS IoT Core to Lambda to DynamoDB to web dashboard"
          layout="image-left"
        />,

        // Section 14: Manufacturing & Hardware
        <H2Section key="manufacturing-heading" text="Manufacturing & Hardware" />,

        // Section 15: Manufacturing challenges
        <TextSection
          key="manufacturing-text"
          text="Building hardware taught me lessons that software never does: manufacturing has a completely different economic structure.\n\nInjection molding tooling costs tens of thousands of dollars before you make a single part. Our Kickstarter campaign helped fund the initial tooling, but we were bridging the gap between 3D-printed prototypes and production-scale manufacturing. The economics only work at volume—but getting to volume requires massive upfront capital.\n\nMinimum order quantities (MOQs) dominate your decisions. PCB manufacturers want orders of 1,000+ boards. Injection molding becomes cost-effective around 5,000+ units. Component suppliers have MOQs for specialty parts. You're constantly negotiating batch sizes against unit economics against cash flow.\n\nI managed contractors for specialized work: PCB design and assembly, FPGA programming for signal processing, enclosure design and tooling. Coordinating between hardware disciplines—mechanical, electrical, firmware—requires tight integration. A small change to the enclosure affects PCB mounting. A firmware optimization might allow smaller batteries, changing the mechanical design.\n\nWe produced about 100 devices total, enough to validate the technology and get initial customer feedback, but nowhere near the volume needed for sustainable unit economics. This is the classic chicken-and-egg problem of hardware startups: you need volume for good unit costs, but you need capital to reach volume."
        />,

        // Section 16: Product Evolution Timeline
        <DataVisualizationSection
          key="timeline"
          title="From Prototype to Production"
          description="The evolution from initial concept to production units spanned three years and multiple iterations. We started with off-the-shelf components to prove the concept, progressed through 3D-printed prototypes to refine the design, and ultimately produced injection-molded units with custom PCBs and FPGA-based signal processing."
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
                  Initial prototype using commercial ultrasonic meter to validate the concept and
                  learn time-of-flight measurement fundamentals.
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
                  Launched Kickstarter campaign to fund custom sensor development. Rapid iteration
                  on clamp-on design using 3D-printed enclosures. Built calibration lab
                  infrastructure.
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
                  Production run of ~100 devices with injection-molded enclosures, custom PCBs, and
                  FPGA-based signal processing. Full cloud platform, mobile apps, and ML analytics
                  deployed.
                </p>
              </div>
            </div>
          </div>
        </DataVisualizationSection>,

        // Section 17: Why It Didn't Work
        <H2Section key="failure-heading" text="Why It Didn't Work" />,

        // Section 18: Business analysis
        <TextSection
          key="failure-text"
          text="We solved the technical challenges but couldn't bridge the funding gap for large-scale production.\n\nHardware startups face a fundamentally different risk profile than software. In software, you can build an MVP cheaply, iterate quickly, and scale without massive capital. Hardware requires enormous upfront investment before you ship a single unit. Tooling, inventory, assembly, testing, regulatory compliance—it all costs money before you have revenue.\n\nWe needed significant capital to reach production volumes where unit economics made sense. That meant either substantial investment or enough pre-orders to fund manufacturing directly. We couldn't secure enough of either. Investors saw the capital intensity and long development cycles as risky. Customers were hesitant to pre-order an unproven product at scale.\n\nThis is the classic chicken-and-egg problem: you need volume to get good unit costs, but you need capital to reach volume. We had about 100 devices in the field—enough to validate the technology, but nowhere near the thousands needed for sustainable economics.\n\nLooking back, the technical work was remarkable. We built a complete IoT platform with sophisticated signal processing, cloud infrastructure, and ML analytics. The sensors worked. The calibration was accurate. The software was solid. But technical excellence doesn't guarantee business success. Hardware demands capital and patience that we couldn't secure."
        />,

        // Section 19: What I Learned
        <H2Section key="lessons-heading" text="What I Learned" />,

        // Section 20: Lessons learned
        <TextImageSection
          key="lessons"
          text="This project shaped how I think about building production systems. The lessons span technical and business domains.\n\n**Ultrasonic Technology:** Signal processing is as hard as the physics. Kalman filtering was essential for reliable measurements, but tuning the filter parameters required extensive calibration data. Temperature compensation mattered more than I initially expected. Real-world conditions are messier than lab conditions.\n\n**Machine Learning:** Labeled data is harder than the models themselves. Our calibration lab was critical—without ground truth, you can't train or validate anything. Real-world usage patterns are more diverse than you anticipate. Anomaly detection requires understanding what 'normal' looks like, and normal varies by household.\n\n**Manufacturing:** Tooling costs and MOQs dominate unit economics in ways software engineers never experience. The gap between prototype and production is enormous—design for manufacturing isn't something you add later. Managing contractors across mechanical, electrical, and firmware domains requires tight integration and clear specifications.\n\n**Startup Economics:** Technical risk and business risk are different. We reduced technical risk substantially—the sensors worked, the platform was solid. But business risk remained: could we get funding for production scale? Hardware startups need different capital structures than software. Patience and deep pockets matter.\n\n**Solo Engineering:** One person can build remarkable systems by managing scope carefully and delegating specialized work. I couldn't design injection molds or program FPGAs at expert level, but I could specify requirements clearly and integrate contractor work into the larger system. Full-stack means knowing enough about each layer to make good decisions, not being expert at everything."
          imageUrl="https://placehold.co/800x600/F59E0B/FFFFFF/png?text=Calibration+Lab"
          imageAlt="Photo of FLUID calibration lab showing PLC-controlled water flow systems and sensor test fixtures"
          layout="image-right"
        />,

        // Section 21: Conclusion
        <TextSection
          key="conclusion"
          text="FLUID Water Meter didn't become a successful company, but it was a successful project. We built technology that worked, learned deeply about domains from ultrasonic physics to ML pipelines to manufacturing economics, and proved that a small team could create a remarkably complete IoT platform.\n\nThe experience fundamentally shaped my approach to production systems. I learned that shipping matters more than perfection, that real-world conditions humble lab results, that infrastructure for OTA updates and diagnostics isn't optional for IoT, and that business viability requires more than technical excellence.\n\nThree years of intense work, about 100 devices shipped, and lessons that informed every project I've worked on since. Not every startup succeeds, but the best ones teach you things you couldn't learn any other way."
        />,
      ]}
    </PostLayout>
  );
}
