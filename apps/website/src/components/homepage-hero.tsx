import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HomepageHeroProps {
  variant?: "direct" | "problem-solver" | "understated";
  showAccent?: boolean;
}

export function HomepageHero({
  variant = "direct",
  showAccent = true,
}: HomepageHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-gradient-brand-subtle via-canvas to-gradient-brand-secondary-subtle">
      <div className="container mx-auto px-6 py-16 max-w-2xl">
        {/* Variant: Direct Intro */}
        {variant === "direct" && (
          <div className="space-y-8">
            {showAccent && (
              <div className="w-12 h-1 bg-brand" aria-hidden="true" />
            )}
            <div>
              <h1 className="text-h1 font-extrabold text-black mb-4">
                Hi, I&apos;m Andrew.
              </h1>
              <p className="text-body-lg text-text-secondary">
                I like to build products with TypeScript, Python, and C++.
              </p>
            </div>
            <Link href="/projects">
              <Button variant="brand">
                See my work →
              </Button>
            </Link>
          </div>
        )}

        {/* Variant: Problem Solver */}
        {variant === "problem-solver" && (
          <div className="space-y-8">
            {showAccent && (
              <div className="flex gap-2" aria-hidden="true">
                <div className="w-2 h-2 rounded-full bg-brand" />
                <div className="w-2 h-2 rounded-full bg-brand-secondary" />
                <div className="w-2 h-2 rounded-full bg-highlight" />
              </div>
            )}
            <div>
              <h1 className="text-h1 font-extrabold text-black mb-4">
                Building intelligent systems that actually ship.
              </h1>
              <p className="text-body-lg text-text-secondary">
                15+ years from firmware to cloud, signal processing to
                generative AI.
              </p>
            </div>
            <Link href="/projects">
              <Button variant="brand">
                View projects →
              </Button>
            </Link>
          </div>
        )}

        {/* Variant: Understated Expert (Recommended) */}
        {variant === "understated" && (
          <div className="space-y-8">
            {showAccent && (
              <div className="w-16 h-0.5 bg-highlight" aria-hidden="true" />
            )}
            <div>
              <h1 className="text-h1 font-extrabold text-black mb-6 leading-tight">
                ML engineer.
                <br />
                15+ years shipping.
              </h1>
              <p className="text-body-lg text-text-secondary max-w-xl">
                I work at the intersection of research and product—building
                everything from firmware-level signal processing to cloud-scale
                ML pipelines.
              </p>
            </div>
            <Link href="/projects">
              <Button variant="brand">
                See what I&apos;ve built →
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
