// contexts/AppContext.tsx
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

// Types
export interface Product {
  _id: string;
  sku?: string; 
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  prices?: {
    [key: string]: {
      amount: number;
      symbol: string;
    };
  };
  makingCharges?: number;
  makingChargesByCountry?: {
    [key: string]: {
      amount: number;
      currency: string;
      symbol: string;
    };
  };
  type?: string;
  subCategory?: string[];
  category?: string | string[]; 
  metalType?: string;
  stoneType?: string;
  style?: string;
  size?: string | string[]; 
  color?: string;
  weight?: number;
  purity?: string;
  stock?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isMadetoOrder?: boolean;
  inStock?: boolean;
  coverImage?: string;
  images?: string[];
  videoUrl?: string;
  rating?: number;
  reviews?: number;
  diamondDetails?: Record<string, string | number>;
  sideDiamondDetails?: Record<string, string | number>;
  variantLinks?: {
    [metalType: string]: string;
  };
  tags?: string[];
  gender?: "Men" | "Women" | "Unisex";
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedMetal?: string;
  engraving?: string;
  makingCharges?: number;
  makingChargesByCountry?: {
    [key: string]: {
      amount: number;
      currency: string;
      symbol: string;
    };
  };
}

export interface WishlistItem extends Product {
  addedDate: string;
}

export interface User {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
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
    subCategory: string[];
    gender: string[]; 
    sortBy: string;
    priceRange?: [number, number];
    page: number;
    limit: number;
    currency: string;
  };
}

