"use client";

import { useEffect, useState } from "react";
import { PlayerData } from "@/types/player";
import { getMapStats } from "@/lib/data";
import { PlayerProfileCard } from "@/components/player-profile-card";
import { StatsOverview } from "@/components/stats-overview";
import { MatchHistory } from "@/components/match-history";
import { PerformanceChart } from "@/components/performance-chart";
import { getPlayerData } from "@/lib/data";

export default function Home() {
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPlayerData();
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
      <div className="min-h-screen flex items-center justify-center bg-valorant-dark tactical-grid">
        <div 
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 border-2 border-valorant-red border-t-transparent rounded-full animate-spin" />
          <p className="text-[#8892A0] uppercase tracking-[0.3em] text-sm">Loading Intel...</p>
        </div>
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-valorant-dark tactical-grid">
        <div className="text-center glass-card p-8 rounded-lg">
          <p className="text-valorant-red text-lg font-bold uppercase tracking-widest">Error</p>
          <p className="text-[#8892A0] mt-2">{error || "Failed to load player data"}</p>
        </div>
      </div>
    );
  }

  const mapStats = getMapStats(player.matches);

  return (
    <div className="min-h-screen bg-valorant-dark tactical-grid relative">
      <div className="fixed inset-0 scanlines pointer-events-none z-50 opacity-30" />

      <main className="container mx-auto px-4 py-8 space-y-8 relative z-10">
          <PlayerProfileCard player={player} />
          <StatsOverview player={player} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-1">
            <PerformanceChart mapStats={mapStats} />
          </section>

          <section className="lg:col-span-2">
            <MatchHistory matches={player.matches} />
          </section>
        </div>
      </main>
    </div>
  );
}