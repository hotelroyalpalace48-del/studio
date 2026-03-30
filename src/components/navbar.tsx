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
        "sticky top-0 z-50 w-full transition-all duration-500 ease-in-out",
        !isVisible ? "-translate-y-full" : "translate-y-0",
        lastScrollY > 20 ? "h-16 glass-panel" : "h-24 bg-transparent border-transparent"
      )}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-12">
          <LinkNext href="/" className="flex items-center space-x-3 group">
            <div className="p-1.5 rounded-full bg-primary/5 transition-colors group-hover:bg-primary/10">
              <Clover className="h-6 w-6 text-primary transition-transform duration-700 group-hover:rotate-[360deg]" />
            </div>
            <span className="font-headline text-xl md:text-2xl font-bold text-primary tracking-tight uppercase">Mogra</span>
          </LinkNext>
          <nav className="hidden xl:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
            <LinkNext href="/shop" className="hover:text-primary transition-colors py-2 relative group">
              Shop All
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </LinkNext>
            <LinkNext href="/shop?category=Kurtis" className="hover:text-primary transition-colors py-2 relative group">
              Kurtis
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </LinkNext>
            <LinkNext href="/shop?category=Palazzos" className="hover:text-primary transition-colors py-2 relative group">
              Palazzos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </LinkNext>
            <LinkNext href="/shop?category=Ethnic" className="hover:text-primary transition-colors py-2 relative group">
              Ethnic
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </LinkNext>
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-primary/5 px-5 py-2.5 rounded-full border border-transparent focus-within:border-primary/10 focus-within:bg-white transition-all duration-300">
            <Search className="h-4 w-4 text-primary/40 mr-2.5" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Discover elegance..." 
              className="bg-transparent text-[11px] font-medium outline-none w-36 focus:w-56 transition-all placeholder:text-muted-foreground/50"
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery('')} className="ml-2.5 hover:text-primary">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </form>
          
          <div className="flex items-center gap-2">
            <LinkNext href="/wishlist">
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 hover:text-primary transition-all duration-300 rounded-full">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-accent text-accent-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </LinkNext>

            <LinkNext href="/cart">
              <Button variant="ghost" size="icon" className="relative hover:bg-primary/5 hover:text-primary transition-all duration-300 rounded-full">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Button>
            </LinkNext>

            {!user && !isUserLoading ? (
              <Button variant="ghost" size="icon" onClick={handleSignIn} className="hover:bg-primary/5 hover:text-primary transition-all duration-300 rounded-full">
                <LogIn className="h-5 w-5" />
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/5 hover:text-primary transition-all duration-300 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-3 rounded-2xl glass-panel animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-3 py-4 border-b border-primary/5 mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Authenticated</p>
                    <p className="text-sm font-medium truncate">{user?.email || 'Valued Client'}</p>
                  </div>
                  <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/5 focus:text-primary py-3 px-4">
                    <LinkNext href="/orders" className="flex items-center gap-3 cursor-pointer font-medium text-xs">
                      Studio History
                    </LinkNext>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/5 focus:text-primary py-3 px-4">
                    <LinkNext href="/measurements" className="flex items-center gap-3 cursor-pointer font-medium text-xs">
                      <Ruler className="h-4 w-4" /> Bespoke Profile
                    </LinkNext>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-2 opacity-50" />
                  <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/5 focus:text-primary py-3 px-4">
                    <LinkNext href="/admin" className="cursor-pointer font-medium text-xs">Studio Management</LinkNext>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button variant="ghost" size="icon" className="md:hidden rounded-full">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}