// Actions
export type AppAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; options?: any } }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { _id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_CURRENCY'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<AppState['filters']> }
  | { type: 'RESET_FILTERS' };

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
  products: [],
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
    subCategory: [],
    gender: [],
    priceRange: undefined,
    sortBy: 'best-seller',
    page: 1,
    limit: 600,
    currency: "INR",
  }
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };

    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item._id === action.payload.product._id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item._id === action.payload.product._id
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
        cart: state.cart.filter(item => item._id !== action.payload)
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart
          .map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: Math.max(0, action.payload.quantity) }
              : item
          )
          .filter(item => item.quantity > 0),
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'ADD_TO_WISHLIST': {
      const isAlreadyInWishlist = state.wishlist.some(
        item => item._id === action.payload._id
      );
      if (isAlreadyInWishlist) return state;

      return {
        ...state,
        wishlist: [
          ...state.wishlist,
          { 
            ...action.payload, 
            addedDate: new Date().toISOString().split('T')[0] 
          }
        ]
      };
    }

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item._id !== action.payload)
      };

    case 'CLEAR_WISHLIST':
      return { ...state, wishlist: [] };

    case 'SET_USER':
      try {
        localStorage.setItem('user', JSON.stringify(action.payload));
      } catch (error) {
        console.error('Error saving user to storage:', error);
      }
      return { ...state, user: action.payload };

    case 'LOGOUT':
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
          subCategory: [],
          gender: [],
          sortBy: 'best-seller',
          priceRange: undefined,
          page: 1,
          limit: 12,
          currency: 'INR'
        }
      };

    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const useCart = () => {
  const { state, dispatch } = useAppContext();

  const addToCart = (product: Product, quantity: number = 1, options?: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity, options } });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (_id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { _id, quantity } });
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

  const addToWishlist = (product: Product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const removeFromWishlist = (_id: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: _id });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (_id: string) => {
    return state.wishlist.some(item => item._id === _id);
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

  // Fetch ALL products from backend (no filtering on backend)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products without filters
        const res = await axios.get(`${API_URL}/api/user/ornaments`, {
          params: {
            limit: 1000, // Get all products
            currency: state.filters.currency,
          }
        });

        if (res.data?.ornaments) {
          dispatch({ type: "SET_PRODUCTS", payload: res.data.ornaments });
        }
      } catch (error: any) {
        console.error("❌ Failed to fetch products:", error.response?.data || error.message);
      }
    };

    fetchProducts();
  }, [dispatch]); // Only fetch once on mount

  const getFilteredProducts = () => {
    let filtered = [...state.products];

    // Filter by search query
    if (state.searchQuery && state.searchQuery.trim() !== '') {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter((product: any) =>
        product.name?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.tags?.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (state.filters.category.length > 0) {
      filtered = filtered.filter((product: any) => {
        const productCategory = Array.isArray(product.category) 
          ? product.category 
          : [product.category];
        return state.filters.category.some(cat => 
          productCategory.some((pc: string) => pc?.toLowerCase() === cat.toLowerCase())
        );
      });
    }

    // Filter by subCategory
    if (state.filters.subCategory.length > 0) {
      filtered = filtered.filter((product: any) => {
        const productSubCats = Array.isArray(product.subCategory) 
          ? product.subCategory 
          : product.subCategory ? [product.subCategory] : [];
        return state.filters.subCategory.some(subCat => 
          productSubCats.some((psc: string) => psc?.toLowerCase() === subCat.toLowerCase())
        );
      });
    }

    // Filter by metal type
    if (state.filters.metalType.length > 0) {
      filtered = filtered.filter((product: any) =>
        state.filters.metalType.some(metal => 
          product.metalType?.toLowerCase() === metal.toLowerCase()
        )
      );
    }

    // Filter by stone type
    if (state.filters.stoneType.length > 0) {
      filtered = filtered.filter((product: any) =>
        state.filters.stoneType.some(stone => 
          product.stoneType?.toLowerCase() === stone.toLowerCase()
        )
      );
    }

    // Filter by style
    if (state.filters.style.length > 0) {
      filtered = filtered.filter((product: any) =>
        state.filters.style.some(style => 
          product.style?.toLowerCase() === style.toLowerCase()
        )
      );
    }

    // Filter by size
    if (state.filters.size.length > 0) {
      filtered = filtered.filter((product: any) => {
        const productSizes = Array.isArray(product.size) 
          ? product.size 
          : product.size ? [product.size] : [];
        return state.filters.size.some(size => 
          productSizes.some((ps: string) => ps?.toLowerCase() === size.toLowerCase())
        );
      });
    }

    // Filter by color
    if (state.filters.color.length > 0) {
      filtered = filtered.filter((product: any) =>
        state.filters.color.some(color => 
          product.color?.toLowerCase() === color.toLowerCase()
        )
      );
    }

    // Filter by gender
    if (state.filters.gender.length > 0) {
      filtered = filtered.filter((product: any) =>
        state.filters.gender.some(gender => 
          product.gender?.toLowerCase() === gender.toLowerCase()
        )
      );
    }

    // Filter by price range
    if (state.filters.priceRange) {
      const [minPrice, maxPrice] = state.filters.priceRange;
      filtered = filtered.filter((product: any) =>
        product.price >= minPrice && product.price <= maxPrice
      );
    }

    // Sort products
    switch (state.filters.sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
        break;
      case 'best-seller':
      default:
        filtered.sort((a, b) => {
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          return 0;
        });
        break;
    }

    return filtered;
  };

  const getProductById = (id: string) => {
    return state.products.find((product: any) => product._id === id || product.id === id);
  };

  const setSearchQuery = (query: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query });
  };

  const setFilters = (filters: Partial<typeof state.filters>) => {
    dispatch({ type: "SET_FILTERS", payload: filters });
  };

  const resetFilters = () => {
    dispatch({ type: "RESET_FILTERS" });
  };

  const getCategories = () => {
    const categories = new Set<string>();
    state.products.forEach((product: any) => {
      if (product.category) {
        if (Array.isArray(product.category)) {
          product.category.forEach((cat: string) => categories.add(cat));
        } else {
          categories.add(product.category);
        }
      }
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
    getCategories,
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
