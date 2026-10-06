import type { ConversionResult } from '@/types/conversion'
import { pdfFileName } from '@/utils/file'

/**
 * Service layer for the PDF Rodder backend. This is the only file that talks
 * to the network — nothing here simulates a conversion.
 *
 * The backend does not exist in this repository yet, so the contract below is
 * an ASSUMPTION to build against. Adjust paths and field names to match the
 * real API when it is written:
 *
 *   POST {API_BASE}/convert   multipart field `file`    -> application/pdf
 *   POST {API_BASE}/merge     multipart field `files`   -> application/pdf
 *                             (repeated; parts are in the user's chosen order,
 *                              and the backend must merge in that same order)
 *
 *   Failure with a bad input file: HTTP 415 or 422, optional JSON body
 *   { "file": "presentation.pptx" } naming the file that failed.
 *
 * Until a backend answers, requests fail and the UI shows a friendly
 * "service unavailable" message instead of a fake download.
 *
 * Set VITE_API_BASE_URL to point at the backend (defaults to "/api").
 */
const API_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? '/api'
const REQUEST_TIMEOUT_MS = 5 * 60 * 1000

export interface RequestHooks {
  signal?: AbortSignal
  /** 0–100, from the browser's upload progress. */
  onUploadProgress?: (percent: number) => void
  /** Fires once every byte has been sent and the server is working. */
  onUploadComplete?: () => void
}

/** An error whose title and message are safe to show to users. */
export class PdfApiError extends Error {
  readonly title: string
  readonly fileName?: string

  constructor(title: string, message: string, fileName?: string) {
    super(message)
    this.name = 'PdfApiError'
    this.title = title
    this.fileName = fileName
  }
}

const unavailable = () =>
  new PdfApiError('Service unavailable', "PDF Rodder couldn't reach the conversion service. Please try again in a moment.")
const failed = () => new PdfApiError('Something went wrong', "We couldn't create your PDF. Please try again.")

async function readFailedFileName(body: Blob): Promise<string | undefined> {
  try {
    const parsed: unknown = JSON.parse(await body.text())
    const name = (parsed as { file?: unknown } | null)?.file
    return typeof name === 'string' ? name : undefined
  } catch {
    return undefined
  }
}

function postForPdf(path: string, body: FormData, hooks: RequestHooks = {}): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', `${API_BASE}${path}`)
    xhr.responseType = 'blob'
    xhr.timeout = REQUEST_TIMEOUT_MS

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) hooks.onUploadProgress?.(Math.round((event.loaded / event.total) * 100))
    }
    xhr.upload.onload = () => hooks.onUploadComplete?.()
    xhr.onerror = () => reject(unavailable())
    xhr.ontimeout = () => reject(failed())

    xhr.onload = async () => {
      const response = xhr.response as Blob
      if (xhr.status >= 200 && xhr.status < 300) {
        // Guards against an HTML fallback page or any other non-PDF reply being offered as a download.
        if (response.type.includes('pdf')) resolve(response)
        else reject(failed())
        return
      }
      if (xhr.status === 413) {
        reject(new PdfApiError('File too large', 'One of the files is too large. Please choose smaller files.'))
      } else if (xhr.status === 415 || xhr.status === 422) {
        reject(
          new PdfApiError(
            'Unable to process this file',
            'This file could not be converted. Please try another file.',
            await readFailedFileName(response),
          ),
        )
      } else if (xhr.status === 404 || xhr.status === 502 || xhr.status === 503) {
        reject(unavailable())
      } else {
        reject(failed())
      }
    }

    if (hooks.signal) {
      if (hooks.signal.aborted) {
        reject(new DOMException('Aborted', 'AbortError'))
        return
      }
      hooks.signal.addEventListener('abort', () => {
        xhr.abort()
        reject(new DOMException('Aborted', 'AbortError'))
      })
    }
    xhr.send(body)
  })
}

/** One file in, one PDF out. */
export async function convertToPdf(file: File, hooks?: RequestHooks): Promise<ConversionResult> {
  const body = new FormData()
  body.append('file', file)
  const blob = await postForPdf('/convert', body, hooks)
  return { blob, fileName: pdfFileName(file.name) }
}

/** Many files in (in the order given), one merged PDF out. */
export async function mergeToPdf(files: File[], hooks?: RequestHooks): Promise<ConversionResult> {
  const body = new FormData()
  for (const file of files) body.append('files', file)
  const blob = await postForPdf('/merge', body, hooks)
  return { blob, fileName: 'merged.pdf' }
}
