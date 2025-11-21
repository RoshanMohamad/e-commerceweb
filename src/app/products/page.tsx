import { Filter } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { Product } from "@/types/database"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/product-grid"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data for fallback
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Chocolate Truffle Cake",
    slug: "chocolate-truffle-cake",
    price: 420.99,
    image_url: "/img/birthday/Super-dad-300x300.png",
    badge: "New",
    description: "A rich chocolate truffle cake.",
    category: "birthday",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: "Strawberry Shortcake",
    slug: "strawberry-shortcake",
    price: 380.99,
    image_url: "/img/cupcake/Chocolate_Mud_Cup_Cake_1024x1024@2x.webp",
    description: "Fresh strawberries and cream.",
    category: "cupcakes",
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: "Red Velvet Delight",
    slug: "red-velvet-delight",
    price: 440.99,
    image_url: "/img/birthday/Sublime-Lime-300x300.webp",
    badge: "New",
    description: "Classic red velvet with cream cheese frosting.",
    category: "birthday",
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    name: "Lemon Blueberry Cake",
    slug: "lemon-blueberry-cake",
    price: 390.99,
    image_url: "/img/cupcake/ice cream.jpeg",
    description: "Zesty lemon with fresh blueberries.",
    category: "cupcakes",
    created_at: new Date().toISOString()
  }
]

// Function to fetch products from Supabase
async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
    
    if (error) {
      console.warn('Error fetching products from Supabase, using sample data:', error.message)
      return sampleProducts
    }
    
    return (data as Product[]) || sampleProducts
  } catch (error) {
    console.warn('Exception fetching products, using sample data:', error)
    return sampleProducts
  }
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

      <ProductGrid products={products} />
    </div>
  )
}
