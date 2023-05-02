import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react'

function BaseInput(
  props: InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      ref={ref}
      className="w-full rounded px-1 py-2 shadow-md focus:outline-none"
      {...props}
    />
  )
}

export default forwardRef(BaseInput)
