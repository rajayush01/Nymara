// contexts/AppContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
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
  isMadetoOrder: boolean;
  description: string;
  discount: number;
  inStock?: boolean;
  category?: string;
  tags?: string[];
  gender?: 'mens' | 'womens' | 'unisex';
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedMetal?: string;
  engraving?: string;
}

export interface WishlistItem extends Product {
  addedDate: string;
}

export interface User {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  isLoggedIn: boolean;
}

export interface AppState {
  products: Product[];
  cart: CartItem[];
  wishlist: WishlistItem[];
  user: User;
  selectedCurrency: string;
  searchQuery: string;
  filters: {
    metalType: string[];
    stoneType: string[];
    style: string[];
    size: string[];
    color: string[];
    category: string[];
    sortBy: string;
    priceRange?: [number, number];
  };
}

// Actions
export type AppAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; options?: any } }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_CURRENCY'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<AppState['filters']> }
  | { type: 'RESET_FILTERS' };

// Enhanced Sample Products Data with better categorization
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Celestial Solitaire Engagement Ring",
    price: 125000,
    originalPrice: 150000,
    metalType: "18K White Gold",
    stoneType: "Lab-Grown Diamond",
    style: "Solitaire",
    size: ["5", "6", "7", "8"],
    color: "D-Color",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    isNew: false,
    isBestSeller: true,
    isMadetoOrder: true,
    description: "Timeless elegance with a brilliant lab-grown diamond",
    discount: 17,
    inStock: true,
    category: "Engagement Rings",
    tags: ["engagement", "solitaire", "diamond", "wedding", "rings"],
    gender: "womens"
  },
  {
    id: 2,
    name: "Classic Wedding Band",
    price: 45000,
    originalPrice: 45000,
    metalType: "18K Yellow Gold",
    stoneType: "None",
    style: "Wedding Band",
    size: ["5", "6", "7", "8", "9"],
    color: "Gold",
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    isNew: false,
    isBestSeller: true,
    isMadetoOrder: true,
    description: "Classic yellow gold wedding band",
    discount: 0,
    inStock: true,
    category: "Wedding Bands",
    tags: ["wedding", "band", "classic", "gold", "rings"],
    gender: "unisex"
  },
  {
    id: 3,
    name: "Pearl Drop Earrings",
    price: 35000,
    originalPrice: 42000,
    metalType: "Sterling Silver",
    stoneType: "Pearl",
    style: "Drop",
    size: ["One Size"],
    color: "White",
    rating: 4.6,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    isNew: true,
    isBestSeller: false,
    isMadetoOrder: true,
    description: "Elegant pearl drop earrings for any occasion",
    discount: 17,
    inStock: true,
    category: "Earrings",
    tags: ["earrings", "pearl", "drop", "elegant", "studs"],
    gender: "womens"
  },
  {
    id: 4,
    name: "Diamond Stud Earrings",
    price: 89000,
    originalPrice: 89000,
    metalType: "18K White Gold",
    stoneType: "Lab-Grown Diamond",
    style: "Studs",
    size: ["One Size"],
    color: "White",
    rating: 4.8,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
    isNew: false,
    isBestSeller: true,
    isMadetoOrder: true,
    description: "Classic diamond stud earrings",
    discount: 0,
    inStock: true,
    category: "Earrings",
    tags: ["earrings", "diamond", "studs", "classic"],
    gender: "womens"
  },
  {
    id: 5,
    name: "Vintage Rose Gold Necklace",
    price: 78000,
    originalPrice: 95000,
    metalType: "18K Rose Gold",
    stoneType: "Ruby",
    style: "Vintage",
    size: ["18 inch"],
    color: "Rose Gold",
    rating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1603561596112-6a132309c76d?w=400&h=400&fit=crop",
    isNew: false,
    isBestSeller: true,
    isMadetoOrder: true,
    description: "Vintage-inspired necklace with ruby accents",
    discount: 18,
    inStock: true,
    category: "Necklaces",
    tags: ["necklace", "vintage", "ruby", "rose gold", "pendants"],
    gender: "womens"
  },
  {
    id: 6,
    name: "Diamond Tennis Necklace",
    price: 189000,
    originalPrice: 220000,
    metalType: "Platinum",
    stoneType: "Lab-Grown Diamond",
    style: "Tennis",
    size: ["16 inch", "18 inch"],
    color: "White",
    rating: 4.7,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    isNew: true,
    isBestSeller: false,
    isMadetoOrder: true,
    description: "Luxurious diamond tennis necklace",
    discount: 14,
    inStock: true,
    category: "Necklaces",
    tags: ["necklace", "tennis", "diamond", "luxury"],
    gender: "womens"
  },
  {
    id: 7,
    name: "Emerald Tennis Bracelet",
    price: 189000,
    originalPrice: 220000,
    metalType: "Platinum",
    stoneType: "Emerald",
    style: "Tennis",
    size: ["7 inch", "8 inch"],
    color: "Green",
    rating: 4.7,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
    isNew: false,
    isBestSeller: false,
    isMadetoOrder: true,
    description: "Luxurious emerald tennis bracelet",
    discount: 14,
    inStock: true,
    category: "Bracelets",
    tags: ["bracelet", "tennis", "emerald", "luxury"],
    gender: "womens"
  },
  {
    id: 8,
    name: "Gold Bangle Set",
    price: 56000,
    originalPrice: 56000,
    metalType: "18K Yellow Gold",
    stoneType: "None",
    style: "Bangles",
    size: ["One Size"],
    color: "Gold",
    rating: 4.5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    isNew: false,
    isBestSeller: true,
    isMadetoOrder: true,
    description: "Traditional gold bangle set",
    discount: 0,
    inStock: true,
    category: "Bracelets",
    tags: ["bracelet", "bangles", "gold", "traditional"],
    gender: "womens"
  },
  {
    id: 9,
    name: "Men's Signet Ring",
    price: 67000,
    originalPrice: 67000,
    metalType: "18K Yellow Gold",
    stoneType: "None",
    style: "Signet",
    size: ["8", "9", "10", "11"],
    color: "Gold",
    rating: 4.6,
    reviews: 34,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    isNew: true,
    isBestSeller: false,
    isMadetoOrder: true,
    description: "Classic men's signet ring",
    discount: 0,
    inStock: true,
    category: "Men's Rings",
    tags: ["mens", "ring", "signet", "classic", "gold"],
    gender: "mens"
  },
  {
    id: 10,
    name: "Men's Chain Necklace",
    price: 89000,
    originalPrice: 105000,
    metalType: "18K White Gold",
    stoneType: "None",
    style: "Chain",
    size: ["20 inch", "22 inch", "24 inch"],
    color: "White",
    rating: 4.4,
    reviews: 23,
    image: "https://images.unsplash.com/photo-1603561596112-6a132309c76d?w=400&h=400&fit=crop",
    isNew: false,
    isBestSeller: false,
    isMadetoOrder: true,
    description: "Modern men's chain necklace",
    discount: 15,
    inStock: true,
    category: "Men's Necklaces",
    tags: ["mens", "necklace", "chain", "modern"],
    gender: "mens"
  },
  {
    id: 11,
    name: "Sapphire Cluster Ring",
    price: 96000,
    originalPrice: 96000,
    metalType: "14K Yellow Gold",
    stoneType: "Sapphire",
    style: "Cluster",
    size: ["6", "7", "8", "9"],
    color: "Blue",
    rating: 4.5,
    reviews: 43,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    isNew: true,
    isBestSeller: false,
    isMadetoOrder: true,
    description: "Beautiful sapphire cluster ring",
    discount: 0,
    inStock: true,
    category: "Cocktail Rings",
    tags: ["ring", "sapphire", "cluster", "cocktail", "gemstone"],
    gender: "womens"
  },
  {
    id: 12,
    name: "Loose Round Diamond 1ct",
    price: 45000,
    originalPrice: 45000,
    metalType: "None",
    stoneType: "Lab-Grown Diamond",
    style: "Round",
    size: ["1ct"],
    color: "D-Color",
    rating: 4.9,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    isNew: false,
    isBestSeller: true,
    isMadetoOrder: true,
    description: "Premium 1ct round lab-grown diamond",
    discount: 0,
    inStock: true,
    category: "Loose Diamonds",
    tags: ["diamond", "loose", "round", "1ct", "lab-grown"],
    gender: "unisex"
  }
];

