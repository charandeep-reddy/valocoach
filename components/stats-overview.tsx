"use client";

import { PlayerData } from "@/types/player";
import { SectionHeading } from "@/components/ui/section-heading";

interface StatsOverviewProps {
  player: PlayerData;
}

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
}

function StatCard({ label, value, subtext }: StatCardProps) {

  return (
    <div
      className="glass-card rounded-lg p-5 relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-valorant-red to-transparent" />
      <p className="text-xs uppercase tracking-[0.2em] text-[#8892A0] mb-2 tactical-heading">
        {label}
      </p>
      <p className="text-3xl md:text-4xl font-bold tracking-tight text-valorant-red tabular-nums">
        {value}
      </p>
      {subtext && (
        <p className="text-xs sm:text-sm text-[#8892A0] mt-1">{subtext}</p>
      )}
    </div>
  );
}

export function StatsOverview({ player }: StatsOverviewProps) {
  return (
    <div 
      className="space-y-4"
    >
      <SectionHeading title="Overall Statistics" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="K/D Ratio"
          value={player.overall_kd_ratio.toFixed(2)}
        />
        <StatCard
          label="Headshot %"
          value={`${player.overall_headshot_percentage.toFixed(1)}%`}
          subtext="Overall accuracy"
        />
        <StatCard
          label="Win Rate"
          value={`${player.overall_win_percent}%`}
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
