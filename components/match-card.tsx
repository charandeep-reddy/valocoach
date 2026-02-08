"use client";

import { motion } from "framer-motion";
import { Match } from "@/types/player";
import { RESULT_TEXT_CLASSES } from "@/lib/result-styles";

interface MatchCardProps {
  match: Match;
  onClick?: () => void;
  index?: number;
}

function MatchStat({
  label,
  value,
  valueClassName = "text-[#ECE8E1]",
  className = "",
}: {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs text-[#8892A0] uppercase tracking-widest">{label}</p>
      <p className={`font-bold ${valueClassName}`}>{value}</p>
    </div>
  );
}

export function MatchCard({ match, onClick }: MatchCardProps) {
  const kdColor = match.kd_ratio >= 1 ? "text-[#00D4AA]" : "text-valorant-red";
  const dateStr = match.date_and_time.replace(" UTC", "");
  const formattedDate = new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const stats = [
    {
      label: "K / D / A",
      value: `${match.kills} / ${match.deaths} / ${match.assists}`,
      valueClassName: "text-[#ECE8E1] tabular-nums",
    },
    {
      label: "K/D",
      value: match.kd_ratio.toFixed(2),
      valueClassName: `text-lg ${kdColor}`,
      className: "w-16",
    },
    { label: "ACS", value: match.ACS, className: "w-14" },
    {
      label: "HS%",
      value: `${match.headshot_percentage.toFixed(0)}%`,
      className: "w-14",
    },
  ];

  return (
    <motion.div
      initial={{ x: 0 }}
      transition={{ duration: 0.1, ease: "linear" }}
      whileHover={{ x: 4 }}
      onClick={onClick}
      className="glass-card hover-glow rounded-lg p-4 cursor-pointer relative overflow-hidden group"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-valorant-red to-valorant-red/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="flex items-center gap-4">
        <div className={`tactical-badge px-4 py-1.5 font-bold uppercase tracking-wider text-sm ${RESULT_TEXT_CLASSES[match.result]}`}>
          {match.result}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-[#ECE8E1] truncate uppercase tracking-wide">{match.map}</p>
            <span className="text-valorant-red">//</span>
            <p className="text-[#8892A0] truncate">{match.agent}</p>
          </div>
          <p className="text-xs text-[#8892A0] mt-0.5 uppercase tracking-widest">
            {formattedDate} • {match.total_rounds} RDS
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-6 text-right">
          {stats.map((s) => (
            <MatchStat
              key={s.label}
              label={s.label}
              value={s.value}
              valueClassName={s.valueClassName}
              className={s.className}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
