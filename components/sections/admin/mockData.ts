export type AdminCategory = {
  id: string
  name: string
  isActive: boolean
  featuredOnHome: boolean
}

export type AdminProduct = {
  id: string
  name: string
  category: string
  price: number
  isActive: boolean
}

export type OrderStatus = 'pending' | 'working' | 'delivered'

export type AdminOrder = {
  id: string
  customer: string
  productName: string
  category: string
  amount: number
  status: OrderStatus
}

export const initialCategories: AdminCategory[] = [
  { id: 'cat-1', name: 'Ceramics', isActive: true, featuredOnHome: true },
  { id: 'cat-2', name: 'Woodwork', isActive: true, featuredOnHome: true },
  { id: 'cat-3', name: 'Textiles', isActive: true, featuredOnHome: false },
  { id: 'cat-4', name: 'Limited', isActive: false, featuredOnHome: false },
]

export const initialProducts: AdminProduct[] = [
  { id: 'prod-1', name: 'Ridge Clay Vase', category: 'Ceramics', price: 64, isActive: true },
  { id: 'prod-2', name: 'Oak Serving Board', category: 'Woodwork', price: 92, isActive: true },
  { id: 'prod-3', name: 'Linen Throw', category: 'Textiles', price: 78, isActive: true },
  { id: 'prod-4', name: 'Edition No. 7 Vessel', category: 'Limited', price: 180, isActive: false },
]

export const initialOrders: AdminOrder[] = [
  {
    id: 'ord-1001',
    customer: 'Hassan',
    productName: 'Ridge Clay Vase',
    category: 'Ceramics',
    amount: 64,
    status: 'pending',
  },
  {
    id: 'ord-1002',
    customer: 'Ayesha',
    productName: 'Oak Serving Board',
    category: 'Woodwork',
    amount: 92,
    status: 'working',
  },
  {
    id: 'ord-1003',
    customer: 'Ali',
    productName: 'Linen Throw',
    category: 'Textiles',
    amount: 78,
    status: 'delivered',
  },
]
