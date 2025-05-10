"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Cake, ShoppingCart, User, Menu, X } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NavbarClient() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Cake className="h-6 w-6 text-pink-600" />
          <span className="text-lg font-bold">Sweet Delights</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link href="/products" className="text-sm font-medium transition-colors hover:text-pink-600">
            Products
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-pink-600">
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-pink-600">
            Contact
          </Link>
          {user && (
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-pink-600">
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm font-medium">{user.name}</div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container py-3 flex flex-col">
            <Link
              href="/products"
              className="py-2 text-sm font-medium transition-colors hover:text-pink-600"
              onClick={closeMenu}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="py-2 text-sm font-medium transition-colors hover:text-pink-600"
              onClick={closeMenu}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="py-2 text-sm font-medium transition-colors hover:text-pink-600"
              onClick={closeMenu}
            >
              Contact
            </Link>
            {user && (
              <Link
                href="/dashboard"
                className="py-2 text-sm font-medium transition-colors hover:text-pink-600"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            )}
            {!user && (
              <Link
                href="/login"
                className="py-2 text-sm font-medium transition-colors hover:text-pink-600"
                onClick={closeMenu}
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
