import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Cake } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-yellow-500/20" />
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="Delicious cakes and pastries"
          fill
          className="object-cover"
          priority
        />
        <div className="relative flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md mb-4">Sweet Delights Bakery</h1>
          <p className="text-lg md:text-xl text-white drop-shadow-md max-w-2xl mb-8">
            Handcrafted cakes made with love for every occasion
          </p>
          <Button size="lg" asChild>
            <Link href="/products">
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Our Bestsellers</h2>
            <Button variant="ghost" asChild>
              <Link href="/products" className="flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`}>
                <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md">
                  <div className="relative h-64 w-full">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                    {product.badge && (
                      <span className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="font-bold text-pink-600">${product.price.toFixed(2)}</p>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-pink-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Explore Our Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="relative rounded-lg overflow-hidden group h-40"
              >
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Sweet Delights Bakery was founded in 2010 with a simple mission: to create delicious, handcrafted cakes
                that bring joy to every celebration. Our master bakers use only the finest ingredients to ensure every
                bite is pure bliss.
              </p>
              <p className="text-gray-600 mb-6">
                From birthdays to weddings, our custom cakes are designed to make your special moments even more
                memorable. We take pride in our attention to detail and commitment to quality.
              </p>
              <Button asChild>
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="md:w-1/2 relative h-[400px] w-full rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="Our bakery" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pink-100 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Cake className="h-6 w-6 text-pink-600 mr-2" />
              <span className="text-xl font-bold">Sweet Delights</span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <Link href="/products" className="text-gray-700 hover:text-pink-600">
                Products
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-pink-600">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-pink-600">
                Contact
              </Link>
              <Link href="/cart" className="text-gray-700 hover:text-pink-600">
                Cart
              </Link>
            </div>
          </div>
          <div className="border-t border-pink-200 mt-6 pt-6 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Sweet Delights Bakery. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

// Sample data
const featuredProducts = [
  {
    id: 1,
    name: "Chocolate Truffle Cake",
    slug: "chocolate-truffle-cake",
    description: "Rich chocolate cake with smooth truffle frosting and chocolate ganache.",
    price: 42.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Strawberry Shortcake",
    slug: "strawberry-shortcake",
    description: "Light vanilla sponge with fresh strawberries and whipped cream.",
    price: 38.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Red Velvet Delight",
    slug: "red-velvet-delight",
    description: "Classic red velvet cake with cream cheese frosting and red velvet crumbs.",
    price: 44.99,
    image: "/placeholder.svg?height=300&width=300",
    badge: "New",
  },
  {
    id: 4,
    name: "Lemon Blueberry Cake",
    slug: "lemon-blueberry-cake",
    description: "Tangy lemon cake with fresh blueberries and lemon buttercream.",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
  },
]

const categories = [
  {
    id: 1,
    name: "Birthday Cakes",
    slug: "birthday",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Wedding Cakes",
    slug: "wedding",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Cupcakes",
    slug: "cupcakes",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Pastries",
    slug: "pastries",
    image: "/placeholder.svg?height=300&width=300",
  },
]
