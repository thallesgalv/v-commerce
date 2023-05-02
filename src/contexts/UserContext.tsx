import { BaseIcon } from '@/components/Base/BaseIcon'
import { Product } from '@/interfaces/Product'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import toast from 'react-hot-toast'

interface UserContextProps {
  wishlist: number[]
  toggleInWishlist: (productData: Product) => void
  productIsInWishlist: (productId: number) => boolean
}

interface UserProviderProps {
  children: ReactNode
}

const UserContext = createContext({} as UserContextProps)

export function UserProvider({ children }: UserProviderProps) {
  const [wishlist, setWhishlist] = useState<number[]>([])

  useEffect(() => {
    getWishlist()
  }, [])

  function getWishlist() {
    const wishtlistData = localStorage.getItem('v-commerce-wishlist')
    if (wishtlistData) {
      setWhishlist(JSON.parse(wishtlistData))
    }
  }

  function productIsInWishlist(productId: number) {
    return wishlist.includes(productId)
  }

  function toggleInWishlist(productData: Product) {
    const { id: productId, title } = productData
    const currentWishlist = [...wishlist]
    const isInWishlist = productIsInWishlist(productId)

    const operation = isInWishlist
      ? 'removido dos favoritos'
      : 'adicionado aos favoritos'

    const updatedWishlist = isInWishlist
      ? currentWishlist.filter((id) => id !== productId)
      : [...currentWishlist, productId]

    setWhishlist(updatedWishlist)

    localStorage.setItem('v-commerce-wishlist', JSON.stringify(updatedWishlist))

    toast((t) => (
      <div className="flex items-center">
        <span className="flex items-center gap-2">
          <p>
            <span className="font-bold">{title}</span>
            <span>
              {'  '}
              {operation}.
            </span>
          </p>
        </span>
        <button onClick={() => toast.dismiss(t.id)}>
          <BaseIcon icon="material-symbols:close" />
        </button>
      </div>
    ))
  }

  return (
    <UserContext.Provider
      value={{
        wishlist,
        toggleInWishlist,
        productIsInWishlist
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
