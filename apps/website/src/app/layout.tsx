import type { Metadata } from "next";
import "./globals.css";
import { Breadcrumb } from "@/components/breadcrumb";
import { MainContent } from "@/components/main-content";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: "Personal Website",
  description: "A modern personal website built with Next.js and AI-assisted development",
  authors: [{ name: "Andrew Aarestad" }],
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
    </html>
  );
}
