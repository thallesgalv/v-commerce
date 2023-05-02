import { cn } from '@/utils/cn'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  onClick: () => void
}

export function BaseArrowButton({
  children,
  onClick,
  disabled,
  ...rest
}: Props) {
  return (
    <button
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded-full bg-body p-1 text-purple-500 shadow-md',
        disabled && 'bg-slate-500 opacity-50 border-none'
      )}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
