"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Cake } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardClient() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, )

  if (loading) {
    return <div className="container py-10">Loading...</div>
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="px-10 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>My Orders</CardTitle>
            <CardDescription>View and manage your cake orders</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">You have no orders yet.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/products">Shop Now</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Favorites</CardTitle>
            <CardDescription>Your favorite cakes and pastries</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">You haven&#39;t saved any favorites yet.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/products">Browse Products</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Email:</span>
                <span className="text-sm text-muted-foreground">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Member since:</span>
                <span className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/profile">Edit Profile</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Special Offers</h2>
        <div className="bg-pink-50 rounded-lg p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/4">
              <Cake className="h-16 w-16 text-pink-600 mx-auto md:mx-0" />
            </div>
            <div className="md:w-2/4 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Birthday Special Discount</h3>
              <p className="text-gray-600">
                Get 15% off on your birthday cake order! Valid during your birthday month.
              </p>
            </div>
            <div className="md:w-1/4 mt-4 md:mt-0">
              <Button asChild className="w-full">
                <Link href="/products?category=birthday">View Birthday Cakes</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
