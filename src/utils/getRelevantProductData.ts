import { Product } from '@/interfaces/Product'
import { getPriceBeforeDiscount } from './getPriceBeforeDiscount'

export function getRelevantProductData(product: Product) {
  const { id, title, price, discountPercentage, thumbnail, stock } = product

  const priceBeforeDiscount = getPriceBeforeDiscount(price, discountPercentage)

  const isStockOver = stock <= 0

  const relevantProductData = {
    id,
    title,
    price,
    discountPercentage,
    thumbnail,
    stock,
    priceBeforeDiscount,
    isStockOver
  }

  return relevantProductData
}
