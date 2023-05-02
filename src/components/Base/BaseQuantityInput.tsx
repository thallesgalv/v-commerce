import { cn } from '@/utils/cn'
import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  extraClass?: string
}

export function BaseQuantityInput({
  value,
  onChange,
  disabled,
  extraClass,
  ...rest
}: Props) {
  return (
    <input
      value={value}
      onChange={onChange}
      className={cn(
        'rounded border border-purple-500 p-2 focus:outline-none text-center',
        disabled && 'bg-slate-500 opacity-50 border-none text-white',
        extraClass
      )}
      type="number"
      min={1}
      disabled={disabled}
      {...rest}
    />
  )
}
