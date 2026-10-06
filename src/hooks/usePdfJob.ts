import { useCallback, useEffect, useRef, useState } from 'react'
import { PdfApiError } from '@/lib/api/pdf'
import type { RequestHooks } from '@/lib/api/pdf'
import type { ConversionResult, PdfError } from '@/types/conversion'

export type JobPhase = 'idle' | 'working' | 'done'
/** 'preparing' while files upload, 'processing' once the server is working. */
export type JobStage = 'preparing' | 'processing'

interface JobState {
  phase: JobPhase
  stage: JobStage
  progress: number
  result: ConversionResult | null
  error: PdfError | null
}

const initial: JobState = { phase: 'idle', stage: 'preparing', progress: 0, result: null, error: null }

/** Runs one API request at a time and tracks its progress, result and error. */
export function usePdfJob() {
  const [job, setJob] = useState<JobState>(initial)
  const runId = useRef(0)
  const controller = useRef<AbortController | null>(null)

  const cancel = useCallback(() => {
    runId.current++
    controller.current?.abort()
    controller.current = null
  }, [])

  useEffect(() => cancel, [cancel])

  const start = useCallback(
    async (run: (hooks: RequestHooks) => Promise<ConversionResult>) => {
      cancel()
      const id = runId.current
      const abort = new AbortController()
      controller.current = abort
      const current = () => runId.current === id
      setJob({ ...initial, phase: 'working' })
      try {
        const result = await run({
          signal: abort.signal,
          onUploadProgress: (progress) => current() && setJob((s) => ({ ...s, progress })),
          onUploadComplete: () => current() && setJob((s) => ({ ...s, stage: 'processing', progress: 100 })),
        })
        if (current()) setJob({ ...initial, phase: 'done', progress: 100, result })
      } catch (err) {
        if (!current()) return
        const error: PdfError =
          err instanceof PdfApiError
            ? { title: err.title, message: err.message, fileName: err.fileName }
            : { title: 'Something went wrong', message: "We couldn't create your PDF. Please try again." }
        setJob({ ...initial, error })
      }
    },
    [cancel],
  )

  const reset = useCallback(() => {
    cancel()
    setJob(initial)
  }, [cancel])

  const clearError = useCallback(() => setJob((s) => (s.error ? { ...s, error: null } : s)), [])

  return { ...job, start, reset, clearError }
}
