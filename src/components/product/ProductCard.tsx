// // components/ProductCard.tsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Star, Heart, ShoppingBag, Eye } from "lucide-react";
// import { Product, useCart, useWishlist } from "@/contexts/AppContext";
// import { useCurrency } from "@/contexts/CurrencyContext";
// import { useTracking } from "@/contexts/TrackingContext";

// interface ProductCardProps {
//   product: Product;
//   index: number;
//   isLoading?: boolean;
// }

// // Skeleton Loader Component
// const ProductCardSkeleton: React.FC<{ index: number }> = ({ index }) => {
//   return (
//     <div
//       className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 h-full flex flex-col animate-pulse"
//       style={{
//         animationDelay: `${index * 0.1}s`
//       }}
//     >
//       {/* Image skeleton */}
//       <div className="relative overflow-hidden flex-shrink-0">
//         <div className="w-full h-80 bg-gray-200"></div>
//       </div>

//       {/* Content skeleton */}
//       <div className="p-6 flex flex-col flex-grow">
//         <div className="flex items-center justify-between mb-2">
//           <div className="h-4 bg-gray-200 rounded w-20"></div>
//           <div className="h-6 bg-gray-200 rounded w-16"></div>
//         </div>

//         <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
//         <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
//         <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>

//         <div className="mt-auto">
//           <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
//           <div className="h-4 bg-gray-200 rounded w-40 mb-4"></div>
//           <div className="h-12 bg-gray-200 rounded w-full"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProductCard: React.FC<ProductCardProps> = ({ product, index, isLoading = false }) => {
//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
//   const { logAddToCart } = useTracking();
//   const { selectedCountry } = useCurrency();


//   console.log('Product prices:', product.prices);
//   console.log('Selected currency:', selectedCountry.currency);
//   console.log('Product:', product);

//   // Show skeleton if loading
//   if (isLoading) {
//     return <ProductCardSkeleton index={index} />;
//   }

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     addToCart(product, 1);
//     console.log('Added to cart:', product.name);

//     logAddToCart(product._id, {
//       name: product.name,
//       category: product.category,
//       price: product.price,
//       page: window.location.pathname,
//     });
//   };

//   const handleWishlistToggle = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (isInWishlist(product._id)) {
//       removeFromWishlist(product._id);
//     } else {
//       addToWishlist(product);
//     }
//   };

//   const handleQuickView = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     navigate(`/product/${product._id}`);
//   };

//   const handleProductClick = () => {
//     navigate(`/product/${product._id}`);
//   };
//   const currencyRates: Record<string, { rate: number; symbol: string }> = {
//   INR: { rate: 1, symbol: "₹" },
//   USD: { rate: 0.012, symbol: "$" },
//   GBP: { rate: 0.0095, symbol: "£" },
//   CAD: { rate: 0.016, symbol: "CA$" },
//   EUR: { rate: 0.011, symbol: "€" },
//   AUD: { rate: 0.018, symbol: "A$" },
//   JPY: { rate: 1.78, symbol: "¥" },
// };


//  const getDisplayPrice = () => {
//   const currency = selectedCountry?.currency || "INR";
//   const rateObj = currencyRates[currency] || currencyRates.INR;
//   const { rate, symbol } = rateObj;

//   // ✅ Prefer backend-provided converted amount
//   if (product.prices?.[currency]?.amount) {
//     return {
//       amount: product.prices[currency].amount,
//       symbol,
//     };
//   }

//   // ✅ Local fallback conversion
//   return {
//     amount: Number((product.price * rate).toFixed(2)),
//     symbol,
//   };
// };


//   const { amount, symbol } = getDisplayPrice();

