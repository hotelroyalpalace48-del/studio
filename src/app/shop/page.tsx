
"use client"

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase'
import { collection } from 'firebase/firestore'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { SlidersHorizontal, Loader2 } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function ShopPage() {
  const firestore = useFirestore()
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get('category')

  const productsQuery = useMemoFirebase(() => collection(firestore, 'products'), [firestore])
  const { data: allProducts, isLoading } = useCollection(productsQuery)

  const filteredProducts = allProducts 
    ? categoryFilter 
      ? allProducts.filter(p => p.category === categoryFilter)
      : allProducts
    : [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-6">
        <div className="space-y-2">
          <h1 className="font-headline text-5xl font-bold">Collections</h1>
          <p className="text-muted-foreground">Browse our exquisite range of handcrafted attire.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Button variant="outline" className="flex items-center gap-2 rounded-full border-muted text-muted-foreground hover:text-primary hover:border-primary">
            <SlidersHorizontal className="h-4 w-4" /> Filter & Sort
          </Button>
          <div className="flex-1 md:flex-none border-b border-muted pb-1 text-sm text-muted-foreground">
            {filteredProducts.length} Products
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Fetching the latest collection...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={{
              ...product,
              images: product.imageUrls || []
            }} />
          ))}
        </div>
      )}

      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-24 bg-muted/20 rounded-lg">
          <p className="text-muted-foreground">No products found in this category.</p>
        </div>
      )}
    </div>
  )
}
