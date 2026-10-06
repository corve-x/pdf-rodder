import { FileOutput, Layers } from "lucide-react";
import { CONVERT_FORMATS, MERGE_FORMATS } from "@/data/formats";
import type { ToolDefinition } from "@/types/tool";

export const tools: ToolDefinition[] = [
  {
    slug: "convert",
    path: "/convert",
    title: "Convert into PDF",
    description: "Convert a supported file into PDF.",
    icon: FileOutput,
    accept: CONVERT_FORMATS,
  },
  {
    slug: "merge",
    path: "/merge",
    title: "Merge into PDF",
    description:
      "Convert multiple supported file types into PDF and combine them into a single PDF.",
    highlight: "Supports multiple file types.",
    icon: Layers,
    accept: MERGE_FORMATS,
  },
];

export function getTool(slug: string | undefined): ToolDefinition | undefined {
  return tools.find((tool) => tool.slug === slug);
}
