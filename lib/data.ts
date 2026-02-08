import { PlayerData, Match, FilterType } from "@/types/player";

export async function getPlayerData(): Promise<PlayerData> {
  const response = await fetch("/data/player.json");
  if (!response.ok) {
    throw new Error("Failed to fetch player data");
  }
  return response.json();
}

export function filterMatches(matches: Match[], filter: FilterType): Match[] {
  if (filter === "all") return matches;
  if (filter === "won") return matches.filter((m) => m.result === "Won");
  if (filter === "lost") return matches.filter((m) => m.result === "Lost");
  return matches;
}

export function searchMatches(
  matches: Match[],
  query: string
): Match[] {
  if (!query.trim()) return matches;
  const lowerQuery = query.toLowerCase();
  return matches.filter(
    (m) =>
      m.agent.toLowerCase().includes(lowerQuery) ||
      m.map.toLowerCase().includes(lowerQuery)
  );
}

export interface MapStats {
  map: string;
  wins: number;
  losses: number;
  total: number;
  winRate: number;
}

export function getMapStats(matches: Match[]): MapStats[] {
  const mapStatsMap = new Map<string, { wins: number; losses: number }>();

  matches.forEach((match) => {
    if (!mapStatsMap.has(match.map)) {
      mapStatsMap.set(match.map, { wins: 0, losses: 0 });
    }
    const stats = mapStatsMap.get(match.map)!;
    if (match.result === "Won") {
      stats.wins++;
    } else if (match.result === "Lost") {
      stats.losses++;
    }
  });

  return Array.from(mapStatsMap.entries())
    .map(([map, stats]) => ({
      map,
      wins: stats.wins,
      losses: stats.losses,
      total: stats.wins + stats.losses,
      winRate: stats.wins + stats.losses > 0 
        ? Math.round((stats.wins / (stats.wins + stats.losses)) * 100)
        : 0,
    }))
    .sort((a, b) => b.winRate - a.winRate);
}
