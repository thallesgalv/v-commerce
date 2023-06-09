import api from '@/api/api'
import { LIMIT_PER_PAGE } from '@/api/const'
import { FiltersComponent } from '@/components/FiltersComponent'
import usePagination from '@/hooks/usePagination'
import { ProductsResponse } from '@/interfaces/ProductsResponse'
import { ErrorView } from '@/views/ErrorView'
import { ShelfView } from '@/views/ShelfView'
import Head from 'next/head'

interface Props {
  productsInServer: ProductsResponse
  errorMessage: string
}

export default function Home({ productsInServer, errorMessage }: Props) {
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
    <>
      <Head>
        <title>Produtos | V-commerce</title>
        <meta name="description" content="Produtos | V-commerce" />
      </Head>
      <div>
        <FiltersComponent />
        <ShelfView
          data={
            !currentPage || currentPage === 1
              ? productsInServer
              : productsInClient
          }
          paginationData={paginationData}
        />
      </div>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const response = await api.get(`/products?limit=${LIMIT_PER_PAGE}`)
    const data = response.data
    return { props: { productsInServer: data } }
  } catch (error) {
    return { props: { errorMessage: 'Erro ao buscar os dados.' } }
  }
}
