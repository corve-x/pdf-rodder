import { useState } from "react";
import { FileListItem } from "@/components/tools/FileListItem";
import type { FileEntry } from "@/types/conversion";

interface FileListProps {
  entries: FileEntry[];
  failedFileName?: string;
  readOnly?: boolean;
  onRemove: (id: number) => void;
  onMove: (from: number, to: number) => void;
}

export function FileList({
  entries,
  failedFileName,
  readOnly,
  onRemove,
  onMove,
}: FileListProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  function endDrag() {
    setDragIndex(null);
    setOverIndex(null);
  }

  return (
    <ol
      className="divide-y divide-border overflow-hidden rounded-control border border-border"
      aria-label="Files to merge, in merge order"
    >
      {entries.map((entry, index) => (
        <FileListItem
          key={entry.id}
          file={entry.file}
          index={index}
          total={entries.length}
          hasError={
            failedFileName !== undefined && entry.file.name === failedFileName
          }
          readOnly={readOnly}
          dragging={dragIndex === index}
          dropTarget={
            dragIndex !== null && overIndex === index && dragIndex !== index
          }
          onRemove={() => onRemove(entry.id)}
          onMoveUp={() => onMove(index, index - 1)}
          onMoveDown={() => onMove(index, index + 1)}
          dragProps={{
            draggable: true,
            onDragStart: (e) => {
              setDragIndex(index);
              e.dataTransfer.effectAllowed = "move";
              e.dataTransfer.setData("text/plain", String(index)); // Firefox needs data to start a drag
            },
            onDragOver: (e) => {
              if (dragIndex === null) return;
              e.preventDefault();
              setOverIndex(index);
            },
            onDrop: (e) => {
              e.preventDefault();
              if (dragIndex !== null) onMove(dragIndex, index);
              endDrag();
            },
            onDragEnd: endDrag,
          }}
        />
      ))}
    </ol>
  );
}
