import { useCartContext } from '@/contexts/CartContext'
import { Product } from '@/interfaces/Product'
import { cn } from '@/utils/cn'
import { formatCurrency } from '@/utils/formatCurrency'
import { getPriceBeforeDiscount } from '@/utils/getPriceBeforeDiscount'
import { getRelevantProductData } from '@/utils/getRelevantProductData'
import Image from 'next/image'
import Link from 'next/link'
import { BaseButton } from '../Base/BaseButon'
import { DiscountLabelComponent } from '../DiscountLabelComponent'
import { WishlistToggleButtonComponent } from '../WishlistToggleButtonComponent'
import { RatingComponent } from './RatingComponent'

interface Props {
  productData: Product
}

export function ShelfItemComponent({ productData }: Props) {
  const {
    id,
    title,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    thumbnail,
    description
  } = productData

  const formatedPrice = formatCurrency(price)
  const priceBeforeDiscount = getPriceBeforeDiscount(price, discountPercentage)
  const formatedPriceBeforeDiscount = formatCurrency(priceBeforeDiscount)

  const { addToCart } = useCartContext()

  const relevantProductData = getRelevantProductData(productData)
  const { isStockOver } = relevantProductData

  return (
    <div
      className={cn(
        'h-full flex xl:min-h-[404px] md:min-h-[428px]  flex-col justify-between gap-2 rounded-sm bg-white p-6 shadow-md',
        isStockOver && 'opacity-40'
      )}
    >
      <div className="flex justify-between">
        <RatingComponent rating={rating || 0} />
        <WishlistToggleButtonComponent productData={productData} />
      </div>

      <div className="relative my-4 h-20">
        <Image
          src={thumbnail}
          alt={description || ''}
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          className="object-contain"
        />
      </div>

      <span className="text-xs uppercase text-gray-500">{brand}</span>
      <span className="font-bold">{title}</span>

      {discountPercentage ? (
        <div className="flex flex-col gap-1">
          <s className="text-xs text-gray-500">{formatedPriceBeforeDiscount}</s>
          <div className="flex items-center gap-2">
            <strong>{formatedPrice}</strong>
            <DiscountLabelComponent discountPercentage={discountPercentage} />
          </div>
        </div>
      ) : (
        <span className="font-bold">{formatedPrice}</span>
      )}

      <span className="text-sm">Estoque: {stock}</span>

      <Link href={`/products/${id}`} className=" font-bold text-purple-500">
        Ver mais
      </Link>

      <BaseButton
        variant="primary"
        onClick={() => addToCart(relevantProductData, 1)}
        disabled={isStockOver}
      >
        Adicionar ao carrinho
      </BaseButton>
    </div>
  )
}
