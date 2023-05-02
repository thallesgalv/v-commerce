import { useCartContext } from '@/contexts/CartContext'
import CartItem from '@/interfaces/CartItem'
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { BaseIcon } from '../Base/BaseIcon'
import { BaseQuantityInput } from '../Base/BaseQuantityInput'
import { RemoveCartItemModal } from './RemoveCartItemModal'
import { UpdateCartItemModal } from './UpdateCartItemModal'

interface Props {
  cartItemData: CartItem
}

export function CartItemComponent({ cartItemData }: Props) {
  const { title, thumbnail, quantity, description, id } = cartItemData
  const [currentQuantity, setCurrentQuantity] = useState(quantity.toString())
  const [isUpdateCartItemModalVisible, setIsUpdateCartItemModalVisible] =
    useState(false)
  const [isRemoveCartItemModalVisible, setIsRemoveCartItemModalVisible] =
    useState(false)

  const { removeFromCart, updateItemQuantityInCart } = useCartContext()

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const updatedQuantity = e.target.value
    setCurrentQuantity(updatedQuantity)
  }

  function handleClickToUpdate() {
    const parsedCurrentQuantity = Number(currentQuantity)
    if (quantity !== parsedCurrentQuantity) {
      setIsUpdateCartItemModalVisible(true)
    } else {
      toast.error(`Você já possui ${quantity} itens deste produto no carrinho`)
    }
  }

  function handleUpdateCart() {
    updateItemQuantityInCart(cartItemData, currentQuantity)
    setIsUpdateCartItemModalVisible(false)
  }

  function handleRemoveFromCart() {
    removeFromCart(id)
    setIsRemoveCartItemModalVisible(false)
  }

  return (
    <>
      <div className="flex w-full flex-col md:flex-row md:justify-between">
        <div className="flex flex-wrap gap-2">
          <Link href={`/products/${id}`}>
            <div
              className="h-16 w-20 bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${thumbnail})` }}
              role={description}
            ></div>
          </Link>

          <div>
            <strong className="text-sm uppercase">{title}</strong>
            <div className="flex w-32 items-center gap-2">
              <span className="text-xs md:text-base">Quantidade:</span>
              <BaseQuantityInput
                value={currentQuantity}
                onChange={handleChange}
                extraClass="w-12 p-0.5"
              />
              <button
                className="rounded bg-purple-500 p-1 font-bold text-white"
                onClick={handleClickToUpdate}
              >
                Atualizar
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsRemoveCartItemModalVisible(true)}
          className="self-end md:self-auto"
        >
          <BaseIcon icon="ic:outline-close" />
        </button>
      </div>
      <UpdateCartItemModal
        visible={isUpdateCartItemModalVisible}
        onClose={() => setIsUpdateCartItemModalVisible(false)}
        onConfirm={handleUpdateCart}
        productTitle={title}
        currentQuantity={currentQuantity}
      />
      <RemoveCartItemModal
        visible={isRemoveCartItemModalVisible}
        onClose={() => setIsRemoveCartItemModalVisible(false)}
        onConfirm={handleRemoveFromCart}
        productTitle={title}
      />
    </>
  )
}
