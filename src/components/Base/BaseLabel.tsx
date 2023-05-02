import { cn } from '@/utils/cn'
import { ReactNode } from 'react'

interface Props {
  customStyle: string
  children: ReactNode
}

export function BaseLabel({ customStyle, children }: Props) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded p-1',
        customStyle
      )}
    >
      {children}
    </div>
  )
}
