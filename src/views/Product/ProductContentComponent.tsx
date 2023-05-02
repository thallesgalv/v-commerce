import { DiscountLabelComponent } from '@/components/DiscountLabelComponent'
import { RatingComponent } from '@/components/ShelfItem/RatingComponent'
import { Product } from '@/interfaces/Product'
import { formatCurrency } from '@/utils/formatCurrency'
import { getPriceBeforeDiscount } from '@/utils/getPriceBeforeDiscount'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ProductActionsComponent } from './ProductActionsComponent'

interface Props {
  productData: Product
}

export function ProductContentComponent({ productData }: Props) {
  const {
    brand,
    rating,
    title,
    description,
    discountPercentage,
    price,
    stock
  } = productData

  const formatedPrice = formatCurrency(price)
  const priceBeforeDiscount = getPriceBeforeDiscount(price, discountPercentage)
  const formatedPriceBeforeDiscount = formatCurrency(priceBeforeDiscount)

  const router = useRouter()
  function handleClick() {
    router.back()
  }

  return (
    <div className="flex flex-col gap-2">
      <Link
        href="/"
        passHref
        className="self-end rounded bg-purple-200 px-2 py-1 text-sm text-purple-500"
      >
        <button onClick={handleClick}>Voltar</button>
      </Link>
      <div className="flex justify-between">
        <span className="uppercase text-gray-500">{brand}</span>
        <RatingComponent rating={rating || 0} />
      </div>

      <h1 className="text-6xl font-bold">{title}</h1>
      <p>{description}</p>
      <s className="text-xs text-gray-500">{formatedPriceBeforeDiscount}</s>
      <div className="flex items-center gap-2">
        <strong className="text-4xl font-bold">{formatedPrice}</strong>
        <DiscountLabelComponent discountPercentage={discountPercentage} />
      </div>
      <span>Estoque: {stock}</span>
      <ProductActionsComponent productData={productData} />
    </div>
  )
}
