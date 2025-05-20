"use client"

import {  useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CreditCard, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { Separator } from "@/components/ui/separator"
import { PaymentMethodSelector } from "@/components/payment-method-selector"
import { PaymentDetailsForm } from "@/components/payment-details-form"
import { useAuth } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { processPayment } from "@/lib/payment"
import { toast } from 'sonner'

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 5.99 : 0
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  if (cart.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="mb-8">You need to add items to your cart before checking out.</p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  interface PaymentDetails {
    cardNumber: string;
    expiry: string;
    cvc: string;
    name?: string;
    // Add other necessary fields
  }
  

 const handlePaymentSubmit = async (paymentDetails: PaymentDetails) => {
  setIsProcessing(true);

  try {
    // Convert cart items to payment items
    const paymentItems = cart.map(item => ({
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    // Process payment
    await processPayment({
      amount: total,
      paymentMethod: selectedPaymentMethod,
      paymentDetails: {
        cardNumber: paymentDetails.cardNumber,
        expiry: paymentDetails.expiry,
        cvc: paymentDetails.cvc
      },
      items: paymentItems
    });

    clearCart();
    router.push("/checkout/success");
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Payment failed");
  } finally {
    setIsProcessing(false);
  }
};

  return (
    <div className="px-60 py-10">
      <Link href="/cart" className="flex items-center text-sm mb-8 hover:text-pink-600">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Cart
      </Link>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-pink-100 text-pink-600 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  1
                </span>
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Name</p>
                      <p className="text-sm text-gray-600">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Email</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Shipping Address</p>
                    <p className="text-sm text-gray-600">123 Cake Street, Sweet City, SC 12345</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/profile">Edit Shipping Information</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>Please sign in to continue with checkout.</p>
                  <Button asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-pink-100 text-pink-600 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  2
                </span>
                Payment Method
              </CardTitle>
              <CardDescription>Select your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentMethodSelector selectedMethod={selectedPaymentMethod} onSelectMethod={setSelectedPaymentMethod} />
            </CardContent>
          </Card>

          {/* Payment Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="bg-pink-100 text-pink-600 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                  3
                </span>
                Payment Details
              </CardTitle>
              <CardDescription>Enter your payment information</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentDetailsForm
                paymentMethod={selectedPaymentMethod}
                isProcessing={isProcessing || !user}
                onSubmit={handlePaymentSubmit}
              />
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  className="w-full"
                  size="lg"
                  disabled={isProcessing || !user}
                  onClick={() => document.getElementById("payment-form")}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" /> Pay ${total.toFixed(2)}
                    </>
                  )}
                </Button>
                {!user && (
                  <p className="text-xs text-center mt-2 text-red-500">Please sign in to complete your purchase</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
