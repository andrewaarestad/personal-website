/**
 * Sample data generators for visualizations and demos
 */

export interface WaterFlowDataPoint {
  timestamp: number; // Unix timestamp in seconds
  flowRate: number; // Gallons per minute (GPM)
}

/**
 * Generate realistic water flow data for a 5-minute period at 1Hz
 *
 * Simulates realistic household water usage patterns:
 * - Background noise/fluctuations
 * - Periodic usage events (faucet, toilet, shower)
 * - Realistic flow rates (0-5 GPM typical range)
 *
 * @param startTime - Starting unix timestamp (defaults to now - 5 minutes)
 * @returns Array of 300 data points (5 minutes at 1Hz)
 */
export function generateWaterFlowData(
  startTime: number = Date.now() / 1000 - 300
): WaterFlowDataPoint[] {
  const data: WaterFlowDataPoint[] = [];
  const baseNoise = 0.05; // Small background fluctuation

  for (let i = 0; i < 300; i++) {
    const timestamp = startTime + i;
    let flowRate = 0;

    // Add realistic water usage events
    // Event 1: Faucet usage (30s-60s) - ~2 GPM
    if (i >= 30 && i <= 60) {
      flowRate = 2.0 + Math.random() * 0.3 - 0.15;
    }
    // Event 2: Toilet flush (90s-105s) - ~3 GPM spike
    else if (i >= 90 && i <= 105) {
      const progress = (i - 90) / 15;
      // Bell curve for toilet flush
      flowRate = 3.0 * Math.exp(-Math.pow((progress - 0.5) * 4, 2)) + Math.random() * 0.2;
    }
    // Event 3: Shower starts (150s-300s) - ~2.5 GPM steady
    else if (i >= 150) {
      flowRate = 2.5 + Math.random() * 0.4 - 0.2;
    }
    // Background: slight noise when "off"
    else {
      flowRate = Math.random() * baseNoise;
    }

    // Add small random fluctuations for realism
    flowRate += (Math.random() - 0.5) * 0.1;

    // Clamp to realistic bounds
    flowRate = Math.max(0, Math.min(5, flowRate));

    data.push({
      timestamp,
      flowRate: Math.round(flowRate * 100) / 100, // Round to 2 decimals
    });
  }

  return data;
}

/**
 * Format timestamp for chart display
 * Converts Unix timestamp to readable time format
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Format timestamp for tooltip (more detailed)
 */
export function formatTimestampDetailed(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
