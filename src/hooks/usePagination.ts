import api from '@/api/api'
import { LIMIT_PER_PAGE } from '@/api/const'
import { ProductsResponse } from '@/interfaces/ProductsResponse'
import { useCallback, useEffect, useState } from 'react'

const usePagination = (initialPage: number) => {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [data, setData] = useState({} as ProductsResponse)
  const [isLoading, setIsLoading] = useState(false)

  const requestByClient = useCallback(async () => {
    setIsLoading(true)

    try {
      const skip = currentPage === 1 ? 0 : LIMIT_PER_PAGE * currentPage

      const response = await api.get(
        `/products?limit=${LIMIT_PER_PAGE}&skip=${skip}`,
        {
          params: { page: currentPage }
        }
      )
      const { data } = response

      setData(data)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage])

  useEffect(() => {
    if (currentPage > 1) requestByClient()
  }, [currentPage, requestByClient])

  function goToPreviousPage() {
    setCurrentPage((state) => state - 1)
  }

  function goToNextPage() {
    setCurrentPage((state) => state + 1)
  }

  return { data, currentPage, goToPreviousPage, goToNextPage, isLoading }
}

export default usePagination
