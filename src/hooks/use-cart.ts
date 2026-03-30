
"use client"

import { useState, useEffect } from 'react'

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem('mogra_cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart)
    localStorage.setItem('mogra_cart', JSON.stringify(newCart))
  }

  const addToCart = (product: any) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      saveCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
    } else {
      saveCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (id: string) => {
    saveCart(cart.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return removeFromCart(id)
    saveCart(cart.map(item => item.id === id ? { ...item, quantity: qty } : item))
  }

  const clearCart = () => {
    saveCart([])
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, total }
}
