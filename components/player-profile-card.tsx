"use client";

import { motion } from "framer-motion";
import { PlayerData } from "@/types/player";
import { Badge } from "@/components/ui/badge";

interface PlayerProfileCardProps {
  player: PlayerData;
}

export function PlayerProfileCard({ player }: PlayerProfileCardProps) {
  // Extract rank tier and RR from "Immortal 3 330 RR"
  const rankParts = player.current_rank.split(" ");
  rankParts.pop(); // Remove "RR"
  const rankNumber = rankParts.pop(); // "330"
  const rankName = rankParts.join(" "); // "Immortal 3"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden glass-card corner-accent rounded-lg p-6"
    >
      {/* Agent Watermark */}
      <div className="agent-watermark">{player.top_agent}</div>
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none" />
      
      <div className="relative z-10 flex items-center gap-6">
        {/* Player Avatar */}
        <motion.div 
          className="relative group"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FF4655]/40 to-[#00D4AA]/40 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
          <img
            src={player.player_card_link}
            alt={player.player_name}
            className="relative w-28 h-28 rounded-lg object-cover ring-2 ring-[#FF4655]/50"
          />
        </motion.div>

        {/* Player Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-[#ECE8E1] tracking-tight tactical-heading">
              {player.player_name}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <Badge className="tactical-badge bg-[#FF4655]/20 text-[#FF4655] border border-[#FF4655]/40 font-mono uppercase tracking-wide">
                Level {player.player_account_level}
              </Badge>
              <Badge className="tactical-badge bg-[#00D4AA]/20 text-[#00D4AA] border border-[#00D4AA]/40 text-xs uppercase">
                #{player.leaderboard_placement} Leaderboard
              </Badge>
            </div>
          </div>

          {/* Rank Info */}
          <div className="flex items-center gap-4">
            <motion.div 
              className="px-5 py-3 glass-card rounded-lg"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-xs text-[#8892A0] uppercase tracking-widest">Current Rank</p>
              <p className="text-xl font-bold text-[#ECE8E1] tactical-heading">{rankName}</p>
              <p className="text-lg text-[#FF4655] font-bold glow-red">{rankNumber} RR</p>
            </motion.div>
            <motion.div 
              className="px-5 py-3 glass-card rounded-lg"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-xs text-[#8892A0] uppercase tracking-widest">Peak Rank</p>
              <p className="text-xl font-bold text-[#00D4AA] glow-teal">
                {player.peak_rank.split(" ")[0]}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="hidden lg:flex flex-col gap-3 text-right">
          <div className="glass-card px-4 py-2 rounded-lg">
            <p className="text-xs text-[#8892A0] uppercase tracking-widest">Top Agent</p>
            <p className="text-xl font-bold text-[#FF4655] glow-red">{player.top_agent}</p>
          </div>
          <div className="glass-card px-4 py-2 rounded-lg">
            <p className="text-xs text-[#8892A0] uppercase tracking-widest">Best Map</p>
            <p className="text-xl font-bold text-[#00D4AA] glow-teal">{player.best_map}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
