"use client";

import { PlayerData } from "@/types/player";
import { Card, CardContent } from "@/components/ui/card";

interface StatsOverviewProps {
  player: PlayerData;
}

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  colorClass?: string;
}

function StatCard({ label, value, subtext, colorClass = "text-foreground" }: StatCardProps) {
  return (
    <Card className="group relative overflow-hidden bg-card/50 hover:bg-card/80 border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardContent className="p-5 relative">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          {label}
        </p>
        <p className={`text-3xl font-bold ${colorClass} tracking-tight`}>
          {value}
        </p>
        {subtext && (
          <p className="text-sm text-muted-foreground mt-1">{subtext}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function StatsOverview({ player }: StatsOverviewProps) {
  const kdColor = player.overall_kd_ratio >= 1 ? "text-green-500" : "text-red-400";
  const winColor = player.overall_win_percent >= 50 ? "text-green-500" : "text-orange-400";

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
        <div className="w-1 h-5 bg-primary rounded-full" />
        Overall Statistics
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="K/D Ratio"
          value={player.overall_kd_ratio.toFixed(2)}
          colorClass={kdColor}
        />
        <StatCard
          label="Headshot %"
          value={`${player.overall_headshot_percentage.toFixed(1)}%`}
          subtext="Overall accuracy"
        />
        <StatCard
          label="Win Rate"
          value={`${player.overall_win_percent}%`}
          colorClass={winColor}
        />
        <StatCard
          label="Average ACS"
          value={player.overall_ACS.toFixed(0)}
          subtext="Combat Score"
        />
      </div>
    </div>
  );
}
