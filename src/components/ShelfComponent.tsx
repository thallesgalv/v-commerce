import { useProductsContext } from '@/contexts/ProductsContext'
import { Product } from '@/interfaces/Product'
import { NotFoundComponent } from './NotFoundComponent'
import { ShelfItemComponent } from './ShelfItem/ShelfItemComponent'
import { ShelfSkeletonComponent } from './ShelfSkeletonComponent'

interface Props {
  products: Product[]
  isLoading: boolean
}

export function ShelfComponent({ products, isLoading }: Props) {
  const { isWishListProductsLoading } = useProductsContext()

  if (isWishListProductsLoading || isLoading)
    return <ShelfSkeletonComponent items={10} />

  return products?.length !== 0 ? (
    <ul className="mt-4 grid gap-4 md:grid-cols-3 xl:grid-cols-5">
      {products?.map((productData) => (
        <li key={productData.id}>
          <ShelfItemComponent productData={productData} />
        </li>
      ))}
    </ul>
  ) : (
    <NotFoundComponent />
  )
}
