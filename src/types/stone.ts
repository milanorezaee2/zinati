export const STONE_CATEGORIES = ['precious', 'decorative', 'collectible'] as const;
export type StoneCategory = (typeof STONE_CATEGORIES)[number];

export const STONE_AVAILABILITIES = ['available', 'limited', 'sold'] as const;
export type StoneAvailability = (typeof STONE_AVAILABILITIES)[number];

export interface StoneCollection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  cover_image: string | null;
  sort_order: number;
}

export interface Stone {
  id: string;
  code: string;
  name: string;
  category: StoneCategory;
  stone_type: string;
  color: string;
  weight: string | null;
  dimensions: string | null;
  origin: string | null;
  availability: StoneAvailability;
  has_certificate: boolean;
  description: string;
  images: string[];
  featured: boolean;
  sort_order: number;
  collections: StoneCollection[];
}

export interface Catalog {
  stones: Stone[];
  collections: StoneCollection[];
}
