
"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Heart } from 'lucide-react'
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
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-4">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          data-ai-hint="fashion dress"
        />
        {product.isNew && (
          <Badge className="absolute top-4 left-4 bg-primary hover:bg-primary">New Arrival</Badge>
        )}
        {product.originalPrice && (
          <Badge variant="destructive" className="absolute top-4 right-4">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
          </Badge>
        )}
        
        <button 
          onClick={handleHeartClick}
          className={cn(
            "absolute bottom-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-all transform scale-0 group-hover:scale-100",
            isInWishlist(product.id) ? "text-red-500 scale-100" : "text-muted-foreground hover:text-red-500"
          )}
        >
          <Heart className={cn("h-4 w-4", isInWishlist(product.id) && "fill-current")} />
        </button>
      </div>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{product.category}</p>
        <h3 className="font-headline text-lg group-hover:text-primary transition-colors">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="font-bold text-primary">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
