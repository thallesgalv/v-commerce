import { useCartContext } from '@/contexts/CartContext'
import { routes } from '@/routes/routes'
import Link from 'next/link'
import { useRouter } from 'next/router'

export function BaseHeader() {
  const { cart } = useCartContext()
  const router = useRouter()
  const pageActive = router.pathname

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-center bg-white shadow-md">
      <nav className="overflow-x-scroll md:overflow-x-auto">
        <ul className="flex justify-center ">
          {routes.map(({ path, text }) => (
            <li key={path} className="relative p-4 uppercase">
              <Link href={path}>{text}</Link>
              {path === '/checkout' && (
                <span className="absolute -right-1 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 p-0.5 text-xs text-white">
                  {cart?.reduce((acc, { quantity }) => acc + quantity, 0)}
                </span>
              )}
              {pageActive === path && (
                <span className="absolute bottom-4 left-[10%] h-0.5 w-[80%] bg-purple-500"></span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
