"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Cake } from "lucide-react"
import { useState, useRef } from "react"
import { useAuth } from "@/lib/auth"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export function Navbar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const logoRef = useRef<HTMLAnchorElement>(null)

  useGSAP(() => {
    gsap.from(logoRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)"
    })
  })

  const handleLogoHover = () => {
    gsap.to(logoRef.current, {
      scale: 1.1,
      duration: 0.2,
      ease: "power1.out"
    })
  }

  const handleLogoLeave = () => {
    gsap.to(logoRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power1.out"
    })
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            href="/" 
            className="flex items-center gap-2" 
            onClick={closeMenu}
            ref={logoRef}
            onMouseEnter={handleLogoHover}
            onMouseLeave={handleLogoLeave}
          >
            <Cake className="h-6 w-6 text-pink-500" />
            <span className="text-lg font-semibold">Sweet Delights</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/profile") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Profile
              </Link>
              <button
                onClick={() => signOut()}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/login") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/register") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <nav className="container py-4 flex flex-col gap-4">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/") ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={closeMenu}
              >
                Home
              </Link>
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
                    }`}
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/profile") ? "text-primary" : "text-muted-foreground"
                    }`}
                    onClick={closeMenu}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut()
                      closeMenu()
                    }}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/login") ? "text-primary" : "text-muted-foreground"
                    }`}
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/register") ? "text-primary" : "text-muted-foreground"
                    }`}
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
