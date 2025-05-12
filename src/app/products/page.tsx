import Link from "next/link"
import Image from "next/image"
import { Filter } from "lucide-react"
import superDad from "../../../public/img/birthday/Super-dad-300x300.png"
import Mud from "../../../public/img/cupcake/Chocolate_Mud_Cup_Cake_1024x1024@2x.webp"
import sublime from '../../../public/img/birthday/Sublime-Lime-300x300.webp'
import IceCream from "../../../public/img/cupcake/ice cream.jpeg"
import BirthDay from "../../../public/img/birthday/CC1153F7-B40C-4CB0-A654-746787BA408B-460x460.webp"
import Cupcake from "../../../public/img/cupcake/velvet.jpeg"
import Pastries from "../../../public/img/birthday/Cheery-Sunflower-300x300.webp"
import wedding from '../../../public/img/birthday/35_621823e7-857a-4870-856d-4a29ab2da622_1024x1024@2x.webp'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ProductsPage() {
  return (
    <div className="px-10 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Our Cakes</h1>
          <p className="text-gray-600">Discover our delicious range of handcrafted cakes</p>
        </div>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="all">
                <DropdownMenuRadioItem value="all">All Cakes</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="birthday">Birthday Cakes</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="wedding">Wedding Cakes</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="cupcakes">Cupcakes</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="pastries">Pastries</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sort By</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuRadioGroup value="featured">
                <DropdownMenuRadioItem value="featured">Featured</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="price-low">Price: Low to High</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="price-high">Price: High to Low</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
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
  )
}

// Sample data
const products = [
  {
    id: 1,
    name: "Chocolate Truffle Cake",
    slug: "chocolate-truffle-cake",
    description: "Rich chocolate cake with smooth truffle frosting and chocolate ganache.",
    price: 420.99,
    image: superDad,
    category: "birthday",
  },
  {
    id: 2,
    name: "Strawberry Shortcake",
    slug: "strawberry-shortcake",
    description: "Light vanilla sponge with fresh strawberries and whipped cream.",
    price: 380.99,
    image: wedding,
    category: "birthday",
  },
  {
    id: 3,
    name: "Red Velvet Delight",
    slug: "red-velvet-delight",
    description: "Classic red velvet cake with cream cheese frosting and red velvet crumbs.",
    price: 440.99,
    image: Cupcake,
    badge: "New",
    category: "birthday",
  },
  {
    id: 4,
    name: "Lemon Blueberry Cake",
    slug: "lemon-blueberry-cake",
    description: "Tangy lemon cake with fresh blueberries and lemon buttercream.",
    price: 390.99,
    image: BirthDay,
    category: "birthday",
  },
  {
    id: 5,
    name: "Tiramisu Cake",
    slug: "tiramisu-cake",
    description: "Coffee-soaked layers with mascarpone cream and cocoa dusting.",
    price: 460.99,
    image: IceCream,
    category: "pastries",
  },
  {
    id: 6,
    name: "Black Forest Cake",
    slug: "black-forest-cake",
    description: "Chocolate sponge with cherries, whipped cream, and chocolate shavings.",
    price: 450.99,
    image: Pastries,
    category: "birthday",
  },
  {
    id: 7,
    name: "Vanilla Buttercream Wedding Cake",
    slug: "vanilla-buttercream-wedding-cake",
    description: "Three-tier vanilla cake with smooth buttercream frosting and elegant decorations.",
    price: 249.99,
    image: sublime,
    category: "wedding",
  },
  {
    id: 8,
    name: "Chocolate Cupcakes (6 pack)",
    slug: "chocolate-cupcakes",
    description: "Moist chocolate cupcakes with chocolate buttercream frosting.",
    price: 180.99,
    image: Mud,
    category: "cupcakes",
  },

]
