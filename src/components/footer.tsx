
export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-headline text-2xl font-bold text-primary">Mogra Design Studio</h3>
            <p className="text-sm text-muted-foreground">
              Exquisite dress patterns and boutique fashion for the modern woman. 
              Grown from nature, designed for elegance.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-widest text-xs">Customer Care</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-primary">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-primary">Size Guide</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-widest text-xs">Our Studio</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Sustainability</a></li>
              <li><a href="#" className="hover:text-primary">Process</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase tracking-widest text-xs">Stay Connected</h4>
            <p className="text-xs text-muted-foreground mb-4">Subscribe to our newsletter for exclusive updates.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-background border rounded-md px-3 py-1.5 text-sm flex-1 outline-none focus:border-primary"
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
