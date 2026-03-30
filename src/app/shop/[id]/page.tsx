
"use client"

import { use, useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getProductById } from '@/app/lib/products'
import { useCart } from '@/hooks/use-cart'
import { useWishlist } from '@/hooks/use-wishlist'
import { AIStylist } from '@/components/ai-stylist'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = getProductById(id)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()
  const router = useRouter()

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="font-headline text-4xl mb-4">Product Not Found</h1>
        <Button onClick={() => router.push('/shop')}>Back to Shop</Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your shopping bag.`,
    })
  }

  const handleToggleWishlist = () => {
    const added = toggleWishlist(product)
    toast({
      title: added ? "Saved to wishlist" : "Removed from wishlist",
      description: added ? `${product.name} is now in your favorites.` : `${product.name} has been removed.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
              data-ai-hint="fashion product"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-md overflow-hidden border cursor-pointer hover:border-primary transition-colors">
                <Image src={img} alt={`${product.name} thumbnail ${i}`} fill className="object-cover" data-ai-hint="fashion detail" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-primary border-primary rounded-full uppercase tracking-tighter text-[10px]">
                {product.category}
              </Badge>
              {product.isNew && <Badge className="bg-primary hover:bg-primary rounded-full uppercase tracking-tighter text-[10px]">New Collection</Badge>}
            </div>
            <h1 className="font-headline text-4xl md:text-5xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-4 pt-2">
              <span className="text-3xl font-bold text-primary">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed text-lg">
            {product.description}
          </p>

          <Separator />

          <div className="space-y-4">
            <p className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Studio Features</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-primary" /> <span>Complimentary Shipping</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw className="h-5 w-5 text-primary" /> <span>14-Day Returns</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ShieldCheck className="h-5 w-5 text-primary" /> <span>Bespoke Quality</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4">
            <div className="flex gap-4">
              <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-full py-6 uppercase tracking-widest text-xs font-bold" onClick={handleAddToCart}>
                <ShoppingBag className="mr-2 h-4 w-4" /> Add to Bag
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleToggleWishlist}
                className={cn(
                  "w-16 h-16 rounded-full border-muted p-0 transition-colors",
                  isInWishlist(product.id) ? "text-red-500 border-red-200 bg-red-50" : "text-muted-foreground hover:text-red-500 hover:border-red-500"
                )}
              >
                <Heart className={cn("h-6 w-6", isInWishlist(product.id) && "fill-current")} />
              </Button>
            </div>
            
            <AIStylist 
              dressName={product.name} 
              dressDescription={product.description} 
              imageUrl={product.images[0]} 
            />
          </div>

          <div className="pt-8 text-xs text-muted-foreground">
            <p>SKU: MOG-{id.padStart(4, '0')}</p>
            <p className="mt-2">Fabric: Premium Cotton / Silk Blend (Varies by pattern)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
