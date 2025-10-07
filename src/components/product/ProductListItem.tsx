// components/product/ProductListItem.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Heart, ShoppingBag, Eye } from "lucide-react";
import { Product, useCart, useWishlist } from "@/contexts/AppContext";

interface ProductListItemProps {
  product: Product;
  index: number;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product, index }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
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
      className="product-hover bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 luxury-glow group flex cursor-pointer"
      style={{
        animationDelay: `${index * 0.1}s`
      }}
      onClick={handleProductClick}
    >
      <div className="relative w-80 h-60 overflow-hidden flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Product badges */}
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
      </div>

      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-medium text-slate-800 group-hover:text-[#9a8457] transition-colors">
              {product.name}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={handleWishlistToggle}
                className="p-2 bg-slate-100 rounded-full hover:bg-[#9a8457] hover:text-white transition-colors duration-300"
                title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-4 h-4 ${
                  isInWishlist(product.id) ? 'text-red-500 fill-current' : ''
                }`} />
              </button>
              <button
                onClick={handleQuickView}
                className="p-2 bg-slate-100 rounded-full hover:bg-[#9a8457] hover:text-white transition-colors duration-300"
                title="Quick view"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <p className="text-slate-600 mb-4 leading-relaxed line-clamp-3">
            {product.description}
          </p>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-slate-600 ml-1">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {product.style}
            </span>
            <div className="flex space-x-1">
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
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-slate-600 mb-4">
            <span>{product.metalType}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span>{product.stoneType}</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span>{product.color}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-semibold text-slate-800">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-slate-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-red-500 bg-red-50 px-2 py-1 rounded-full">
                  Save {product.discount}%
                </span>
              </>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.inStock === false}
            className="bg-[#9a8457] text-white px-8 py-3 rounded-xl hover:bg-[#8a7547] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center group/btn"
          >
            <ShoppingBag className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
            {product.inStock === false ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;