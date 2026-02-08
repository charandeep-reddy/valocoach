"use client";

import { MapStats } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface PerformanceChartProps {
  mapStats: MapStats[];
}

export function PerformanceChart({ mapStats }: PerformanceChartProps) {
  const getBarColor = (winRate: number) => {
    if (winRate >= 60) return "#22c55e"; // green-500
    if (winRate >= 50) return "#a3a3a3"; // neutral-400
    return "#ef4444"; // red-500
  };

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="w-1 h-5 bg-primary rounded-full" />
          Performance by Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
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
                tick={{ fill: "#a3a3a3", fontSize: 12 }}
              />
              <YAxis
                type="category"
                dataKey="map"
                tick={{ fill: "#fafafa", fontSize: 12 }}
                width={60}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#262626",
                  border: "1px solid #404040",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fafafa" }}
                
                formatter={(value: number, name: string, props: { payload: MapStats }) => [
                  `${value}% (${props.payload.wins}W - ${props.payload.losses}L)`,
                  "Win Rate",
                ]}
              />
              <Bar dataKey="winRate" radius={[0, 4, 4, 0]}>
                {mapStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.winRate)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
