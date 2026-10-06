import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn('h-5 w-5 text-orange motion-safe:animate-spin', className)} aria-hidden="true" />
}
