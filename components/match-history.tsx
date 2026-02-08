"use client";

import { useState } from "react";
  import { motion } from "framer-motion";
import { Match, FilterType } from "@/types/player";
import { filterMatches, searchMatches } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/ui/section-heading";
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
    { label: "Draw", value: "draw", count: matches.filter(m => m.result === "Draw").length },
  ];

  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match);
    setModalOpen(true);
  };

  return (
    <div 
      className="space-y-4"
    >
      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SectionHeading title="Match History">
          <span className="text-sm font-normal text-[#8892A0] normal-case tracking-normal">
            ({filteredMatches.length} matches)
          </span>
        </SectionHeading>

        <div className="flex items-center gap-2">
          {filterButtons.map((btn) => (
            <motion.button
              key={btn.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(btn.value)}
              className={`tactical-btn px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all ${
                filter === btn.value 
                  ? "active text-white" 
                  : "text-[#8892A0] hover:text-[#ECE8E1]"
              }`}
            >
              {btn.label}
              <span className="ml-1.5 text-xs opacity-70">({btn.count})</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Search */}
      <Input
        placeholder="SEARCH BY AGENT OR MAP..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-md glass-card border-valorant-red/20 focus:border-valorant-red/50 text-[#ECE8E1] placeholder:text-[#8892A0] placeholder:uppercase placeholder:tracking-widest placeholder:text-xs"
      />

      {/* Match List */}
      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 tactical-scrollbar">
          {filteredMatches.length === 0 ? (
            <div 
              key="empty"
              className="text-center py-12 text-[#8892A0] uppercase tracking-widest"
            >
              No matches found
            </div>
          ) : (
            filteredMatches.map((match, index) => (
              <MatchCard 
                key={match.match_id} 
                match={match}
                index={index}
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
