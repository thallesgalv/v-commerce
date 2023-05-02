import { BaseButton } from '@/components/Base/BaseButon'
import { BaseContainer } from '@/components/Base/BaseContainer'
import Head from 'next/head'
import Link from 'next/link'

export default function Success() {
  return (
    <>
      <Head>
        <title>Sucesso | V-commerce</title>
      </Head>
      <BaseContainer>
        <div className="flex flex-col items-center justify-center gap-8 ">
          <p>Compra realizada com sucesso!</p>
          <Link href="/">
            <BaseButton variant="primary">Continue comprando</BaseButton>
          </Link>
        </div>
      </BaseContainer>
    </>
  )
}
