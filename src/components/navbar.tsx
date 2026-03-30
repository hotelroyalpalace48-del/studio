"use client"

import { useState, useEffect } from 'react'
import { ShoppingCart, User, Menu, Search, Ruler, Clover, X, Heart, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCart } from '@/hooks/use-cart'
import { useWishlist } from '@/hooks/use-wishlist'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import LinkNext from 'next/link'
import { useUser, useAuth, initiateAnonymousSignIn } from '@/firebase'

export function Navbar() {
  const { cart } = useCart()
  const { wishlist } = useWishlist()
  const { user, isUserLoading } = useUser()
  const auth = useAuth()
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const wishlistCount = wishlist.length
  const router = useRouter()
  
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

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
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSignIn = () => {
    if (auth) initiateAnonymousSignIn(auth)
  }

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300 ease-in-out",
        !isVisible ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <LinkNext href="/" className="flex items-center space-x-2 group">
            <Clover className="h-7 w-7 text-primary transition-transform group-hover:rotate-12" />
            <span className="font-headline text-xl md:text-2xl font-bold text-primary tracking-tight uppercase">Mogra Design Studio</span>
          </LinkNext>
          <nav className="hidden xl:flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em]">
            <LinkNext href="/shop" className="hover:text-primary transition-colors">Shop All</LinkNext>
            <LinkNext href="/shop?category=Kurtis" className="hover:text-primary transition-colors">Kurtis</LinkNext>
            <LinkNext href="/shop?category=Palazzos" className="hover:text-primary transition-colors">Palazzos</LinkNext>
            <LinkNext href="/shop?category=Materials" className="hover:text-primary transition-colors">Materials</LinkNext>
            <LinkNext href="/shop?category=Ethnic" className="hover:text-primary transition-colors">Ethnic</LinkNext>
            <LinkNext href="/shop?category=Formal" className="hover:text-primary transition-colors">Formal</LinkNext>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-muted/50 px-4 py-2 rounded-full border border-transparent focus-within:border-primary/20 transition-all">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patterns..." 
              className="bg-transparent text-[10px] font-medium outline-none w-32 focus:w-48 transition-all placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery('')} className="ml-2 hover:text-primary">
                <X className="h-3 w-3" />
              </button>
            )}
          </form>
          
          <LinkNext href="/wishlist">
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 hover:text-primary transition-colors">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-background">
                  {wishlistCount}
                </span>
              )}
            </Button>
          </LinkNext>

          <LinkNext href="/cart">
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 hover:text-primary transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-background">
                  {cartCount}
                </span>
              )}
            </Button>
          </LinkNext>

          {!user && !isUserLoading ? (
            <Button variant="ghost" size="icon" onClick={handleSignIn} className="hover:bg-primary/5 hover:text-primary transition-colors">
              <LogIn className="h-5 w-5" />
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/5 hover:text-primary transition-colors">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl border-muted/20">
                <DropdownMenuItem asChild className="rounded-lg">
                  <LinkNext href="/orders" className="flex items-center gap-2 cursor-pointer font-medium text-xs">
                    Studio History
                  </LinkNext>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg">
                  <LinkNext href="/measurements" className="flex items-center gap-2 cursor-pointer font-medium text-xs">
                    <Ruler className="h-4 w-4 text-primary" /> Bespoke Profile
                  </LinkNext>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem asChild className="rounded-lg">
                  <LinkNext href="/admin" className="cursor-pointer font-medium text-xs">Studio Management</LinkNext>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}