"use client"

import { CreditCard, Landmark, Wallet } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface PaymentMethodSelectorProps {
  selectedMethod: string
  onSelectMethod: (method: string) => void
}

export function PaymentMethodSelector({ selectedMethod, onSelectMethod }: PaymentMethodSelectorProps) {
  return (
    <RadioGroup value={selectedMethod} onValueChange={onSelectMethod} className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        className={`flex flex-col items-center gap-2 rounded-lg border p-4 cursor-pointer hover:border-pink-200 ${
          selectedMethod === "credit-card" ? "border-pink-500 bg-pink-50" : ""
        }`}
        onClick={() => onSelectMethod("credit-card")}
      >
        <RadioGroupItem value="credit-card" id="credit-card" className="sr-only" />
        <CreditCard className="h-6 w-6 text-pink-600" />
        <Label htmlFor="credit-card" className="font-medium">
          Credit Card
        </Label>
        <p className="text-xs text-center text-gray-500">Visa, Mastercard, Amex</p>
      </div>

      <div
        className={`flex flex-col items-center gap-2 rounded-lg border p-4 cursor-pointer hover:border-pink-200 ${
          selectedMethod === "bank-transfer" ? "border-pink-500 bg-pink-50" : ""
        }`}
        onClick={() => onSelectMethod("bank-transfer")}
      >
        <RadioGroupItem value="bank-transfer" id="bank-transfer" className="sr-only" />
        <Landmark className="h-6 w-6 text-pink-600" />
        <Label htmlFor="bank-transfer" className="font-medium">
          Bank Transfer
        </Label>
        <p className="text-xs text-center text-gray-500">Direct bank payment</p>
      </div>

      <div
        className={`flex flex-col items-center gap-2 rounded-lg border p-4 cursor-pointer hover:border-pink-200 ${
          selectedMethod === "digital-wallet" ? "border-pink-500 bg-pink-50" : ""
        }`}
        onClick={() => onSelectMethod("digital-wallet")}
      >
        <RadioGroupItem value="digital-wallet" id="digital-wallet" className="sr-only" />
        <Wallet className="h-6 w-6 text-pink-600" />
        <Label htmlFor="digital-wallet" className="font-medium">
          Digital Wallet
        </Label>
        <p className="text-xs text-center text-gray-500">PayPal, Apple Pay</p>
      </div>
    </RadioGroup>
  )
}
