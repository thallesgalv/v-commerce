import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function BaseContainer({ children }: Props) {
  return (
    <div className="container mx-auto rounded bg-white p-4 md:p-8">
      {children}
    </div>
  )
}
