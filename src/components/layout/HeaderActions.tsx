// components/HeaderActions.tsx
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingCart, ChevronDown, X, LogOut } from 'lucide-react';
import { useCart, useWishlist, useAuth, useProducts } from '@/contexts/AppContext';
import { useCurrency } from "@/contexts/CurrencyContext";


// Country/Currency data
const countries = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD'
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP'
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD'
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD'
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR'
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    currency: 'EUR'
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    currency: 'EUR'
  },
  {
    code: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    currency: 'EUR'
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    currency: 'JPY'
  },
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    currency: 'INR'
  }
];

const HeaderActions = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const { selectedCountry, setSelectedCountry, countries } = useCurrency();

  const [searchQuery, setSearchQuery] = useState('');
  
  const searchRef = useRef<HTMLDivElement>(null);
  const accountMenuRef = useRef<HTMLDivElement>(null);


  // Use global state
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isLoggedIn, user, logout } = useAuth();
  const { setSearchQuery: setGlobalSearchQuery, setFilters, resetFilters } = useProducts();

  // Close dropdowns when clicking outside
  // Close dropdowns when clicking outside
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setIsSearchOpen(false);
    }
    if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
      setIsAccountMenuOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);


  // Close modal on escape key
  // Close modal on escape key
useEffect(() => {
  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      if (isCurrencyOpen) setIsCurrencyOpen(false);
      if (isSearchOpen) setIsSearchOpen(false);
    }
  };

  document.addEventListener('keydown', handleEscapeKey);
  return () => document.removeEventListener('keydown', handleEscapeKey);
}, [isCurrencyOpen, isSearchOpen]);


  const handleCountryChange = (country: typeof countries[0]) => {
  setSelectedCountry(country);
  setIsCurrencyOpen(false);
  console.log("🌍 Currency changed to:", country.currency);
};


  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Reset filters to show all relevant results
      resetFilters();
      
      // Set search query
      setGlobalSearchQuery(searchQuery);
      
      // Navigate to products page
      navigate('/products');
      
      // Close search dropdown
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

// const handlePopularSearchClick = (term: string) => {
//     setSearchQuery(term);
    
//     // Reset filters and set search
//     resetFilters();
//     setGlobalSearchQuery(term);
    
//     // Navigate to products page
//     navigate('/products');
    
//     // Close search dropdown
//     setIsSearchOpen(false);
//   };

