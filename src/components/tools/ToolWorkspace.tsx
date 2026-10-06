import { FilePreview } from "@/components/tools/FilePreview";
import { ConversionProgress } from "@/components/tools/ConversionProgress";
import { DownloadResult } from "@/components/tools/DownloadResult";
import { UploadBox } from "@/components/tools/UploadBox";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useConversion } from "@/hooks/useConversion";
import type { ToolDefinition } from "@/types/tool";

const announcements: Partial<Record<string, string>> = {
  converting: "Converting your file",
  done: "Conversion complete",
  error: "Conversion failed",
};

/** The upload → convert → download card shared by every tool page. */
export function ToolWorkspace({ tool }: { tool: ToolDefinition }) {
  const { status, file, progress, result, error, selectFile, reset, convert } =
    useConversion(tool);

  const statusMessage = announcements[status] ?? "";

  // The empty state is the dashed upload area on its own; later states sit in a card.
  if (status === "idle") {
    return <UploadBox accept={tool.accept} onFile={selectFile} />;
  }

  return (
    <Card className="p-5 sm:p-8">
      <p role="status" className="sr-only">
        {statusMessage}
      </p>

      {status === "ready" && file && (
        <div className="space-y-5">
          <FilePreview file={file} onRemove={reset} />
          <Button size="lg" fullWidth onClick={convert}>
            Convert to PDF
          </Button>
        </div>
      )}

      {status === "converting" && file && (
        <div className="space-y-5">
          <FilePreview file={file} />
          <ConversionProgress progress={progress} />
        </div>
      )}

      {status === "error" && file && (
        <div className="space-y-5">
          <Alert>{error}</Alert>
          <FilePreview file={file} onRemove={reset} />
          <Button size="lg" fullWidth onClick={convert}>
            Try again
          </Button>
        </div>
      )}

      {status === "done" && result && (
        <DownloadResult result={result} onReset={reset} />
      )}
    </Card>
  );
}
