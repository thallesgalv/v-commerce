import { BaseButton } from '@/components/Base/BaseButon'
import { BaseQuantityInput } from '@/components/Base/BaseQuantityInput'
import { useCartContext } from '@/contexts/CartContext'
import { Product } from '@/interfaces/Product'
import { getRelevantProductData } from '@/utils/getRelevantProductData'
import { ChangeEvent, useState } from 'react'

interface Props {
  productData: Product
}

export function ProductActionsComponent({ productData }: Props) {
  const [quantity, setQuantity] = useState('1')
  const { addToCart } = useCartContext()

  const relevantProductData = getRelevantProductData(productData)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setQuantity(e.target.value)
  }

  function handleAddToCart() {
    if (quantity) addToCart(relevantProductData, quantity)
  }

  return (
    <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
      <BaseButton
        variant="primary"
        onClick={handleAddToCart}
        disabled={relevantProductData.isStockOver}
      >
        Adicionar ao carrinho
      </BaseButton>
      <div className="flex w-20 items-center gap-2">
        <BaseQuantityInput
          value={quantity}
          onChange={handleChange}
          disabled={relevantProductData.isStockOver}
          extraClass="w-20"
        />
        <span>un.</span>
      </div>
    </div>
  )
}
