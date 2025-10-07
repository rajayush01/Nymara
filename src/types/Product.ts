// types/product.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  metalType: string;
  stoneType: string;
  style: string;
  size: string[];
  color: string;
  rating: number;
  reviews: number;
  image: string;
  isNew: boolean;
  isBestSeller: boolean;
  isMadetoOrder?: boolean;
  description: string;
  discount: number;
}

export interface FilterOptions {
  metalType: string[];
  stoneType: string[];
  style: string[];
  size: string[];
  color: string[];
  sortBy: { value: string; label: string }[];
}

export interface ActiveFilters {
  metalType: string[];
  stoneType: string[];
  style: string[];
  size: string[];
  color: string[];
  sortBy: string;
}

export type ViewMode = "grid" | "list";