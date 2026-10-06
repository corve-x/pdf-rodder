import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/ui/PageHeader";

interface ToolHeaderProps {
  title: string;
  tagline: string;
  children?: ReactNode;
}

export function ToolHeader({ title, tagline, children }: ToolHeaderProps) {
  return (
    <div className="space-y-4">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 rounded-control text-sm text-text-secondary transition-colors duration-150 hover:text-text"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All tools
      </Link>
      <PageHeader title={title} description={tagline} />
      {children}
    </div>
  );
}
