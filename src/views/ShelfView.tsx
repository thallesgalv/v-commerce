import { BasePagination } from '@/components/Base/BasePagination'
import { ShelfComponent } from '@/components/ShelfComponent'
import { useProductsContext } from '@/contexts/ProductsContext'
import { ProductsResponse } from '@/interfaces/ProductsResponse'
import { useEffect } from 'react'

interface PaginationData {
  currentPage: number
  goToPreviousPage: () => void
  goToNextPage: () => void
  isLoading: boolean
}

interface Props {
  data: ProductsResponse
  paginationData: PaginationData
}

export function ShelfView({ data, paginationData }: Props) {
  const { isWishlistFilterActive, getWishlistProducts, filteredProducts } =
    useProductsContext()

  const { goToNextPage, goToPreviousPage, currentPage, isLoading } =
    paginationData

  useEffect(() => {
    if (isWishlistFilterActive) getWishlistProducts()
  }, [isWishlistFilterActive, getWishlistProducts])

  const products = isWishlistFilterActive ? filteredProducts : data?.products

  return (
    <div className="container mx-auto my-6">
      <ShelfComponent products={products} isLoading={isLoading} />
      {!isWishlistFilterActive && products?.length !== 0 && (
        <BasePagination
          limitPerPage={data?.limit}
          maxProducts={data?.total}
          currentPage={currentPage}
          goToNextPage={goToNextPage}
          goToPrevPage={goToPreviousPage}
        />
      )}
    </div>
  )
}
