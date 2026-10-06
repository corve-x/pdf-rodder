import { useCallback, useState } from 'react'
import { usePdfJob } from '@/hooks/usePdfJob'
import { convertToPdf } from '@/lib/api/pdf'

/** Upload one file → convert → download. */
export function useConvert() {
  const job = usePdfJob()
  const [file, setFile] = useState<File | null>(null)
  const { start, reset } = job

  const selectFile = useCallback(
    (next: File) => {
      reset()
      setFile(next)
    },
    [reset],
  )

  const removeFile = useCallback(() => {
    reset()
    setFile(null)
  }, [reset])

  const convert = useCallback(() => {
    if (file) void start((hooks) => convertToPdf(file, hooks))
  }, [file, start])

  return { ...job, file, selectFile, removeFile, convert, startAgain: removeFile }
}
