import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
    <FeatureCard background="canvas" border="light" padding="default" className="hover:border-brand transition-colors">
      <div className="space-y-6">
        {/* Project Image */}
        <div className="relative w-full h-64 rounded-lg overflow-hidden bg-surface">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Project Details */}
        <div className="space-y-4">
          <h3 className="text-h4 font-bold text-black">{title}</h3>
          <p className="text-body text-text-secondary">{description}</p>

          <Link href={`/projects/${projectSlug}`}>
            <Button variant="brand" size="default">
              {ctaText} →
            </Button>
          </Link>
        </div>
      </div>
    </FeatureCard>
  );
}
