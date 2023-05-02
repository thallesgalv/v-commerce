import api from '@/api/api'
import { BaseContainer } from '@/components/Base/BaseContainer'
import { BaseLabel } from '@/components/Base/BaseLabel'
import { ErrorView } from '@/views/ErrorView'
import Head from 'next/head'
import Link from 'next/link'

interface Props {
  categoriesInServer: string[]
  errorMessage: string
}

export default function Categories({
  categoriesInServer,
  errorMessage
}: Props) {
  if (errorMessage) return <ErrorView errorMessage={errorMessage} />
  return (
    <>
      <Head>
        <title>Categorias | V-commerce</title>
        <meta name="description" content="Categorias | V-commerce" />
      </Head>
      <BaseContainer>
        <ul className="mx-auto flex flex-wrap justify-center gap-6">
          {categoriesInServer?.map((category, index) => (
            <li key={category + index}>
              <Link href={`categories/${category}`}>
                <BaseLabel
                  customStyle={
                    index % 2 === 0
                      ? 'bg-purple-500 text-white'
                      : 'border border-purple-400 text-purple-500'
                  }
                >
                  {category}
                </BaseLabel>
              </Link>
            </li>
          ))}
        </ul>
      </BaseContainer>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const response = await api.get(`/products/categories`)
    const data = response.data
    return { props: { categoriesInServer: data } }
  } catch (error) {
    return { props: { errorMessage: 'Erro ao buscar os dados.' } }
  }
}