// Initial State - Load user from localStorage if available
const loadUserFromStorage = (): User => {
  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      return { ...user, isLoggedIn: true };
    }
  } catch (error) {
    console.error('Error loading user from storage:', error);
  }
  return { isLoggedIn: false };
};

const initialState: AppState = {
  products: sampleProducts,
  cart: [],
  wishlist: [],
  user: loadUserFromStorage(),
  selectedCurrency: 'INR',
  searchQuery: '',
  filters: {
    metalType: [],
    stoneType: [],
    style: [],
    size: [],
    color: [],
    category: [],
    sortBy: 'best-seller'
  }
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };

    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.product.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { 
          ...action.payload.product, 
          quantity: action.payload.quantity,
          ...action.payload.options 
        }]
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'ADD_TO_WISHLIST':
      const isAlreadyInWishlist = state.wishlist.some(item => item.id === action.payload.id);
      if (isAlreadyInWishlist) return state;
      
      return {
        ...state,
        wishlist: [...state.wishlist, { 
          ...action.payload, 
          addedDate: new Date().toISOString().split('T')[0] 
        }]
      };

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload)
      };

    case 'CLEAR_WISHLIST':
      return { ...state, wishlist: [] };

    case 'SET_USER':
      // Also store in localStorage
      try {
        localStorage.setItem('user', JSON.stringify(action.payload));
      } catch (error) {
        console.error('Error saving user to storage:', error);
      }
      return { ...state, user: action.payload };

    case 'LOGOUT':
      // Clear localStorage
      try {
        localStorage.removeItem('user');
      } catch (error) {
        console.error('Error removing user from storage:', error);
      }
      return { ...state, user: { isLoggedIn: false } };

    case 'SET_CURRENCY':
      return { ...state, selectedCurrency: action.payload };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };

    case 'RESET_FILTERS':
      return {
        ...state,
        searchQuery: '',
        filters: {
          metalType: [],
          stoneType: [],
          style: [],
          size: [],
          color: [],
          category: [],
          sortBy: 'best-seller'
        }
      };

    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider Component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Helper Functions
