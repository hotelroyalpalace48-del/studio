
"use client"

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase'
import { collection, query, orderBy } from 'firebase/firestore'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { SlidersHorizontal, Loader2, SearchX } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function ShopPage() {
  const firestore = useFirestore()
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get('category')
  const searchQuery = searchParams.get('search')?.toLowerCase()

  const productsQuery = useMemoFirebase(() => {
    if (!firestore) return null
    return query(collection(firestore, 'products'), orderBy('createdAt', 'desc'))
  }, [firestore])

  const { data: allProducts, isLoading } = useCollection(productsQuery)

  const filteredProducts = allProducts 
    ? allProducts.filter(p => {
        const matchesCategory = categoryFilter ? p.category === categoryFilter : true
        const matchesSearch = searchQuery 
          ? p.name.toLowerCase().includes(searchQuery) || 
            p.description.toLowerCase().includes(searchQuery) ||
            p.category.toLowerCase().includes(searchQuery)
          : true
        return matchesCategory && matchesSearch
      })
    : [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="font-headline text-5xl font-bold">Collections</h1>
            {categoryFilter && (
              <span className="text-primary italic font-headline text-2xl pt-2">&mdash; {categoryFilter}</span>
            )}
          </div>
          <p className="text-muted-foreground italic tracking-wide">Handcrafted elegance for every occasion.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          {searchQuery && (
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-primary/20">
              Search: "{searchQuery}"
            </div>
          )}
          <Button variant="outline" className="flex items-center gap-2 rounded-full border-muted text-muted-foreground hover:text-primary hover:border-primary text-[10px] font-bold uppercase tracking-widest px-6 py-2">
            <SlidersHorizontal className="h-4 w-4" /> Filter & Sort
          </Button>
          <div className="flex-1 md:flex-none border-b border-muted pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
            {filteredProducts.length} Patterns
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground animate-pulse">Curating the collections...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={{
              ...product,
              images: product.imageUrls || []
            }} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-secondary/10 rounded-3xl space-y-4 border-2 border-dashed">
          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto shadow-sm">
            <SearchX className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <p className="font-headline text-2xl font-bold italic">No patterns found</p>
            <p className="text-sm text-muted-foreground">Adjust your search or filters to find what you're looking for.</p>
          </div>
          <Button variant="outline" onClick={() => window.location.href='/shop'} className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest">
            View All Collections
          </Button>
        </div>
      )}
    </div>
  )
}
