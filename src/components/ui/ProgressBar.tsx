import { cn } from "@/utils/cn";

interface ProgressBarProps {
  value: number;
  label?: string;
  className?: string;
}

export function ProgressBar({
  value,
  label = "Progress",
  className,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="h-2 flex-1 overflow-hidden rounded-full bg-surface-hover"
      >
        <div
          className="h-full rounded-full bg-orange transition-[width] duration-200 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-10 text-right text-sm tabular-nums text-text-secondary">
        {percent}%
      </span>
    </div>
  );
}
