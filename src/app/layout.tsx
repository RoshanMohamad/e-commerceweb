import type React from "react"
import { Inter } from "next/font/google"

import  ThemeProvider  from "@/components/theme-provider"
import { CartProvider } from "@/components/cart-provider"
import { AuthProvider } from "@/lib/auth"
import { NavbarClient } from "@/components/navbar-client"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sweet Delights Bakery",
  description: "Handcrafted cakes made with love for every occasion",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col">
                <NavbarClient />
                <main className="flex-1">{children}</main>
              </div>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
