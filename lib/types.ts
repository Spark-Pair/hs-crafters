export type Category = {
  id: string
  name: string
  image: string
  isActive: boolean
  featuredOnHome: boolean
}

export type Product = {
  id: string
  name: string
  categoryId: string
  categoryName: string
  price: number
  images: string[]
  isActive: boolean
}

export type OrderStatus = 'pending' | 'working' | 'delivered'

export type OrderItem = {
  id: string
  name: string
  image: string
  price: number
  quantity: number
  categoryName?: string
}

export type Order = {
  id: string
  customer: string
  customerEmail?: string
  amount: number
  status: OrderStatus
  items: OrderItem[]
  createdAt: string
}

export type AppDb = {
  categories: Category[]
  products: Product[]
  orders: Order[]
}
