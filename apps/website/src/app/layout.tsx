import type { Metadata } from "next";
import "./globals.css";
import { Breadcrumb } from "@/components/breadcrumb";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Breadcrumb />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
