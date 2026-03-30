
"use client"

import Link from 'next/link'
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useWishlist } from '@/hooks/use-wishlist'
import { ProductCard } from '@/components/product-card'

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist()

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center space-y-6">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
          <Heart className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="font-headline text-4xl font-bold">Your wishlist is empty</h1>
        <p className="text-muted-foreground max-w-md mx-auto">Save the designs you love for later. Explore our collections to find your next favorite piece.</p>
        <Button asChild className="bg-primary hover:bg-primary/90 rounded-full px-12 py-6 uppercase tracking-widest text-xs font-bold">
          <Link href="/shop">Explore Collections</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-6">
        <div className="space-y-2">
          <h1 className="font-headline text-5xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground italic tracking-wide">Designs curated for your unique style.</p>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {wishlist.length} Saved Patterns
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {wishlist.map((item) => (
          <div key={item.id} className="relative group">
            <ProductCard 
              product={{
                id: item.id,
                name: item.name,
                price: item.price,
                images: [item.image],
                category: item.category
              }} 
            />
            <button 
              onClick={() => toggleWishlist(item)}
              className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
