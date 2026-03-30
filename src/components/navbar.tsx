
"use client"

import Link from 'next/link'
import { ShoppingCart, User, Menu, Search, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCart } from '@/hooks/use-cart'

export function Navbar() {
  const { cart } = useCart()
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-headline text-3xl font-bold text-primary tracking-tighter">MOGRA</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/shop" className="hover:text-primary transition-colors uppercase tracking-widest">Shop</Link>
            <Link href="/shop?category=Ethnic" className="hover:text-primary transition-colors uppercase tracking-widest">Ethnic</Link>
            <Link href="/shop?category=Formal" className="hover:text-primary transition-colors uppercase tracking-widest">Formal</Link>
            <Link href="/shop?category=Casual" className="hover:text-primary transition-colors uppercase tracking-widest">Casual</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-muted px-3 py-1.5 rounded-full">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <input 
              placeholder="Search collections..." 
              className="bg-transparent text-xs outline-none w-32 focus:w-48 transition-all"
            />
          </div>
          
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/orders">My Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin">Admin Panel</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
