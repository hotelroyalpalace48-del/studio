'use client';

import { useState, useEffect } from 'react';
import { dailyShayari, type DailyShayariOutput } from '@/ai/flows/daily-shayari';
import { Loader2, Quote } from 'lucide-react';

export function DailyShayari() {
  const [data, setData] = useState<DailyShayariOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getShayari() {
      try {
        const result = await dailyShayari();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch shayari:', error);
      } finally {
        setLoading(false);
      }
    }
    getShayari();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary/40" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="relative inline-block">
        <Quote className="absolute -top-6 -left-8 h-12 w-12 text-primary/10 -rotate-12" />
        <div className="space-y-4">
          <p className="font-headline text-2xl md:text-3xl font-medium leading-relaxed italic text-foreground">
            {data.shayari}
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-primary/20" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold">
              Mogra Daily Nazaakat
            </p>
            <span className="h-px w-8 bg-primary/20" />
          </div>
          <p className="text-xs text-muted-foreground italic opacity-60">
            &ldquo;{data.translation}&rdquo;
          </p>
        </div>
        <Quote className="absolute -bottom-6 -right-8 h-12 w-12 text-primary/10 rotate-180" />
      </div>
    </div>
  );
}
