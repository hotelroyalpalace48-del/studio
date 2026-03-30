'use client';

import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setIsVisible(false);
    } else {
      console.log('User dismissed the install prompt');
    }
    setDeferredPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-in slide-in-from-left-10 fade-in duration-700">
      <div className="relative group">
        <Button 
          onClick={handleInstallClick}
          className="bg-primary hover:bg-primary/90 text-white rounded-full shadow-[0_20px_50px_rgba(33,138,33,0.3)] flex items-center gap-3 px-6 py-7 border-4 border-white transition-all hover:scale-105 active:scale-95"
        >
          <div className="bg-white/20 p-2 rounded-full">
            <Download className="h-5 w-5" />
          </div>
          <div className="flex flex-col items-start text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] leading-none mb-1 opacity-80">Studio App</span>
            <span className="font-headline text-sm font-bold leading-none">Install Mogra</span>
          </div>
        </Button>
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-white text-primary rounded-full p-1 shadow-md border hover:bg-muted transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
