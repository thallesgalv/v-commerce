import { BaseButton } from '@/components/Base/BaseButon'
import { BaseContainer } from '@/components/Base/BaseContainer'
import Link from 'next/link'

export function EmptyCartView() {
  return (
    <BaseContainer>
      <div className="flex flex-col items-center justify-center gap-8 ">
        <p>Não há produtos no carrinho.</p>
        <Link href="/">
          <BaseButton variant="primary">Continue comprando</BaseButton>
        </Link>
      </div>
    </BaseContainer>
  )
}
