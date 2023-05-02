import { BaseArrowButton } from '@/components/Base/BaseArrowButton'
import { BaseIcon } from '@/components/Base/BaseIcon'
import { WishlistToggleButtonComponent } from '@/components/WishlistToggleButtonComponent'
import { ZoomOnHoverComponent } from '@/components/ZoomOnHoverComponent'
import { Product } from '@/interfaces/Product'
import { useState } from 'react'
import ProductImageListComponent from './ProductImageListComponent'

interface Props {
  productData: Product
}

export function ProductImageAreaComponent({ productData }: Props) {
  const { thumbnail, description, images } = productData
  const [activeImage, setActiveImage] = useState(thumbnail)

  function handleNext() {
    if (images && images.length > 0) {
      const index = images.indexOf(activeImage)
      if (index < images.length - 1) setActiveImage(images[index + 1])
    }
  }

  function handlePrev() {
    if (images && images.length > 0) {
      const index = images.indexOf(activeImage)
      if (index > 0) setActiveImage(images[index - 1])
    }
  }

  return (
    <div className="relative">
      <div className="absolute right-2 top-2 z-50 rounded-full bg-white p-1">
        <WishlistToggleButtonComponent productData={productData} />
      </div>

      <ZoomOnHoverComponent
        imageSrc={activeImage}
        imageName={description || ''}
      />

      <div className="absolute top-[50%] flex w-full justify-between">
        <BaseArrowButton onClick={handlePrev}>
          <BaseIcon icon="material-symbols:chevron-left" />
        </BaseArrowButton>

        <BaseArrowButton onClick={handleNext}>
          <BaseIcon icon="material-symbols:chevron-right" />
        </BaseArrowButton>
      </div>

      <ProductImageListComponent
        images={images || ['']}
        activeImage={activeImage}
        setActiveImage={setActiveImage}
      />
    </div>
  )
}
