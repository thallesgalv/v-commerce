import { BaseButton } from '@/components/Base/BaseButon'
import { BaseContainer } from '@/components/Base/BaseContainer'
import { BaseModal } from '@/components/Base/BaseModal'
import { CartItemComponent } from '@/components/CartItem/CartItemComponent'
import { useCartContext } from '@/contexts/CartContext'
import { formatCurrency } from '@/utils/formatCurrency'
import { EmptyCartView } from '@/views/EmptyCartView'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Checkout() {
  const [isEmptyCartModalVisible, setIsEmptyCartModalVisible] = useState(false)

  const { cart, emptyCart } = useCartContext()
  const router = useRouter()

  function handleCloseModal() {
    setIsEmptyCartModalVisible(false)
  }

  function handleEmptyCart() {
    emptyCart()
    toast.success(`Carrinho esvaziado com sucesso`)
    setIsEmptyCartModalVisible(false)
  }

  function handleSuccess() {
    emptyCart()
    router.push('/success')
  }

  if (cart?.length === 0) return <EmptyCartView />

  return (
    <>
      <Head>
        <title>Carrinho | V-commerce</title>
      </Head>
      <BaseContainer>
        <div className="mx-auto md:max-w-sm">
          <ul className="flex flex-col justify-between gap-2">
            {cart?.map((product) => (
              <li key={product.id} className="border-b-2 pb-4">
                <CartItemComponent cartItemData={product} />
              </li>
            ))}
          </ul>
          <p className="mt-2 flex justify-end gap-2">
            Total:{' '}
            <strong>
              {' '}
              {formatCurrency(
                cart?.reduce(
                  (acc, { quantity, price }) => acc + quantity * price,
                  0
                )
              )}
            </strong>
          </p>
          <div className="mt-4 flex flex-col justify-end gap-2 sm:flex-row">
            <BaseButton
              variant="secondary"
              onClick={() => setIsEmptyCartModalVisible(true)}
            >
              Limpar carrinho
            </BaseButton>

            <BaseButton variant="primary" onClick={handleSuccess}>
              Finalizar compra
            </BaseButton>
          </div>
        </div>
      </BaseContainer>

      <BaseModal
        title="Limpar carrinho"
        visible={isEmptyCartModalVisible}
        onClose={handleCloseModal}
        onConfirm={handleEmptyCart}
      >
        <p>Tem certeza que deseja limpar o carrinho?</p>
      </BaseModal>
    </>
  )
}
