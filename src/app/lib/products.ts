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
  return PlaceHolderImages && PlaceHolderImages[index] 
    ? PlaceHolderImages[index].imageUrl 
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
    id: '4',
    name: 'Midnight Silk Saree',
    description: 'Classic midnight blue saree made from pure Banarasi silk with silver zari borders.',
    price: 850,
    images: [getImg(4)],
    category: 'Ethnic',
    isNew: true
  },
  {
    id: '5',
    name: 'Saffron Boho Dress',
    description: 'Free-spirited bohemian dress with bell sleeves and tassel details in a warm saffron hue.',
    price: 150,
    images: [getImg(5)],
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
