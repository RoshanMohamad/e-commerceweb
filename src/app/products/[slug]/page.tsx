"use client"

import { useState, use, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { Product } from "@/types/database"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { toast } from "sonner"

// Fetches a single product by slug from Supabase
async function getProductBySlugFromDB(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products') // Ensure 'products' is your table name in Supabase
    .select('*')
    .eq('slug', slug)
    .single() // Expects a single row, returns an error if 0 or more than 1 found

  if (error) {
    console.error('Error fetching product by slug:', error.message)
    return null
  }
  return data as Product | null
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const  {slug}  = use(params)
  const [product, setProduct] = useState<Product | null | undefined>(undefined) // undefined for loading state
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    if (slug) {
      setProduct(undefined); // Set to loading state before fetching
      getProductBySlugFromDB(slug).then(fetchedProduct => {
        setProduct(fetchedProduct);
      });
    }
  }, [slug])

  if (product === undefined) { // Loading state
    return (
      <div className="px-10 py-20 text-center">
        <h1 className="text-2xl font-bold">Loading product...</h1>
        {/* You could add a spinner component here */}
      </div>
    );
  }

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
      image: product.image_url || "/placeholder.svg", // Use image_url from Supabase
      quantity,
});

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
          <Image
            src={product.image_url || "/placeholder.svg"} // Use image_url from Supabase
            alt={product.name}
            fill
            className="object-cover"
            priority
          sizes="(max-width: 768px) 100vw,"/>
          {product.badge && (
            <span className="absolute top-4 right-4 bg-pink-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-bold text-pink-600 mb-4">Rs.{product.price.toFixed(2)}</p>

          <div className="border-t border-b py-4 my-6">
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-700 mb-4">
              Our cakes are made fresh to order with high-quality ingredients. Each cake serves approximately 8-10
              people and comes in a beautiful gift box.
            </p>
            {product.category && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Category:</span>
                <Link href={`/products?category=${product.category.toString()}`} className="text-pink-600 hover:underline capitalize">
                  {product.category.toString()}
                </Link>
              </div>
            )}
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


