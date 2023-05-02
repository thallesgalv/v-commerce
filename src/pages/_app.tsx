import { BaseLayout } from '@/components/Base/BaseLayout'
import { CartProvider } from '@/contexts/CartContext'
import { ProductsProvider } from '@/contexts/ProductsContext'
import { UserProvider } from '@/contexts/UserContext'
import useMedia from '@/hooks/useMedia'
import '@/styles/globals.css'
import '@/styles/nprogress.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  const isMobile = useMedia('(max-width: 768px)')

  NProgress.configure({ showSpinner: false })
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start())
    router.events.on('routeChangeComplete', () => NProgress.done())
    router.events.on('routeChangeError', () => NProgress.done())
  }, [router.events])

  return (
    <UserProvider>
      <ProductsProvider>
        <CartProvider>
          <BaseLayout>
            <Component {...pageProps} />
            <Toaster
              position={`${isMobile ? 'bottom-center' : 'top-right'}`}
              toastOptions={{
                style: {
                  background: '#a855f7',
                  color: '#fff'
                }
              }}
            />
          </BaseLayout>
        </CartProvider>
      </ProductsProvider>
    </UserProvider>
  )
}
