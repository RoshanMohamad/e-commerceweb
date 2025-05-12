import Link from "next/link"
import Image from "next/image"
import { ArrowRight} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import superDad from "../../public/img/birthday/Super-dad-300x300.png"
import Mud from "../../public/img/cupcake/Chocolate_Mud_Cup_Cake_1024x1024@2x.webp"
import sublime from '../../public/img/birthday/Sublime-Lime-300x300.webp'
import IceCream from "../../public/img/cupcake/ice cream.jpeg"
import BirthDay from "../../public/img/birthday/CC1153F7-B40C-4CB0-A654-746787BA408B-460x460.webp"
import Cupcake from "../../public/img/cupcake/velvet.jpeg"
import Pastries from "../../public/img/birthday/Cheery-Sunflower-300x300.webp"
import wedding from '../../public/img/birthday/35_621823e7-857a-4870-856d-4a29ab2da622_1024x1024@2x.webp'

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
                  </div>
                  <CardContent className="p-4">
                    <div className="justify-center text-center mb-2">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="font-bold text-pink-600">Rs.{product.price.toFixed(2)}</p>
                    </div>
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
                Sweet Delights Bakery was founded in 2024 with a simple mission: to create delicious, handcrafted cakes
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
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2801.398637823976!2d79.90028277984767!3d6.797092022008967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae245416b7f34b5%3A0x7bd32721ab02560e!2sUniversity%20of%20Moratuwa!5e0!3m2!1sen!2slk!4v1746711044149!5m2!1sen!2slk" width="600" height="450"></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pink-100 py-4 px-4">
        <div className="container mx-auto">
          <div className="border-t border-pink-200 text-center text-gray-500 text-sm">
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
    price: 420.99,
    image: superDad,
  },
  {
    id: 2,
    name: "Strawberry Shortcake",
    slug: "strawberry-shortcake",
    price: 380.99,
    image: Mud,
  },
  {
    id: 3,
    name: "Red Velvet Delight",
    slug: "red-velvet-delight",
    price: 440.99,
    image: sublime,
    // badge: "New",
  },
  {
    id: 4,
    name: "Lemon Blueberry Cake",
    slug: "lemon-blueberry-cake",
    price: 390.99,
    image: IceCream,
  },
]

const categories = [
  {
    id: 1,
    name: "Birthday Cakes",
    slug: "birthday",
    image: BirthDay,
  },
  {
    id: 2,
    name: "Wedding Cakes",
    slug: "wedding",
    image: wedding,
  },
  {
    id: 3,
    name: "Cupcakes",
    slug: "cupcakes",
    image: Cupcake,
  },
  {
    id: 4,
    name: "Pastries",
    slug: "pastries",
    image: Pastries,
  },
]
