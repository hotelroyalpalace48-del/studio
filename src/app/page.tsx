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
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-1') || PlaceHolderImages[0];
  const studioSoulImage = PlaceHolderImages.find(img => img.id === 'studio-soul') || PlaceHolderImages[0];

  const productsQuery = useMemoFirebase(() => query(
    collection(firestore, 'products'), 
    orderBy('createdAt', 'desc'),
    limit(4)
  ), [firestore])
  
  const { data: products, isLoading } = useCollection(productsQuery)

  return (
    <div className="flex flex-col gap-32 pb-40">
      {/* Immersive Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover animate-in fade-in zoom-in-105 duration-[4s] ease-out"
          priority
          data-ai-hint={heroImage.imageHint}
        />
        {/* Soft atmospheric overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-primary/10 to-background/90" />
        
        <div className="relative z-10 text-center text-white space-y-12 px-6 max-w-6xl">
          <div className="flex items-center justify-center gap-6 mb-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <span className="h-px w-16 bg-white/20" />
            <div className="flex items-center gap-3">
              <Clover className="h-5 w-5 text-accent animate-pulse" />
              <p className="text-[11px] uppercase tracking-[0.6em] font-bold text-white/80">The Essence of Mogra</p>
            </div>
            <span className="h-px w-16 bg-white/20" />
          </div>
          
          <h1 className="font-headline text-8xl md:text-[11rem] font-bold tracking-tighter leading-[0.85] animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            Ethereal <br /> <span className="italic font-normal text-white/85">Nazaakat.</span>
          </h1>
          
          <p className="text-2xl md:text-4xl max-w-4xl mx-auto font-light tracking-wide opacity-80 leading-snug animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
            Like a jasmine bloom in a quiet morning, our couture whispers the secret of timeless grace.
          </p>
          
          <div className="pt-14 flex flex-col sm:flex-row items-center justify-center gap-10 animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-700">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-20 py-10 uppercase tracking-[0.4em] text-[11px] font-bold luxury-shadow h-auto" asChild>
              <Link href="/shop">View Collections <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 rounded-full px-20 py-10 uppercase tracking-[0.4em] text-[11px] font-bold border border-white/20 backdrop-blur-md h-auto" asChild>
              <Link href="/measurements">Bespoke Fitting</Link>
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
           <div className="w-px h-32 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Daily Shayari - Cultural Heart */}
      <section className="container mx-auto px-6 py-24 bg-primary/[0.02] rounded-[5rem] relative overflow-hidden group border border-primary/5">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-primary/[0.03] rounded-full blur-[150px]" />
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-accent/[0.05] rounded-full blur-[150px]" />
        <DailyShayari />
      </section>

      {/* Featured Silhouettes */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-28 gap-12">
          <div className="space-y-8 stagger-1 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="flex items-center gap-4 text-primary font-bold">
              <Sparkles className="h-6 w-6 text-accent" />
              <p className="text-[12px] uppercase tracking-[0.5em]">The Bhopal Curation</p>
            </div>
            <h2 className="font-headline text-7xl md:text-8xl font-bold leading-none">New <br /><span className="italic font-normal">Silhouettes</span></h2>
            <p className="text-muted-foreground tracking-wide max-w-xl text-xl font-light">Meticulously handcrafted patterns designed for the modern woman who honors timeless tradition.</p>
          </div>
          <Link href="/shop" className="text-[12px] font-bold border-b border-primary/30 pb-4 flex items-center gap-4 group tracking-[0.4em] uppercase hover:border-primary transition-all">
            The Studio Lookbook <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-4" />
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-48 gap-8">
            <Loader2 className="h-14 w-14 animate-spin text-primary/20" />
            <p className="text-[12px] uppercase tracking-[0.5em] font-bold text-muted-foreground/30 animate-pulse">Curating your selection...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
            {products?.map((product, idx) => (
              <div key={product.id} className={`animate-in fade-in slide-in-from-bottom-12 duration-1000 stagger-${(idx % 4) + 1}`}>
                <ProductCard product={{
                  ...product,
                  images: product.imageUrls || []
                }} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* The Studio Philosophy - Editorial Section */}
      <section className="relative py-48 overflow-hidden bg-primary text-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-black/10 -skew-x-12 translate-x-1/2" />
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
          <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden luxury-shadow group shadow-2xl">
            <Image 
              src={studioSoulImage.imageUrl} 
              alt={studioSoulImage.description} 
              fill 
              className="object-cover transition-transform duration-[4s] group-hover:scale-110"
              data-ai-hint={studioSoulImage.imageHint}
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[4rem]" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </div>
          
          <div className="space-y-14">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <Clover className="h-8 w-8 text-accent" />
                <p className="text-[12px] uppercase tracking-[0.6em] font-bold text-accent">Our Philosophy</p>
              </div>
              <h2 className="font-headline text-7xl md:text-9xl font-bold leading-[0.9] tracking-tight">Fashion <br /> with <span className="italic font-normal opacity-90">Soul.</span></h2>
            </div>
            
            <div className="space-y-12 text-white/80 text-2xl md:text-3xl leading-relaxed font-light italic">
              <p>
                "At Mogra, we don't just create clothes; we weave the essence of Bhopal's royal legacy with the freshness of a jasmine bloom."
              </p>
              <p className="not-italic text-lg md:text-xl font-body opacity-70">
                Every pattern is a tribute to the "Nazaakat" of the modern woman. From the bustling lanes of Minal Residency to your wardrobe, we bring couture that breathes.
              </p>
            </div>
            
            <div className="pt-8">
              <Button variant="outline" size="lg" className="rounded-full px-20 py-10 border-white/20 text-white hover:bg-white hover:text-primary transition-all duration-700 uppercase tracking-[0.4em] text-[11px] font-bold h-auto" asChild>
                <Link href="/shop">Explore Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Bespoke Fitting */}
      <section className="container mx-auto px-6 text-center py-40 relative">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="space-y-8">
             <div className="flex items-center justify-center gap-4 text-primary font-bold">
               <Clover className="h-6 w-6" />
               <p className="text-[12px] uppercase tracking-[0.6em]">Tailoring & Craft</p>
             </div>
             <h2 className="font-headline text-7xl md:text-[9rem] font-bold tracking-tighter leading-none">Your Dream, <br /> Our Craft.</h2>
          </div>
          <p className="text-muted-foreground text-2xl md:text-4xl font-light leading-relaxed max-w-4xl mx-auto italic opacity-80">
            "Whether it's a vision from your imagination or a custom fit for your most precious day, our master tailors await."
          </p>
          <div className="pt-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-24 py-10 uppercase tracking-[0.4em] text-[12px] font-bold luxury-shadow h-auto" asChild>
              <Link href="/measurements">Build Your Bespoke Profile</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
