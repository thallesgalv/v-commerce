import api from '@/api/api'
import { Product } from '@/interfaces/Product'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState
} from 'react'
import { useUserContext } from './UserContext'

interface ProductsContextProps {
  filteredProducts: Product[]
  isWishlistFilterActive: boolean
  setIsWishlistFilterActive: (state: boolean) => void
  // getWishlistProducts: (productsData: Product[]) => void
  getWishlistProducts: () => void
  isWishListProductsLoading: boolean
}

interface ProductsProviderProps {
  children: ReactNode
}

const ProductsContext = createContext({} as ProductsContextProps)

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [isWishlistFilterActive, setIsWishlistFilterActive] = useState(false)
  const [isWishListProductsLoading, setIsWishListProductsLoading] =
    useState(false)

  const { wishlist } = useUserContext()

  async function getProductById(id: number): Promise<Product> {
    const response = await api.get(`/products/${id}`)
    return response.data
  }

  const getWishlistProducts = useCallback(async () => {
    setIsWishListProductsLoading(true)
    try {
      console.log('start request')
      const productPromises = wishlist?.map((id) => getProductById(id))
      const products = await Promise.all(productPromises)
      setFilteredProducts(products)
    } finally {
      setIsWishListProductsLoading(false)
    }
  }, [wishlist])

  return (
    <ProductsContext.Provider
      value={{
        filteredProducts,
        isWishlistFilterActive,
        setIsWishlistFilterActive,
        getWishlistProducts,
        isWishListProductsLoading
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => {
  return useContext(ProductsContext)
}
