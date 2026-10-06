import type { ConversionResult } from '@/types/conversion'
import type { ToolDefinition } from '@/types/tool'
import { buildPlaceholderPdf } from '@/lib/placeholderPdf'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function pdfFileName(originalName: string): string {
  const dot = originalName.lastIndexOf('.')
  return `${dot > 0 ? originalName.slice(0, dot) : originalName}.pdf`
}

/**
 * Converts a file to PDF. This is the single place to connect the backend.
 *
 * Right now it SIMULATES a conversion (about 2 seconds, then a placeholder PDF).
 * To go live, replace the body with something like:
 *
 *   const body = new FormData()
 *   body.append('file', file)
 *   const response = await fetch(`/api/convert/${tool.slug}`, { method: 'POST', body })
 *   if (!response.ok) throw new Error('The conversion failed. Please try again.')
 *   return { blob: await response.blob(), fileName: pdfFileName(file.name) }
 *
 * (Use XMLHttpRequest instead of fetch if you want real upload progress.)
 */
export async function convertFile(
  file: File,
  tool: ToolDefinition,
  onProgress: (percent: number) => void,
): Promise<ConversionResult> {
  const steps = 20
  for (let i = 1; i <= steps; i++) {
    await sleep(100)
    onProgress(Math.round((i / steps) * 100))
  }
  const blob = buildPlaceholderPdf([
    'PDF Rodder - placeholder output',
    '',
    `Tool: ${tool.title}`,
    `Source file: ${file.name}`,
    '',
    'The conversion backend is not connected yet,',
    'so this file was not actually converted.',
  ])
  return { blob, fileName: pdfFileName(file.name) }
}
