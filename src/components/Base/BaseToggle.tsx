import { cn } from '@/utils/cn'
import { useState } from 'react'

export function BaseToggle() {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={cn(
          'flex h-5 w-12 cursor-pointer items-center rounded-full p-1',
          isActive ? 'bg-purple-500' : 'bg-gray-300'
        )}
        onClick={() => {
          setIsActive(!isActive)
        }}
      >
        <div
          className={cn(
            'bg-white h-4 w-4 rounded-full shadow-md transform duration-300 ease-in-out',
            isActive && 'transform translate-x-6'
          )}
        ></div>
      </div>
    </div>
  )
}
