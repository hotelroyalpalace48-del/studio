"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Heart, ArrowUpRight } from 'lucide-react'
import { type Product } from '@/app/lib/products'
import { useWishlist } from '@/hooks/use-wishlist'
import { cn } from '@/lib/utils'

export function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isInWishlist } = useWishlist()

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  return (
    <Link href={`/shop/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary mb-6 transition-all duration-700 luxury-shadow group-hover:-translate-y-2">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          data-ai-hint="fashion dress"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
        
        {product.isNew && (
          <Badge className="absolute top-5 left-5 bg-white/90 backdrop-blur-md text-primary hover:bg-white border-none text-[10px] font-bold uppercase tracking-widest px-3 py-1">New Arrival</Badge>
        )}
        
        <button 
          onClick={handleHeartClick}
          className={cn(
            "absolute top-5 right-5 z-20 p-2.5 rounded-full transition-all duration-500 transform",
            isInWishlist(product.id) 
              ? "bg-primary text-white scale-100" 
              : "bg-white/80 backdrop-blur-md text-muted-foreground opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:text-red-500"
          )}
        >
          <Heart className={cn("h-4 w-4", isInWishlist(product.id) && "fill-current")} />
        </button>

        <div className="absolute bottom-5 right-5 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
          <div className="bg-white/90 backdrop-blur-md p-3 rounded-full text-primary shadow-lg">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2 px-1">
        <div className="flex justify-between items-baseline">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">{product.category}</p>
          <div className="flex items-center gap-2">
             {product.originalPrice && (
              <span className="text-xs text-muted-foreground/50 line-through font-medium">${product.originalPrice}</span>
            )}
            <span className="font-bold text-primary text-lg">${product.price}</span>
          </div>
        </div>
        <h3 className="font-headline text-xl group-hover:text-primary transition-colors duration-300 leading-tight">{product.name}</h3>
      </div>
    </Link>
  )
}