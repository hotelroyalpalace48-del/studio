
import { PlaceHolderImages } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  isNew?: boolean;
};

// Helper function to safely get an image URL with a fallback
const getImg = (index: number) => {
  const images = PlaceHolderImages || [];
  return images[index] 
    ? images[index].imageUrl 
    : `https://picsum.photos/seed/placeholder-${index}/600/800`;
};

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Emerald Evening Gown',
    description: 'A stunning silk evening gown with intricate hand-embroidered details on the neckline. Perfect for formal gala events.',
    price: 450,
    originalPrice: 550,
    images: [getImg(1)],
    category: 'Formal',
    isNew: true
  },
  {
    id: '7',
    name: 'Lucknowi Chikan Kurti',
    description: 'Exquisite hand-embroidered Georgette Kurti from the heart of Lucknow. Features delicate shadow work and floral motifs.',
    price: 85,
    originalPrice: 120,
    images: [getImg(7)],
    category: 'Kurtis',
    isNew: true
  },
  {
    id: '8',
    name: 'Kalamkari Dress Material',
    description: 'Hand-painted Kalamkari cotton dress material. Includes unstitched fabric for Kurta, Bottom, and a matching Dupatta.',
    price: 120,
    images: [getImg(8)],
    category: 'Dress Materials'
  },
  {
    id: '9',
    name: 'Banarasi Silk Palazzo Set',
    description: 'Luxurious Banarasi silk palazzos paired with a minimal silk tunic. A perfect blend of tradition and comfort.',
    price: 180,
    originalPrice: 210,
    images: [getImg(9)],
    category: 'Palazzos',
    isNew: true
  },
  {
    id: '4',
    name: 'Midnight Silk Saree',
    description: 'Classic midnight blue saree made from pure Banarasi silk with silver zari borders.',
    price: 850,
    images: [getImg(4)],
    category: 'Ethnic',
    isNew: true
  },
  {
    id: '10',
    name: 'Chikankari White Palazzo',
    description: 'Pure cotton white palazzos with intricate white-on-white Chikankari embroidery. Essential summer comfort.',
    price: 65,
    images: [getImg(10)],
    category: 'Palazzos'
  },
  {
    id: '11',
    name: 'Block Print Cotton Suit',
    description: 'Jaipuri hand-block printed cotton suit set. Breathable fabric perfect for daily elegance.',
    price: 110,
    images: [getImg(11)],
    category: 'Ethnic'
  },
  {
    id: '12',
    name: 'Festive Georgette Kurti',
    description: 'Vibrant georgette kurti with mirror work and zari borders. Ideal for small celebrations and festive gatherings.',
    price: 95,
    images: [getImg(12)],
    category: 'Kurtis'
  },
  {
    id: '2',
    name: 'Spring Blossom Maxi',
    description: 'Lightweight chiffon maxi dress featuring a vibrant floral print and elegant tiered skirt.',
    price: 220,
    images: [getImg(2)],
    category: 'Summer'
  },
  {
    id: '3',
    name: 'Opal Minimalist Tunic',
    description: 'A contemporary take on the traditional tunic, crafted from organic cotton with clean lines and a relaxed fit.',
    price: 180,
    images: [getImg(3)],
    category: 'Casual'
  },
  {
    id: '6',
    name: 'Royal Festive Anarkali',
    description: 'A regal floor-length Anarkali suit with heavy gold embroidery, ideal for weddings and celebrations.',
    price: 600,
    originalPrice: 750,
    images: [getImg(6)],
    category: 'Ethnic'
  }
];

export function getProducts() {
  return DEFAULT_PRODUCTS;
}

export function getProductById(id: string) {
  return DEFAULT_PRODUCTS.find(p => p.id === id);
}
