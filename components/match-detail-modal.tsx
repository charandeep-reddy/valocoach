"use client";

import { Match } from "@/types/player";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface MatchDetailModalProps {
  match: Match | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MatchDetailModal({ match, open, onOpenChange }: MatchDetailModalProps) {
  if (!match) return null;

  const resultColors = {
    Won: "bg-green-500/20 text-green-500 border-green-500/50",
    Lost: "bg-red-500/20 text-red-400 border-red-500/50",
    Draw: "bg-yellow-500/20 text-yellow-500 border-yellow-500/50",
  };

  const kdColor = match.kd_ratio >= 1 ? "text-green-500" : "text-red-400";

  // Parse date
  const dateStr = match.date_and_time.replace(" UTC", "");
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Calculate shot percentages
  const totalShots = match.headshots + match.bodyshots + match.legshots;
  const headshotPct = totalShots > 0 ? ((match.headshots / totalShots) * 100).toFixed(2) : "0";
  const bodyshotPct = totalShots > 0 ? ((match.bodyshots / totalShots) * 100).toFixed(2) : "0";
  const legshotPct = totalShots > 0 ? ((match.legshots / totalShots) * 100).toFixed(2) : "0";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-card border-border">
        <DialogHeader className="space-y-3">
          {/* Result Badge + Map & Agent */}
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className={`${resultColors[match.result]} text-lg px-4 py-1 font-bold`}
            >
              {match.result}
            </Badge>
            <div>
              <DialogTitle className="text-xl font-bold">
                {match.map}
              </DialogTitle>
              <p className="text-muted-foreground">{match.agent}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {formattedDate} at {formattedTime} • {match.total_rounds} rounds • {match.team} Team
          </p>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Combat Stats */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Combat Stats
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-3 text-center">
                  <p className="text-2xl font-bold text-foreground">{match.ACS}</p>
                  <p className="text-xs text-muted-foreground">ACS</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-3 text-center">
                  <p className={`text-2xl font-bold ${kdColor}`}>
                    {match.kd_ratio.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">K/D Ratio</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-3 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {match.headshot_percentage.toFixed(0)}%
                  </p>
                  <p className="text-xs text-muted-foreground">Headshot %</p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-3 text-center">
              <p className="text-lg font-semibold text-foreground">
                {match.kills} / {match.deaths} / {match.assists}
              </p>
              <p className="text-xs text-muted-foreground">Kills / Deaths / Assists</p>
            </div>
          </div>

          {/* Shot Breakdown */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 text-center">
              Shot Breakdown
            </h3>
            <div className="space-y-2">
              {/* Headshots */}
              <div className="grid grid-cols-4 place-items-center gap-2">
                <div className="text-sm text-foreground col-span-1">Headshots</div>
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden col-span-2">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${headshotPct}%` }}
                    />
                  </div>
                  <div className="text-sm font-semibold text-right">
                    {match.headshots} ({headshotPct}%)
                  </div>
              </div>
              {/* Bodyshots */}
              <div className="grid grid-cols-4 place-items-center gap-2">
                <div className="text-sm text-foreground block col-span-1">Bodyshots</div>
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden col-span-2">
                    <div
                      className="h-full bg-yellow-500 rounded-full"
                      style={{ width: `${bodyshotPct}%` }}
                    />
                  </div>
                  <div className="text-sm font-semibold text-right">
                    {match.bodyshots} ({bodyshotPct}%)
                  </div>
              </div>
              {/* Legshots */}
              <div className="grid grid-cols-4 place-items-center gap-2">
                <div className="text-sm text-foreground block col-span-1">Legshots</div>
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden col-span-2">
                    <div
                      className="h-full bg-red-400 rounded-full"
                      style={{ width: `${legshotPct}%` }}
                    />
                  </div>
                  <div className="text-sm font-semibold text-right">
                    {match.legshots} ({legshotPct}%)
                  </div>
              </div>
            </div>
          </div>

          {/* Damage Stats */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Damage
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-3 text-center">
                  <p className="text-xl font-bold text-green-500">
                    {match.damage_made.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Dealt</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-3 text-center">
                  <p className="text-xl font-bold text-red-400">
                    {match.damage_received.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Received</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
