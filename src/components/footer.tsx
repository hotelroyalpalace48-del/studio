
import { Smartphone, Clover, QrCode } from 'lucide-react'
import Image from 'next/image'
import { PlaceHolderImages } from '@/app/lib/placeholder-images'

export function Footer() {
  const qrImage = PlaceHolderImages.find(img => img.id === 'qr-code')?.imageUrl || 'https://picsum.photos/seed/mogra-qr/200/200'

  return (
    <footer className="border-t bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-full bg-primary/10">
                <Clover className="h-7 w-7 text-primary" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline text-2xl font-bold text-primary leading-none uppercase tracking-tighter">Mogra</h3>
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted-foreground mt-1">Design Studio</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Exquisite dress patterns and bespoke boutique fashion for the modern woman. 
              Grown from nature, crafted with nazaakat.
            </p>
            <div className="space-y-1">
               <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Inquiries</p>
               <p className="text-sm font-medium">9685624004</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-[10px] text-muted-foreground">Studio Services</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/shop" className="hover:text-primary transition-colors">The Collections</a></li>
              <li><a href="/measurements" className="hover:text-primary transition-colors">Bespoke Tailoring</a></li>
              <li><a href="/wishlist" className="hover:text-primary transition-colors">Saved Patterns</a></li>
              <li><a href="/orders" className="hover:text-primary transition-colors">Studio History</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-[10px] text-muted-foreground">Bhopal Studio</h4>
            <address className="not-italic text-sm text-muted-foreground leading-relaxed space-y-1">
              <p>Gate No. 3, A-17, Main Road,</p>
              <p>New Minal Residency, Minal Residency,</p>
              <p>Bhopal, MP 462023</p>
            </address>
            
            <div className="mt-8 pt-6 border-t border-muted">
              <h4 className="font-bold mb-4 uppercase tracking-widest text-[9px] flex items-center gap-2">
                <Smartphone className="h-3.5 w-3.5" /> Studio App
              </h4>
              <div className="flex gap-4 items-center">
                <div className="flex flex-col gap-2">
                  <div className="h-9 w-28 bg-black rounded-lg flex items-center justify-center text-[9px] text-white font-bold cursor-pointer hover:opacity-80 transition-opacity">
                    App Store
                  </div>
                  <div className="h-9 w-28 bg-black rounded-lg flex items-center justify-center text-[9px] text-white font-bold cursor-pointer hover:opacity-80 transition-opacity">
                    Google Play
                  </div>
                </div>
                <div className="p-2 bg-white rounded-2xl border border-primary/10 luxury-shadow group relative">
                  <div className="relative w-20 h-20">
                    <Image 
                      src={qrImage}
                      alt="Scan to Download Mogra App"
                      fill
                      className="object-cover opacity-70 grayscale transition-all group-hover:grayscale-0 group-hover:opacity-100"
                      data-ai-hint="qr code"
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                    <QrCode className="h-2 w-2 text-primary" />
                    <span className="text-[6px] uppercase font-bold text-primary">Scan to install</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-[10px] text-muted-foreground">Nazaakat Newsletter</h4>
            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">Join our inner circle for exclusive updates from the Bhopal studio.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-background border rounded-full px-4 py-2.5 text-xs flex-1 outline-none focus:border-primary transition-all"
              />
              <button className="bg-primary text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors">Join</button>
            </div>
          </div>
        </div>
        <div className="border-t mt-20 pt-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
            © {new Date().getFullYear()} Mogra Design Studio. Crafted in Bhopal with Love.
          </p>
        </div>
      </div>
    </footer>
  )
}
