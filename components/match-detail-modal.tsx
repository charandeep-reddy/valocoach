"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Match } from "@/types/player";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MatchDetailModalProps {
  match: Match | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MatchDetailModal({ match, open, onOpenChange }: MatchDetailModalProps) {
  if (!match) return null;

  const resultStyles = {
    Won: "result-won",
    Lost: "result-lost",
    Draw: "result-draw",
  };

  const kdColor = match.kd_ratio >= 1 ? "text-[#00D4AA] glow-teal" : "text-[#FF4655] glow-red";

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
  const headshotPct = totalShots > 0 ? ((match.headshots / totalShots) * 100).toFixed(1) : "0";
  const bodyshotPct = totalShots > 0 ? ((match.bodyshots / totalShots) * 100).toFixed(1) : "0";
  const legshotPct = totalShots > 0 ? ((match.legshots / totalShots) * 100).toFixed(1) : "0";

  // Damage difference
  const damageDiff = match.damage_made - match.damage_received;
  const damageColor = damageDiff >= 0 ? "text-[#00D4AA] glow-teal" : "text-[#FF4655] glow-red";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-[#0F1923] border border-[#FF4655]/30 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader className="space-y-3">
            {/* Result Badge + Map & Agent */}
            <div className="flex items-center gap-4">
              <div className={`tactical-badge px-5 py-2 font-bold uppercase tracking-wider text-lg ${resultStyles[match.result]}`}>
                {match.result}
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold uppercase tracking-wide text-[#ECE8E1]">
                  {match.map}
                </DialogTitle>
                <p className="text-[#8892A0] uppercase tracking-widest text-sm">{match.agent}</p>
              </div>
            </div>
            <p className="text-sm text-[#8892A0] uppercase tracking-widest">
              {formattedDate} // {formattedTime} // {match.total_rounds} RDS // {match.team} TEAM
            </p>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Combat Stats */}
            <div>
              <h3 className="text-xs font-bold text-[#FF4655] uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-[#FF4655]" />
                Combat Stats
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <motion.div 
                  className="glass-card p-4 text-center rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-3xl font-bold text-[#ECE8E1] glow-red">{match.ACS}</p>
                  <p className="text-xs text-[#8892A0] uppercase tracking-widest mt-1">ACS</p>
                </motion.div>
                <motion.div 
                  className="glass-card p-4 text-center rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className={`text-3xl font-bold ${kdColor}`}>
                    {match.kd_ratio.toFixed(2)}
                  </p>
                  <p className="text-xs text-[#8892A0] uppercase tracking-widest mt-1">K/D</p>
                </motion.div>
                <motion.div 
                  className="glass-card p-4 text-center rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-3xl font-bold text-[#ECE8E1]">
                    {match.headshot_percentage.toFixed(0)}%
                  </p>
                  <p className="text-xs text-[#8892A0] uppercase tracking-widest mt-1">HS%</p>
                </motion.div>
              </div>
              <div className="mt-4 text-center glass-card p-3 rounded-lg">
                <p className="text-2xl font-bold text-[#ECE8E1] tabular-nums">
                  {match.kills} / {match.deaths} / {match.assists}
                </p>
                <p className="text-xs text-[#8892A0] uppercase tracking-widest">K / D / A</p>
              </div>
            </div>

            {/* Shot Breakdown */}
            <div>
              <h3 className="text-xs font-bold text-[#FF4655] uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-[#FF4655]" />
                Shot Breakdown
              </h3>
              <div className="space-y-3">
                {/* Headshots */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[#ECE8E1] uppercase tracking-wide w-24">Head</span>
                  <div className="flex-1 h-3 bg-[#1A2634] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${headshotPct}%` }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="h-full bg-gradient-to-r from-[#00D4AA] to-[#00D4AA]/70 rounded-full"
                    />
                  </div>
                  <span className="text-sm font-bold text-[#00D4AA] w-24 text-right tabular-nums">
                    {match.headshots} ({headshotPct}%)
                  </span>
                </div>
                {/* Bodyshots */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[#ECE8E1] uppercase tracking-wide w-24">Body</span>
                  <div className="flex-1 h-3 bg-[#1A2634] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${bodyshotPct}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-[#8892A0] to-[#8892A0]/70 rounded-full"
                    />
                  </div>
                  <span className="text-sm font-bold text-[#8892A0] w-24 text-right tabular-nums">
                    {match.bodyshots} ({bodyshotPct}%)
                  </span>
                </div>
                {/* Legshots */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[#ECE8E1] uppercase tracking-wide w-24">Legs</span>
                  <div className="flex-1 h-3 bg-[#1A2634] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${legshotPct}%` }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-[#FF4655] to-[#FF4655]/70 rounded-full"
                    />
                  </div>
                  <span className="text-sm font-bold text-[#FF4655] w-24 text-right tabular-nums">
                    {match.legshots} ({legshotPct}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Damage Stats */}
            <div>
              <h3 className="text-xs font-bold text-[#FF4655] uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-[#FF4655]" />
                Damage Report
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <motion.div 
                  className="glass-card p-4 text-center rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-2xl font-bold text-[#00D4AA] glow-teal tabular-nums">
                    {match.damage_made.toLocaleString()}
                  </p>
                  <p className="text-xs text-[#8892A0] uppercase tracking-widest mt-1">Dealt</p>
                </motion.div>
                <motion.div 
                  className="glass-card p-4 text-center rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-2xl font-bold text-[#FF4655] glow-red tabular-nums">
                    {match.damage_received.toLocaleString()}
                  </p>
                  <p className="text-xs text-[#8892A0] uppercase tracking-widest mt-1">Received</p>
                </motion.div>
                <motion.div 
                  className="glass-card p-4 text-center rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className={`text-2xl font-bold tabular-nums ${damageColor}`}>
                    {damageDiff >= 0 ? "+" : ""}{damageDiff.toLocaleString()}
                  </p>
                  <p className="text-xs text-[#8892A0] uppercase tracking-widest mt-1">Delta</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
