// pages/FavoritesPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Share2, Eye, Grid3X3, List, Star, Trash2 } from 'lucide-react';
import { useWishlist, useCart, WishlistItem } from '@/contexts/AppContext';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const categories = ['all', ...Array.from(new Set(wishlist.map(item => item.category).filter(Boolean)))];

  const handleAddToCart = (item:WishlistItem) => {
    addToCart(item, 1);
    console.log('Added to cart:', item.name);
  };

  const shareWishlist = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Jewelry Wishlist',
        text: 'Check out my favorite jewelry pieces!',
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      console.log('Wishlist URL copied to clipboard');
    }
  };

  const filteredItems = wishlist.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
      case 'oldest':
        return new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime();
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

const WishlistItemCard: React.FC<{ item: WishlistItem }> = ({ item }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow duration-300">
      <div className="relative cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!item.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-800">
              Out of Stock
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeFromWishlist(item.id);
            }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors group/btn"
          >
            <Heart className="w-4 h-4 text-red-500 fill-current group-hover/btn:scale-110 transition-transform" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${item.id}`);
            }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-gray-600">
            Added {new Date(item.addedDate).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">
              {item.rating} ({item.reviews})
            </span>
          </div>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {item.category}
          </span>
        </div>
        
        <h3 
          className="font-medium text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-[#9a8457]"
          onClick={() => navigate(`/product/${item.id}`)}
        >
          {item.name}
        </h3>
        
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-semibold text-gray-900">
            ₹{item.price.toLocaleString()}
          </span>
          {item.originalPrice > item.price && (
            <span className="text-sm text-gray-500 line-through">
              ₹{item.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2 mb-4 text-xs text-gray-600">
          <span>{item.metalType}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>{item.stoneType}</span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => handleAddToCart(item)}
            disabled={!item.inStock}
            className="flex-1 bg-[#9a8457] text-white py-2 px-4 rounded-lg hover:bg-[#8a7547] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <button
            onClick={() => removeFromWishlist(item.id)}
            className="p-2 border border-gray-300 rounded-lg hover:border-red-300 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

const WishlistItemRow: React.FC<{ item: WishlistItem }> = ({ item }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center space-x-4 hover:shadow-sm transition-shadow">
      <div className="relative cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        {!item.inStock && (
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs">Out</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 
          className="font-medium text-gray-900 truncate cursor-pointer hover:text-[#9a8457]"
          onClick={() => navigate(`/product/${item.id}`)}
        >
          {item.name}
        </h3>
        <div className="flex items-center mt-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-xs text-gray-600 ml-1">
            {item.rating} ({item.reviews})
          </span>
        </div>
        <div className="text-xs text-gray-600 mt-1">
          {item.metalType} • {item.stoneType}
        </div>
      </div>
      
      <div className="text-right">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-900">
            ₹{item.price.toLocaleString()}
          </span>
          {item.originalPrice > item.price && (
            <span className="text-sm text-gray-500 line-through">
              ₹{item.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Added {new Date(item.addedDate).toLocaleDateString()}
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={() => handleAddToCart(item)}
          disabled={!item.inStock}
          className="bg-[#9a8457] text-white py-1 px-3 rounded text-sm hover:bg-[#8a7547] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Add to Cart
        </button>
        <button
          onClick={() => removeFromWishlist(item.id)}
          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
              <p className="text-gray-600 mt-1">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {wishlist.length > 0 && (
                <>
                  <button
                    onClick={shareWishlist}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to clear your entire wishlist?')) {
                        clearWishlist();
                      }
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear All</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {wishlist.length === 0 ? (
        // Empty State
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start adding items to your favorites by clicking the heart icon on any product you love.
            </p>
            <button 
              onClick={() => navigate('/products')}
              className="bg-[#9a8457] text-white px-8 py-3 rounded-lg hover:bg-[#8a7547] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters and Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#9a8457] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[#9a8457] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Items Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedItems.map(item => (
                <WishlistItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedItems.map(item => (
                <WishlistItemRow key={item.id} item={item} />
              ))}
            </div>
          )}

          {/* Summary */}
          <div className="mt-12 bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Wishlist Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-[#9a8457]">{wishlist.length}</div>
                <div className="text-sm text-gray-600">Total Items</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-[#9a8457]">
                  ₹{wishlist.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Value</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  ₹{wishlist.reduce((sum, item) => sum + (item.originalPrice - item.price), 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Savings</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;