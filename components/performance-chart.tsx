"use client";

import { motion } from "framer-motion";
import { MapStats } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface PerformanceChartProps {
  mapStats: MapStats[];
}

export function PerformanceChart({ mapStats }: PerformanceChartProps) {
  const getBarColor = (winRate: number) => {
    if (winRate >= 60) return "#00D4AA"; // Valorant teal
    if (winRate >= 50) return "#8892A0"; // neutral
    return "#FF4655"; // Valorant red
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="glass-card corner-accent rounded-lg p-6 relative overflow-hidden"
    >
      {/* Scanline effect */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-50" />
      
      <h3 className="text-lg font-bold text-[#ECE8E1] flex items-center gap-3 tactical-heading mb-4 relative z-10">
        <div className="w-1 h-6 bg-valorant-red" />
        Performance by Map
      </h3>
      
      <div className="h-[300px] w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={mapStats}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
          >
            <XAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: "#8892A0", fontSize: 11, fontFamily: "monospace" }}
              axisLine={{ stroke: "#2A3A4D" }}
              tickLine={{ stroke: "#2A3A4D" }}
            />
            <YAxis
              type="category"
              dataKey="map"
              tick={{ fill: "#ECE8E1", fontSize: 12, fontWeight: "bold" }}
              width={60}
              axisLine={{ stroke: "#2A3A4D" }}
              tickLine={{ stroke: "#2A3A4D" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0F1923",
                border: "1px solid rgba(255, 70, 85, 0.4)",
                borderRadius: "4px",
                backdropFilter: "blur(12px)",
              }}
              labelStyle={{ color: "#ECE8E1", fontWeight: "bold", textTransform: "uppercase" }}
              itemStyle={{ color: "#ECE8E1" }}
              formatter={(value: number | undefined, _name: string | undefined, props: { payload?: MapStats }) => [
                `${value ?? 0}% (${props.payload?.wins ?? 0}W - ${props.payload?.losses ?? 0}L)`,
                "Win Rate",
              ]}
              cursor={{ fill: "rgba(255, 70, 85, 0.1)" }}
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
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
