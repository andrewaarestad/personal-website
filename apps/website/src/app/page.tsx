import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-canvas">
      <div className="z-10 w-full max-w-5xl items-center justify-between">
        <h1 className="text-4xl font-bold mb-8 text-center text-black">Personal Website</h1>
        <div className="space-y-4 text-center">
          <p className="text-xl text-text-secondary">
            Built with Next.js 15, TypeScript, and Tailwind CSS
          </p>
          <p className="text-lg text-text-secondary">A playground for AI-assisted development</p>

          {/* Design System Mood Board Link */}
          <div className="mt-12 mb-8 p-8 bg-gradient-to-br from-vermillion-light/30 via-blue-light/30 to-gold-light/30 rounded-xl border border-border-default">
            <h2 className="text-2xl font-bold text-black mb-3">🎨 Design System Mood Board</h2>
            <p className="text-body text-text-primary mb-6 max-w-2xl mx-auto">
              Check out our comprehensive design system showcasing colors, typography, components,
              and real-world examples. Built with the art studio aesthetic.
            </p>
            <Link href="/design-preview/v1-initial">
              <Button size="lg" className="bg-vermillion hover:bg-vermillion-dark">
                View Mood Board →
              </Button>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-6 border border-border-default rounded-lg bg-surface">
              <h2 className="font-semibold text-lg mb-2 text-black-accent">Next.js 15</h2>
              <p className="text-sm text-text-secondary">
                Modern React framework with App Router and Server Components
              </p>
            </div>
            <div className="p-6 border border-border-default rounded-lg bg-surface">
              <h2 className="font-semibold text-lg mb-2 text-black-accent">Turborepo</h2>
              <p className="text-sm text-text-secondary">
                High-performance build system for monorepos
              </p>
            </div>
            <div className="p-6 border border-border-default rounded-lg bg-surface">
              <h2 className="font-semibold text-lg mb-2 text-black-accent">shadcn/ui Ready</h2>
              <p className="text-sm text-text-secondary">
                Configured for beautiful UI components
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
