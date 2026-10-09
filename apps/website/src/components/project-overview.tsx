import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { FeatureCard } from "@/components/ui/feature-card";

export interface ProjectOverviewProps {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  /** Destination pathname, e.g. "/projects/example". */
  href: string;
  ctaText?: string;
  imageFit?: "cover" | "contain";
  /** Optional metadata row (kind, dates, tags) rendered under the title. */
  meta?: ReactNode;
}

export function ProjectOverview({
  title,
  description,
  imageUrl,
  imageAlt,
  href,
  ctaText = "View Project",
  imageFit = "cover",
  meta,
}: ProjectOverviewProps) {
  const imageContainerBg = imageFit === "contain" ? "bg-white" : "bg-surface";
  const imageClass = imageFit === "contain" ? "object-contain p-4" : "object-cover object-top";

  return (
    <Link href={href} className="block group no-underline">
      <FeatureCard
        background="canvas"
        border="light"
        padding="default"
        className="hover:border-brand transition-colors h-full"
      >
        <div className="flex flex-col h-full">
          {/* Project Image */}
          {imageUrl && (
            <div
              className={`relative w-full h-64 rounded-lg overflow-hidden shrink-0 ${imageContainerBg}`}
            >
              <Image
                src={imageUrl}
                alt={imageAlt ?? ""}
                fill
                priority
                className={imageClass}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          {/* Project Details */}
          <div className={`flex flex-col flex-1 min-h-0 ${imageUrl ? "mt-6" : ""}`}>
            <h2 className="text-h4 font-bold text-black shrink-0">{title}</h2>
            {meta && <div className="mt-3 shrink-0">{meta}</div>}
            <p className="text-body text-text-secondary mt-4 line-clamp-4 flex-1">{description}</p>

            <span className="inline-flex items-center rounded-md px-8 h-10 bg-brand text-white text-sm font-medium shadow group-hover:bg-brand-dark transition-colors mt-4 shrink-0 self-start">
              {ctaText} →
            </span>
          </div>
        </div>
      </FeatureCard>
    </Link>
  );
}
