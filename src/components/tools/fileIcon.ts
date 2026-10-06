import { File, FileSpreadsheet, FileText, Image, Presentation } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { getExtension } from '@/utils/file'

export function fileIcon(fileName: string): LucideIcon {
  switch (getExtension(fileName)) {
    case 'doc':
    case 'docx':
    case 'txt':
    case 'pdf':
      return FileText
    case 'ppt':
    case 'pptx':
      return Presentation
    case 'xls':
    case 'xlsx':
      return FileSpreadsheet
    case 'jpg':
    case 'jpeg':
    case 'png':
      return Image
    default:
      return File
  }
}
