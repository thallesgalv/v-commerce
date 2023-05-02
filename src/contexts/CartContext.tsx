import CartItem from '@/interfaces/CartItem'
import { Product } from '@/interfaces/Product'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import toast from 'react-hot-toast'

interface CartContextProps {
  cart: CartItem[]
  addToCart: (product: Product, quantity: number | string) => void
  removeFromCart: (productId: number) => void
  updateItemQuantityInCart: (
    product: Product,
    quantity: number | string
  ) => void
  emptyCart: () => void
}

interface CartProviderProps {
  children: ReactNode
}

const CartContext = createContext({} as CartContextProps)

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    getCart()
  }, [])

  function handleError(message: string) {
    toast.error(message)
    console.error(message)
    return
  }

  function getCart() {
    const cartData = localStorage.getItem('v-commerce-cart')
    if (cartData) {
      setCart(JSON.parse(cartData))
    }
  }

  function findCartItemIndexById(productId: number, givenCart: CartItem[]) {
    return givenCart.findIndex((item) => item.id === productId)
  }

  function addToCart(product: Product, quantity: number | string) {
    const { id, title } = product
    const updatedCart = [...cart]

    const cartItemIndex = findCartItemIndexById(id, updatedCart)
    const currentProductQuantityInCart =
      updatedCart[cartItemIndex]?.quantity || 0

    const parsedQuantity = Number(quantity)
    const isValidQuantity =
      Number.isInteger(parsedQuantity) &&
      parsedQuantity > 0 &&
      parsedQuantity + currentProductQuantityInCart <= product.stock

    if (currentProductQuantityInCart + parsedQuantity > product.stock) {
      handleError('Quantidade maior do que o estoque disponível')
      return
    }

    if (!isValidQuantity) {
      handleError('Quantidade inválida')
      return
    }

    const productIsInCart = cartItemIndex >= 0

    if (productIsInCart) {
      updatedCart[cartItemIndex].quantity += parsedQuantity
    } else {
      updatedCart.push({ ...product, quantity: parsedQuantity })
    }

    setCart(updatedCart)
    localStorage.setItem('v-commerce-cart', JSON.stringify(updatedCart))
    toast.success(`${title} adicionado ao carrinho com sucesso`)
  }

  function removeFromCart(productId: number) {
    const updatedCart = [...cart]
    const cartItemIndex = findCartItemIndexById(productId, updatedCart)
    const productIsInCart = cartItemIndex >= 0

    if (!productIsInCart) {
      handleError('Produto não está no carrinho')
      return
    }

    updatedCart.splice(cartItemIndex, 1)

    setCart(updatedCart)
    localStorage.setItem('v-commerce-cart', JSON.stringify(updatedCart))
    toast.success(`Produto removido do carrinho com sucesso`)
  }

  function updateItemQuantityInCart(
    product: Product,
    quantity: number | string
  ) {
    const parsedQuantity = Number(quantity)
    const isValidQuantity =
      Number.isInteger(parsedQuantity) &&
      parsedQuantity > 0 &&
      parsedQuantity <= product.stock

    if (parsedQuantity > product.stock) {
      handleError('Quantidade maior do que o estoque disponível')
      return
    }

    if (!isValidQuantity) {
      handleError('Quantidade inválida')
      return
    }

    const { id } = product

    const updatedCart = [...cart]
    const cartItemIndex = findCartItemIndexById(id, updatedCart)
    const productIsInCart = cartItemIndex >= 0

    if (!productIsInCart) {
      handleError('Produto não está no carrinho')
      return
    }

    updatedCart[cartItemIndex].quantity = parsedQuantity

    setCart(updatedCart)
    localStorage.setItem('v-commerce-cart', JSON.stringify(updatedCart))
    toast.success(`Carrinho atualizado com sucesso`)
  }

  function emptyCart() {
    setCart([])
    localStorage.removeItem('v-commerce-cart')
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateItemQuantityInCart,
        emptyCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  return useContext(CartContext)
}
