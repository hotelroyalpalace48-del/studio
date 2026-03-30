
"use client"

import { useState } from 'react'
import { Plus, Trash2, Edit, Save, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { adminProductDescriptionGenerator } from '@/ai/flows/admin-product-description-generator'
import { useToast } from '@/hooks/use-toast'
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase'
import { collection, doc, serverTimestamp, deleteDoc } from 'firebase/firestore'
import { setDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates'

export default function AdminPage() {
  const [loading, setLoading] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [keywords, setKeywords] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  
  const { toast } = useToast()
  const firestore = useFirestore()

  const productsQuery = useMemoFirebase(() => collection(firestore, 'products'), [firestore])
  const { data: products, isLoading: isProductsLoading } = useCollection(productsQuery)

  const handleGenerateDescription = async () => {
    if (!keywords) {
      toast({
        variant: "destructive",
        title: "Missing Keywords",
        description: "Please enter some keywords to generate a description."
      })
      return
    }

    setLoading(true)
    try {
      const keywordList = keywords.split(',').map(k => k.trim())
      const result = await adminProductDescriptionGenerator({
        keywords: keywordList,
        productImages: [] 
      })
      setDescription(result.description)
      toast({
        title: "Description Generated",
        description: "AI has successfully crafted your product copy."
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate description. Please try again."
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async () => {
    if (!name || !price || !category) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields."
      })
      return
    }

    setPublishing(true)
    const productId = doc(collection(firestore, 'placeholder')).id
    const productRef = doc(firestore, 'products', productId)
    
    const newProduct = {
      id: productId,
      name,
      description,
      price: Number(price),
      category,
      sku: `MOG-${Math.floor(Math.random() * 9000) + 1000}`,
      imageUrls: ["https://picsum.photos/seed/" + productId + "/600/800"],
      stockQuantity: 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setDocumentNonBlocking(productRef, newProduct, { merge: true })

    setTimeout(() => {
      setPublishing(false)
      toast({
        title: "Published!",
        description: "Pattern has been added to the studio catalog."
      })
      setName('')
      setPrice('')
      setCategory('')
      setDescription('')
      setKeywords('')
    }, 500)
  }

  const handleDelete = (id: string) => {
    const productRef = doc(firestore, 'products', id)
    deleteDocumentNonBlocking(productRef)
    toast({
      title: "Deleted",
      description: "Product removed from catalog."
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-6">
        <div className="space-y-2">
          <h1 className="font-headline text-5xl font-bold">Studio Management</h1>
          <p className="text-muted-foreground">Manage your boutique collections and designs.</p>
        </div>
      </div>

      <Tabs defaultValue="add" className="space-y-8">
        <TabsList className="bg-muted/50 rounded-full p-1">
          <TabsTrigger value="add" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Add New Pattern</TabsTrigger>
          <TabsTrigger value="inventory" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Inventory Control</TabsTrigger>
          <TabsTrigger value="orders" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">Studio Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="add" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Pattern Details</CardTitle>
                <CardDescription>Enter the essential details for your new creation.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Design Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="e.g. Sapphire Velvet Gown" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      value={price} 
                      onChange={(e) => setPrice(e.target.value)} 
                      placeholder="299" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input 
                      id="category" 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)} 
                      placeholder="Kurtis, Ethnic, Formal, etc." 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Pattern Keywords (for AI description)</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={keywords} 
                      onChange={(e) => setKeywords(e.target.value)} 
                      placeholder="silk, hand-embroidered, royal blue, wedding" 
                    />
                    <Button 
                      onClick={handleGenerateDescription} 
                      disabled={loading}
                      variant="outline" 
                      className="border-primary text-primary hover:bg-primary/5 shrink-0"
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                      Generate
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Product Description</Label>
                  <Textarea 
                    id="description" 
                    rows={8} 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the beauty of your creation..." 
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="border-none shadow-lg bg-secondary/10">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-primary" /> Visual Assets
                  </CardTitle>
                  <CardDescription>Upload high-resolution photography for the collection.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted-foreground/20 rounded-xl py-16 flex flex-col items-center justify-center space-y-4 bg-background">
                    <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                    <div className="text-center">
                      <p className="text-sm font-medium">Drag and drop images here</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB each</p>
                    </div>
                    <Button variant="outline" className="rounded-full">Select Files</Button>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button 
                  onClick={handlePublish}
                  disabled={publishing}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-full py-6 uppercase tracking-widest text-xs font-bold"
                >
                  {publishing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="mr-2 h-4 w-4" />}
                  Publish to Catalog
                </Button>
                <Button variant="outline" className="flex-1 rounded-full py-6 uppercase tracking-widest text-xs font-bold border-muted">
                  Save Draft
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="inventory" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card className="border-none shadow-lg">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
                    <tr>
                      <th className="px-6 py-4">Design</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {isProductsLoading ? (
                      <tr><td colSpan={4} className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" /></td></tr>
                    ) : products?.map((p) => (
                      <tr key={p.id} className="hover:bg-muted/10 transition-colors">
                        <td className="px-6 py-4 font-bold">{p.name}</td>
                        <td className="px-6 py-4">${p.price}</td>
                        <td className="px-6 py-4"><span className="text-green-600 font-bold">• Active</span></td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button size="icon" variant="ghost"><Edit className="h-4 w-4" /></Button>
                          <Button size="icon" variant="ghost" onClick={() => handleDelete(p.id)} className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
