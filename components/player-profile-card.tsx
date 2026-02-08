"use client";

import { PlayerData } from "@/types/player";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface PlayerProfileCardProps {
  player: PlayerData;
}

function RankCard({
  label,
  primary,
  secondary,
  primaryClassName = "text-[#ECE8E1]",
}: {
  label: string;
  primary: string;
  secondary?: string;
  primaryClassName?: string;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center glass-card rounded-lg h-full">
      <p className="text-xs text-[#8892A0] uppercase tracking-widest">{label}</p>
      <p className={`text-base sm:text-lg md:text-xl font-bold ${primaryClassName}`}>{primary}</p>
      {secondary != null && (
        <p className="text-base sm:text-lg md:text-xl text-valorant-red font-bold">{secondary}</p>
      )}
    </div>
  );
}

function QuickStats({ label, value, textColor }: { label: string, value: string, textColor: string }) {
  return (
    <div className="glass-card px-4 py-2 rounded-lg text-center">
      <p className="text-xs text-[#8892A0] uppercase tracking-widest">{label}</p>
      <p className={`text-base sm:text-lg md:text-xl font-bold ${textColor}`}>{value}</p>
    </div>
  );
}

  

export function PlayerProfileCard({ player }: PlayerProfileCardProps) {
  // Extract rank tier and RR from "Immortal 3 330 RR"
  const rankParts = player.current_rank.split(" ");
  rankParts.pop(); // Remove "RR"
  const rankNumber = rankParts.pop(); // "330"
  const rankName = rankParts.join(" "); // "Immortal 3"

  const quickStats = [
      {
          label: "Top Agent",
          value: player.top_agent,
          textColor: "text-valorant-teal"
      },
      {
        label: "Best Map",
        value: player.best_map,
        textColor: "text-valorant-red"
      }
  ]

  return (
    <div
      className="relative overflow-hidden glass-card corner-accent rounded-lg p-6"
    >
      {/* Agent Watermark */}
      <div className="agent-watermark">{player.top_agent}</div>
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none" />
      
      <div className="relative z-10 flex items-start sm:items-center gap-6">
        {/* Player Avatar */}
        <div 
          className="relative group"
        >
          <div className="absolute -inset-1 bg-linear-to-r from-valorant-red/40 to-valorant-teal/40 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
          <Image
            src={player.player_card_link}
            alt={player.player_name}
            className="relative w-20 sm:w-24 md:w-28 aspect-square sm:h-24 md:h-28 rounded-lg object-cover ring-2 ring-valorant-red/50"
            width={112}
            height={112}
          />
        </div>

        {/* Player Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#ECE8E1] tracking-tight tactical-heading">
              {player.player_name}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <Badge className="tactical-badge bg-valorant-red/20 text-valorant-red border border-valorant-red/40 font-mono uppercase tracking-wide">
                Level {player.player_account_level}
              </Badge>
              <Badge className="tactical-badge bg-valorant-teal/20 text-valorant-teal border border-valorant-teal/40 text-xs uppercase">
                #{player.leaderboard_placement} Leaderboard
              </Badge>
            </div>
          </div>

          {/* Rank Info */}
          <div className="flex items-center gap-4 h-24 max-w-xs">
            <RankCard
              label="Current Rank"
              primary={rankName}
              secondary={`${rankNumber} RR`}
            />
            <RankCard
              label="Peak Rank"
              primary={player.peak_rank.split(" ")[0]}
              primaryClassName="text-valorant-teal"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="hidden lg:flex flex-col gap-3 text-right">
          {quickStats.map((stat) => (
            <QuickStats key={stat.label} label={stat.label} value={stat.value} textColor={stat.textColor} />
          ))}
        </div>
      </div>
    </div>
  );
}
