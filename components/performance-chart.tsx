"use client";

import { MapStats } from "@/lib/data";
import { Bar, BarChart, XAxis, YAxis, Cell } from "recharts";
import { SectionHeading } from "@/components/section-heading";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PerformanceChartProps {
  mapStats: MapStats[];
}

const chartConfig = {
  winRate: {
    label: "Win Rate",
    color: "#00D4AA",
  },
} satisfies ChartConfig;

const getBarColor = (winRate: number) => {
  if (winRate >= 60) return "#00D4AA"; // Valorant teal
  if (winRate >= 50) return "#8892A0"; // neutral
  return "#FF4655"; // Valorant red
};

export function PerformanceChart({ mapStats }: PerformanceChartProps) {
  return (
    <div className="glass-card corner-accent rounded-lg p-6 relative overflow-hidden flex flex-col gap-4">
      {/* Scanline effect */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-50" />

      <SectionHeading title="Performance by Map" variant="section" />

      <ChartContainer config={chartConfig} className="h-[300px] w-full relative z-10">
        <BarChart
          data={mapStats}
          layout="horizontal"
          margin={{ top: 0, right:30, left: 0, bottom: 0 }}
        >
          <YAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            tick={{ fill: "#8892A0", fontSize: 11, fontFamily: "monospace" }}
            axisLine={{ stroke: "#2A3A4D" }}
            tickLine={{ stroke: "#2A3A4D" }}
          />
          <XAxis
            type="category"
            dataKey="map"
            tick={{ fill: "#ECE8E1", fontSize: 12, fontWeight: "bold" }}
            width={60}
            axisLine={{ stroke: "#2A3A4D" }}
            tickLine={{ stroke: "#2A3A4D" }}
          />
          <ChartTooltip
            cursor={{ fill: "rgba(255, 70, 85, 0.1)" }}
            content={
              <ChartTooltipContent
                className="bg-valorant-dark border-valorant-red/40 backdrop-blur-xl"
                labelClassName="text-[#ECE8E1] font-bold uppercase"
                formatter={(value, _name, item) => (
                  <div className="flex items-center gap-2 text-[#ECE8E1]">
                    <div
                      className="h-2.5 w-2.5 rounded-sm"
                      style={{ backgroundColor: getBarColor(item.payload.winRate) }}
                    />
                    <span className="font-mono tabular-nums">
                      {value}% ({item.payload.wins}W - {item.payload.losses}L)
                    </span>
                  </div>
                )}
              />
            }
          />
          <Bar dataKey="winRate" radius={[0, 4, 4, 0]}>
            {mapStats.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(entry.winRate)}
                style={{ filter: `drop-shadow(0 0 6px ${getBarColor(entry.winRate)}40)` }}
              />
            ))}
          </Bar>
        </BarChart>
        </ChartContainer>
    </div>
  );
}
