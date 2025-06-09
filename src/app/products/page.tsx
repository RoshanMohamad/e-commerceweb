import Link from "next/link"
import Image from "next/image"
import { Filter } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { Product } from "@/types/database"
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

// Function to fetch products from Supabase
async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products') // Ensure 'products' is your table name in Supabase
    .select('*')
    // .order('created_at', { ascending: false }) // Optional: order products

  if (error) {
    console.error('Error fetching products:', error.message)
    // In a real app, you might want to throw the error or return a specific error state
    return []
  }
  return (data as Product[]) || []
}

export default async function ProductsPage() {
  const products = await getProducts()
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
                <Image
                  src={product.image_url || "/placeholder.svg"} // Use image_url from Supabase
                  alt={product.name}
                  fill
                  className="object-cover"
                />
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
