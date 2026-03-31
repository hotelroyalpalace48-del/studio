import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mogra Design Studio',
    short_name: 'Mogra Studio',
    description: 'Exquisite Boutique Fashion and Bespoke Dress Patterns from Bhopal. Now Live.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fdfcf9',
    theme_color: '#3d441e',
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