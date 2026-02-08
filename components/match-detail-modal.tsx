"use client";

import { Match } from "@/types/player";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SectionHeading } from "@/components/section-heading";
import { RESULT_BADGE_CLASSES } from "@/lib/result-styles";

interface MatchDetailModalProps {
  match: Match | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function StatCard({
  value,
  label,
  valueClassName = "text-[#ECE8E1]",
  compact = false,
}: {
  value: React.ReactNode;
  label: string;
  valueClassName?: string;
  compact?: boolean;
}) {
  return (
    <div className={`text-center glass-card rounded-lg ${compact ? "p-3" : "p-4"}`}>
      <p className={`font-bold tabular-nums ${compact ? "text-2xl" : "text-3xl"} ${valueClassName}`}>
        {value}
      </p>
      <p className="text-xs text-[#8892A0] uppercase tracking-widest mt-1">{label}</p>
    </div>
  );
}

function ShotBreakdownRow({
  label,
  count,
  pct,
  barClassName,
  valueClassName,
}: {
  label: string;
  count: number;
  pct: string;
  barClassName: string;
  valueClassName: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-[#ECE8E1] uppercase tracking-wide w-24">{label}</span>
      <div className="flex-1 h-3 bg-valorant-navy rounded-full overflow-hidden w-full">
        <div
          className={`h-full bg-linear-to-r rounded-full ${barClassName}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`text-sm font-bold w-24 text-right tabular-nums ${valueClassName}`}>
        {count} ({pct}%)
      </span>
    </div>
  );
}

function DamageReportRow({
  type,
  amount,
  textColor = "",
}: {
  type: "dealt" | "recieved" | "delta";
  amount: number;
  textColor?: string;
}) {
  return (
    <div className="glass-card p-4 text-center rounded-lg flex flex-col items-center justify-between gap-1">
      <span className={`text-center text-xl md:text-2xl font-bold tabular-nums ${textColor}`}>{amount}</span>
      <span className="text-xs text-[#8892A0] uppercase tracking-wide">{type}</span>
    </div>
  );
}

export function MatchDetailModal({ match, open, onOpenChange }: MatchDetailModalProps) {
  if (!match) return null;

  const kdColor = match.kd_ratio >= 1 ? "text-[#00D4AA]" : "text-valorant-red";

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
  const damageColor = damageDiff >= 0 ? "text-[#00D4AA]" : "text-valorant-red";

  const shotBreakdownContent = [
    {
      label: "Head",
      count: match.headshots,
      pct: headshotPct,
      barClassName: "from-valorant-teal to-valorant-teal/70",
      valueClassName: "text-valorant-teal",
    },
    {
      label: "Body",
      count: match.bodyshots,
      pct: bodyshotPct,
      barClassName: "from-[#8892A0] to-[#8892A0]/70",
      valueClassName: "text-[#8892A0]",
    },
    {
      label: "Legs",
      count: match.legshots,
      pct: legshotPct,
      barClassName: "from-valorant-red to-valorant-red/70",
      valueClassName: "text-valorant-red",
    },
  ];

  const damageReportContent = [
    {
      type: "dealt",
      amount: match.damage_made,
      textColor: "text-valorant-teal",
    },
    {
      type: "recieved",
      amount: match.damage_received,
      textColor: "text-valorant-red",
    },
    {
      type: "delta",
      amount: damageDiff,
      textColor: damageColor,
    },
  ];

  const combatStatsContent = [
    { value: match.ACS, label: "ACS" },
    { value: match.kd_ratio.toFixed(2), label: "K/D", valueClassName: kdColor },
    { value: `${match.headshot_percentage.toFixed(0)}%`, label: "HS%" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-valorant-dark border border-valorant-red/30 backdrop-blur-xl">
        <div
        >
          <DialogHeader className="space-y-3">
            {/* Result Badge + Map & Agent */}
            <div className="flex items-center gap-4">
              <div className={`tactical-badge px-5 py-2 font-bold uppercase tracking-wider text-lg ${RESULT_BADGE_CLASSES[match.result]}`}>
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
              <SectionHeading title="Combat Stats" variant="subsection" />
              <div className="grid grid-cols-3 gap-3">
                {combatStatsContent.map((item) => (
                  <StatCard
                    key={item.label}
                    value={item.value}
                    label={item.label}
                    valueClassName={item.valueClassName}
                  />
                ))}
              </div>
              <div className="mt-4">
                <StatCard
                  value={`${match.kills} / ${match.deaths} / ${match.assists}`}
                  label="Kills / Deaths / Assists"
                  compact
                />
              </div>
            </div>

            {/* Shot Breakdown */}
            <div>
              <SectionHeading title="Shot Breakdown" variant="subsection" />
              <div className="space-y-3">
                {shotBreakdownContent.map((item) => (
                  <ShotBreakdownRow
                    key={item.label}
                    label={item.label}
                    count={item.count}
                    pct={item.pct}
                    barClassName={item.barClassName}
                    valueClassName={item.valueClassName}
                  />
                ))}
              </div>
            </div>

            {/* Damage Stats */}
            <div>
              <SectionHeading title="Damage Report" variant="subsection" />
              <div className="grid grid-cols-3 gap-3">
                {damageReportContent.map((item) => (
                  <DamageReportRow
                    key={item.type}
                    type={item.type as "dealt" | "recieved" | "delta"}
                    amount={item.amount}
                    textColor={item.textColor}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
