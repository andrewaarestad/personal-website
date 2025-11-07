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
    <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-gradient-vermillion-subtle via-canvas to-gradient-blue-subtle">
      <div className="container mx-auto px-6 py-16 max-w-2xl">
        {/* Variant: Direct Intro */}
        {variant === "direct" && (
          <div className="space-y-8">
            {showAccent && (
              <div className="w-12 h-1 bg-vermillion" aria-hidden="true" />
            )}
            <div>
              <h1 className="text-h1 font-extrabold text-black mb-4">
                Hi, I&apos;m Andrew.
              </h1>
              <p className="text-body-lg text-text-secondary">
                I like to build products with TypeScript, Python, and C++.
              </p>
            </div>
            <Button variant="vermillion">
              See my work →
            </Button>
          </div>
        )}

        {/* Variant: Problem Solver */}
        {variant === "problem-solver" && (
          <div className="space-y-8">
            {showAccent && (
              <div className="flex gap-2" aria-hidden="true">
                <div className="w-2 h-2 rounded-full bg-vermillion" />
                <div className="w-2 h-2 rounded-full bg-blue" />
                <div className="w-2 h-2 rounded-full bg-gold" />
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
            <Button variant="vermillion">
              View projects →
            </Button>
          </div>
        )}

        {/* Variant: Understated Expert (Recommended) */}
        {variant === "understated" && (
          <div className="space-y-8">
            {showAccent && (
              <div className="w-16 h-0.5 bg-gold" aria-hidden="true" />
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
            <Button variant="vermillion">
              See what I&apos;ve built →
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
