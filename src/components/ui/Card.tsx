import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export const cardStyles = "rounded-card border border-border bg-surface";

export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(cardStyles, className)} {...rest} />;
}
