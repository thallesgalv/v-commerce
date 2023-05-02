import { cn } from '@/utils/cn'
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'

type Variant = 'primary' | 'secondary'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant: Variant
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export function BaseButton({
  children,
  onClick,
  variant,
  disabled,
  ...rest
}: Props) {
  const dynamicClasses = {
    primary: 'bg-purple-500 text-white',
    secondary: 'border text-purple-500 border-purple-500'
  }

  return (
    <button
      onClick={onClick || undefined}
      className={cn(
        'flex h-10 items-center justify-center rounded px-4 font-bold ',
        dynamicClasses[variant],
        disabled && 'bg-slate-500 opacity-50 border-none'
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
