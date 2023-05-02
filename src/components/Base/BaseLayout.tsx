import { BaseHeader } from '@/components/Base/BaseHeader'
import { ReactNode } from 'react'
import { BaseFooter } from './BaseFooter'

interface Props {
  children: ReactNode
}

export function BaseLayout({ children }: Props) {
  return (
    <>
      <BaseHeader />
      <section className="min-h-[calc(100vh_-_8rem)] bg-body px-4 py-6 xl:px-0">
        {children}
      </section>
      <BaseFooter />
    </>
  )
}
