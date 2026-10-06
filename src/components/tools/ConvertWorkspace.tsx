import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ConversionProgress } from "@/components/tools/ConversionProgress";
import { DownloadResult } from "@/components/tools/DownloadResult";
import { FilePreview } from "@/components/tools/FilePreview";
import { FileUpload } from "@/components/tools/FileUpload";
import { CONVERT_FORMATS } from "@/data/formats";
import { useConvert } from "@/hooks/useConvert";

// Convert into PDF: one file in, one PDF out.
export function ConvertWorkspace() {
  const {
    phase,
    file,
    stage,
    progress,
    result,
    error,
    selectFile,
    removeFile,
    convert,
    startAgain,
  } = useConvert();

  if (!file) return <FileUpload accept={CONVERT_FORMATS} onFile={selectFile} />;

  const status =
    phase === "working"
      ? "Converting your file"
      : phase === "done"
        ? "Conversion complete"
        : error
          ? error.title
          : "";

  return (
    <Card className="p-5 sm:p-8">
      <p role="status" className="sr-only">
        {status}
      </p>

      {phase === "done" && result && (
        <DownloadResult
          heading="Conversion complete"
          result={result}
          onReset={startAgain}
        />
      )}

      {phase === "working" && (
        <div className="space-y-5">
          <FilePreview file={file} />
          <ConversionProgress
            stage={stage}
            progress={progress}
            processingLabel="Converting files…"
          />
        </div>
      )}

      {phase === "idle" && (
        <div className="space-y-5">
          {error && (
            <Alert title={error.title}>
              {error.fileName ? (
                <>
                  <span className="font-medium">{error.fileName}</span> —{" "}
                  {error.message}
                </>
              ) : (
                error.message
              )}
            </Alert>
          )}
          <FilePreview file={file} onRemove={removeFile} />
          <Button size="lg" fullWidth onClick={convert}>
            {error ? "Try again" : "Convert to PDF"}
          </Button>
        </div>
      )}
    </Card>
  );
}
