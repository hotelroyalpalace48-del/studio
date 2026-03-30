
"use client"

import { useState, useEffect } from 'react'

export type WishlistItem = {
  id: string
  name: string
  price: number
  image: string
  category: string
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('mogra_wishlist')
    if (stored) {
      setWishlist(JSON.parse(stored))
    }
  }, [])

  const saveWishlist = (items: WishlistItem[]) => {
    setWishlist(items)
    localStorage.setItem('mogra_wishlist', JSON.stringify(items))
  }

  const toggleWishlist = (product: any) => {
    const exists = wishlist.find(item => item.id === product.id)
    if (exists) {
      saveWishlist(wishlist.filter(item => item.id !== product.id))
      return false
    } else {
      const item = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrls?.[0] || product.images?.[0],
        category: product.category
      }
      saveWishlist([...wishlist, item])
      return true
    }
  }

  const isInWishlist = (id: string) => wishlist.some(item => item.id === id)

  return { wishlist, toggleWishlist, isInWishlist }
}
