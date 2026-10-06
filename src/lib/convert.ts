import type { ConversionResult } from "@/types/conversion";
import type { ToolDefinition } from "@/types/tool";

const API_URL = import.meta.env.VITE_API_URL;

function pdfFileName(originalName: string): string {
  const dot = originalName.lastIndexOf(".");
  return `${dot > 0 ? originalName.slice(0, dot) : originalName}.pdf`;
}

/**
 * Converts a file using the PDF Rodder backend.
 */
export async function convertFile(
  file: File,
  _tool: ToolDefinition,
  onProgress: (percent: number) => void,
): Promise<ConversionResult> {
  if (!API_URL) {
    throw new Error("Backend API URL is not configured.");
  }

  onProgress(10);

  const body = new FormData();
  body.append("file", file);

  onProgress(20);

  const response = await fetch(`${API_URL}/api/convert`, {
    method: "POST",
    body,
  });

  onProgress(80);

  if (!response.ok) {
    let message = "The conversion failed. Please try again.";

    try {
      const data = await response.json();

      if (typeof data?.detail?.message === "string") {
        message = data.detail.message;
      } else if (typeof data?.detail === "string") {
        message = data.detail;
      }
    } catch {
      // Keep the default error message.
    }

    throw new Error(message);
  }

  const blob = await response.blob();

  onProgress(100);

  return {
    blob,
    fileName: pdfFileName(file.name),
  };
}
