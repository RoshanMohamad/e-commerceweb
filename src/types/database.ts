export enum ProductCategory {
  // Example values - replace with your actual categories
  ELECTRONICS = "electronics",
  BOOKS = "books",
  CLOTHING = "clothing",
  HOME_GOODS = "home_goods",
}

export enum ProductBadge {
  // Example values - replace with your actual badges
  NEW_ARRIVAL = "new_arrival",
  ON_SALE = "on_sale",
  BESTSELLER = "bestseller",
  LIMITED_STOCK = "limited_stock",
}

export enum OrderStatus {
  // Example values - replace with your actual order statuses
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export enum PaymentMethod {
  // Example values - replace with your actual payment methods
  CREDIT_CARD = "credit_card",
  PAYPAL = "paypal",
  BANK_TRANSFER = "bank_transfer",
  CASH_ON_DELIVERY = "cash_on_delivery",
}

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  image_url: string | null
  category: ProductCategory | null
  badge: ProductBadge | null
  in_stock: boolean
  created_at: Date
  updated_at: Date
}

export interface User {
  id: string
  email: string
  name: string
  created_at: Date
  updated_at: Date
}

export interface Order {
  id: string
  user_id: string
  total_amount: number
  status: OrderStatus
  payment_method: PaymentMethod
  created_at: Date
  updated_at: Date
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: number
  quantity: number
  price: number
  created_at: Date
}
