// components/product/RelatedProducts.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Heart, ShoppingBag } from "lucide-react";
import { Product, useCart, useWishlist } from "@/contexts/AppContext";
import { useCurrency } from "@/contexts/CurrencyContext"; // ✅ your existing context
import { useTracking } from "@/contexts/TrackingContext";


interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { logAddToCart } = useTracking();

  const { selectedCountry } = useCurrency(); // ✅ only using country + currency

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);

      logAddToCart(product._id, {
    name: product.name,
    category: product.category,
    price: product.price,
    page: window.location.pathname,
  });
  };

  const handleWishlistToggle = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  if (!products || products.length === 0) return null;

  // ✅ Static fallback rates & symbols (safe for local conversion)
  const currencyRates: Record<string, { rate: number; symbol: string }> = {
    INR: { rate: 1, symbol: "₹" },
    USD: { rate: 0.012, symbol: "$" },
    GBP: { rate: 0.0095, symbol: "£" },
    CAD: { rate: 0.016, symbol: "CA$" },
    EUR: { rate: 0.011, symbol: "€" },
    AUD: { rate: 0.018, symbol: "A$" },
    JPY: { rate: 1.78, symbol: "¥" },
  };

  // ✅ Compute formatted price based on selected country
  const getDisplayPrice = (product: Product, basePrice: number) => {
    if (!basePrice) return "—";

    const currency = selectedCountry?.currency || "INR";
    const rateObj = currencyRates[currency] || currencyRates.INR;
    const rate = rateObj.rate;
    const symbol = rateObj.symbol;

    // ✅ Prefer backend-provided converted price
    if (product.prices && product.prices[currency]?.amount) {
      return `${product.prices[currency].symbol}${product.prices[
        currency
      ].amount.toLocaleString()}`;
    }

    // ✅ Local fallback conversion
    const converted = (basePrice * rate).toFixed(2);
    return `${symbol}${Number(converted).toLocaleString()}`;
  };

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          You Might Also Like
        </h2>
        <button
          onClick={() => navigate("/products")}
          className="text-[#9a8457] hover:text-[#8a7547] font-medium"
        >
          View All Products →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={product._id || `${product.name}-${index}`} // ✅ unique key fix
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product.coverImage}
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
                {(product.discount ?? 0) > 0 && (
  <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
    -{product.discount ?? 0}%
  </span>
)}

              </div>

              {/* Wishlist button */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => handleWishlistToggle(product, e)}
                  className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isInWishlist(product._id)
                        ? "text-red-500 fill-current"
                        : "text-gray-600 hover:text-red-500"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600">
                    {product.rating || 0} ({product.reviews || 0})
                  </span>
                </div>
                {product.style && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {product.style}
                  </span>
                )}
              </div>

              <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm">
                {product.name}
              </h3>

              {/* ✅ Currency-aware price display */}
              <div className="flex items-center space-x-2 mb-3">
                <span className="font-semibold text-gray-900">
                  {getDisplayPrice(product, product.price)}
                </span>
                {(product.originalPrice ?? 0) > (product.price ?? 0) && (
  <span className="text-sm text-gray-500 line-through">
    {getDisplayPrice(product, product.originalPrice ?? product.price)}
  </span>
)}

              </div>

              {/* Add to Cart */}
              <button
                onClick={(e) => handleAddToCart(product, e)}
                disabled={!product.stock}
                className="w-full bg-[#9a8457] text-white py-2 px-3 rounded-lg hover:bg-[#8a7547] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm flex items-center justify-center space-x-1"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>
  {(product.stock ?? 0) > 0 ? "Add to Cart" : "Out of Stock"}
</span>

              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
