import Link from "next/link"
import Image from "next/image"
import { Filter } from "lucide-react"
import Image1 from "../../../public/img/birthday/Super-dad-300x300.png"
import Image3 from '../../../public/img/birthday/Sublime-Lime-300x300.webp'
import Image5 from "../../../public/img/birthday/CC1153F7-B40C-4CB0-A654-746787BA408B-460x460.webp"
import Image7 from "../../../public/img/birthday/Cheery-Sunflower-300x300.webp"
import Image8 from '../../../public/img/birthday/35_621823e7-857a-4870-856d-4a29ab2da622_1024x1024@2x.webp'
import Image9 from "../../../public/img/birthday/20200121-_DSC9467_Original-1-300x300.webp"
import Image11 from "../../../public/img/birthday/MSA_1941-1-300x300.webp"
import Image12 from "../../../public/img/birthday/The-Crowd-Pleaser-300x300.webp"
import Image13 from "../../../public/img/birthday/images (1).jpeg"
import Image14 from "../../../public/img/cupcake/Chocolate_Mousse_Cup_1024x1024@2x.webp"
import Image10 from "../../../public/img/cupcake/MSA_1773_Original-1-460x460.webp"
import Image6 from "../../../public/img/cupcake/velvet.jpeg"
import Image4 from "../../../public/img/cupcake/ice cream.jpeg"
import Image2 from "../../../public/img/cupcake/Chocolate_Mud_Cup_Cake_1024x1024@2x.webp"
import Image15 from "../../../public/img/cupcake/images.jpeg"
import Image16 from "../../../public/img/cupcake/fudge.webp"
import Image17 from "../../../public/img/cupcake/TCF-12th-oct01093_Original-1-1-768x768.webp"


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
                <DropdownMenuRadioItem value="pastries">Normal Cakes</DropdownMenuRadioItem>
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
    image: Image1,
    category: "birthday",
  },
  {
    id: 2,
    name: "Strawberry Shortcake",
    slug: "strawberry-shortcake",
    description: "Light vanilla sponge with fresh strawberries and whipped cream.",
    price: 380.99,
    image: Image2,
    category: "birthday",
  },
  {
    id: 3,
    name: "Red Velvet Delight",
    slug: "red-velvet-delight",
    description: "Classic red velvet cake with cream cheese frosting and red velvet crumbs.",
    price: 440.99,
    image: Image3,
    badge: "New",
    category: "birthday",
  },
  {
    id: 4,
    name: "Lemon Blueberry Cake",
    slug: "lemon-blueberry-cake",
    description: "Tangy lemon cake with fresh blueberries and lemon buttercream.",
    price: 390.99,
    image: Image4,
    category: "birthday",
  },
  {
    id: 5,
    name: "Tiramisu Cake",
    slug: "tiramisu-cake",
    description: "Coffee-soaked layers with mascarpone cream and cocoa dusting.",
    price: 460.99,
    image: Image5,
    category: "Normal Cakes",
  },
  {
    id: 6,
    name: "Black Forest Cake",
    slug: "black-forest-cake",
    description: "Chocolate sponge with cherries, whipped cream, and chocolate shavings.",
    price: 450.99,
    image: Image6,
    category: "birthday",
  },
  {
    id: 7,
    name: "Vanilla Buttercream Wedding Cake",
    slug: "vanilla-buttercream-wedding-cake",
    description: "Three-tier vanilla cake with smooth buttercream frosting and elegant decorations.",
    price: 249.99,
    image:Image7,
    category: "wedding",
  },
  {
    id: 8,
    name: "Chocolate Cupcakes (6 pack)",
    slug: "chocolate-cupcakes",
    description: "Moist chocolate cupcakes with chocolate buttercream frosting.",
    price: 180.99,
    image: Image8,
    category: "cupcakes",
  },
 {
    id: 9,
    name: "Chocolate Cupcakes (6 pack)",
    slug: "chocolate-cupcakes",
    description: "Moist chocolate cupcakes with chocolate buttercream frosting.",
    price: 180.99,
    image: Image9,
    category: "cupcakes",
  },
 {
    id: 10,
    name: "Chocolate Cupcakes (6 pack)",
    slug: "chocolate-cupcakes",
    description: "Moist chocolate cupcakes with chocolate buttercream frosting.",
    price: 180.99,
    image: Image10,
    category: "cupcakes",
  },
 {
    id: 11,
    name: "Chocolate Cupcakes (6 pack)",
    slug: "chocolate-cupcakes",
    description: "Moist chocolate cupcakes with chocolate buttercream frosting.",
    price: 180.99,
    image: Image11,
    category: "cupcakes",
  },
 {
    id: 12,
    name: "Chocolate Cupcakes (6 pack)",
    slug: "chocolate-cupcakes",
    description: "Moist chocolate cupcakes with chocolate buttercream frosting.",
    price: 180.99,
    image: Image12,
    category: "cupcakes",
  },
 {
    id: 13,
    name: "Chocolate Cupcakes (6 pack)",
    slug: "chocolate-cupcakes",
    description: "Moist chocolate cupcakes with chocolate buttercream frosting.",
    price: 180.99,
    image: Image13,
    category: "cupcakes",
  },
  {
    id: 14,
    name: "Chocolate Cupcakes (6 pack)",
    slug : "chocolate-cupcakes",
    description: "",
    price : 180.99,
    image : Image14,
    category : "cupcakes",
  },
  {
    id: 15,
    name : "Chocolate Cupcakes (6 pack)",
    slug : "chocolate-cupcakes",
    description : "",
    price : 180.99,
    image : Image15,
    category : "cupcakes",
  },
  {
    id: 16,
    name : "Chocolate Cupcakes (6 pack)",
    slug : "chocolate-cupcakes",
    description : "",
    price : 180.99,
    image : Image16,
    category : "cupcakes",
  },
  {
    id : 17,
    name : "Chocolate Cupcakes (6 pack)",
    slug : "chocolate-cupcakes",
    description : "",
    price : 180.99,
    image : Image17,
    category : "cupcakes",
  }

]
