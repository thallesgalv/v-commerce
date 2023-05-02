import { useUserContext } from '@/contexts/UserContext'
import { Product } from '@/interfaces/Product'
import { BaseIcon } from './Base/BaseIcon'

interface Props {
  productData: Product
}

export function WishlistToggleButtonComponent({ productData }: Props) {
  const { id } = productData

  const { toggleInWishlist, productIsInWishlist } = useUserContext()
  const isInWishlist = productIsInWishlist(id)

  function handleClick() {
    toggleInWishlist(productData)
  }

  return (
    <span className="cursor-pointer text-purple-500" onClick={handleClick}>
      {isInWishlist ? (
        <BaseIcon icon="mdi:cards-heart" />
      ) : (
        <BaseIcon icon="mdi:cards-heart-outline" />
      )}
    </span>
  )
}
