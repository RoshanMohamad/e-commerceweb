"use client"

import type React from "react"

import { useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PaymentDetails {
  cardNumber?: string
  cardName?: string
  expiryMonth?: string
  expiryYear?: string
  cvv?: string
  accountNumber?: string
  routingNumber?: string
  bankName?: string
  walletEmail?: string
}

interface PaymentDetailsFormProps {
  paymentMethod: string
  onSubmit: (details: PaymentDetails) => void
  isProcessing: boolean
}

export function PaymentDetailsForm({ paymentMethod, onSubmit, isProcessing }: PaymentDetailsFormProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryMonth, setExpiryMonth] = useState("")
  const [expiryYear, setExpiryYear] = useState("")
  const [cvv, setCvv] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [routingNumber, setRoutingNumber] = useState("")
  const [bankName, setBankName] = useState("")
  const [walletEmail, setWalletEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let paymentDetails = {}

    if (paymentMethod === "credit-card") {
      paymentDetails = {
        cardNumber,
        cardName,
        expiryMonth,
        expiryYear,
        cvv,
      }
    } else if (paymentMethod === "bank-transfer") {
      paymentDetails = {
        accountNumber,
        routingNumber,
        bankName,
      }
    } else if (paymentMethod === "digital-wallet") {
      paymentDetails = {
        walletEmail,
      }
    }

    onSubmit(paymentDetails)
  }

  // Generate years for expiry date (current year + 10 years)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 11 }, (_, i) => currentYear + i)

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
      {paymentMethod === "credit-card" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input
              id="card-number"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              disabled={isProcessing}
              maxLength={19}
              // Format card number with spaces
              onInput={(e) => {
                const target = e.target as HTMLInputElement
                const value = target.value.replace(/\s/g, "")
                const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ")
                setCardNumber(formattedValue)
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="card-name">Cardholder Name</Label>
            <Input
              id="card-name"
              placeholder="John Doe"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              required
              disabled={isProcessing}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry-month">Expiry Month</Label>
              <Select value={expiryMonth} onValueChange={setExpiryMonth} disabled={isProcessing}>
                <SelectTrigger id="expiry-month">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <SelectItem key={month} value={month.toString().padStart(2, "0")}>
                      {month.toString().padStart(2, "0")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiry-year">Expiry Year</Label>
              <Select value={expiryYear} onValueChange={setExpiryYear} disabled={isProcessing}>
                <SelectTrigger id="expiry-year">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
                disabled={isProcessing}
                maxLength={4}
                type="password"
              />
            </div>
          </div>
        </>
      )}

      {paymentMethod === "bank-transfer" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="bank-name">Bank Name</Label>
            <Input
              id="bank-name"
              placeholder="Bank of America"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              required
              disabled={isProcessing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="account-number">Account Number</Label>
            <Input
              id="account-number"
              placeholder="123456789"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
              disabled={isProcessing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="routing-number">Routing Number</Label>
            <Input
              id="routing-number"
              placeholder="987654321"
              value={routingNumber}
              onChange={(e) => setRoutingNumber(e.target.value)}
              required
              disabled={isProcessing}
            />
          </div>
        </>
      )}

      {paymentMethod === "digital-wallet" && (
        <div className="space-y-2">
          <Label htmlFor="wallet-email">Email Address</Label>
          <Input
            id="wallet-email"
            type="email"
            placeholder="your-email@example.com"
            value={walletEmail}
            onChange={(e) => setWalletEmail(e.target.value)}
            required
            disabled={isProcessing}
          />
          <p className="text-xs text-gray-500 mt-1">You will be redirected to complete payment after clicking .</p>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isProcessing}>
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
          </>
        ) : (
          "Complete Payment"
        )}
      </Button>
    </form>
  )
}
