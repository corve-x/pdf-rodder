export interface ConversionResult {
  blob: Blob
  fileName: string
}

/** A message that is safe to show to users (never a raw backend error). */
export interface PdfError {
  title: string
  message: string
  /** Set when the backend says which uploaded file it could not process. */
  fileName?: string
}

export interface FileEntry {
  id: number
  file: File
}
