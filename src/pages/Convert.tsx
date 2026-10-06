import { Link } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { ConvertWorkspace } from "@/components/tools/ConvertWorkspace";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { Badge } from "@/components/ui/Badge";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Convert() {
  usePageTitle("Convert into PDF");

  return (
    <PageContainer size="narrow" className="space-y-6">
      <ToolHeader
        title="Convert into PDF"
        tagline="Convert your files into PDF with no hassle."
      >
        <Badge tone="orange">Upload one file → One PDF</Badge>
      </ToolHeader>
      <ConvertWorkspace />
      <p className="text-sm text-text-muted">
        Have several files?{" "}
        <Link
          to="/merge"
          className="text-text-secondary underline underline-offset-2 transition-colors duration-150 hover:text-text"
        >
          Merge into PDF
        </Link>{" "}
        combines them into one.
      </p>
    </PageContainer>
  );
}
