"use client";

import { useState } from "react";
import { Match, FilterType } from "@/types/player";
import { filterMatches, searchMatches } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MatchCard } from "@/components/match-card";
import { MatchDetailModal } from "@/components/match-detail-modal";

interface MatchHistoryProps {
  matches: Match[];
}

export function MatchHistory({ matches }: MatchHistoryProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredMatches = searchMatches(filterMatches(matches, filter), searchQuery);

  const filterButtons: { label: string; value: FilterType; count: number }[] = [
    { label: "All", value: "all", count: matches.length },
    { label: "Won", value: "won", count: matches.filter(m => m.result === "Won").length },
    { label: "Lost", value: "lost", count: matches.filter(m => m.result === "Lost").length },
  ];

  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match);
    setModalOpen(true);
  };

  return (
    <div className="space-y-4">
      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <div className="w-1 h-5 bg-primary rounded-full" />
          Match History
          <span className="text-sm font-normal text-muted-foreground">
            ({filteredMatches.length} matches)
          </span>
        </h2>

        <div className="flex items-center gap-2">
          {filterButtons.map((btn) => (
            <Button
              key={btn.value}
              variant={filter === btn.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(btn.value)}
              className="transition-all duration-200"
            >
              {btn.label}
              <span className="ml-1.5 text-xs opacity-70">({btn.count})</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Search */}
      <Input
        placeholder="Search by agent or map..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-md bg-card/50"
      />

      {/* Match List */}
      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
        {filteredMatches.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No matches found
          </div>
        ) : (
          filteredMatches.map((match) => (
            <MatchCard 
              key={match.match_id} 
              match={match} 
              onClick={() => handleMatchClick(match)}
            />
          ))
        )}
      </div>

      {/* Match Detail Modal */}
      <MatchDetailModal
        match={selectedMatch}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
