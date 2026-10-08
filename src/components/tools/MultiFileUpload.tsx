import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { DropZone, ProblemList } from "@/components/tools/DropZone";
import { Button } from "@/components/ui/Button";
import { validateBatch } from "@/utils/file";
import type { FileProblem } from "@/utils/file";

interface MultiFileUploadProps {
  accept: string[];
  currentCount: number;
  onFiles: (files: File[]) => void;
  compact?: boolean;
}

/** Multi-file upload used by Merge into PDF. */
export function MultiFileUpload({
  accept,
  currentCount,
  onFiles,
  compact,
}: MultiFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [problems, setProblems] = useState<FileProblem[]>([]);

  function handleFiles(files: File[]) {
    const result = validateBatch(files, accept, currentCount);
    setProblems(result.problems);
    if (result.accepted.length > 0) onFiles(result.accepted);
  }

  if (!compact) {
    return (
      <DropZone
        accept={accept}
        multiple
        onFiles={handleFiles}
        heading="Drag & drop files here"
        mobileHeading="Select files to merge"
        buttonLabel="Choose Files"
        problems={problems}
      />
    );
  }

  return (
    <div>
      <Button
        variant="secondary"
        onClick={() => inputRef.current?.click()}
        leftIcon={<Plus className="h-4 w-4" aria-hidden="true" />}
      >
        Add More Files
      </Button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={accept.map((ext) => `.${ext}`).join(",")}
        className="sr-only"
        tabIndex={-1}
        aria-label="Add more files"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length > 0) handleFiles(files);
          e.target.value = "";
        }}
      />
      <ProblemList problems={problems} />
    </div>
  );
}
