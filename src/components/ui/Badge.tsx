import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export type BadgeTone = "neutral" | "orange" | "red" | "yellow" | "success";

const tones: Record<BadgeTone, string> = {
  neutral: "border-border bg-surface-hover text-text-secondary",
  orange: "border-orange/30 bg-orange/10 text-orange",
  red: "border-red/40 bg-red/10 text-danger",
  yellow: "border-yellow/30 bg-yellow/10 text-yellow",
  success: "border-success/30 bg-success/10 text-success",
};

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}

export function Badge({ tone = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
