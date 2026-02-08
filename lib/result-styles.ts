import type { Match } from "@/types/player";

/** CSS classes for result badge (modal, tactical-badge) */
export const RESULT_BADGE_CLASSES: Record<Match["result"], string> = {
  Won: "result-won",
  Lost: "result-lost",
  Draw: "result-draw",
};

/** CSS classes for result text only (e.g. match card badge) */
export const RESULT_TEXT_CLASSES: Record<Match["result"], string> = {
  Won: "text-valorant-teal",
  Lost: "text-valorant-red",
  Draw: "text-valorant-yellow",
};
