import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import { getProducts } from '@/app/lib/products'
import { PlaceHolderImages } from '@/app/lib/placeholder-images'

export default function Home() {
  const products = getProducts().slice(0, 4);
  const heroImage = PlaceHolderImages[0];

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <Image
          src={heroImage.imageUrl}
          alt="Luxury Dress Collection"
          fill
          className="object-cover"
          priority
          data-ai-hint="luxury dress"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white space-y-6 px-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Elegance Reimagined
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide opacity-90 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Discover a curated collection of bespoke dress patterns and boutique couture at Mogra Design Studio.
          </p>
          <div className="pt-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 uppercase tracking-widest text-xs" asChild>
              <Link href="/shop">Explore Collection <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="font-headline text-4xl font-bold">New arrivals</h2>
            <p className="text-muted-foreground tracking-wide">Our latest handcrafted designs for the season.</p>
          </div>
          <Link href="/shop" className="text-sm font-bold border-b-2 border-primary pb-1 flex items-center gap-1 group">
            View All <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-secondary/50 py-24">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <Image 
              src="https://picsum.photos/seed/studio/800/1000" 
              alt="The Studio" 
              fill 
              className="object-cover"
              data-ai-hint="boutique studio"
            />
          </div>
          <div className="space-y-8">
            <h2 className="font-headline text-4xl font-bold leading-tight">Grown from tradition, tailored for the future.</h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                At Mogra Design Studio, we believe that fashion is a form of poetry. Each stitch tells a story of heritage, and every fabric choice reflects our commitment to natural beauty and sustainability.
              </p>
              <p>
                Located in the heart of Bhopal at Minal Residency, our boutique approach ensures that every client receives a piece that is as unique as they are, balancing classic ethnic motifs with contemporary silhouettes.
              </p>
            </div>
            <Button variant="outline" size="lg" className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-white transition-all uppercase tracking-widest text-xs">
              Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 text-center py-10">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-headline text-4xl font-bold">Tailored to perfection</h2>
          <p className="text-muted-foreground">Looking for a specific pattern or a custom fit? Our master designers at Mogra Design Studio are here to help you create your dream outfit.</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-12 uppercase tracking-widest text-xs">
            Consult a Designer
          </Button>
        </div>
      </section>
    </div>
  )
}
