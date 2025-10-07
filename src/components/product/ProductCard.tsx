// components/ProductCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Heart, ShoppingBag, Eye } from "lucide-react";
import { Product, useCart, useWishlist } from "@/contexts/AppContext";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    // You could show a toast notification here
    console.log('Added to cart:', product.name);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="product-hover bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 luxury-glow group h-full flex flex-col cursor-pointer"
      style={{
        animationDelay: `${index * 0.1}s`
      }}
      onClick={handleProductClick}
    >
      <div className="relative overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {product.isMadetoOrder && (
            <span className="px-3 py-1 bg-blue-50 text-black text-xs font-medium rounded-full">
              Made to Order
            </span>
          )}
          {product.isNew && (
            <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-3 py-1 bg-[#9a8457] text-white text-xs font-medium rounded-full">
              Best Seller
            </span>
          )}
          {product.discount > 0 && (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
              -{product.discount}%
            </span>
          )}
          {product.inStock === false && (
            <span className="px-3 py-1 bg-gray-500 text-white text-xs font-medium rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handleWishlistToggle}
            className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-300"
            title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 transition-colors ${
              isInWishlist(product.id) 
                ? 'text-red-500 fill-current' 
                : 'text-slate-600 hover:text-red-500'
            }`} />
          </button>
          <button 
            onClick={handleQuickView}
            className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-300"
            title="Quick view"
          >
            <Eye className="w-4 h-4 text-slate-600 hover:text-[#9a8457] transition-colors" />
          </button>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-slate-600 ml-1">
              {product.rating} ({product.reviews})
            </span>
          </div>
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            {product.style}
          </span>
        </div>

        <h3 className="text-lg font-medium text-slate-800 mb-2 group-hover:text-[#9a8457] transition-colors min-h-[3.5rem] flex items-start">
          {product.name}
        </h3>
        <p className="text-sm text-slate-600 mb-3 line-clamp-2 min-h-[2.5rem] flex-grow">
          {product.description}
        </p>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold text-slate-800">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-slate-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <span className="text-xs text-slate-600">{product.metalType}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span className="text-xs text-slate-600">{product.stoneType}</span>
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={product.inStock === false}
            className="w-full bg-[#9a8457] text-white py-3 rounded-xl hover:bg-[#8a7547] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center group/btn"
          >
            <ShoppingBag className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
            {product.inStock === false ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;