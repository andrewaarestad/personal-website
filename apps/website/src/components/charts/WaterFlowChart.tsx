"use client";

import { ResponsiveLine } from "@nivo/line";
import { nivoTheme, chartColors } from "@/lib/nivo-theme";
import type { WaterFlowDataPoint } from "@/lib/sample-data";
import { formatTimestamp, formatTimestampDetailed } from "@/lib/sample-data";

export interface WaterFlowChartProps {
  /**
   * Water flow data points
   */
  data: WaterFlowDataPoint[];
  /**
   * Optional height in pixels (default: 400)
   */
  height?: number;
  /**
   * Show area under the line (default: true)
   */
  enableArea?: boolean;
  /**
   * Show data points (default: false for dense data)
   */
  enablePoints?: boolean;
}

/**
 * WaterFlowChart - Beautiful, interactive line chart for water flow data
 *
 * Features:
 * - Responsive design (mobile-first)
 * - Smooth animations matching site design
 * - Touch-optimized interactions
 * - Gradient fill for visual polish
 * - Brand-aligned colors (cyan for water)
 *
 * @example
 * ```tsx
 * const data = generateWaterFlowData();
 * <WaterFlowChart data={data} height={400} />
 * ```
 */
export function WaterFlowChart({
  data,
  height = 400,
  enableArea = true,
  enablePoints = false,
}: WaterFlowChartProps) {
  // Transform data into Nivo's expected format
  const chartData = [
    {
      id: "flow-rate",
      data: data.map((point) => ({
        x: point.timestamp,
        y: point.flowRate,
      })),
    },
  ];

  return (
    <div style={{ height: `${height}px` }} className="w-full">
      <ResponsiveLine
        data={chartData}
        theme={nivoTheme as any}
        colors={[chartColors.brandSecondary]} // Cyan for water - thematically perfect
        margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
        // X-axis configuration (time)
        xScale={{
          type: "linear",
          min: "auto",
          max: "auto",
        }}
        xFormat={(value) => formatTimestamp(value as number)}
        axisBottom={{
          tickSize: 5,
          tickPadding: 8,
          tickRotation: 0,
          legend: "Time",
          legendOffset: 45,
          legendPosition: "middle",
          format: (value) => formatTimestamp(value),
          tickValues: 6, // Show ~6 ticks for readability
        }}
        // Y-axis configuration (flow rate)
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
          stacked: false,
        }}
        yFormat={(value) => `${value} GPM`}
        axisLeft={{
          tickSize: 5,
          tickPadding: 8,
          tickRotation: 0,
          legend: "Flow Rate (GPM)",
          legendOffset: -50,
          legendPosition: "middle",
          format: (value) => `${value}`,
          tickValues: 5,
        }}
        // Grid
        enableGridX={false}
        enableGridY={true}
        // Line styling
        curve="monotoneX" // Smooth curve that preserves monotonicity
        lineWidth={2}
        // Area under curve
        enableArea={enableArea}
        areaOpacity={0.1}
        areaBaselineValue={0}
        // Points
        enablePoints={enablePoints}
        pointSize={6}
        pointColor="#FFFFFF" // White center
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }} // Cyan border
        // Interactive features
        useMesh={true} // Better touch/hover targets (crucial for mobile)
        enableCrosshair={true}
        crosshairType="cross"
        // Tooltip
        tooltip={({ point }) => {
          const timestamp = point.data.x as number;
          const flowRate = point.data.y as number;
          return (
            <div
              style={{
                background: "#FFFFFF",
                padding: "12px 16px",
                border: "1px solid #E5E7EB",
                borderRadius: "0.5rem",
                boxShadow:
                  "0 10px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>
                {formatTimestampDetailed(timestamp)}
              </div>
              <div style={{ fontSize: "16px", color: "#1A1A1A", fontWeight: 600 }}>
                {flowRate.toFixed(2)} GPM
              </div>
            </div>
          );
        }}
        // Animations - match site's 600ms timing
        animate={true}
        motionConfig={{
          mass: 1,
          tension: 170,
          friction: 26,
          clamp: false,
        }}
        // Accessibility
        role="img"
        ariaLabel="Water flow rate over time"
        // Legend
        legends={[]}
      />
    </div>
  );
}
