import { Smartphone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-headline text-2xl font-bold text-primary">Mogra Design Studio</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Exquisite dress patterns and boutique fashion for the modern woman. 
              Grown from nature, designed for elegance.
            </p>
            <div className="pt-2">
               <p className="text-xs font-bold uppercase tracking-widest text-primary">Call Us</p>
               <p className="text-sm text-muted-foreground">9685624004</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-widest text-xs">Customer Care</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Size Guide</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-widest text-xs">Visit Our Studio</h4>
            <address className="not-italic text-sm text-muted-foreground leading-relaxed">
              Gate No. 3, A-17, Main Road,<br />
              New Minal Residency, Minal Residency,<br />
              Bhopal, Madhya Pradesh 462023
            </address>
            <div className="mt-6 pt-4 border-t border-muted-foreground/10">
              <h4 className="font-bold mb-3 uppercase tracking-widest text-[10px] flex items-center gap-2">
                <Smartphone className="h-3 w-3" /> Get the App
              </h4>
              <div className="flex flex-col gap-2">
                <div className="h-8 w-24 bg-black rounded flex items-center justify-center text-[8px] text-white font-bold cursor-pointer hover:opacity-80 transition-opacity">
                  App Store
                </div>
                <div className="h-8 w-24 bg-black rounded flex items-center justify-center text-[8px] text-white font-bold cursor-pointer hover:opacity-80 transition-opacity">
                  Google Play
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-widest text-xs">Stay Connected</h4>
            <p className="text-xs text-muted-foreground mb-4">Subscribe to our newsletter for exclusive updates from the studio.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-background border rounded-md px-3 py-1.5 text-sm flex-1 outline-none focus:border-primary transition-all"
              />
              <button className="bg-primary text-white px-4 py-1.5 rounded-md text-sm hover:bg-primary/90 transition-colors">Join</button>
            </div>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Mogra Design Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
