"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, ArrowRight, Loader2, MapPin, CreditCard, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useCart } from '@/hooks/use-cart'
import { useUser, useFirestore } from '@/firebase'
import { collection, doc, serverTimestamp } from 'firebase/firestore'
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart()
  const { user } = useUser()
  const firestore = useFirestore()
  const router = useRouter()
  const { toast } = useToast()
  
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: ''
  })

  if (cart.length === 0 && step !== 3) {
    router.push('/shop')
    return null
  }

  const handlePlaceOrder = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please sign in to complete your order."
      })
      return
    }

    setLoading(true)
    const orderId = `MOG-ORD-${Math.floor(10000 + Math.random() * 90000)}`
    const orderRef = doc(firestore, 'users', user.uid, 'orders', orderId)
    
    const orderData = {
      id: orderId,
      userId: user.uid,
      orderDate: new Date().toISOString(),
      totalAmount: total,
      status: 'Processing',
      shippingAddress: shippingInfo,
      items: cart,
      createdAt: serverTimestamp()
    }

    setDocumentNonBlocking(orderRef, orderData, { merge: true })

    setTimeout(() => {
      setLoading(false)
      setStep(3)
      clearCart()
      toast({
        title: "Order Placed!",
        description: `Your order ${orderId} is being prepared with care.`
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {step < 3 && (
        <div className="flex justify-between mb-12 max-w-md mx-auto">
          <div className={`flex flex-col items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-primary bg-primary/10' : 'border-muted'}`}>1</div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Shipping</span>
          </div>
          <div className="flex-1 h-px bg-muted mt-5 mx-4" />
          <div className={`flex flex-col items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-primary bg-primary/10' : 'border-muted'}`}>2</div>
            <span className="text-[10px] font-bold uppercase tracking-widest">Payment</span>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" /> Shipping Details
                </CardTitle>
                <CardDescription>Where should we deliver your handcrafted attire?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" value={shippingInfo.firstName} onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={shippingInfo.lastName} onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={shippingInfo.email} onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" value={shippingInfo.address} onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={shippingInfo.city} onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" value={shippingInfo.postalCode} onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})} />
                  </div>
                </div>
                <Button onClick={() => setStep(2)} className="w-full bg-primary hover:bg-primary/90 rounded-full py-6 uppercase tracking-widest text-xs font-bold">
                  Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
          <OrderSummary cart={cart} total={total} />
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" /> Payment Method
                </CardTitle>
                <CardDescription>All transactions are secure and encrypted.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border-2 border-primary bg-primary/5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-bold">Bespoke Boutique Credit</p>
                      <p className="text-xs text-muted-foreground">Pay securely via Studio gateway</p>
                    </div>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-muted/30 p-4 rounded-lg text-sm italic text-muted-foreground">
                  Note: This is a demonstration of the Mogra Studio checkout process. No actual funds will be transferred.
                </div>
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-full py-6 uppercase tracking-widest text-xs font-bold">Back</Button>
                  <Button onClick={handlePlaceOrder} disabled={loading} className="flex-1 bg-primary hover:bg-primary/90 rounded-full py-6 uppercase tracking-widest text-xs font-bold">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ShoppingBag className="mr-2 h-4 w-4" />}
                    Complete Purchase
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <OrderSummary cart={cart} total={total} />
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-24 space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>
          <div className="space-y-4">
            <h1 className="font-headline text-5xl font-bold italic">Nazaakat Delivered.</h1>
            <p className="text-muted-foreground max-w-md mx-auto text-lg">Thank you for choosing Mogra Design Studio. Your order has been received and is being prepared by our master tailors.</p>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-primary hover:bg-primary/90 rounded-full px-12 py-6 uppercase tracking-widest text-xs font-bold">
              <Link href="/orders">View My Orders</Link>
            </Button>
            <Button variant="outline" asChild className="rounded-full px-12 py-6 uppercase tracking-widest text-xs font-bold border-muted">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function OrderSummary({ cart, total }: { cart: any[], total: number }) {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-lg bg-muted/20">
        <CardHeader>
          <CardTitle className="font-headline text-xl">Bag Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.quantity}x {item.name}</span>
                <span className="font-medium">${item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <Separator />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${total}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium text-primary">Complimentary</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold text-primary">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
