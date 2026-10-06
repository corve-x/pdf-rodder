import { useCallback, useRef, useState } from 'react'
import { convertFile } from '@/lib/convert'
import type { ConversionResult } from '@/types/conversion'
import type { ToolDefinition } from '@/types/tool'

export type ConversionStatus = 'idle' | 'ready' | 'converting' | 'done' | 'error'

interface State {
  status: ConversionStatus
  file: File | null
  progress: number
  result: ConversionResult | null
  error: string | null
}

const initialState: State = { status: 'idle', file: null, progress: 0, result: null, error: null }

/** The whole upload → convert → download flow for one tool page. */
export function useConversion(tool: ToolDefinition) {
  const [state, setState] = useState<State>(initialState)
  // Ignores results from a conversion the user has already cancelled or reset.
  const runId = useRef(0)

  const selectFile = useCallback((file: File) => {
    runId.current++
    setState({ ...initialState, status: 'ready', file })
  }, [])

  const reset = useCallback(() => {
    runId.current++
    setState(initialState)
  }, [])

  const convert = useCallback(async () => {
    const file = state.file
    if (!file) return
    const id = ++runId.current
    setState((s) => ({ ...s, status: 'converting', progress: 0, error: null }))
    try {
      const result = await convertFile(file, tool, (progress) => {
        if (runId.current === id) setState((s) => ({ ...s, progress }))
      })
      if (runId.current === id) setState((s) => ({ ...s, status: 'done', progress: 100, result }))
    } catch (err) {
      if (runId.current === id) {
        const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
        setState((s) => ({ ...s, status: 'error', error: message }))
      }
    }
  }, [state.file, tool])

  return { ...state, selectFile, reset, convert }
}
