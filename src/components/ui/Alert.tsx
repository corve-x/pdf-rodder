import type { ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface AlertProps {
  title?: string;
  children?: ReactNode;
}

export function Alert({ title, children }: AlertProps) {
  return (
    <div
      role="alert"
      className="flex items-start gap-2.5 rounded-control border border-red/50 bg-red/10 px-3.5 py-3 text-sm text-danger"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div className="min-w-0 break-words">
        {title && <p className="font-medium">{title}</p>}
        {children && (
          <div className={title ? "mt-0.5" : undefined}>{children}</div>
        )}
      </div>
    </div>
  );
}
