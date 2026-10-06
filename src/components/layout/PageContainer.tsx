import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface PageContainerProps {
  size?: 'wide' | 'narrow'
  className?: string
  children: ReactNode
}

export function PageContainer({ size = 'wide', className, children }: PageContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-4 sm:px-6', size === 'wide' ? 'max-w-5xl' : 'max-w-3xl', className)}>
      {children}
    </div>
  )
}
