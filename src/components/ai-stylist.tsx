
"use client"

import { useState } from 'react'
import { Sparkles, Loader2, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { aiStylingRecommendations, type AiStylingRecommendationsOutput } from '@/ai/flows/ai-styling-recommendations'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent } from '@/components/ui/card'

export function AIStylist({ dressName, dressDescription, imageUrl }: { dressName: string, dressDescription: string, imageUrl: string }) {
  const [loading, setLoading] = useState(false)
  const [recommendations, setRecommendations] = useState<AiStylingRecommendationsOutput | null>(null)

  const fetchStyling = async () => {
    setLoading(true)
    try {
      const result = await aiStylingRecommendations({
        dressDescription: `${dressName}: ${dressDescription}`,
        dressPhotoDataUri: undefined // We can't easily pass the URL as data URI here without fetching it first, so we use description
      })
      setRecommendations(result)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full flex items-center gap-2 border-primary text-primary hover:bg-primary/5 rounded-full py-6 uppercase tracking-widest text-xs font-bold">
          <Sparkles className="h-4 w-4" /> Consult AI Stylist
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <div className="p-6 border-b">
          <DialogHeader>
            <DialogTitle className="font-headline text-3xl flex items-center gap-2">
              <Wand2 className="h-6 w-6 text-primary" /> AI Styling Assistant
            </DialogTitle>
            <DialogDescription>
              Personalized styling suggestions for the <span className="font-bold text-primary">{dressName}</span>.
            </DialogDescription>
          </DialogHeader>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-8">
            {!recommendations && !loading && (
              <div className="text-center py-12 space-y-4">
                <p className="text-muted-foreground">Our AI stylist will analyze the fabric, cut, and color of this piece to suggest the perfect accessories and styling for any occasion.</p>
                <Button onClick={fetchStyling} className="bg-primary hover:bg-primary/90 rounded-full px-8">
                  Get Recommendations
                </Button>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center py-24 space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-sm font-medium animate-pulse">Curating your personalized look...</p>
              </div>
            )}

            {recommendations && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section className="space-y-4">
                  <h3 className="font-bold text-xs uppercase tracking-widest flex items-center gap-2 text-primary">
                    <span className="w-8 h-px bg-primary" /> Accessory Suggestions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {recommendations.accessorySuggestions.map((item, i) => (
                      <Card key={i} className="bg-secondary/20 border-none shadow-none">
                        <CardContent className="p-4 text-sm">{item}</CardContent>
                      </Card>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="font-bold text-xs uppercase tracking-widest flex items-center gap-2 text-primary">
                    <span className="w-8 h-px bg-primary" /> Design Variations
                  </h3>
                  <ul className="space-y-2">
                    {recommendations.designVariations.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-4">
                  <h3 className="font-bold text-xs uppercase tracking-widest flex items-center gap-2 text-primary">
                    <span className="w-8 h-px bg-primary" /> Occasion Styling
                  </h3>
                  <div className="space-y-3">
                    {recommendations.occasionStylingIdeas.map((item, i) => (
                      <div key={i} className="p-4 rounded-lg bg-muted text-sm border-l-4 border-primary">
                        {item}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t bg-muted/30 text-[10px] text-center text-muted-foreground uppercase tracking-widest">
          AI generated fashion advice from Mogra Design Studio
        </div>
      </DialogContent>
    </Dialog>
  )
}
