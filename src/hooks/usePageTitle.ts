import { useEffect } from "react";

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title
      ? `${title} — PDF Rodder`
      : "PDF Rodder — Simple PDF tools";
  }, [title]);
}
