import api from '@/api/api'
import { LIMIT_PER_PAGE } from '@/api/const'
import { BreadcumbComponent } from '@/components/BreadcumbComponent'
import usePagination from '@/hooks/usePagination'
import { ProductsResponse } from '@/interfaces/ProductsResponse'
import { ErrorView } from '@/views/ErrorView'
import { ShelfView } from '@/views/ShelfView'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface Props {
  productsInServer: ProductsResponse
  errorMessage: string
}
export default function Category({ productsInServer, errorMessage }: Props) {
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

  const router = useRouter()
  const { slug } = router.query

  const breadcumb = {
    category: slug
  }

  if (errorMessage) return <ErrorView errorMessage={errorMessage} />

  return (
    <>
      <Head>
        <title className="capitalize">{slug} | V-commerce</title>
        <meta name="description" content="Produtos | V-commerce" />
      </Head>
      <div>
        <div className="container mx-auto mt-8">
          <BreadcumbComponent breadcumb={breadcumb} />
        </div>
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

interface PathProps {
  params: { slug: string }
}

export async function getServerSideProps(props: PathProps) {
  try {
    const category = props.params.slug
    const response = await api.get(
      `/products/category/${category}?limit=${LIMIT_PER_PAGE}`
    )
    const data = response.data
    return { props: { productsInServer: data } }
  } catch (error) {
    return { props: { errorMessage: 'Erro ao buscar os dados.' } }
  }
}
