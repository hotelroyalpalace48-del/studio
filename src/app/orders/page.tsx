
"use client"

import { Package, Truck, CheckCircle2, RotateCcw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function OrdersPage() {
  const mockOrders = [
    {
      id: "MOG-ORD-8821",
      date: "Oct 24, 2023",
      total: 450,
      status: "Delivered",
      items: ["Emerald Evening Gown"]
    },
    {
      id: "MOG-ORD-8845",
      date: "Oct 28, 2023",
      total: 220,
      status: "In Transit",
      items: ["Spring Blossom Maxi"]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-2 mb-12">
        <h1 className="font-headline text-5xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">Track your deliveries and view your boutique history.</p>
      </div>

      <div className="space-y-8">
        {mockOrders.map((order) => (
          <Card key={order.id} className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
              <div>
                <CardTitle className="text-lg font-bold">{order.id}</CardTitle>
                <CardDescription>Placed on {order.date}</CardDescription>
              </div>
              <Badge className={order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                {order.status}
              </Badge>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                    <Package className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-bold">{order.items[0]}</p>
                    <p className="text-sm text-muted-foreground">Size: Standard • Qty: 1</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <p className="font-bold text-xl text-primary">${order.total}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-full text-xs uppercase tracking-widest px-6">Track Package</Button>
                    <Button variant="ghost" size="sm" className="rounded-full text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                      <RotateCcw className="h-3 w-3" /> Initiate Return
                    </Button>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="mt-12 flex justify-between relative max-w-xl mx-auto">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 -z-10" />
                <div className="flex flex-col items-center gap-2 bg-background px-2">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Ordered</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-background px-2">
                  <Package className={`h-6 w-6 ${order.status !== 'Delivered' ? 'text-primary' : 'text-primary'}`} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Processing</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-background px-2">
                  <Truck className={`h-6 w-6 ${order.status === 'Delivered' || order.status === 'In Transit' ? 'text-primary' : 'text-muted'}`} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Shipped</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-background px-2">
                  <CheckCircle2 className={`h-6 w-6 ${order.status === 'Delivered' ? 'text-primary' : 'text-muted'}`} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Delivered</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
