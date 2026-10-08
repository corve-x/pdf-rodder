import { useRef, useState } from "react";
import type { DragEvent } from "react";
import { Upload } from "lucide-react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { formatAccepted } from "@/utils/file";
import type { FileProblem } from "@/utils/file";

interface DropZoneProps {
  accept: string[];
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  heading: string;
  mobileHeading: string;
  buttonLabel: string;
  problems?: FileProblem[];
}

export function DropZone({
  accept,
  multiple,
  onFiles,
  heading,
  mobileHeading,
  buttonLabel,
  problems = [],
}: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) onFiles(files);
  }

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null))
            setDragging(false);
        }}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center rounded-card border-2 border-dashed px-6 py-12 text-center transition-colors duration-150 sm:py-16",
          dragging
            ? "border-orange bg-surface-raised"
            : "border-border-strong bg-surface hover:border-text-muted",
        )}
      >
        <Upload className="h-8 w-8 text-text-muted" aria-hidden="true" />
        <p className="mt-4 text-lg font-medium text-text">
          <span className="hidden sm:inline">{heading}</span>
          <span className="sm:hidden">{mobileHeading}</span>
        </p>
        <p className="mt-1 hidden text-sm text-text-muted sm:block">or</p>
        <Button
          size="lg"
          className="mt-4 sm:mt-3"
          onClick={() => inputRef.current?.click()}
        >
          {buttonLabel}
        </Button>
        <p className="mt-5 text-sm text-text-muted">
          Supported: {formatAccepted(accept)}
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept.map((ext) => `.${ext}`).join(",")}
          className="sr-only"
          tabIndex={-1}
          aria-label={multiple ? "Choose files" : "Choose a file"}
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []);
            if (files.length > 0) onFiles(files);
            e.target.value = ""; // lets the same file be picked again
          }}
        />
      </div>
      <ProblemList problems={problems} />
    </div>
  );
}

export function ProblemList({ problems }: { problems: FileProblem[] }) {
  if (problems.length === 0) return null;
  const shown = problems.slice(0, 3);
  const hidden = problems.length - shown.length;
  return (
    <div className="mt-3 space-y-2">
      {shown.map((problem, i) => (
        <Alert key={i} title={problem.title}>
          {problem.message}
        </Alert>
      ))}
      {hidden > 0 && (
        <p className="text-sm text-text-muted">
          …and {hidden} more file{hidden === 1 ? "" : "s"} could not be added.
        </p>
      )}
    </div>
  );
}
