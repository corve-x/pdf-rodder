import { useRef, useState } from "react";
import type { DragEvent } from "react";
import { Upload } from "lucide-react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { formatAccepted, validateFile } from "@/utils/file";
import { cn } from "@/utils/cn";

interface UploadBoxProps {
  /** Accepted extensions, lowercase, without the dot. */
  accept: string[];
  /** Called with a file that passed validation. */
  onFile: (file: File) => void;
}

/** Drag-and-drop area with a file picker. Validates before handing the file up. */
export function UploadBox({ accept, onFile }: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    if (files.length > 1) {
      setError("Please add one file at a time.");
      return;
    }
    const problem = validateFile(files[0], accept);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    onFile(files[0]);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    handleFiles(event.dataTransfer.files);
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
          <span className="hidden sm:inline">Drop your file here</span>
          <span className="sm:hidden">Select a file to convert</span>
        </p>
        <p className="mt-1 hidden text-sm text-text-muted sm:block">or</p>
        <Button
          size="lg"
          className="mt-4 sm:mt-3"
          onClick={() => inputRef.current?.click()}
        >
          Choose file
        </Button>
        <p className="mt-5 text-sm text-text-muted">
          Supported formats: {formatAccepted(accept)}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept.map((ext) => `.${ext}`).join(",")}
          className="sr-only"
          tabIndex={-1}
          aria-label="Choose a file"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = ""; // lets the same file be picked again
          }}
        />
      </div>
      {error && (
        <div className="mt-3">
          <Alert>{error}</Alert>
        </div>
      )}
    </div>
  );
}
