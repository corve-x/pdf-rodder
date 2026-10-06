import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ConversionProgress } from "@/components/tools/ConversionProgress";
import { DownloadResult } from "@/components/tools/DownloadResult";
import { FileList } from "@/components/tools/FileList";
// import { MergeExplainer } from "@/components/tools/MergeExplainer";
import { MultiFileUpload } from "@/components/tools/MultiFileUpload";
import {
  MAX_MERGE_FILES,
  MERGE_FORMATS,
  MIN_MERGE_FILES,
} from "@/data/formats";
import { useMerge } from "@/hooks/useMerge";

/** Merge into PDF: many files, in the user's order, into one PDF. */
export function MergeWorkspace() {
  const {
    phase,
    entries,
    stage,
    progress,
    result,
    error,
    addFiles,
    removeFile,
    moveFile,
    merge,
    startAgain,
  } = useMerge();

  // if (entries.length === 0) {
  //   return (
  //     <>
  //       <MultiFileUpload
  //         accept={MERGE_FORMATS}
  //         currentCount={0}
  //         onFiles={addFiles}
  //       />
  //       <MergeExplainer />
  //     </>
  //   );
  // }

  if (entries.length === 0) {
    return (
      <MultiFileUpload
        accept={MERGE_FORMATS}
        currentCount={0}
        onFiles={addFiles}
      />
    );
  }

  const canMerge = entries.length >= MIN_MERGE_FILES;
  const status =
    phase === "working"
      ? "Merging your files"
      : phase === "done"
        ? "Your PDF is ready"
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
          heading="Your PDF is ready"
          result={result}
          onReset={startAgain}
        />
      )}

      {phase !== "done" && (
        <div className="space-y-5">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-base font-semibold text-text">
              Files to merge
            </h2>
            <p className="text-sm text-text-muted">
              {entries.length} of {MAX_MERGE_FILES} files
            </p>
          </div>

          {phase === "idle" && error && (
            <Alert title={error.title}>
              {error.fileName ? (
                <>
                  <span className="font-medium">{error.fileName}</span> —{" "}
                  {error.message} You can remove it from the list and try again.
                </>
              ) : (
                error.message
              )}
            </Alert>
          )}

          <FileList
            entries={entries}
            failedFileName={error?.fileName}
            readOnly={phase === "working"}
            onRemove={removeFile}
            onMove={moveFile}
          />

          {phase === "working" ? (
            <ConversionProgress
              stage={stage}
              progress={progress}
              processingLabel="Converting and merging files…"
            />
          ) : (
            <>
              <p className="text-sm text-text-muted">
                The final PDF follows the order shown above.
              </p>
              <MultiFileUpload
                compact
                accept={MERGE_FORMATS}
                currentCount={entries.length}
                onFiles={addFiles}
              />
              <div className="border-t border-border pt-5">
                <Button
                  size="lg"
                  fullWidth
                  onClick={merge}
                  disabled={!canMerge}
                >
                  {error ? "Try again" : "Merge into PDF"}
                </Button>
                {!canMerge && (
                  <p className="mt-2 text-center text-sm text-text-muted">
                    Add at least {MIN_MERGE_FILES} files to merge.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </Card>
  );
}
