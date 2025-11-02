export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Personal Website</h1>
        <div className="space-y-4 text-center">
          <p className="text-xl text-muted-foreground">
            Built with Next.js 15, TypeScript, and Tailwind CSS
          </p>
          <p className="text-lg text-muted-foreground">A playground for AI-assisted development</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-6 border rounded-lg">
              <h2 className="font-semibold text-lg mb-2">Next.js 15</h2>
              <p className="text-sm text-muted-foreground">
                Modern React framework with App Router and Server Components
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h2 className="font-semibold text-lg mb-2">Turborepo</h2>
              <p className="text-sm text-muted-foreground">
                High-performance build system for monorepos
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h2 className="font-semibold text-lg mb-2">shadcn/ui Ready</h2>
              <p className="text-sm text-muted-foreground">
                Configured for beautiful UI components via MCP
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
