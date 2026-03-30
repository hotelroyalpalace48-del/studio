"use client"

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase'
import { collection, query, limit } from 'firebase/firestore'
import { PlaceHolderImages } from '@/app/lib/placeholder-images'
import { DailyShayari } from '@/components/daily-shayari'

export default function Home() {
  const firestore = useFirestore()
  const heroImage = PlaceHolderImages[0];

  const productsQuery = useMemoFirebase(() => query(collection(firestore, 'products'), limit(4)), [firestore])
  const { data: products, isLoading } = useCollection(productsQuery)

  return (
    <div className="flex flex-col gap-24 pb-32">
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        <Image
          src={heroImage.imageUrl}
          alt="Luxury Dress Collection"
          fill
          className="object-cover animate-in fade-in zoom-in-105 duration-[2s] ease-out"
          priority
          data-ai-hint="luxury dress"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />
        <div className="relative z-10 text-center text-white space-y-8 px-6 max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="h-px w-8 bg-white/40" />
            <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/80">Est. Bhopal 2024</p>
            <span className="h-px w-8 bg-white/40" />
          </div>
          <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Timeless <br /> <span className="italic font-normal">Nazaakat.</span>
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto font-light tracking-wide opacity-80 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
            Handcrafted luxury patterns and boutique couture, where every stitch is a verse of heritage.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-12 py-7 uppercase tracking-[0.2em] text-[11px] font-bold shadow-2xl" asChild>
              <Link href="/shop">The Collection <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 rounded-full px-12 py-7 uppercase tracking-[0.2em] text-[11px] font-bold" asChild>
              <Link href="/measurements">Bespoke Fitting</Link>
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
           <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Daily Shayari Section with high contrast */}
      <section className="container mx-auto px-6 py-12 bg-primary/5 rounded-[3rem] relative overflow-hidden group">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <DailyShayari />
      </section>

      {/* Featured Collections */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold">
              <Sparkles className="h-4 w-4" />
              <p className="text-[10px] uppercase tracking-[0.3em]">Editor's Choice</p>
            </div>
            <h2 className="font-headline text-5xl md:text-6xl font-bold italic">Latest Silhouettes</h2>
            <p className="text-muted-foreground tracking-wide max-w-md">Our newest additions, meticulously designed for modern elegance while honoring tradition.</p>
          </div>
          <Link href="/shop" className="text-[11px] font-bold border-b-2 border-primary pb-2 flex items-center gap-2 group tracking-[0.2em] uppercase">
            View Full Lookbook <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary/40" />
            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/50">Curation in progress...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {products?.map(product => (
              <ProductCard key={product.id} product={{
                ...product,
                images: product.imageUrls || []
              }} />
            ))}
          </div>
        )}
      </section>

      {/* Philosophy Section - Enhanced Immersive Experience */}
      <section className="relative py-32 overflow-hidden bg-primary text-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-black/10 -skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden luxury-shadow group">
            <Image 
              src="https://picsum.photos/seed/studio/800/1000" 
              alt="The Studio" 
              fill 
              className="object-cover transition-transform duration-[2s] group-hover:scale-105"
              data-ai-hint="boutique studio"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />
          </div>
          <div className="space-y-10">
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent">The Mogra Philosophy</p>
              <h2 className="font-headline text-5xl md:text-7xl font-bold leading-[1.1]">Where Fashion Meets <br /> <span className="italic font-normal">Soul.</span></h2>
            </div>
            <div className="space-y-8 text-white/70 text-lg md:text-xl leading-relaxed font-light">
              <p>
                At Mogra Design Studio, we don't just create clothes; we weave the essence of Bhopal's royal legacy with the freshness of a jasmine bloom.
              </p>
              <p>
                Every pattern is a tribute to the "Nazaakat" (grace) of the modern woman. From the bustling lanes of Minal Residency to the wardrobes of the discerning, we bring you couture that breathes.
              </p>
            </div>
            <div className="pt-4">
              <Button variant="outline" size="lg" className="rounded-full px-12 py-8 border-white/20 text-white hover:bg-white hover:text-primary transition-all duration-500 uppercase tracking-[0.2em] text-[11px] font-bold" asChild>
                <Link href="/shop">Explore Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Minimalist Luxury */}
      <section className="container mx-auto px-6 text-center py-20 relative">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
             <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">Tailoring & Customization</p>
             <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tight">Your Dream, <br /> Our Craft.</h2>
          </div>
          <p className="text-muted-foreground text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">Whether it's a specific pattern from your imagination or a custom fit for a special day, our master tailors are at your service.</p>
          <div className="pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-16 py-8 uppercase tracking-[0.2em] text-[11px] font-bold shadow-2xl luxury-shadow" asChild>
              <Link href="/measurements">Create Your Bespoke Profile</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}