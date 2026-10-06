import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cardStyles } from "@/components/ui/Card";
import type { ToolDefinition } from "@/types/tool";
import { cn } from "@/utils/cn";

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  const Icon = tool.icon;

  return (
    <Link
      to={tool.path}
      className={cn(
        cardStyles,
        "group flex h-full flex-col p-5 transition duration-150 hover:-translate-y-0.5 hover:border-orange/60 motion-reduce:hover:translate-y-0 sm:p-6",
      )}
    >
      <Icon
        className="h-6 w-6 text-text-secondary transition-colors duration-150 group-hover:text-orange"
        aria-hidden="true"
      />
      <h2 className="mt-4 text-lg font-semibold text-text">{tool.title}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
        {tool.description}
      </p>
      {tool.highlight && (
        <p className="mt-2 text-sm font-medium text-orange">{tool.highlight}</p>
      )}
      <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-text-secondary transition-colors duration-150 group-hover:text-orange">
        Open Tool
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>
  );
}
