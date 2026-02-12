import Link from "next/link";
import Image from "next/image";
import { FeatureCard } from "@/components/ui/feature-card";

export interface ProjectOverviewProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  projectSlug: string;
  ctaText?: string;
}

export function ProjectOverview({
  title,
  description,
  imageUrl,
  imageAlt,
  projectSlug,
  ctaText = "View Project",
}: ProjectOverviewProps) {
  return (
    <Link
      href={`/projects/${projectSlug}`}
      className="block group no-underline"
    >
      <FeatureCard
        background="canvas"
        border="light"
        padding="default"
        className="hover:border-brand transition-colors h-full"
      >
        <div className="flex flex-col h-full">
          {/* Project Image */}
          <div className="relative w-full h-64 rounded-lg overflow-hidden bg-surface shrink-0">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Project Details */}
          <div className="flex flex-col flex-1 min-h-0 mt-6">
            <h3 className="text-h4 font-bold text-black shrink-0">{title}</h3>
            <p className="text-body text-text-secondary mt-4 line-clamp-4 flex-1">
              {description}
            </p>

            <span className="inline-flex items-center rounded-md px-8 h-10 bg-brand text-white text-sm font-medium shadow group-hover:bg-brand-dark transition-colors mt-4 shrink-0 self-start">
              {ctaText} →
            </span>
          </div>
        </div>
      </FeatureCard>
    </Link>
  );
}
