import { X } from "lucide-react";
import { fileIcon } from "@/components/tools/fileIcon";
import { Button } from "@/components/ui/Button";
import { formatFileSize } from "@/utils/file";

interface FilePreviewProps {
  file: File;
  /** Omit to hide the remove button (while converting). */
  onRemove?: () => void;
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  const Icon = fileIcon(file.name);

  return (
    <div className="flex items-center gap-3 rounded-control border border-border bg-surface-raised p-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-surface-hover">
        <Icon className="h-5 w-5 text-orange" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-text" title={file.name}>
          {file.name}
        </p>
        <p className="text-xs text-text-muted">
          File size: {formatFileSize(file.size)}
        </p>
      </div>
      {onRemove && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          aria-label={`Remove ${file.name}`}
          leftIcon={<X className="h-4 w-4" aria-hidden="true" />}
        >
          Remove
        </Button>
      )}
    </div>
  );
}
