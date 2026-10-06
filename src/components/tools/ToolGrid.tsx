import { ToolCard } from "@/components/tools/ToolCard";
import type { ToolDefinition } from "@/types/tool";

export function ToolGrid({ tools }: { tools: ToolDefinition[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {tools.map((tool) => (
        <li key={tool.slug}>
          <ToolCard tool={tool} />
        </li>
      ))}
    </ul>
  );
}
