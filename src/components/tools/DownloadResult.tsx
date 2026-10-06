import { CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ConversionResult } from "@/types/conversion";

interface DownloadResultProps {
  heading: string;
  result: ConversionResult;
  onReset: () => void;
}

export function DownloadResult({
  heading,
  result,
  onReset,
}: DownloadResultProps) {
  function handleDownload() {
    const url = URL.createObjectURL(result.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = result.fileName;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <div className="flex flex-col items-center py-4 text-center motion-safe:animate-fade-in">
      <CheckCircle2 className="h-10 w-10 text-success" aria-hidden="true" />
      <h2 className="mt-4 text-xl font-semibold text-text">{heading}</h2>
      <p
        className="mt-1 max-w-full truncate text-sm text-text-muted"
        title={result.fileName}
      >
        {result.fileName}
      </p>
      <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Button
          size="lg"
          onClick={handleDownload}
          leftIcon={<Download className="h-5 w-5" aria-hidden="true" />}
        >
          Download PDF
        </Button>
        <Button size="lg" variant="secondary" onClick={onReset}>
          Start Again
        </Button>
      </div>
    </div>
  );
}
