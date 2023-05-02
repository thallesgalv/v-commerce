export function getPriceBeforeDiscount(
  currentPrice: number,
  discountPercentage: number
) {
  return currentPrice / (1 - discountPercentage / 100)
}
