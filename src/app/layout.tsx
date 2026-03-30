
import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { PWAInstall } from '@/components/pwa-install';
import { Clover } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mogra Design Studio | Exquisite Boutique Fashion',
  description: 'Mogra Design Studio offers a curated collection of dress patterns, boutique items, and elegant fashion designs.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mogra Studio',
  },
};

export const viewport: Viewport = {
  themeColor: '#218a21',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen relative">
        <FirebaseClientProvider>
          {/* 3D Background Watermark */}
          <div className="fixed inset-0 pointer-events-none -z-20 flex items-center justify-center overflow-hidden opacity-[0.04] select-none">
            <div className="flex flex-col items-center rotate-[-12deg]">
              <Clover className="w-[15vw] h-[15vw] text-primary" />
              <span className="text-[20vw] font-headline font-bold uppercase tracking-tighter text-primary whitespace-nowrap text-3d-mogra">
                Mogra
              </span>
            </div>
          </div>
          
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
          <PWAInstall />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
