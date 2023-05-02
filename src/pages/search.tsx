import api from '@/api/api'
import { BreadcumbComponent } from '@/components/BreadcumbComponent'
import { FiltersComponent } from '@/components/FiltersComponent'
import usePagination from '@/hooks/usePagination'
import { ProductsResponse } from '@/interfaces/ProductsResponse'
import { ErrorView } from '@/views/ErrorView'
import { ShelfView } from '@/views/ShelfView'
import { useRouter } from 'next/router'

interface Props {
  productsInServer: ProductsResponse
  errorMessage: string
}

export default function Search({ productsInServer, errorMessage }: Props) {
  const router = useRouter()
  const { q } = router.query

  const breadcumb = { searchTerm: q }

  const {
    data: productsInClient,
    currentPage,
    goToPreviousPage,
    goToNextPage,
    isLoading
  } = usePagination(1)

  const paginationData = {
    currentPage,
    goToPreviousPage,
    goToNextPage,
    isLoading
  }

  if (errorMessage) return <ErrorView errorMessage={errorMessage} />

  return (
    <section>
      <FiltersComponent />
      {productsInServer?.total !== 0 && (
        <div className="container mx-auto mt-8">
          <span>
            {productsInServer?.total} resultados para {q}
          </span>
          <BreadcumbComponent breadcumb={breadcumb} />
        </div>
      )}
      <ShelfView
        data={
          !currentPage || currentPage === 1
            ? productsInServer
            : productsInClient
        }
        paginationData={paginationData}
      />
    </section>
  )
}

interface PathProps {
  query: { q: string }
}

export async function getServerSideProps(context: PathProps) {
  try {
    const { q } = context.query
    const response = await api.get(`/products/search/?q=${q}`)
    const data = response.data
    return { props: { productsInServer: data } }
  } catch (error) {
    return { props: { errorMessage: 'Erro ao buscar os dados.' } }
  }
}