const handleCategorySearchClick = (category: string, searchTerm: string) => {
    // Reset filters first
    resetFilters();
    
    // Set both category filter and search term
    setTimeout(() => {
      setFilters({
        category: [category],
        metalType: [],
        stoneType: [],
        style: [],
        size: [],
        color: [],
        sortBy: 'best-seller'
      });
      setGlobalSearchQuery(searchTerm);
    }, 100);
    
    // Navigate to products page
    navigate('/products');
    
    // Close search dropdown
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleAccountClick = () => {
    if (isLoggedIn) {
      setIsAccountMenuOpen(!isAccountMenuOpen);
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout();
    setIsAccountMenuOpen(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsAccountMenuOpen(false);
  };

  const handleWishlistClick = () => {
    navigate('/favorites');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  // Popular search terms with categories
  const popularSearches = [
    { term: 'Engagement Rings', category: 'engagement' },
    { term: 'Diamond Earrings', category: 'earrings' },
    { term: 'Gold Necklaces', category: 'necklaces' },
    { term: 'Wedding Bands', category: 'wedding' },
    { term: 'Tennis Bracelets', category: 'tennis' },
    { term: 'Pearl Earrings', category: 'earrings' }
  ];

  return (
    <div className="flex items-center space-x-4">
      {/* Search */}
      <div className="relative" ref={searchRef}>
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="p-2 text-gray-600 hover:text-black transition-colors duration-200"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Enhanced Search Dropdown */}
        {isSearchOpen && (
          <div className="absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                    placeholder="Search for jewelry, diamonds..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  onClick={handleSearch}
                  disabled={!searchQuery.trim()}
                  className="px-6 py-3 bg-[#9a8457] text-white rounded-lg hover:bg-[#8a7547] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                >
                  Search
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-3">Popular searches:</div>
                <div className="grid grid-cols-2 gap-2">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategorySearchClick(search.category, search.term)}
                      className="text-left px-3 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm hover:bg-[#9a8457] hover:text-white transition-colors duration-200"
                    >
                      {search.term}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-3">Browse by category:</div>
                <div className="space-y-1">
                  {[
                    { name: 'All Rings', category: 'rings' },
                    { name: 'All Earrings', category: 'earrings' },
                    { name: 'All Necklaces', category: 'necklaces' },
                    { name: 'All Bracelets', category: 'bracelets' },
                    { name: "Men's Jewelry", category: 'mens' },
                    { name: 'Loose Diamonds', category: 'loose diamonds' }
                  ].map((cat, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategorySearchClick(cat.category, cat.name)}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#9a8457] rounded transition-colors duration-200"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="w-full text-center py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Account */}
      <div className="relative" ref={accountMenuRef}>
        <button
          className="p-2 text-gray-600 hover:text-black transition-colors duration-200"
          aria-label="Account"
          onClick={handleAccountClick}
          title={isLoggedIn ? `Welcome ${user.firstName}` : 'Sign In'}
        >
          <User className="w-5 h-5" />
        </button>

        {/* Account Dropdown Menu */}
        {isLoggedIn && isAccountMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
            <div className="p-4 border-b border-gray-100">
              <div className="font-medium text-gray-800 truncate">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-sm text-gray-500 truncate">{user.email}</div>
            </div>
            <div className="py-2">
              <button
                onClick={handleProfileClick}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Wishlist */}
      <button
        className="relative p-2 text-gray-600 hover:text-black transition-colors duration-200"
        aria-label="Wishlist"
        onClick={handleWishlistClick}
      >
        <Heart className="w-5 h-5" />
        {wishlistCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {wishlistCount}
          </span>
        )}
      </button>

      {/* Cart */}
      <button
        className="relative p-2 text-gray-600 hover:text-black transition-colors duration-200"
        aria-label="Shopping Cart"
        onClick={handleCartClick}
      >
        <ShoppingCart className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {cartCount}
          </span>
        )}
      </button>

      {/* Currency Selector */}
      <div className="relative">
        <button
          onClick={() => setIsCurrencyOpen(true)}
          className="flex items-center space-x-2 p-2 text-gray-600 hover:text-black transition-colors duration-200 border border-gray-300 rounded-md hover:border-gray-400"
        >
          <span className="text-lg">{selectedCountry.flag}</span>
          <span className="text-sm font-medium">{selectedCountry.currency}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Currency Modal Popup - Using Portal */}
      {isCurrencyOpen && createPortal(
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-hidden"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(8px)'
          }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0"
            onClick={() => setIsCurrencyOpen(false)}
          />
          
          {/* Modal */}
          <div 
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
            style={{ zIndex: 100000 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 flex-shrink-0">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Select Currency</h2>
              <button
                onClick={() => setIsCurrencyOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 flex-shrink-0"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Current Selection */}
            <div className="p-4 sm:p-6 bg-gradient-to-br from-[#9a8457]/10 to-[#9a8457]/20 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-md flex items-center justify-center flex-shrink-0">
                  <span className="text-xl sm:text-2xl">{selectedCountry.flag}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800 text-sm sm:text-base truncate">{selectedCountry.name}</div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Currency: {selectedCountry.currency}
                  </div>
                </div>
              </div>
            </div>

            {/* Country List */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">
                  Available Currencies
                </div>
                <div className="space-y-1 px-2">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => handleCountryChange(country)}
                      className={`w-full flex items-center p-3 sm:p-4 rounded-xl transition-all duration-200 ${
                        selectedCountry.code === country.code
                          ? 'bg-[#9a8457] text-white shadow-lg'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          selectedCountry.code === country.code 
                            ? 'bg-white bg-opacity-20' 
                            : 'bg-gray-100'
                        }`}>
                          <span className="text-base sm:text-lg">{country.flag}</span>
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <div className="font-medium text-sm sm:text-base truncate">{country.name}</div>
                          <div className={`text-xs sm:text-sm truncate ${
                            selectedCountry.code === country.code 
                              ? 'text-[#9a8457]/70' 
                              : 'text-gray-500'
                          }`}>
                            {country.currency} Currency
                          </div>
                        </div>
                        <div className={`text-xs sm:text-sm font-semibold px-2 py-1 rounded-md flex-shrink-0 ${
                          selectedCountry.code === country.code
                            ? 'bg-white bg-opacity-20 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {country.currency}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50 flex-shrink-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-xs sm:text-sm text-gray-600">
                  All prices will be converted to your selected currency
                </div>
                <button
                  onClick={() => setIsCurrencyOpen(false)}
                  className="px-4 sm:px-6 py-2 bg-[#9a8457] text-white rounded-lg hover:bg-[#8a7547] transition-colors duration-200 font-medium text-sm sm:text-base"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default HeaderActions;