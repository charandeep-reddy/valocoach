import { type ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  /** "section" = page-level (e.g. Match History); "subsection" = modal/small (e.g. Combat Stats) */
  variant?: "section" | "subsection";
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({
  title,
  variant = "section",
  className = "",
  children,
}: SectionHeadingProps) {
  if (variant === "subsection") {
    return (
      <h3
        className={`text-xs font-bold text-valorant-red uppercase tracking-[0.3em] mb-4 flex items-center gap-2 ${className}`}
      >
        <div className="w-2 h-2 bg-valorant-red" />
        {title}
      </h3>
    );
  }
  return (
    <h2
      className={`text-lg font-bold text-[#ECE8E1] flex items-center gap-3 tactical-heading ${className}`}
    >
      <div className="w-1 h-6 bg-valorant-red" />
      {title}
      {children}
    </h2>
  );
}
