import { PageContainer } from "@/components/layout/PageContainer";
import { ToolDifference } from "@/components/tools/ToolDifference";
import { ToolGrid } from "@/components/tools/ToolGrid";
import { PageHeader } from "@/components/ui/PageHeader";
import { tools } from "@/data/tools";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Home() {
  usePageTitle();

  return (
    <PageContainer className="space-y-10">
      <PageHeader
        title="PDF Tools"
        description="Simple tools that helps you convert or combine PDFs"
      />
      <ToolGrid tools={tools} />
      <ToolDifference />
    </PageContainer>
  );
}
