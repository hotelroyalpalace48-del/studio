
"use client"

import { Package, Truck, CheckCircle2, RotateCcw, Loader2, ShoppingBag } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase'
import { collection, query, orderBy } from 'firebase/firestore'
import { format } from 'date-fns'
import Link from 'next/link'

export default function OrdersPage() {
  const { user, isUserLoading } = useUser()
  const firestore = useFirestore()

  const ordersQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null
    return query(
      collection(firestore, 'users', user.uid, 'orders'),
      orderBy('createdAt', 'desc')
    )
  }, [firestore, user?.uid])

  const { data: orders, isLoading } = useCollection(ordersQuery)

  if (isUserLoading || isLoading) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground italic">Gathering your studio history...</p>
      </div>
    )
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center space-y-6">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="font-headline text-4xl font-bold">No orders yet</h1>
        <p className="text-muted-foreground max-w-md mx-auto">You haven't placed any orders with Mogra Design Studio yet. Discover our latest collections today.</p>
        <Button asChild className="bg-primary hover:bg-primary/90 rounded-full px-12 py-6 uppercase tracking-widest text-xs font-bold">
          <Link href="/shop">Start Exploring</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-2 mb-12">
        <h1 className="font-headline text-5xl font-bold">Studio History</h1>
        <p className="text-muted-foreground tracking-wide italic">Track your deliveries and view your bespoke collections.</p>
      </div>

      <div className="space-y-8">
        {orders.map((order) => (
          <Card key={order.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 gap-4">
              <div>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" /> {order.id}
                </CardTitle>
                <CardDescription>Placed on {format(new Date(order.orderDate), 'PPP')}</CardDescription>
              </div>
              <Badge className={order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary border-primary'}>
                {order.status}
              </Badge>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {order.items.map((item: any, i: number) => (
                  <div key={i} className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4 w-full">
                      <div className="relative w-16 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                      </div>
                      <div>
                        <p className="font-bold text-lg">{item.name}</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">Qty: {item.quantity} • ${item.price} each</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Separator />
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Order Total</p>
                    <p className="font-bold text-2xl text-primary">${order.totalAmount}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="rounded-full text-[10px] uppercase tracking-widest px-8 font-bold">Track Status</Button>
                    <Button variant="ghost" size="sm" className="rounded-full text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1 font-bold">
                      <RotateCcw className="h-3 w-3" /> Need Help?
                    </Button>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="mt-8 flex justify-between relative max-w-xl mx-auto pt-8">
                  <div className="absolute top-[48px] left-0 w-full h-0.5 bg-muted -z-10" />
                  <div className="flex flex-col items-center gap-2 bg-background px-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Confirmed</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 bg-background px-2">
                    <Package className="h-5 w-5 text-primary" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Tailoring</span>
                  </div>
                  <div className={`flex flex-col items-center gap-2 bg-background px-2 ${['In Transit', 'Delivered'].includes(order.status) ? 'opacity-100' : 'opacity-40'}`}>
                    <Truck className="h-5 w-5 text-primary" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">In Transit</span>
                  </div>
                  <div className={`flex flex-col items-center gap-2 bg-background px-2 ${order.status === 'Delivered' ? 'opacity-100' : 'opacity-40'}`}>
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Delivered</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