//   return (
//     <div
//       className="product-hover bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 luxury-glow group h-full flex flex-col cursor-pointer"
//       style={{
//         animationDelay: `${index * 0.1}s`
//       }}
//       onClick={handleProductClick}
//     >
//       <div className="relative overflow-hidden flex-shrink-0">
//         <img
//           src={product.coverImage}
//           alt={product.name}
//           className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
//         {/* Badges */}
//         <div className="absolute top-4 left-4 flex flex-col space-y-2">
//           {product.isMadetoOrder && (
//             <span className="px-3 py-1 bg-blue-50 text-black text-xs font-medium rounded-full">
//               Made to Order
//             </span>
//           )}
//           {product.isNew && (
//             <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
//               New
//             </span>
//           )}
//           {product.isBestSeller && (
//             <span className="px-3 py-1 bg-[#9a8457] text-white text-xs font-medium rounded-full">
//               Best Seller
//             </span>
//           )}
//           {(product.discount ?? 0) > 0 && (
//             <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
//               -{(product.discount ?? 0)}%
//             </span>
//           )}
//           {product.inStock === false && (
//             <span className="px-3 py-1 bg-gray-500 text-white text-xs font-medium rounded-full">
//               Out of Stock
//             </span>
//           )}
//         </div>

//         {/* Action Buttons */}
//         <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <button 
//             onClick={handleWishlistToggle}
//             className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-300"
//             title={isInWishlist(product._id) ? "Remove from wishlist" : "Add to wishlist"}
//           >
//             <Heart className={`w-4 h-4 transition-colors ${
//               isInWishlist(product._id) 
//                 ? 'text-red-500 fill-current' 
//                 : 'text-slate-600 hover:text-red-500'
//             }`} />
//           </button>
//           <button 
//             onClick={handleQuickView}
//             className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-300"
//             title="Quick view"
//           >
//             <Eye className="w-4 h-4 text-slate-600 hover:text-[#9a8457] transition-colors" />
//           </button>
//         </div>
//       </div>

//       <div className="p-6 flex flex-col flex-grow">
//         <div className="flex items-center justify-between mb-2">
//           <div className="flex items-center">
//             <Star className="w-4 h-4 text-yellow-400 fill-current" />
//             <span className="text-sm text-slate-600 ml-1">
//               {product.rating} ({product.reviews})
//             </span>
//           </div>
//           <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
//             {product.style}
//           </span>
//         </div>

//         <h3 className="text-lg font-medium text-slate-800 mb-2 group-hover:text-[#9a8457] transition-colors min-h-[3.5rem] flex items-start">
//           {product.name}
//         </h3>
//         <p className="text-sm text-slate-600 mb-3 line-clamp-2 min-h-[2.5rem] flex-grow">
//           {product.description}
//         </p>

//         <div className="mt-auto">
//           <div className="flex items-center space-x-2">
//             <span className="text-xl font-semibold text-slate-800">
//               {symbol}{amount.toLocaleString()}
//             </span>

//             {(product.originalPrice ?? 0) > (product.price ?? 0) && (
//               <span className="text-sm text-slate-500 line-through">
//                 {symbol}
//                 {(product.originalPrice ?? product.price).toLocaleString()}
//               </span>
//             )}
//           </div>

//           <div className="flex items-center space-x-2 mb-4">
//             <span className="text-xs text-slate-600">{product.metalType}</span>
//             <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
//             <span className="text-xs text-slate-600">{product.stoneType}</span>
//           </div>

//           <button 
//             onClick={handleAddToCart}
//             disabled={product.inStock === false}
//             className="w-full bg-[#9a8457] text-white py-3 rounded-xl hover:bg-[#8a7547] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center group/btn"
//           >
//             <ShoppingBag className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
//             {product.inStock === false ? 'Out of Stock' : 'Add to Cart'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default ProductCard;

// components/ProductCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Heart, ShoppingBag, Eye } from "lucide-react";
import { Product, useCart, useWishlist } from "@/contexts/AppContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useTracking } from "@/contexts/TrackingContext";

interface ProductCardProps {
  product: Product;
  index: number;
  isLoading?: boolean;
}

