import { BreadcumbComponent } from '@/components/BreadcumbComponent'
import { Product } from '@/interfaces/Product'
import { ProductContentComponent } from './ProductContentComponent'
import { ProductImageAreaComponent } from './ProductImageAreaComponent'

interface Props {
  productData: Product
}

export default function ProductView({ productData }: Props) {
  const { title, category } = productData

  const breadcumb = {
    category,
    product: title
  }

  return (
    <div className="container mx-auto h-full">
      <BreadcumbComponent breadcumb={breadcumb} />
      <div className="mx-auto mt-2 flex flex-col-reverse gap-4 rounded bg-white p-4 md:flex-row md:gap-16 md:p-8 ">
        <ProductImageAreaComponent productData={productData} />
        <ProductContentComponent productData={productData} />
      </div>
    </div>
  )
}