export const useCart = () => {
  const { state, dispatch } = useAppContext();

  const addToCart = (product: Product, quantity: number = 1, options?: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity, options } });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const cartTotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart: state.cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount
  };
};

export const useWishlist = () => {
  const { state, dispatch } = useAppContext();

  const addToWishlist =(product: Product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const removeFromWishlist = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (id: number) => {
    return state.wishlist.some(item => item.id === id);
  };

  return {
    wishlist: state.wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    wishlistCount: state.wishlist.length
  };
};

export const useProducts = () => {
  const { state, dispatch } = useAppContext();

  const getFilteredProducts = () => {
    let filtered = state.products.filter(product => {
      // Search query matching - search in name, description, category, and tags
      const matchesSearch = !state.searchQuery || 
        product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(state.searchQuery.toLowerCase()));
      
      // Category filtering
      const matchesCategory = state.filters.category.length === 0 || 
        state.filters.category.some(filterCategory => 
          product.category?.toLowerCase().includes(filterCategory.toLowerCase()) ||
          product.tags?.some(tag => tag.toLowerCase().includes(filterCategory.toLowerCase()))
        );
      
      const matchesMetalType = state.filters.metalType.length === 0 || 
                              state.filters.metalType.includes(product.metalType);
      
      const matchesStoneType = state.filters.stoneType.length === 0 || 
                              state.filters.stoneType.includes(product.stoneType);
      
      const matchesStyle = state.filters.style.length === 0 || 
                          state.filters.style.includes(product.style);
      
      const matchesSize = state.filters.size.length === 0 || 
                         product.size.some(size => state.filters.size.includes(size));
      
      const matchesColor = state.filters.color.length === 0 || 
                          state.filters.color.includes(product.color);
      
      return matchesSearch && matchesCategory && matchesMetalType && matchesStoneType && matchesStyle && matchesSize && matchesColor;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (state.filters.sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return Number(b.isNew) - Number(a.isNew);
        case "best-seller":
        default:
          return Number(b.isBestSeller) - Number(a.isBestSeller);
      }
    });

    return filtered;
  };

  const getProductById = (id: number) => {
    return state.products.find(product => product.id === id);
  };

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const setFilters = (filters: Partial<AppState['filters']>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  // Get unique categories for filter options
  const getCategories = () => {
    const categories = new Set<string>();
    state.products.forEach(product => {
      if (product.category) categories.add(product.category);
      product.tags?.forEach(tag => categories.add(tag));
    });
    return Array.from(categories).sort();
  };

  return {
    products: state.products,
    filteredProducts: getFilteredProducts(),
    getProductById,
    searchQuery: state.searchQuery,
    filters: state.filters,
    setSearchQuery,
    setFilters,
    resetFilters,
    getCategories
  };
};

export const useAuth = () => {
  const { state, dispatch } = useAppContext();

  const login = (user: Omit<User, 'isLoggedIn'>) => {
    dispatch({ type: 'SET_USER', payload: { ...user, isLoggedIn: true } });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return {
    user: state.user,
    login,
    logout,
    isLoggedIn: state.user.isLoggedIn
  };
};