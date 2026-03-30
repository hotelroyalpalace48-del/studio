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
      <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-secondary mb-8 transition-all duration-1000 luxury-shadow group-hover:-translate-y-3">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
          data-ai-hint="fashion dress"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-1000" />
        
        {product.isNew && (
          <Badge className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-primary hover:bg-white border-none text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 shadow-sm">New Silhouette</Badge>
        )}
        
        <button 
          onClick={handleHeartClick}
          className={cn(
            "absolute top-6 right-6 z-20 p-3 rounded-full transition-all duration-700 transform",
            isInWishlist(product.id) 
              ? "bg-primary text-white scale-100 shadow-xl" 
              : "bg-white/80 backdrop-blur-md text-muted-foreground opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 hover:text-red-500 hover:scale-110"
          )}
        >
          <Heart className={cn("h-4 w-4", isInWishlist(product.id) && "fill-current")} />
        </button>

        <div className="absolute bottom-6 right-6 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100">
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-full text-primary shadow-2xl luxury-shadow">
            <ArrowUpRight className="h-6 w-6" />
          </div>
        </div>
      </div>
      
      <div className="space-y-3 px-2">
        <div className="flex justify-between items-baseline">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground/60">{product.category}</p>
          <div className="flex items-center gap-3">
             {product.originalPrice && (
              <span className="text-xs text-muted-foreground/40 line-through font-medium tracking-tighter">${product.originalPrice}</span>
            )}
            <span className="font-bold text-primary text-xl tracking-tight">${product.price}</span>
          </div>
        </div>
        <h3 className="font-headline text-2xl group-hover:text-primary transition-colors duration-500 leading-tight italic">{product.name}</h3>
      </div>
    </Link>
  )
}
