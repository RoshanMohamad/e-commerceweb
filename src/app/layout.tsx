import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/components/cart-provider"
import { AuthProvider } from "@/lib/auth"
import { NavbarClient } from "@/components/navbar-client"
import "@/app/globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter' // Recommended approach
})

// For App Router, metadata should be exported from page/layout files
export const metadata = {
  title: "Sweet Delights Bakery",
  description: "Handcrafted cakes made with love for every occasion",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col font-sans">
                <NavbarClient />
                <main className="flex-1">{children}</main>
              </div>
            </CartProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}