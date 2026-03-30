import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// Safer extraction to handle potential interop issues or empty JSON files
const rawData = (data as any)?.placeholderImages || [];

export const PlaceHolderImages: ImagePlaceholder[] = rawData;
