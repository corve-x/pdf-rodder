import { Link } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { MergeWorkspace } from "@/components/tools/MergeWorkspace";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { Badge } from "@/components/ui/Badge";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Merge() {
  usePageTitle("Merge into PDF");

  return (
    <PageContainer size="narrow" className="space-y-6">
      <ToolHeader
        title="Merge into PDF"
        tagline="Combine multiple files into one PDF."
      >
        <p className="max-w-xl leading-relaxed text-text-secondary">
          Upload multiple supported files — including documents, presentations,
          spreadsheets and images and PDF Rodder will convert them and combine
          them into a single PDF.
        </p>
        <Badge tone="orange">Upload multiple files → One PDF</Badge>
      </ToolHeader>
      <MergeWorkspace />
      <p className="text-sm text-text-muted">
        Only have one file?{" "}
        <Link
          to="/convert"
          className="text-text-secondary underline underline-offset-2 transition-colors duration-150 hover:text-text"
        >
          Convert into PDF
        </Link>{" "}
        is the simpler option.
      </p>
    </PageContainer>
  );
}
