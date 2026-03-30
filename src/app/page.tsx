"use client"

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Loader2, Sparkles, Clover } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/product-card'
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase'
import { collection, query, limit, orderBy } from 'firebase/firestore'
import { PlaceHolderImages } from '@/app/lib/placeholder-images'
import { DailyShayari } from '@/components/daily-shayari'

export default function Home() {
  const firestore = useFirestore()
  const heroImage = PlaceHolderImages[0];

  const productsQuery = useMemoFirebase(() => query(
    collection(firestore, 'products'), 
    orderBy('createdAt', 'desc'),
    limit(4)
  ), [firestore])
  
  const { data: products, isLoading } = useCollection(productsQuery)

  return (
    <div className="flex flex-col gap-32 pb-40">
      {/* Hero Section */}
      <section className="relative h-[98vh] flex items-center justify-center overflow-hidden">
        <Image
          src={heroImage.imageUrl}
          alt="Luxury Dress Collection"
          fill
          className="object-cover animate-in fade-in zoom-in-105 duration-[3s] ease-out"
          priority
          data-ai-hint="luxury dress"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-background" />
        
        <div className="relative z-10 text-center text-white space-y-10 px-6 max-w-5xl">
          <div className="flex items-center justify-center gap-4 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="h-px w-12 bg-white/30" />
            <div className="flex items-center gap-2">
              <Clover className="h-4 w-4 text-accent" />
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/90">Est. Bhopal 2024</p>
            </div>
            <span className="h-px w-12 bg-white/30" />
          </div>
          
          <h1 className="font-headline text-7xl md:text-9xl font-bold tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Timeless <br /> <span className="italic font-normal text-white/90">Nazaakat.</span>
          </h1>
          
          <p className="text-xl md:text-3xl max-w-3xl mx-auto font-light tracking-wide opacity-90 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
            Handcrafted luxury patterns and bespoke couture, where every stitch is a verse of Indian heritage.
          </p>
          
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-8 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-16 py-8 uppercase tracking-[0.3em] text-[10px] font-bold shadow-2xl" asChild>
              <Link href="/shop">The Collections <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 rounded-full px-16 py-8 uppercase tracking-[0.3em] text-[10px] font-bold border border-white/20 backdrop-blur-sm" asChild>
              <Link href="/measurements">Bespoke Fitting</Link>
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
           <div className="w-px h-24 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Daily Shayari Section */}
      <section className="container mx-auto px-6 py-16 bg-primary/5 rounded-[4rem] relative overflow-hidden group">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-accent/10 rounded-full blur-[120px]" />
        <DailyShayari />
      </section>

      {/* Featured Collections */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-primary font-bold">
              <Sparkles className="h-5 w-5 text-accent" />
              <p className="text-[11px] uppercase tracking-[0.4em]">Bhopal Studio curation</p>
            </div>
            <h2 className="font-headline text-6xl md:text-7xl font-bold italic">Latest Silhouettes</h2>
            <p className="text-muted-foreground tracking-wide max-w-lg text-lg">Our newest additions, meticulously designed for modern elegance while honoring timeless tradition.</p>
          </div>
          <Link href="/shop" className="text-[11px] font-bold border-b-2 border-primary pb-3 flex items-center gap-3 group tracking-[0.3em] uppercase">
            Full Studio Lookbook <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-3" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <Loader2 className="h-12 w-12 animate-spin text-primary/30" />
            <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-muted-foreground/40">Curation in progress...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20">
            {products?.map((product, idx) => (
              <div key={product.id} className={`animate-in fade-in slide-in-from-bottom-8 duration-1000 stagger-${(idx % 3) + 1}`}>
                <ProductCard product={{
                  ...product,
                  images: product.imageUrls || []
                }} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Philosophy Section */}
      <section className="relative py-40 overflow-hidden bg-primary text-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-black/5 -skew-x-12 translate-x-1/3" />
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden luxury-shadow group">
            <Image 
              src="https://picsum.photos/seed/studio-vibe/800/1000" 
              alt="The Mogra Studio" 
              fill 
              className="object-cover transition-transform duration-[3s] group-hover:scale-110"
              data-ai-hint="luxury boutique"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[3rem]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </div>
          
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Clover className="h-6 w-6 text-accent" />
                <p className="text-[11px] uppercase tracking-[0.5em] font-bold text-accent">The Mogra Philosophy</p>
              </div>
              <h2 className="font-headline text-6xl md:text-8xl font-bold leading-[1.05]">Where Fashion Meets <br /> <span className="italic font-normal text-white/90">Soul.</span></h2>
            </div>
            
            <div className="space-y-10 text-white/80 text-xl md:text-2xl leading-relaxed font-light">
              <p>
                At Mogra Design Studio, we don't just create clothes; we weave the essence of Bhopal's royal legacy with the freshness of a jasmine bloom.
              </p>
              <p>
                Every pattern is a tribute to the "Nazaakat" of the modern woman. From the bustling lanes of Minal Residency to the wardrobes of the discerning, we bring you couture that breathes.
              </p>
            </div>
            
            <div className="pt-6">
              <Button variant="outline" size="lg" className="rounded-full px-16 py-10 border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-700 uppercase tracking-[0.3em] text-[10px] font-bold" asChild>
                <Link href="/shop">Explore Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-6 text-center py-32 relative">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="space-y-6">
             <p className="text-[11px] uppercase tracking-[0.5em] font-bold text-primary">Tailoring & Customization</p>
             <h2 className="font-headline text-6xl md:text-8xl font-bold tracking-tight">Your Dream, <br /> Our Craft.</h2>
          </div>
          <p className="text-muted-foreground text-2xl md:text-3xl font-light leading-relaxed max-w-3xl mx-auto italic">"Whether it's a vision from your imagination or a custom fit for your most precious day, our master tailors await."</p>
          <div className="pt-10">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-20 py-10 uppercase tracking-[0.3em] text-[11px] font-bold shadow-2xl luxury-shadow" asChild>
              <Link href="/measurements">Create Your Bespoke Profile</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
