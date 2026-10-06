import type { DragEvent } from "react";
import { ChevronDown, ChevronUp, GripVertical, X } from "lucide-react";
import { fileIcon } from "@/components/tools/fileIcon";
import { cn } from "@/utils/cn";
import { formatFileSize } from "@/utils/file";

interface FileListItemProps {
  file: File;
  index: number;
  total: number;
  /** Highlights the row when the backend reported this file as unprocessable. */
  hasError?: boolean;
  /** Hides all controls (while merging). */
  readOnly?: boolean;
  dragging?: boolean;
  dropTarget?: boolean;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  dragProps?: {
    draggable: boolean;
    onDragStart: (e: DragEvent<HTMLLIElement>) => void;
    onDragOver: (e: DragEvent<HTMLLIElement>) => void;
    onDrop: (e: DragEvent<HTMLLIElement>) => void;
    onDragEnd: () => void;
  };
}

const iconButton =
  "flex h-9 w-9 items-center justify-center rounded-control text-text-secondary transition-colors duration-150 hover:bg-surface-hover hover:text-text disabled:pointer-events-none disabled:opacity-30";

export function FileListItem({
  file,
  index,
  total,
  hasError,
  readOnly,
  dragging,
  dropTarget,
  onRemove,
  onMoveUp,
  onMoveDown,
  dragProps,
}: FileListItemProps) {
  const Icon = fileIcon(file.name);

  return (
    <li
      {...(readOnly ? {} : dragProps)}
      className={cn(
        "flex items-center gap-2 bg-surface-raised px-2 py-2 sm:gap-3 sm:px-3",
        dropTarget && "shadow-[inset_0_2px_0_0_#D97732]",
        hasError && "bg-red/10",
        dragging && "opacity-40",
      )}
    >
      {!readOnly && (
        <GripVertical
          className="hidden h-5 w-5 shrink-0 cursor-grab text-text-muted sm:block"
          aria-hidden="true"
        />
      )}
      <span
        className="w-6 shrink-0 text-right text-sm tabular-nums text-text-muted"
        aria-hidden="true"
      >
        {index + 1}.
      </span>
      <Icon
        className={cn(
          "h-5 w-5 shrink-0",
          hasError ? "text-danger" : "text-orange",
        )}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text" title={file.name}>
          {file.name}
        </p>
        <p
          className={cn(
            "text-xs",
            hasError ? "text-danger" : "text-text-muted",
          )}
        >
          {hasError ? "Could not be converted" : formatFileSize(file.size)}
        </p>
      </div>
      {!readOnly && (
        <div className="flex shrink-0 items-center">
          <button
            type="button"
            className={iconButton}
            onClick={onMoveUp}
            disabled={index === 0}
            aria-label={`Move ${file.name} up`}
          >
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={iconButton}
            onClick={onMoveDown}
            disabled={index === total - 1}
            aria-label={`Move ${file.name} down`}
          >
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={iconButton}
            onClick={onRemove}
            aria-label={`Remove ${file.name}`}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </li>
  );
}
