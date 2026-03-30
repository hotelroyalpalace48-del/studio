import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { PWAInstall } from '@/components/pwa-install';
import { Clover } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mogra Design Studio | Exquisite Boutique Fashion & Bespoke Tailoring',
  description: 'Mogra Design Studio in Bhopal offers a curated collection of dress patterns, boutique items, and elegant fashion designs. Discover the essence of Nazaakat with our bespoke tailoring and ethnic wear.',
  keywords: ['Mogra Design Studio', 'Boutique Bhopal', 'Dress Patterns', 'Bespoke Tailoring', 'Ethnic Wear', 'Fashion Design', 'Mogra Bhopal'],
  authors: [{ name: 'Mogra Design Studio' }],
  openGraph: {
    title: 'Mogra Design Studio | Exquisite Boutique Fashion',
    description: 'Handcrafted silhouettes and bespoke tailoring from the heart of Bhopal. Explore our curated collections.',
    url: 'https://mograworld.com',
    siteName: 'Mogra Design Studio',
    images: [
      {
        url: 'https://picsum.photos/seed/mogra-og/1200/630',
        width: 1200,
        height: 630,
        alt: 'Mogra Design Studio Collection',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mogra Design Studio | Boutique Fashion',
    description: 'Ethereal Nazaakat in every stitch. Discover our latest collections in Bhopal.',
    images: ['https://picsum.photos/seed/mogra-twitter/1200/630'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mogra Studio',
  },
  metadataBase: new URL('https://mograworld.com'),
};

export const viewport: Viewport = {
  themeColor: '#1b4d3e',
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
      <body className="font-body antialiased flex flex-col min-h-screen relative overflow-x-hidden">
        <FirebaseClientProvider>
          {/* Immersive Ethereal Background Watermark */}
          <div className="fixed inset-0 pointer-events-none -z-20 flex items-center justify-center overflow-hidden opacity-[0.03] select-none">
            <div className="flex flex-col items-center animate-ethereal">
              <Clover className="w-[40vw] h-[40vw] text-primary" strokeWidth={0.3} />
              <span className="text-[35vw] font-headline font-bold uppercase tracking-tighter text-primary whitespace-nowrap text-3d-mogra -mt-[12vw]">
                Mogra
              </span>
            </div>
          </div>
          
          <Navbar />
          <main className="flex-1 relative z-10">
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
