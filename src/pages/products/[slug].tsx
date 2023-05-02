import api from '@/api/api'
import { Product } from '@/interfaces/Product'
import { ErrorView } from '@/views/ErrorView'
import ProductView from '@/views/Product/ProductView'

import Head from 'next/head'

interface Props {
  productDataInServer: Product
  errorMessage: string
}

export default function Product({ productDataInServer, errorMessage }: Props) {
  if (errorMessage) return <ErrorView errorMessage={errorMessage} />

  return (
    <>
      <Head>
        <title>{productDataInServer?.title} | V-commerce</title>
        <meta name="description" content={productDataInServer?.description} />
      </Head>
      <ProductView productData={productDataInServer} />
    </>
  )
}

interface PathProps {
  params: { slug: string }
}

export async function getServerSideProps(props: PathProps) {
  try {
    const id = props.params.slug
    const response = await api.get(`/products/${id}`)
    const data = response.data
    return { props: { productDataInServer: data } }
  } catch (error) {
    return { props: { errorMessage: 'Erro ao buscar os dados.' } }
  }
}
