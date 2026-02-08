"use client";

import { Match } from "@/types/player";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MatchCardProps {
  match: Match;
  onClick?: () => void;
}

export function MatchCard({ match, onClick }: MatchCardProps) {
  const resultColors = {
    Won: "bg-green-500/10 text-green-500 border-green-500/30",
    Lost: "bg-red-500/10 text-red-400 border-red-500/30",
    Draw: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
  };

  const kdColor = match.kd_ratio >= 1 ? "text-green-500" : "text-red-400";

  // Parse date
  const dateStr = match.date_and_time.replace(" UTC", "");
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <Card 
      className="group relative overflow-hidden bg-card/50 hover:bg-card/80 border-border/50 hover:border-primary/30 transition-all duration-300 hover:translate-x-1 cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Result Badge */}
          <Badge 
            variant="outline" 
            className={`${resultColors[match.result]} font-semibold min-w-[60px] justify-center`}
          >
            {match.result}
          </Badge>

          {/* Map & Agent */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-foreground truncate">{match.map}</p>
              <span className="text-muted-foreground">•</span>
              <p className="text-muted-foreground truncate">{match.agent}</p>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formattedDate} • {match.total_rounds} rounds
            </p>
          </div>

          {/* Stats */}
          <div className="hidden sm:flex items-center gap-6 text-right">
            <div>
              <p className="text-xs text-muted-foreground uppercase">K / D / A</p>
              <p className="font-semibold text-foreground">
                {match.kills} / {match.deaths} / {match.assists}
              </p>
            </div>
            <div className="w-16">
              <p className="text-xs text-muted-foreground uppercase">K/D</p>
              <p className={`font-bold ${kdColor}`}>
                {match.kd_ratio.toFixed(2)}
              </p>
            </div>
            <div className="w-14">
              <p className="text-xs text-muted-foreground uppercase">ACS</p>
              <p className="font-semibold text-foreground">{match.ACS}</p>
            </div>
            <div className="w-14">
              <p className="text-xs text-muted-foreground uppercase">HS%</p>
              <p className="font-semibold text-foreground">
                {match.headshot_percentage.toFixed(0)}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
