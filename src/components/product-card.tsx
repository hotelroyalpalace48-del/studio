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
      <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-secondary mb-10 transition-all duration-[1.5s] ease-out luxury-shadow group-hover:-translate-y-4">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-[3s] ease-out group-hover:scale-110"
          data-ai-hint="fashion attire"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-primary/10 transition-colors duration-1000" />
        
        {product.isNew && (
          <Badge className="absolute top-8 left-8 bg-white/90 backdrop-blur-md text-primary hover:bg-white border-none text-[10px] font-bold uppercase tracking-[0.3em] px-6 py-2 shadow-sm">New Silhouette</Badge>
        )}
        
        <button 
          onClick={handleHeartClick}
          className={cn(
            "absolute top-8 right-8 z-20 p-4 rounded-full transition-all duration-700 transform",
            isInWishlist(product.id) 
              ? "bg-primary text-white scale-110 shadow-xl" 
              : "bg-white/80 backdrop-blur-md text-muted-foreground opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 hover:text-red-500 hover:scale-110"
          )}
        >
          <Heart className={cn("h-4 w-4", isInWishlist(product.id) && "fill-current")} />
        </button>

        <div className="absolute bottom-8 right-8 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[1s] delay-150">
          <div className="bg-white/95 backdrop-blur-md p-5 rounded-full text-primary shadow-2xl luxury-shadow border border-white/20">
            <ArrowUpRight className="h-7 w-7" />
          </div>
        </div>
      </div>
      
      <div className="space-y-4 px-4">
        <div className="flex justify-between items-baseline">
          <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-muted-foreground/50">{product.category}</p>
          <div className="flex items-center gap-4">
             {product.originalPrice && (
              <span className="text-sm text-muted-foreground/30 line-through font-medium tracking-tighter">${product.originalPrice}</span>
            )}
            <span className="font-bold text-primary text-2xl tracking-tighter">${product.price}</span>
          </div>
        </div>
        <h3 className="font-headline text-3xl group-hover:text-primary transition-colors duration-700 leading-tight italic font-medium">{product.name}</h3>
      </div>
    </Link>
  )
}
