import Link from "next/link"
import { CheckCircle, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`

  return (
    <div className="container max-w-2xl py-20 text-center">
      <div className="mb-8 flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
      <p className="text-xl mb-2">Your order has been placed successfully.</p>
      <p className="text-gray-600 mb-8">
        Order Number: <span className="font-semibold">{orderNumber}</span>
      </p>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">What&#39;s Next?</h2>
        <div className="space-y-2 text-left">
          <p className="flex items-start">
            <span className="bg-pink-100 text-pink-600 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm flex-shrink-0">
              1
            </span>
            <span>You&#39;ll receive an order confirmation email with details of your purchase.</span>
          </p>
          <p className="flex items-start">
            <span className="bg-pink-100 text-pink-600 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm flex-shrink-0">
              2
            </span>
            <span>We&#39;ll prepare your order and notify you when it&#39;s ready for pickup or delivery.</span>
          </p>
          <p className="flex items-start">
            <span className="bg-pink-100 text-pink-600 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm flex-shrink-0">
              3
            </span>
            <span>You can track your order status in your account dashboard.</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <Link href="/dashboard">
            <ShoppingBag className="mr-2 h-4 w-4" />
            View My Orders
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  )
}
