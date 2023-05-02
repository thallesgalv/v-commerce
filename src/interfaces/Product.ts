export interface Product {
  id: number
  title: string
  price: number
  discountPercentage: number
  rating?: number
  stock: number
  brand?: string
  images?: string[]
  thumbnail: string
  description?: string
  category?: string
}
