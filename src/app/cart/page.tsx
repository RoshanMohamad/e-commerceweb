"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { Separator } from "@/components/ui/separator"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart()


  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 5.99 : 0
  const total = subtotal + shipping

  if (cart.length === 0) {
    return (
      <div className="container py-20 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-6" />
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-8">Looks like you haven&#39;t added any cakes to your cart yet.</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="px-60 py-32">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-4 py-6 border-b">
              <div className="relative h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 rounded-md overflow-hidden">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>

              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="font-bold text-pink-600">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <p className="text-gray-600 text-sm mt-1">${item.price.toFixed(2)} each</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="h-8 w-8 rounded-none"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 rounded-none"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Button className="w-full" size="lg" asChild>
            <Link href="/checkout">
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <div className="mt-6 text-center">
            <Link href="/products" className="text-sm text-pink-600 hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
