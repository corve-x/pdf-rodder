import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { getTool } from "@/data/tools";
import { usePageTitle } from "@/hooks/usePageTitle";
import NotFound from "@/pages/NotFound";

export default function ToolPage() {
  const { slug } = useParams();
  const tool = getTool(slug);
  usePageTitle(tool?.title);

  if (!tool) return <NotFound />;

  return (
    <PageContainer size="narrow" className="space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 rounded-control text-sm text-text-secondary transition-colors duration-150 hover:text-text"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All tools
      </Link>
      <PageHeader title={tool.title} description={tool.description} />
      {/* key resets the upload state when switching between tools */}
    </PageContainer>
  );
}
