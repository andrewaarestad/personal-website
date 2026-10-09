import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Breadcrumb } from "@/components/breadcrumb";
import { MainContent } from "@/components/main-content";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/providers/theme-provider";
import { FEED_PATH, FEED_TITLE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Andrew Aarestad",
  description: "A modern personal website built with Next.js and AI-assisted development",
  authors: [{ name: "Andrew Aarestad" }],
  // RSS autodiscovery. No canonical here: it would be inherited by every page.
  alternates: {
    types: { "application/rss+xml": [{ url: FEED_PATH, title: FEED_TITLE }] },
  },
  openGraph: {
    title: "Andrew Aarestad",
    description: "A modern personal website built with Next.js and AI-assisted development",
    images: [{ url: "/img/andrew_head.jpg" }],
  },
  twitter: {
    card: "summary",
    title: "Andrew Aarestad",
    description: "A modern personal website built with Next.js and AI-assisted development",
    images: ["/img/andrew_head.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <Breadcrumb />
          <MainContent>{children}</MainContent>
          <Footer />
        </ThemeProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
    </html>
  );
}
