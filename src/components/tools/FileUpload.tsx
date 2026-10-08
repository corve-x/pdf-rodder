import { useState } from "react";
import { DropZone } from "@/components/tools/DropZone";
import { validateFile } from "@/utils/file";
import type { FileProblem } from "@/utils/file";

interface FileUploadProps {
  accept: string[];
  onFile: (file: File) => void;
}

/** Single-file upload used by Convert into PDF. */
export function FileUpload({ accept, onFile }: FileUploadProps) {
  const [problems, setProblems] = useState<FileProblem[]>([]);

  function handleFiles(files: File[]) {
    if (files.length > 1) {
      setProblems([
        {
          title: "One file at a time",
          message:
            "Convert into PDF works on a single file. To combine several files, use Merge into PDF.",
        },
      ]);
      return;
    }
    const problem = validateFile(files[0], accept);
    setProblems(problem ? [problem] : []);
    if (!problem) onFile(files[0]);
  }

  return (
    <DropZone
      accept={accept}
      onFiles={handleFiles}
      heading="Drag & drop your file here"
      mobileHeading="Select a file to convert"
      buttonLabel="Choose File"
      problems={problems}
    />
  );
}
