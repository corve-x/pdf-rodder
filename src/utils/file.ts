import { MAX_MERGE_FILES } from '@/data/formats'

// Client-side limit. Keep in sync with the backend once it exists.
export const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024

export interface FileProblem {
  title: string
  message: string
}

export function getExtension(fileName: string): string {
  const dot = fileName.lastIndexOf('.')
  return dot === -1 ? '' : fileName.slice(dot + 1).toLowerCase()
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${Math.round(kb)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

/** "PDF, DOC, DOCX" */
export function formatAccepted(accept: string[]): string {
  return accept.map((ext) => ext.toUpperCase()).join(', ')
}

export function pdfFileName(originalName: string): string {
  const dot = originalName.lastIndexOf('.')
  return `${dot > 0 ? originalName.slice(0, dot) : originalName}.pdf`
}

/** Returns a user-facing problem, or null if the file is fine. */
export function validateFile(file: File, accept: string[]): FileProblem | null {
  if (!accept.includes(getExtension(file.name))) {
    return {
      title: 'Unsupported file type',
      message: `"${file.name}" can't be added. This file format isn't supported. Please choose one of the supported file types.`,
    }
  }
  if (file.size === 0) {
    return { title: 'Empty file', message: `"${file.name}" is empty. Please choose a file that has content.` }
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      title: 'File too large',
      message: `"${file.name}" is ${formatFileSize(file.size)}. The maximum size is ${formatFileSize(MAX_FILE_SIZE_BYTES)}.`,
    }
  }
  return null
}

/** Validates a batch for the merge tool, respecting the total file limit. */
export function validateBatch(
  files: File[],
  accept: string[],
  existingCount: number,
): { accepted: File[]; problems: FileProblem[] } {
  const accepted: File[] = []
  const problems: FileProblem[] = []
  let overLimit = false

  for (const file of files) {
    const problem = validateFile(file, accept)
    if (problem) {
      problems.push(problem)
    } else if (existingCount + accepted.length >= MAX_MERGE_FILES) {
      overLimit = true
    } else {
      accepted.push(file)
    }
  }
  if (overLimit) {
    problems.push({ title: 'Too many files', message: `You can merge up to ${MAX_MERGE_FILES} files at a time.` })
  }
  return { accepted, problems }
}
