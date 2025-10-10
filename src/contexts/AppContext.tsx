// contexts/AppContext.tsx
import React, { createContext, useContext, useReducer, ReactNode,useEffect } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

// Types
export interface Product {
  _id: string;               // from MongoDB
        // fallback for local/demo products

  name: string;
  description?: string;

  // ✅ Pricing
  price: number;
  originalPrice?: number;     // optional, only for discounts
  discount?: number;          // optional, computed on frontend
  prices?: {
    [key: string]: {
      amount: number;
      symbol: string;
    };
  };

  // ✅ Product details
  type?: string;              // Ring, Chain, Bracelet etc.
  subCategory?: string[];
  category?: string[];

  metalType?: string;
  stoneType?: string;
  style?: string;
  size?: string[];
  color?: string;

  weight?: number;
  purity?: string;

  // ✅ Stock & flags
  stock?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isMadetoOrder?: boolean;
  inStock?: boolean;          // legacy field (maps to stock > 0)

  // ✅ Images
  coverImage?: string;
  images?: string[];

  // ✅ Rating
  rating?: number;
  reviews?: number;

  // ✅ Misc
  tags?: string[];
  gender?: "Men" | "Women" | "Unisex";
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
    sortBy: string;
    priceRange?: [number, number];
    page: number;       // ✅ added
    limit: number;      // ✅ added
    currency: string;   // ✅ added
  };
}

// Actions
export type AppAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; options?: any } }
  | { type: 'REMOVE_FROM_CART'; payload: string }   // ✅ changed to string
  | { type: 'UPDATE_CART_QUANTITY'; payload: { _id: string; quantity: number } }  // ✅ changed id → _id:string
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }   // ✅ changed to string
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_CURRENCY'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<AppState['filters']> }
  | { type: 'RESET_FILTERS' };


// Enhanced Sample Products Data with better categorization


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
    priceRange: undefined,
    sortBy: 'best-seller',
    page: 1,                 // ✅ default to first page
    limit: 600,               // ✅ default number of products per page
    currency: "INR",         // ✅ default to INR
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
    cart: state.cart.filter(item => item._id !== action.payload) // ✅ consistent with _id:string
  };


  case 'UPDATE_CART_QUANTITY':
  return {
    ...state,
    cart: state.cart
      .map(item =>
        item._id === action.payload._id   // ✅ compare using _id (string)
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      )
      .filter(item => item.quantity > 0),
  };


    case 'CLEAR_CART':
      return { ...state, cart: [] };

  case 'ADD_TO_WISHLIST': {
  const isAlreadyInWishlist = state.wishlist.some(
    item => item._id === action.payload._id   // ✅ compare with _id (string)
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
           subCategory: [],
          sortBy: 'best-seller',
           priceRange: undefined,  // reset to no price range
      page: 1,                // reset back to first page
      limit: 12,              // reset default items per page
      currency: 'INR'         // reset to INR by default
          
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

  const addToWishlist =(product: Product) => {
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

  // Fetch products from backend whenever filters/searchQuery change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params: any = {
          category: state.filters.category?.join(","),
          subCategory: state.filters.subCategory?.join(","),

          metalType: state.filters.metalType?.join(","),
          stoneType: state.filters.stoneType?.join(","),
          style: state.filters.style?.join(","),
          size: state.filters.size?.join(","),
          color: state.filters.color?.join(","),
          minPrice: state.filters.priceRange?.[0],
          maxPrice: state.filters.priceRange?.[1],
          search: state.searchQuery,
          sort: state.filters.sortBy,
          page: state.filters.page,
          limit: state.filters.limit,
          currency: state.filters.currency,
        };

        const res = await axios.get(`${API_URL}/api/user/ornaments`, { params });

        if (res.data?.ornaments) {
          dispatch({ type: "SET_PRODUCTS", payload: res.data.ornaments });
        }
      } catch (error: any) {
        console.error("❌ Failed to fetch products:", error.response?.data || error.message);
      }
    };

    fetchProducts();
  }, [state.filters, state.searchQuery, dispatch]);

  const getFilteredProducts = () => {
    let filtered = state.products;

    if (state.searchQuery) {
      filtered = filtered.filter((product: any) =>
        product.name?.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
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
      if (product.category) categories.add(product.category);
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