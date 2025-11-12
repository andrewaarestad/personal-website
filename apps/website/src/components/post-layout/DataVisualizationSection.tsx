import type { DataVisualizationSectionProps } from "./types";

/**
 * DataVisualizationSection - Container for interactive data visualizations
 *
 * Wraps charts and data visualizations with optional title and description.
 * Provides consistent styling and spacing for embedded visualizations.
 *
 * @example
 * ```tsx
 * import { WaterFlowChart } from "@/components/charts/WaterFlowChart";
 * import { generateWaterFlowData } from "@/lib/sample-data";
 *
 * const data = generateWaterFlowData();
 *
 * <DataVisualizationSection
 *   key="flow-viz"
 *   title="Real-Time Flow Detection"
 *   description="5-minute sample showing ultrasonic flow measurement at 1Hz sampling rate"
 * >
 *   <WaterFlowChart data={data} height={400} />
 * </DataVisualizationSection>
 * ```
 */
export function DataVisualizationSection({
  title,
  description,
  children,
}: DataVisualizationSectionProps) {
  return (
    <div className="space-y-4">
      {/* Optional title and description */}
      {(title || description) && (
        <div className="space-y-2">
          {title && <h3 className="text-h4 font-bold text-black">{title}</h3>}
          {description && (
            <p className="text-body text-text-secondary leading-relaxed">{description}</p>
          )}
        </div>
      )}

      {/* Visualization container with subtle border and background */}
      <div className="w-full bg-surface border border-border-light rounded-lg p-6 shadow-sm">
        {children}
      </div>
    </div>
  );
}
