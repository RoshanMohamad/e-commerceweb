import { supabase } from './supabase'
import type { Product } from '@/types/database'

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('in_stock', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    throw new Error('Failed to fetch products')
  }

  return data || []
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('in_stock', true)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null // Product not found
    }
    console.error('Error fetching product:', error)
    throw new Error('Failed to fetch product')
  }

  return data
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .eq('in_stock', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products by category:', error)
    throw new Error('Failed to fetch products')
  }

  return data || []
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('in_stock', true)
    .not('badge', 'is', null)
    .order('created_at', { ascending: false })
    .limit(4)

  if (error) {
    console.error('Error fetching featured products:', error)
    throw new Error('Failed to fetch featured products')
  }

  return data || []
}
