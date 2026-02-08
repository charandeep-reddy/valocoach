"use client";

import { motion } from "framer-motion";
import { PlayerData } from "@/types/player";

interface StatsOverviewProps {
  player: PlayerData;
}

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  isPositive?: boolean;
  isNeutral?: boolean;
  delay?: number;
}

function StatCard({ label, value, subtext, isPositive, isNeutral, delay = 0 }: StatCardProps) {
  const valueClass = isNeutral 
    ? "stat-value neutral" 
    : isPositive 
      ? "stat-value positive glow-teal" 
      : "stat-value negative glow-red";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.03, y: -2 }}
      className="glass-card hover-glow rounded-lg p-5 relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FF4655] to-transparent" />
      <p className="text-xs uppercase tracking-[0.2em] text-[#8892A0] mb-2 tactical-heading">
        {label}
      </p>
      <p className={`text-4xl font-bold tracking-tight ${valueClass}`}>
        {value}
      </p>
      {subtext && (
        <p className="text-sm text-[#8892A0] mt-1">{subtext}</p>
      )}
    </motion.div>
  );
}

export function StatsOverview({ player }: StatsOverviewProps) {
  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-lg font-bold text-[#ECE8E1] flex items-center gap-3 tactical-heading">
        <div className="w-1 h-6 bg-[#FF4655]" />
        Overall Statistics
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="K/D Ratio"
          value={player.overall_kd_ratio.toFixed(2)}
          isPositive={player.overall_kd_ratio >= 1}
          delay={0.1}
        />
        <StatCard
          label="Headshot %"
          value={`${player.overall_headshot_percentage.toFixed(1)}%`}
          subtext="Overall accuracy"
          isNeutral
          delay={0.2}
        />
        <StatCard
          label="Win Rate"
          value={`${player.overall_win_percent}%`}
          isPositive={player.overall_win_percent >= 50}
          delay={0.3}
        />
        <StatCard
          label="Average ACS"
          value={player.overall_ACS.toFixed(0)}
          subtext="Combat Score"
          isNeutral
          delay={0.4}
        />
      </div>
    </motion.div>
  );
}
