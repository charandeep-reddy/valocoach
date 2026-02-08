"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
      <div className="min-h-screen flex items-center justify-center bg-[#0F1923] tactical-grid">
        <motion.div 
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-12 h-12 border-2 border-[#FF4655] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#8892A0] uppercase tracking-[0.3em] text-sm">Loading Intel...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !player) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F1923] tactical-grid">
        <div className="text-center glass-card p-8 rounded-lg">
          <p className="text-[#FF4655] text-lg font-bold uppercase tracking-widest">Error</p>
          <p className="text-[#8892A0] mt-2">{error || "Failed to load player data"}</p>
        </div>
      </div>
    );
  }

  const mapStats = getMapStats(player.matches);

  return (
    <div className="min-h-screen bg-[#0F1923] tactical-grid relative">
      {/* Scanline overlay for entire page */}
      <div className="fixed inset-0 scanlines pointer-events-none z-50 opacity-30" />
      
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#FF4655]/20 bg-[#0F1923]/90 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-10 h-10 tactical-badge bg-[#FF4655]/20 flex items-center justify-center border border-[#FF4655]/40">
              <span className="text-[#FF4655] font-bold text-xl glow-red">V</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#ECE8E1] uppercase tracking-[0.2em]">ValoCoach</h1>
              <p className="text-xs text-[#8892A0] uppercase tracking-widest">Tactical Dashboard</p>
            </div>
          </motion.div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8 relative z-10">
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
      <footer className="border-t border-[#FF4655]/20 py-6 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-[#8892A0] uppercase tracking-[0.2em]">
            ValoCoach // {player.matches.length} Matches Analyzed // Intel Ready
          </p>
        </div>
      </footer>
    </div>
  );
}