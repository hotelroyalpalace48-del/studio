"use client"

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase'
import { collection, query, orderBy } from 'firebase/firestore'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { SlidersHorizontal, Loader2, SearchX, Clover } from 'lucide-react'
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
    <div className="container mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Clover className="h-6 w-6 text-primary" />
            <h1 className="font-headline text-6xl md:text-7xl font-bold">Collections</h1>
          </div>
          <div className="flex items-center gap-4">
            {categoryFilter && (
              <span className="text-primary italic font-headline text-3xl">&mdash; {categoryFilter}</span>
            )}
            <p className="text-muted-foreground italic tracking-widest text-lg">Handcrafted elegance for the modern woman.</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
          {searchQuery && (
            <div className="bg-primary/10 text-primary px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest border border-primary/20 backdrop-blur-sm">
              Search Results: "{searchQuery}"
            </div>
          )}
          <div className="flex items-center gap-4">
            <Button variant="outline" className="flex items-center gap-3 rounded-full border-muted text-muted-foreground hover:text-primary hover:border-primary text-[10px] font-bold uppercase tracking-widest px-8 py-6 h-auto">
              <SlidersHorizontal className="h-4 w-4" /> Filter & Sort
            </Button>
            <div className="border-b border-muted pb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground whitespace-nowrap min-w-[120px] text-right">
              {filteredProducts.length} Silhouettes
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-40 space-y-8">
          <Loader2 className="h-14 w-14 animate-spin text-primary/30" />
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-muted-foreground animate-pulse">Curating the collections...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={{
              ...product,
              images: product.imageUrls || []
            }} />
          ))}
        </div>
      ) : (
        <div className="text-center py-40 bg-secondary/10 rounded-[4rem] space-y-8 border-2 border-dashed border-primary/10">
          <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center mx-auto shadow-sm luxury-shadow">
            <SearchX className="h-10 w-10 text-muted-foreground/40" />
          </div>
          <div className="space-y-4">
            <p className="font-headline text-4xl font-bold italic">No patterns found</p>
            <p className="text-muted-foreground max-w-md mx-auto text-lg font-light">Adjust your search or filters to discover our other silhouettes.</p>
          </div>
          <Button variant="outline" onClick={() => window.location.href='/shop'} className="rounded-full px-12 py-7 border-primary text-primary hover:bg-primary hover:text-white transition-all text-[11px] font-bold uppercase tracking-widest h-auto">
            View All Collections
          </Button>
        </div>
      )}
    </div>
  )
}
