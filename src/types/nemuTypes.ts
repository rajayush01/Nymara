// types/menuTypes.ts
export type Action =
  | { type: "scroll"; target: string }
  | { type: "navigate"; target: string }
  | { type: "external"; target: string };

export interface MenuItem {
  name: string;
  action: Action;
}

export interface MenuSection {
  [key: string]: MenuItem[];
}

export interface MenuSection {
  rings: MenuItem[];
  earrings: MenuItem[];
  necklaces: MenuItem[];
  bracelets: MenuItem[];
  mens: MenuItem[];
  education: MenuItem[];
  looseDiamonds: MenuItem[];
  more: MenuItem[];
}

export interface ActiveFilters {
  metalType: string[];
  stoneType: string[];
  style: string[];
  size: string[];
  color: string[];
  sortBy: string;
  category?: string[]; // Add category filter
  priceRange?: [number, number];
}

export interface FilterOptions {
  metalType: string[];
  stoneType: string[];
  style: string[];
  size: string[];
  color: string[];
  category: string[];
  sortBy: Array<{
    value: string;
    label: string;
  }>;
}