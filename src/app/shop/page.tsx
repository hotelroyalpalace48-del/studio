
import { getProducts } from '@/app/lib/products'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { SlidersHorizontal } from 'lucide-react'

export default function ShopPage({ searchParams }: { searchParams: { category?: string } }) {
  const allProducts = getProducts();
  const filteredProducts = searchParams.category 
    ? allProducts.filter(p => p.category === searchParams.category)
    : allProducts;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-6">
        <div className="space-y-2">
          <h1 className="font-headline text-5xl font-bold">Collections</h1>
          <p className="text-muted-foreground">Browse our exquisite range of handcrafted attire.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Button variant="outline" className="flex items-center gap-2 rounded-full border-muted text-muted-foreground hover:text-primary hover:border-primary">
            <SlidersHorizontal className="h-4 w-4" /> Filter & Sort
          </Button>
          <div className="flex-1 md:flex-none border-b border-muted pb-1 text-sm text-muted-foreground">
            {filteredProducts.length} Products
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-24 bg-muted/20 rounded-lg">
          <p className="text-muted-foreground">No products found in this category.</p>
        </div>
      )}
    </div>
  )
}
