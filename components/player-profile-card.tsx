"use client";

import { PlayerData } from "@/types/player";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PlayerProfileCardProps {
  player: PlayerData;
}

export function PlayerProfileCard({ player }: PlayerProfileCardProps) {
  // Extract rank tier and RR from "Immortal 3 330 RR"
  const rankParts = player.current_rank.split(" ");
  const rr = rankParts.pop(); // "RR"
  rankParts.pop(); // Remove "RR"
  const rankNumber = rankParts.pop(); // "330"
  const rankName = rankParts.join(" "); // "Immortal 3"

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-card to-card/80 border-2 border-border/50 hover:border-primary/30 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      <CardContent className="p-6">
        <div className="flex items-center gap-6">
          {/* Player Avatar */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={player.player_card_link}
              alt={player.player_name}
              className="relative w-24 h-24 rounded-xl object-cover ring-2 ring-border/50"
            />
          </div>

          {/* Player Info */}
          <div className="flex-1 space-y-3">
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                {player.player_name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="font-mono">
                  Level {player.player_account_level}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  #{player.leaderboard_placement} Leaderboard
                </Badge>
              </div>
            </div>

            {/* Rank Info */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground">Current Rank</p>
                <p className="text-lg font-bold text-foreground">{rankName}</p>
                <p className="text-sm text-primary font-semibold">{rankNumber} RR</p>
              </div>
              <div className="px-4 py-2 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-sm text-muted-foreground">Peak Rank</p>
                <p className="text-lg font-bold text-foreground">
                  {player.peak_rank.split(" ")[0]}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="hidden lg:flex flex-col gap-2 text-right">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Top Agent</p>
              <p className="text-lg font-semibold text-foreground">{player.top_agent}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Best Map</p>
              <p className="text-lg font-semibold text-foreground">{player.best_map}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