// Skeleton Loader Component
const ProductCardSkeleton: React.FC<{ index: number }> = ({ index }) => {
  return (
    <div
      className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 h-full flex flex-col animate-pulse"
      style={{
        animationDelay: `${index * 0.1}s`
      }}
    >
      {/* Image skeleton */}
      <div className="relative overflow-hidden flex-shrink-0">
        <div className="w-full h-80 bg-gray-200"></div>
      </div>

      {/* Content skeleton */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>

        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>

        <div className="mt-auto">
          <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-40 mb-4"></div>
          <div className="h-12 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product, index, isLoading = false }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { logAddToCart } = useTracking();
  const { selectedCountry } = useCurrency();


  console.log('Product prices:', product.prices);
  console.log('Selected currency:', selectedCountry.currency);
  console.log('Product:', product);

  // Show skeleton if loading
  if (isLoading) {
    return <ProductCardSkeleton index={index} />;
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    console.log('Added to cart:', product.name);

    logAddToCart(product._id, {
      name: product.name,
      category: product.category,
      price: product.price,
      page: window.location.pathname,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/product/${product._id}`);
  };

  const handleProductClick = () => {
    navigate(`/product/${product._id}`);
  };
  const currencyRates: Record<string, { rate: number; symbol: string }> = {
  INR: { rate: 1, symbol: "₹" },
  USD: { rate: 0.012, symbol: "$" },
  GBP: { rate: 0.0095, symbol: "£" },
  CAD: { rate: 0.016, symbol: "CA$" },
  EUR: { rate: 0.011, symbol: "€" },
  AUD: { rate: 0.018, symbol: "A$" },
  JPY: { rate: 1.78, symbol: "¥" },
};


//  const getDisplayPrice = () => {
//   const currency = selectedCountry?.currency || "INR";
//   const rateObj = currencyRates[currency] || currencyRates.INR;
//   const { rate, symbol } = rateObj;

//   // ✅ Prefer backend-provided converted amount
//   if (product.prices?.[currency]?.amount) {
//     return {
//       amount: product.prices[currency].amount,
//       symbol,
//     };
//   }

//   // ✅ Local fallback conversion
//   return {
//     amount: Number((product.price * rate).toFixed(2)),
//     symbol,
//   };
// };


//   const { amount, symbol } = getDisplayPrice();

// 🔥 Unified price logic
const amount = Number(
  product?.totalConvertedPrice ??
  product?.displayPrice ??
  0
);

const symbol = product?.currency || "₹";

console.log("========== PRODUCT CARD DEBUG ==========");
console.log("Product Name:", product.name);
console.log("Product ID:", product._id);

console.log("Backend Fields:");
console.log("totalConvertedPrice:", product.totalConvertedPrice);
console.log("displayPrice:", product.displayPrice);
console.log("price (raw DB):", product.price);
console.log("currency:", product.currency);

console.log("Final Rendered:");
console.log("Amount Used:", amount);
console.log("Symbol Used:", symbol);
console.log("========================================");


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
          src={product.coverImage}
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
          {(product.discount ?? 0) > 0 && (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
              -{(product.discount ?? 0)}%
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
            title={isInWishlist(product._id) ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 transition-colors ${
              isInWishlist(product._id) 
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
            {/* <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-slate-600 ml-1">
              {product.rating} ({product.reviews})
            </span> */}

             <div className="flex items-center gap-1">
  <div className="flex">
    {[1, 2, 3, 4, 5].map((star) => {
      const rawRating = Number(product.rating);
      const rating =
        isNaN(rawRating) || rawRating < 0 ? 0 : Math.round(rawRating);

      return (
        <span
          key={star}
          className={`text-lg ${
            star <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          ★
        </span>
      );
    })}
  </div>

  <span className="text-sm text-slate-600 ml-1">
    {Number(product.rating) || 0} ({product.reviews ?? 0})
  </span>
</div>
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
          {/* <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold text-slate-800">
              {symbol}{amount.toLocaleString()}
            </span>

            {(product.originalPrice ?? 0) > (product.price ?? 0) && (
              <span className="text-sm text-slate-500 line-through">
                {symbol}
                {(product.originalPrice ?? product.price).toLocaleString()}
              </span>
            )}
          </div> */}

       <div className="flex items-center space-x-2">
  <span className="text-xl font-semibold text-slate-800">
    {symbol}{amount.toLocaleString()}
  </span>
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

