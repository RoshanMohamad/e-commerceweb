"use client"

import { useState ,use} from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react"
import superDad from "../../../../public/img/birthday/Super-dad-300x300.png"
import Mud from "../../../../public/img/cupcake/Chocolate_Mud_Cup_Cake_1024x1024@2x.webp"
import sublime from '../../../../public/img/birthday/Sublime-Lime-300x300.webp'
import IceCream from "../../../../public/img/cupcake/ice cream.jpeg"
import BirthDay from "../../../../public/img/birthday/CC1153F7-B40C-4CB0-A654-746787BA408B-460x460.webp"
import Cupcake from "../../../../public/img/cupcake/velvet.jpeg"
import Pastries from "../../../../public/img/birthday/Cheery-Sunflower-300x300.webp"
import wedding from '../../../../public/img/birthday/35_621823e7-857a-4870-856d-4a29ab2da622_1024x1024@2x.webp'
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { toast } from "sonner"

// This would typically come from a database
const getProductBySlug = (slug: string) => {
  return products.find((product) => product.slug === slug) || null
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const  {slug}  = use(params)
  const product = getProductBySlug(slug)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  if (!product) {
    return (
      <div className="px-10 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-8">The product you are looking for does not exist.</p>
        <Button asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    )
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    })

    toast( `${quantity} × ${product.name} added to your cart`,
    )
  }

  return (
    <div className="px-10 py-10">
      <Link href="/products" className="flex items-center text-sm mb-8 hover:text-pink-600">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" priority />
          {product.badge && (
            <span className="absolute top-4 right-4 bg-pink-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-bold text-pink-600 mb-4">${product.price.toFixed(2)}</p>

          <div className="border-t border-b py-4 my-6">
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-700 mb-4">
              Our cakes are made fresh to order with high-quality ingredients. Each cake serves approximately 8-10
              people and comes in a beautiful gift box.
            </p>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Category:</span>
              <Link href={`/products?category=${product.category}`} className="text-pink-600 hover:underline">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <span className="mr-4 font-semibold">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={increaseQuantity} className="h-10 w-10 rounded-none">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button onClick={handleAddToCart} className="w-full md:w-auto" size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
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
    description:
      "Rich chocolate cake with smooth truffle frosting and chocolate ganache. Made with premium dark chocolate and fresh cream, this cake is perfect for chocolate lovers. Each bite delivers an intense chocolate flavor with a melt-in-your-mouth texture.",
    price: 42.99,
    image: superDad,
    badge: "Bestseller",
    category: "birthday",
  },
  {
    id: 2,
    name: "Strawberry Shortcake",
    slug: "strawberry-shortcake",
    description:
      "Light vanilla sponge with fresh strawberries and whipped cream. This classic cake features layers of fluffy sponge cake, sweet strawberries, and light whipped cream frosting. It's a refreshing choice for spring and summer celebrations.",
    price: 38.99,
    image: Pastries,
    category: "birthday",
  },
  {
    id: 3,
    name: "Red Velvet Delight",
    slug: "red-velvet-delight",
    description:
      "Classic red velvet cake with cream cheese frosting and red velvet crumbs. Our red velvet cake has a subtle cocoa flavor with a beautiful red color. The tangy cream cheese frosting perfectly complements the soft, moist cake layers.",
    price: 44.99,
    image: Mud,
    badge: "New",
    category: "birthday",
  },
  {
    id: 4,
    name: "Lemon Blueberry Cake",
    slug: "lemon-blueberry-cake",
    description:
      "Tangy lemon cake with fresh blueberries and lemon buttercream. This bright, flavorful cake combines zesty lemon with sweet blueberries for a perfect balance. The light lemon buttercream adds just the right amount of sweetness.",
    price: 39.99,
    image: sublime,
    category: "birthday",
  },
  {
    id: 5,
    name: "Tiramisu Cake",
    slug: "tiramisu-cake",
    description:
      "Coffee-soaked layers with mascarpone cream and cocoa dusting. Inspired by the classic Italian dessert, this cake features coffee-infused sponge layers, creamy mascarpone filling, and a dusting of cocoa powder on top.",
    price: 46.99,
    image: IceCream,
    category: "pastries",
  },
  {
    id: 6,
    name: "Black Forest Cake",
    slug: "black-forest-cake",
    description:
      "Chocolate sponge with cherries, whipped cream, and chocolate shavings. This traditional German cake combines rich chocolate sponge with tart cherries and light whipped cream. The chocolate shavings add an elegant finishing touch.",
    price: 45.99,
    image: BirthDay,
    category: "birthday",
  },
  {
    id: 7,
    name: "Vanilla Buttercream Wedding Cake",
    slug: "vanilla-buttercream-wedding-cake",
    description:
      "Three-tier vanilla cake with smooth buttercream frosting and elegant decorations. This stunning wedding cake features premium Madagascar vanilla and a silky buttercream finish. It's designed to be the perfect centerpiece for your special day.",
    price: 249.99,
    image: wedding,
    category: "wedding",
  },
  {
    id: 8,
    name: "Chocolate Cupcakes (6 pack)",
    slug: "chocolate-cupcakes",
    description:
      "Moist chocolate cupcakes with chocolate buttercream frosting. These delicious cupcakes are perfect for parties or as a sweet treat. Each cupcake is topped with a swirl of rich chocolate buttercream and chocolate sprinkles.",
    price: 18.99,
    image: Cupcake,
    category: "cupcakes",
  },
]
