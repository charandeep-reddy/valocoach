"use client";

import { motion } from "framer-motion";
import { Match } from "@/types/player";

interface MatchCardProps {
  match: Match;
  onClick?: () => void;
  index?: number;
}

export function MatchCard({ match, onClick, index = 0 }: MatchCardProps) {
  const resultStyles = {
    Won: "result-won",
    Lost: "result-lost",
    Draw: "result-draw",
  };

  const kdColor = match.kd_ratio >= 1 ? "text-[#00D4AA] glow-teal" : "text-[#FF4655] glow-red";

  // Parse date
  const dateStr = match.date_and_time.replace(" UTC", "");
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      whileHover={{ x: 4 }}
      onClick={onClick}
      className="glass-card hover-glow rounded-lg p-4 cursor-pointer relative overflow-hidden group"
    >
      {/* Left accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-valorant-red to-valorant-red/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="flex items-center gap-4">
        {/* Result Badge */}
        <div className={`tactical-badge px-4 py-1.5 font-bold uppercase tracking-wider text-sm ${resultStyles[match.result]}`}>
          {match.result}
        </div>

        {/* Map & Agent */}
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

        {/* Stats */}
        <div className="hidden sm:flex items-center gap-6 text-right">
          <div>
            <p className="text-xs text-[#8892A0] uppercase tracking-widest">K / D / A</p>
            <p className="font-bold text-[#ECE8E1] tabular-nums">
              {match.kills} / {match.deaths} / {match.assists}
            </p>
          </div>
          <div className="w-16">
            <p className="text-xs text-[#8892A0] uppercase tracking-widest">K/D</p>
            <p className={`font-bold text-lg ${kdColor}`}>
              {match.kd_ratio.toFixed(2)}
            </p>
          </div>
          <div className="w-14">
            <p className="text-xs text-[#8892A0] uppercase tracking-widest">ACS</p>
            <p className="font-bold text-[#ECE8E1]">{match.ACS}</p>
          </div>
          <div className="w-14">
            <p className="text-xs text-[#8892A0] uppercase tracking-widest">HS%</p>
            <p className="font-bold text-[#ECE8E1]">
              {match.headshot_percentage.toFixed(0)}%
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
