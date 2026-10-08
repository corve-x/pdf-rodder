import { ProgressBar } from "@/components/ui/ProgressBar";
import { Spinner } from "@/components/ui/Spinner";
import type { JobStage } from "@/hooks/usePdfJob";

interface ConversionProgressProps {
  stage: JobStage;
  progress: number;
  processingLabel: string;
}

export function ConversionProgress({
  stage,
  progress,
  processingLabel,
}: ConversionProgressProps) {
  const message =
    stage === "preparing" ? "Preparing your files…" : processingLabel;
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <Spinner />
        {message}
      </div>
      {stage === "preparing" && (
        <ProgressBar value={progress} label="Upload progress" />
      )}
    </div>
  );
}
