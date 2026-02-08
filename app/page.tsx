"use client";

import { useEffect, useState } from "react";
import { PlayerData } from "@/types/player";
import { getMapStats } from "@/lib/data";
import { PlayerProfileCard } from "@/components/player-profile-card";
import { StatsOverview } from "@/components/stats-overview";
import { MatchHistory } from "@/components/match-history";
import { PerformanceChart } from "@/components/performance-chart";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/data/player.json");
        if (!response.ok) throw new Error("Failed to fetch player data");
        const data = await response.json();
        setPlayer(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading player data...</p>
        </div>
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-destructive text-lg font-semibold">Error</p>
          <p className="text-muted-foreground">{error || "Failed to load player data"}</p>
        </div>
      </div>
    );
  }

  console.log(player.matches);

  const mapStats = getMapStats(player.matches);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-lg">V</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">ValoCoach</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Player Profile */}
        <section>
          <PlayerProfileCard player={player} />
        </section>

        {/* Stats Overview */}
        <section>
          <StatsOverview player={player} />
        </section>

        {/* Two Column Layout: Chart + Match History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Performance Chart */}
          <section className="lg:col-span-1">
            <PerformanceChart mapStats={mapStats} />
          </section>

          {/* Match History */}
          <section className="lg:col-span-2">
            <MatchHistory matches={player.matches} />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>ValoCoach Dashboard • {player.matches.length} matches analyzed</p>
        </div>
      </footer>
    </div>
  );
}