import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mogra Design Studio',
    short_name: 'Mogra',
    description: 'Exquisite Boutique Fashion and Bespoke Dress Patterns',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#218a21',
    icons: [
      {
        src: 'https://picsum.photos/seed/mogra-icon/192/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://picsum.photos/seed/mogra-icon/512/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
