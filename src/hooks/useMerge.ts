import { useCallback, useRef, useState } from "react";
import { usePdfJob } from "@/hooks/usePdfJob";
import { mergeToPdf } from "@/lib/api/pdf";
import type { FileEntry } from "@/types/conversion";

/** Upload several files → order them → merge → download. The list order IS the merge order. */
export function useMerge() {
  const job = usePdfJob();
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const nextId = useRef(0);
  const { start, reset, clearError } = job;

  const addFiles = useCallback(
    (files: File[]) => {
      clearError();
      setEntries((list) => [
        ...list,
        ...files.map((file) => ({ id: nextId.current++, file })),
      ]);
    },
    [clearError],
  );

  const removeFile = useCallback(
    (id: number) => {
      clearError();
      setEntries((list) => list.filter((entry) => entry.id !== id));
    },
    [clearError],
  );

  const moveFile = useCallback(
    (from: number, to: number) => {
      clearError();
      setEntries((list) => {
        if (
          from === to ||
          from < 0 ||
          to < 0 ||
          from >= list.length ||
          to >= list.length
        )
          return list;
        const next = [...list];
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        return next;
      });
    },
    [clearError],
  );

  const merge = useCallback(() => {
    const files = entries.map((entry) => entry.file);
    void start((hooks) => mergeToPdf(files, hooks));
  }, [entries, start]);

  const startAgain = useCallback(() => {
    reset();
    setEntries([]);
  }, [reset]);

  return { ...job, entries, addFiles, removeFile, moveFile, merge, startAgain };
}
