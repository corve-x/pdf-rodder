import type { LucideIcon } from 'lucide-react'

export interface ToolDefinition {
  slug: 'convert' | 'merge'
  path: string
  title: string
  description: string
  /** Short extra line shown on the home page card. */
  highlight?: string
  icon: LucideIcon
  /** Accepted file extensions, lowercase, without the dot. */
  accept: string[]
}
