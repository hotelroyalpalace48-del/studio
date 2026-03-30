
"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, User, Menu, Search, Ruler } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCart } from '@/hooks/use-cart'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { cart } = useCart()
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
        
        setLastScrollY(currentScrollY)
      }
    }

    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY])

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300 ease-in-out",
        !isVisible ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-headline text-xl md:text-2xl font-bold text-primary tracking-tight uppercase">Mogra Design Studio</span>
          </Link>
          <nav className="hidden xl:flex items-center gap-6 text-xs font-medium">
            <Link href="/shop" className="hover:text-primary transition-colors uppercase tracking-widest">Shop All</Link>
            <Link href="/shop?category=Kurtis" className="hover:text-primary transition-colors uppercase tracking-widest">Kurtis</Link>
            <Link href="/shop?category=Palazzos" className="hover:text-primary transition-colors uppercase tracking-widest">Palazzos</Link>
            <Link href="/shop?category=Dress Materials" className="hover:text-primary transition-colors uppercase tracking-widest">Materials</Link>
            <Link href="/shop?category=Ethnic" className="hover:text-primary transition-colors uppercase tracking-widest">Ethnic</Link>
            <Link href="/shop?category=Formal" className="hover:text-primary transition-colors uppercase tracking-widest">Formal</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-muted px-3 py-1.5 rounded-full">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <input 
              placeholder="Search collections..." 
              className="bg-transparent text-[10px] outline-none w-32 focus:w-48 transition-all"
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
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/orders" className="flex items-center gap-2 cursor-pointer">
                  My Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/measurements" className="flex items-center gap-2 cursor-pointer">
                  <Ruler className="h-4 w-4" /> My Measurements
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin" className="cursor-pointer">Admin Panel</Link>
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
