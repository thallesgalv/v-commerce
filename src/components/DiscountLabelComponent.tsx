interface Props {
  discountPercentage: number
}

export function DiscountLabelComponent({ discountPercentage }: Props) {
  return (
    <span className="rounded border border-purple-500 p-1 text-xs text-purple-500">
      {Math.round(discountPercentage)}% off
    </span>
  )
}
