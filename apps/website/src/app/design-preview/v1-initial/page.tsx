import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Mood Board v1: Initial | Design Preview",
  description: "First iteration mood board showcasing the art studio aesthetic",
};

export default function MoodBoardV1Initial() {
  return (
    <main className="min-h-screen bg-canvas">
      {/* Header */}
      <header className="border-b border-border-default bg-surface">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-h1 font-extrabold text-black">
            Mood Board v1: Initial
          </h1>
          <p className="text-body-lg text-text-secondary mt-2">
            Electric Modern aesthetic • Bright Red, Cyan, Lime • Inter Typography
          </p>
        </div>
      </header>

      {/* Color Palette Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-h2 font-bold text-black-accent mb-8">
          Color Palette
        </h2>

        <div className="space-y-8">
          {/* Foundation Colors */}
          <div>
            <h3 className="text-h4 font-semibold text-text-primary mb-4">
              Foundation
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ColorSwatch
                name="Canvas"
                hex="#FAFAFA"
                className="bg-canvas border border-border-default"
              />
              <ColorSwatch
                name="Surface"
                hex="#FFFFFF"
                className="bg-surface border border-border-default"
              />
              <ColorSwatch
                name="Border Light"
                hex="#E5E7EB"
                className="bg-border-light"
              />
              <ColorSwatch
                name="Border"
                hex="#D1D5DB"
                className="bg-border-default"
              />
            </div>
          </div>

          {/* Accent Colors */}
          <div>
            <h3 className="text-h4 font-semibold text-text-primary mb-4">
              Accent Colors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-label-sm font-medium text-text-secondary mb-3">
                  Bright Red (Primary)
                </p>
                <div className="grid gap-2">
                  <ColorSwatch
                    name="Light"
                    hex="#FEE2E2"
                    className="bg-vermillion-light"
                  />
                  <ColorSwatch
                    name="Default"
                    hex="#EF4444"
                    className="bg-vermillion text-white"
                  />
                  <ColorSwatch
                    name="Dark"
                    hex="#DC2626"
                    className="bg-vermillion-dark text-white"
                  />
                </div>
              </div>
              <div>
                <p className="text-label-sm font-medium text-text-secondary mb-3">
                  Cyan (Secondary)
                </p>
                <div className="grid gap-2">
                  <ColorSwatch
                    name="Light"
                    hex="#CFFAFE"
                    className="bg-blue-light"
                  />
                  <ColorSwatch
                    name="Default"
                    hex="#06B6D4"
                    className="bg-blue text-white"
                  />
                  <ColorSwatch
                    name="Dark"
                    hex="#0891B2"
                    className="bg-blue-dark text-white"
                  />
                </div>
              </div>
              <div>
                <p className="text-label-sm font-medium text-text-secondary mb-3">
                  Lime (Tertiary)
                </p>
                <div className="grid gap-2">
                  <ColorSwatch
                    name="Light"
                    hex="#ECFCCB"
                    className="bg-gold-light"
                  />
                  <ColorSwatch
                    name="Default"
                    hex="#84CC16"
                    className="bg-gold text-black-accent"
                  />
                  <ColorSwatch
                    name="Dark"
                    hex="#65A30D"
                    className="bg-gold-dark text-black-accent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text Colors */}
          <div>
            <h3 className="text-h4 font-semibold text-text-primary mb-4">
              Text Colors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ColorSwatch
                name="Black"
                hex="#000000"
                className="bg-black text-white"
              />
              <ColorSwatch
                name="Black Accent"
                hex="#1A1A1A"
                className="bg-black-accent text-white"
              />
              <ColorSwatch
                name="Text Primary"
                hex="#1A1A1A"
                className="bg-text-primary text-white"
              />
              <ColorSwatch
                name="Text Secondary"
                hex="#6B7280"
                className="bg-text-secondary text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="container mx-auto px-6 py-16 bg-surface">
        <h2 className="text-h2 font-bold text-black-accent mb-8">
          Typography
        </h2>

        <div className="space-y-8">
          {/* Headings */}
          <div className="space-y-6">
            <h1 className="text-h1 font-extrabold text-black">
              Heading 1 - The Art of Building ML Systems
            </h1>
            <h2 className="text-h2 font-bold text-black-accent">
              Heading 2 - Project Showcase
            </h2>
            <h3 className="text-h3 font-bold text-text-primary">
              Heading 3 - Technical Deep Dive
            </h3>
            <h4 className="text-h4 font-semibold text-text-primary">
              Heading 4 - Implementation Details
            </h4>
            <h5 className="text-h5 font-semibold text-text-primary">
              Heading 5 - Code Examples
            </h5>
            <h6 className="text-h6 font-semibold text-text-primary">
              Heading 6 - Notes & References
            </h6>
          </div>

          {/* Body Text */}
          <div className="space-y-4 max-w-3xl">
            <p className="text-body-xl text-text-primary">
              Body XL: After 15+ years of building production ML systems,
              I&apos;ve learned that the hardest part isn&apos;t the
              algorithms—it&apos;s everything else.
            </p>
            <p className="text-body-lg text-text-primary">
              Body Large: From firmware-level signal processing to cloud-scale
              ML pipelines, I work at the intersection of research and product.
            </p>
            <p className="text-body text-text-primary">
              Body: The goal is always the same: ship systems that actually work
              in the real world, not just in notebooks. This means thinking
              about deployment, monitoring, data quality, and user experience
              from day one.
            </p>
            <p className="text-body-sm text-text-secondary">
              Body Small: Technical depth with big-picture thinking • Pragmatic
              innovation • Genuine curiosity
            </p>
          </div>

          {/* Code Examples */}
          <div className="space-y-4">
            <p className="text-body text-text-primary">
              Inline code example:{" "}
              <code className="font-mono text-code bg-blue-light text-blue-dark px-2 py-1 rounded">
                const result = await processData()
              </code>
            </p>

            <pre className="font-mono text-code bg-surface border border-border-default rounded-lg p-4 overflow-x-auto">
              <code className="text-text-primary">
                {`function trainModel(data: Dataset): Model {
  // Kalman filtering for state estimation
  const filtered = applyKalmanFilter(data);

  // Feature engineering
  const features = extractFeatures(filtered);

  return model.train(features);
}`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Buttons Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-h2 font-bold text-black-accent mb-8">Buttons</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-h5 font-semibold text-text-primary mb-4">
              Variants
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button>Primary (Vermillion)</Button>
              <Button variant="secondary">Secondary (Blue)</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <div>
            <h3 className="text-h5 font-semibold text-text-primary mb-4">
              Sizes
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div>
            <h3 className="text-h5 font-semibold text-text-primary mb-4">
              States
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="container mx-auto px-6 py-16 bg-surface">
        <h2 className="text-h2 font-bold text-black-accent mb-8">
          Form Components
        </h2>

        <div className="max-w-2xl space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact Form Example</CardTitle>
              <CardDescription>
                Demonstrating form inputs with our design system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Andrew Aarestad" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="andrew@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your ML project..."
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter className="flex gap-4">
              <Button>Send Message</Button>
              <Button variant="outline">Cancel</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Cards Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-h2 font-bold text-black-accent mb-8">
          Card Components
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-h4">FLUID Water Meter</CardTitle>
              <CardDescription>
                IoT hardware + ML for leak detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body-sm text-text-primary">
                Designed ultrasonic flow meter with real-time signal processing
                and ML-based anomaly detection for residential water
                monitoring.
              </p>
              <div className="flex gap-2 mt-4 flex-wrap">
                <Badge className="bg-blue-light text-blue-dark border-0">
                  Signal Processing
                </Badge>
                <Badge className="bg-vermillion-light text-vermillion-dark border-0">
                  Machine Learning
                </Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="sm">Learn More</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-h4">Cloud ML Pipelines</CardTitle>
              <CardDescription>
                Production-scale data processing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body-sm text-text-primary">
                Built distributed ML training pipelines handling millions of
                data points, with automatic versioning and deployment.
              </p>
              <div className="flex gap-2 mt-4 flex-wrap">
                <Badge className="bg-blue-light text-blue-dark border-0">
                  Cloud Architecture
                </Badge>
                <Badge className="bg-gold-light text-gold-dark border-0">
                  MLOps
                </Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="secondary">
                Learn More
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-h4">Research to Product</CardTitle>
              <CardDescription>
                Bridging the gap that matters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-body-sm text-text-primary">
                Translating cutting-edge research into production systems that
                ship. The hard part is making algorithms work at scale.
              </p>
              <div className="flex gap-2 mt-4 flex-wrap">
                <Badge className="bg-gold-light text-gold-dark border-0">
                  Innovation
                </Badge>
                <Badge className="bg-vermillion-light text-vermillion-dark border-0">
                  Product
                </Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="outline">
                Learn More
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Hero Section Example */}
      <section className="bg-gradient-to-br from-canvas via-gradient-vermillion-subtle to-gradient-blue-subtle py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-black mb-6">
              Andrew Aarestad
            </h1>
            <p className="text-body-xl md:text-2xl text-text-primary mb-4">
              AI/ML Engineer • 15+ Years Shipping Production Systems
            </p>
            <p className="text-body-lg text-text-secondary mb-8 max-w-2xl">
              From firmware-level signal processing to cloud-scale ML pipelines,
              I build systems that bridge research and product. Technical depth
              with big-picture thinking.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">View Projects</Button>
              <Button size="lg" variant="secondary">
                Read Articles
              </Button>
              <Button size="lg" variant="outline">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Post Example */}
      <section className="container mx-auto px-6 py-16 bg-surface">
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-h1 font-extrabold text-black mb-4">
              Building Production ML Systems: Lessons from 15 Years
            </h1>
            <div className="flex items-center gap-4 text-body-sm text-text-secondary">
              <time>January 15, 2025</time>
              <span>•</span>
              <span>12 min read</span>
              <span>•</span>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="text-blue-dark border-blue-dark"
                >
                  Machine Learning
                </Badge>
                <Badge
                  variant="outline"
                  className="text-vermillion-dark border-vermillion-dark"
                >
                  Engineering
                </Badge>
              </div>
            </div>
          </header>

          <div className="prose prose-slate max-w-none space-y-6">
            <p className="text-body-xl text-text-primary">
              After building ML systems for over 15 years, I&apos;ve learned
              that the hardest part isn&apos;t the algorithms—it&apos;s
              everything else. Here&apos;s what they don&apos;t teach you in
              research papers.
            </p>

            <h2 className="text-h2 font-bold text-black-accent mt-12 mb-4">
              The Data Pipeline is Everything
            </h2>

            <p className="text-body text-text-primary">
              Your model is only as good as your data pipeline. I&apos;ve seen
              brilliant algorithms fail in production because the data
              infrastructure couldn&apos;t keep up. Before you write a single
              line of ML code, ask yourself:
            </p>

            <ul className="space-y-2 text-body text-text-primary list-disc pl-6">
              <li>How will data flow from source to model?</li>
              <li>What happens when upstream systems change?</li>
              <li>How do you detect data quality issues?</li>
              <li>Can you version your datasets?</li>
            </ul>

            <div className="bg-gold-light border-l-4 border-gold p-6 my-8 rounded-r">
              <h3 className="text-h4 font-semibold text-gold-dark mb-2">
                Key Insight
              </h3>
              <p className="text-body text-text-primary">
                Spend 80% of your time on data infrastructure, 20% on models.
                The best algorithm can&apos;t fix bad data.
              </p>
            </div>

            <h2 className="text-h2 font-bold text-black-accent mt-12 mb-4">
              Monitoring Matters More Than Metrics
            </h2>

            <p className="text-body text-text-primary">
              Accuracy on your test set is nice. Knowing your model is degrading
              in production is critical. Real-world data drifts, user behavior
              changes, and upstream systems break. Your monitoring needs to
              catch:
            </p>

            <pre className="font-mono text-code bg-canvas border border-border-default rounded-lg p-4 my-6">
              <code className="text-text-primary">
                {`// Example monitoring check
if (predictionConfidence < THRESHOLD) {
  alert("Model confidence dropping");
  logFeatureDistribution();
  checkDataDrift();
}`}
              </code>
            </pre>

            <p className="text-body text-text-primary">
              Set up alerts for distribution shifts, prediction confidence,
              latency spikes, and error rates. Better to know about problems
              before your users do.
            </p>

            <h2 className="text-h2 font-bold text-black-accent mt-12 mb-4">
              Deployment is Not the Finish Line
            </h2>

            <p className="text-body text-text-primary">
              Shipping v1 is just the beginning. Plan for:
            </p>

            <ul className="space-y-2 text-body text-text-primary list-disc pl-6">
              <li>Model retraining cadence</li>
              <li>A/B testing framework</li>
              <li>Rollback procedures</li>
              <li>Feature store management</li>
              <li>Feedback loops from users</li>
            </ul>

            <p className="text-body-sm text-text-secondary mt-8 pt-8 border-t border-border-default">
              This is part of a series on practical ML engineering. Next up:
              debugging production ML systems.
            </p>
          </div>
        </article>
      </section>

      {/* Table Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-h2 font-bold text-black-accent mb-8">
          Data Tables
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
            <CardDescription>
              Notable ML projects over the years
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A timeline of production ML systems</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Year</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead className="text-right">Impact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono">2024</TableCell>
                  <TableCell className="font-medium">
                    Generative AI Platform
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-blue-light text-blue-dark border-0">
                      NLP
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    1M+ generations
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">2022</TableCell>
                  <TableCell className="font-medium">
                    FLUID Water Meter
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-vermillion-light text-vermillion-dark border-0">
                      IoT + ML
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">Patent filed</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">2020</TableCell>
                  <TableCell className="font-medium">
                    Anomaly Detection System
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-gold-light text-gold-dark border-0">
                      Time Series
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    99.9% uptime
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">2018</TableCell>
                  <TableCell className="font-medium">
                    Computer Vision Pipeline
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-blue-light text-blue-dark border-0">
                      CV
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    100K images/day
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">2015</TableCell>
                  <TableCell className="font-medium">
                    Recommendation Engine
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-vermillion-light text-vermillion-dark border-0">
                      RecSys
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    +40% engagement
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* Video Section */}
      <section className="container mx-auto px-6 py-16 bg-surface">
        <h2 className="text-h2 font-bold text-black-accent mb-8">
          Embedded Media
        </h2>

        <div className="max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Video Example</CardTitle>
              <CardDescription>
                Demonstrating embedded video with responsive aspect ratio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full bg-gradient-to-br from-vermillion-light via-blue-light to-gold-light rounded-lg flex items-center justify-center border border-border-default">
                <div className="text-center space-y-4">
                  <div className="text-6xl">🎬</div>
                  <p className="text-body-lg text-text-primary font-medium">
                    Video Embed Placeholder
                  </p>
                  <p className="text-body-sm text-text-secondary">
                    16:9 responsive aspect ratio
                  </p>
                  <code className="font-mono text-code bg-surface/50 px-3 py-1 rounded text-xs">
                    aspect-video
                  </code>
                </div>
              </div>
              <p className="text-body-sm text-text-secondary mt-4">
                Replace this placeholder with an iframe or video element.
                Example:{" "}
                <code className="font-mono text-code bg-blue-light text-blue-dark px-2 py-0.5 rounded text-xs">
                  &lt;iframe src=&quot;...&quot; /&gt;
                </code>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-default bg-surface mt-16">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-h5 font-semibold text-black-accent mb-4">
                Design System
              </h3>
              <p className="text-body-sm text-text-secondary">
                Electric Modern aesthetic with bold accent colors and Inter
                typography. Built with Next.js and Tailwind CSS.
              </p>
            </div>
            <div>
              <h3 className="text-h5 font-semibold text-black-accent mb-4">
                Colors
              </h3>
              <ul className="text-body-sm text-text-secondary space-y-2">
                <li>Bright Red #EF4444</li>
                <li>Cyan #06B6D4</li>
                <li>Lime #84CC16</li>
                <li>Canvas #FAFAFA</li>
              </ul>
            </div>
            <div>
              <h3 className="text-h5 font-semibold text-black-accent mb-4">
                Typography
              </h3>
              <ul className="text-body-sm text-text-secondary space-y-2">
                <li>Headings: Inter (500-800)</li>
                <li>Body: Inter (400-500)</li>
                <li>Code: JetBrains Mono</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border-light text-center text-body-sm text-text-secondary">
            <p>Mood Board v1: Initial • Created January 2025</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Color Swatch Component
function ColorSwatch({
  name,
  hex,
  className,
}: {
  name: string;
  hex: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg p-4 min-h-[80px] flex flex-col justify-between ${className}`}
    >
      <span className="text-label font-medium">{name}</span>
      <code className="text-label-sm font-mono">{hex}</code>
    </div>
  );
}
