// components/product/RelatedProducts.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { Product, useCart, useWishlist } from '@/contexts/AppContext';

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistToggle = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (products.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">You Might Also Like</h2>
        <button
          onClick={() => navigate('/products')}
          className="text-[#9a8457] hover:text-[#8a7547] font-medium"
        >
          View All Products →
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col space-y-1">
                {product.isNew && (
                  <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
                    New
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="px-2 py-1 bg-[#9a8457] text-white text-xs font-medium rounded-full">
                    Best Seller
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                    -{product.discount}%
                  </span>
                )}
              </div>
              
              {/* Actions */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => handleWishlistToggle(product, e)}
                  className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                >
                  <Heart className={`w-4 h-4 ${
                    isInWishlist(product.id) 
                      ? 'text-red-500 fill-current' 
                      : 'text-gray-600 hover:text-red-500'
                  }`} />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {product.style}
                </span>
              </div>
              
              <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm">
                {product.name}
              </h3>
              
              <div className="flex items-center space-x-2 mb-3">
                <span className="font-semibold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              
              <button
                onClick={(e) => handleAddToCart(product, e)}
                disabled={!product.inStock}
                className="w-full bg-[#9a8457] text-white py-2 px-3 rounded-lg hover:bg-[#8a7547] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm flex items-center justify-center space-x-1"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;