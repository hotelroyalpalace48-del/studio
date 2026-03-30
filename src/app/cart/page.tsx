
"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/hooks/use-cart'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total } = useCart()

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center space-y-6">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="font-headline text-4xl font-bold">Your bag is empty</h1>
        <p className="text-muted-foreground max-w-md mx-auto">Look like you haven't added any pieces to your bag yet. Start exploring our exquisite collections.</p>
        <Button asChild className="bg-primary hover:bg-primary/90 rounded-full px-12 py-6 uppercase tracking-widest text-xs font-bold">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-headline text-5xl font-bold mb-12">Shopping Bag</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        {/* Items */}
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-6 items-center">
              <div className="relative w-32 aspect-[3/4] rounded-lg overflow-hidden flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-headline text-xl font-bold">{item.name}</h3>
                  <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-red-500 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">Boutique Item</p>
                <div className="flex justify-between items-center pt-4">
                  <div className="flex items-center border rounded-full">
                    <button 
                      className="p-2 hover:text-primary transition-colors disabled:opacity-30" 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      className="p-2 hover:text-primary transition-colors" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <span className="font-bold text-primary">${item.price * item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-muted/30 rounded-xl p-8 space-y-6">
          <h2 className="font-headline text-2xl font-bold border-b pb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${total}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium text-primary">Complimentary</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span className="font-medium">Calculated at checkout</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">${total}</span>
            </div>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 rounded-full py-6 uppercase tracking-widest text-xs font-bold" asChild>
            <Link href="/checkout">Checkout <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">Secure checkout by Mogra Pay</p>
        </div>
      </div>
    </div>
  )
}
