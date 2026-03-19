//   // pages/CartPage.tsx
//   import React, { useState } from 'react';
//   import { useNavigate } from 'react-router-dom';
//   import { Minus, Plus, X, Heart, ShoppingBag, Truck, Shield, CreditCard, Check, Gift, Tag, ArrowLeft } from 'lucide-react';
//   import { useCart, useWishlist, CartItem } from '@/contexts/AppContext';
//   import { useEffect } from "react";
//   import { useCurrency } from "@/contexts/CurrencyContext";
//   import { useTracking } from "@/contexts/TrackingContext";
//   import axios from "axios";

//   const API_URL = import.meta.env.VITE_API_URL;

//   const currencyRates: Record<string, number> = {
//     INR: 1,
//     USD: 0.012,
//     GBP: 0.0095,
//     CAD: 0.016,
//     AUD: 0.018,
//     EUR: 0.011,
//     JPY: 1.8,
//   };

//   interface ShippingInfo {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     address: string;
//     city: string;
//     state: string;
//     zipCode: string;
//     country: string;
//   }

//   const isLoggedIn = () => {
//     const token = localStorage.getItem("token");
//     return !!token;
//   };

//   const getSymbol = (currency: string): string => {
//     switch (currency) {
//       case "INR": return "₹";
//       case "USD": return "$";
//       case "EUR": return "€";
//       case "GBP": return "£";
//       case "CAD": return "CA$";
//       case "AUD": return "A$";
//       case "JPY": return "¥";
//       default: return currency;
//     }
//   };

//   const CartPage = () => {
//     const navigate = useNavigate();
//     const [currentStep, setCurrentStep] = useState<'cart' | 'shipping' | 'payment' | 'confirmation'>('cart');
//     const [promoCode, setPromoCode] = useState<string>('');
//     const [promoApplied, setPromoApplied] = useState<boolean>(false);
//     const [promoDiscount, setPromoDiscount] = useState<number>(0);
//     const { selectedCountry } = useCurrency();
//     const symbol = getSymbol(selectedCountry.currency);

//     const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
//       firstName: '',
//       lastName: '',
//       email: '',
//       phone: '',
//       address: '',
//       city: '',
//       state: '',
//       zipCode: '',
//       country: 'India'
//     });

//     const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();
//     const { addToWishlist } = useWishlist();
//     const { logAddToCart, logCheckout, logPurchase } = useTracking();

//     const getDisplayPrice = (item: CartItem) => {
//       const currency = selectedCountry.currency;
//       if (item.prices && item.prices[currency]) {
//         const { amount, symbol } = item.prices[currency];
//         return { amount, symbol };
//       }
//       return { amount: item.price || 0, symbol: "₹" };
//     };

//     const moveToWishlist = (item: CartItem) => {
//       const product = {
//         _id: item._id,
//         name: item.name,
//         price: item.price,
//         originalPrice: item.originalPrice,
//         metalType: item.metalType,
//         stoneType: item.stoneType,
//         style: item.style,
//         size: item.size,
//         color: item.color,
//         rating: item.rating,
//         reviews: item.reviews,
//         image: item.coverImage,
//         isNew: item.isNew,
//         isBestSeller: item.isBestSeller,
//         isMadetoOrder: item.isMadetoOrder,
//         description: item.description,
//         discount: item.discount,
//         inStock: item.inStock,
//         category: item.category,
//         tags: item.tags,
//         gender: item.gender
//       };
//       addToWishlist(product);
//       removeFromCart(item._id);
//       console.log('Moved to wishlist:', item.name);
//     };

//     const applyPromoCode = () => {
//       if (promoCode.toLowerCase() === 'save10') {
//         setPromoApplied(true);
//         setPromoDiscount(0.1);
//       }
//     };

//     const removePromoCode = () => {
//       setPromoApplied(false);
//       setPromoDiscount(0);
//       setPromoCode('');
//     };

//     const [updatedCart, setUpdatedCart] = useState<CartItem[]>([]);
//     const activeCart = updatedCart.length > 0 ? updatedCart : cart;

//     const rate = currencyRates[selectedCountry.currency] || 1;
//     // const subtotalINR = cart.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);
//     // const subtotal = subtotalINR * rate;
//     // const originalSubtotalINR = cart.reduce((sum, item) => sum + ((item.originalPrice ?? item.price ?? 0) * item.quantity), 0);
//     // const originalSubtotal = originalSubtotalINR * rate;
//     // const productSavings = selectedCountry.currency === "INR" ? Math.max(originalSubtotal - subtotal, 0) : 0;
//     // const promoSavings = subtotal * promoDiscount;
//     // const shippingCost = selectedCountry.currency === "INR" && subtotalINR > 100000 ? 0 : 2000 * rate;
//     // const total = subtotal - promoSavings + shippingCost;

//     const subtotal = activeCart.reduce((sum, item) => {
//   const price =
//     item.prices?.[selectedCountry.currency]?.amount ??
//     item.price ??
//     0;

//   const making =
//     item.makingChargesByCountry?.[selectedCountry.currency]?.amount ?? 0;

//   return sum + (price + making) * item.quantity;
// }, 0);

// const originalSubtotal = activeCart.reduce((sum, item) => {
//   const original =
//     item.originalPrice ??
//     item.prices?.[selectedCountry.currency]?.amount ??
//     item.price ??
//     0;

//   return sum + original * item.quantity;
// }, 0);

// const productSavings =
//   originalSubtotal > subtotal ? originalSubtotal - subtotal : 0;

// const shippingCost =
//   subtotal > 100000
//     ? 0
//     : selectedCountry.currency === "INR"
//     ? 2000
//     : 20;

// const total = subtotal + shippingCost;

//     const handleShippingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       setCurrentStep('payment');
//     };

//     const handleCheckout = () => {
//       if (activeCart.length === 0) return;
//       if (!isLoggedIn()) {
//         navigate("/login");
//         return;
//       }
//       logCheckout(cart);
//       setCurrentStep("shipping");
//     };

//     const handlePlaceOrder = () => {
//       if (!isLoggedIn()) {
//         navigate("/login");
//         return;
//       }
//       logPurchase("TEMP_ORDER_ID", total);
//       clearCart();
//       setCurrentStep("confirmation");
//     };

//     useEffect(() => {
//       const fetchUserDetails = async () => {
//         const token = localStorage.getItem("token");
//         if (!token) return;
//         try {
//           const { data } = await axios.get(`${API_URL}/api/user/details`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           if (data.success) {
//             const { user, details } = data;
//             setShippingInfo({
//               firstName: user.name?.split(" ")[0] || "",
//               lastName: user.name?.split(" ")[1] || "",
//               email: user.email || "",
//               phone: user.phoneNumber || "",
//               address: details?.address?.street || "",
//               city: details?.address?.city || "",
//               state: details?.address?.state || "",
//               zipCode: details?.address?.postalCode || "",
//               country: details?.address?.country || "India",
//             });
//           }
//         } catch (err) {
//           console.error("❌ Failed to fetch user details:", err);
//         }
//       };
//       if (currentStep === "shipping") {
//         fetchUserDetails();
//       }
//     }, [currentStep]);

// useEffect(() => {
//   const fetchLatestPrices = async () => {
//     try {
//       const updatedItems: CartItem[] = await Promise.all(
//         cart.map(async (item) => {
//           const { data } = await axios.get(
//             `${API_URL}/api/user/ornaments/${item._id}`,
//             {
//               params: { currency: selectedCountry.currency },
//             }
//           );

//           const ornament = data.ornament;

//           return {
//             ...item,
//             price: Number(ornament.displayPrice),
//             originalPrice: Number(ornament.displayPrice),
//             prices: {
//               [selectedCountry.currency]: {
//                 amount: Number(ornament.displayPrice),
//                 symbol: ornament.currency,
//               },
//             },
//             makingChargesByCountry: {
//               [selectedCountry.currency]: {
//                 amount: Number(ornament.convertedMakingCharge),
//                 symbol: ornament.currency,
//               },
//             },
//           } as CartItem;
//         })
//       );

//       setUpdatedCart(updatedItems);
//     } catch (err) {
//       console.error("Failed to refresh cart prices", err);
//     }
//   };

//   if (cart.length > 0) {
//     fetchLatestPrices();
//   }
// }, [cart, selectedCountry.currency]);

//     const CartItemComponent = ({ item }: { item: CartItem }) => (
//       <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 sm:p-6 bg-white rounded-lg border border-gray-200">
//         <img
//           src={item.coverImage}
//           alt={item.name}
//           className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg cursor-pointer"
//           onClick={() => navigate(`/product/${item._id}`)}
//         />
//         <div className="flex-1 w-full sm:w-auto">
//           <h3
//             className="font-medium text-gray-900 cursor-pointer hover:text-[#9a8457] text-sm sm:text-base"
//             onClick={() => navigate(`/product/${item._id}`)}
//           >
//             {item.name}
//           </h3>
//           <div className="text-xs sm:text-sm text-gray-600 mt-1">
//             {item.metalType} • {item.stoneType}
//             {item.selectedSize && ` • Size: ${item.selectedSize}`}
//           </div>
//           {item.engraving && (
//             <div className="text-xs sm:text-sm text-gray-600 mt-1">
//               Engraving: "{item.engraving}"
//             </div>
//           )}
//           {(() => {
//             const { amount, symbol } = getDisplayPrice(item);
//             return (
//               <div className="flex items-center space-x-2 mt-2">
//                 <span className="font-semibold text-gray-900 text-sm sm:text-base">
//                   {selectedCountry.flag} {symbol}{amount.toLocaleString()}
//                 </span>
//                 {selectedCountry.currency === "INR" && (item.originalPrice ?? 0) > (item.price ?? 0) && (
//                   <span className="text-xs sm:text-sm text-gray-500 line-through">
//                     ₹{(item.originalPrice ?? 0).toLocaleString()}
//                   </span>
//                 )}
//               </div>
//             );
//           })()}

//           {/* 💰 Making Charges Display */}
// {item.makingChargesByCountry?.[selectedCountry.currency] && (
//   <div className="text-xs sm:text-sm text-gray-600 mt-1">
//     <span className="font-medium">Making Charges:</span>{" "}
//     {selectedCountry.flag}{" "}
//     {item.makingChargesByCountry[selectedCountry.currency].symbol}
//     {item.makingChargesByCountry[selectedCountry.currency].amount.toLocaleString()}
//   </div>
// )}

//         </div>
//         <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4 sm:space-x-3">
//           <div className="flex items-center space-x-3">
//             <button
//               onClick={() => updateQuantity(item._id, item.quantity - 1)}
//               className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
//             >
//               <Minus className="w-4 h-4" />
//             </button>
//             <span className="w-8 text-center">{item.quantity}</span>
//             <button
//               onClick={() => updateQuantity(item._id, item.quantity + 1)}
//               className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
//             >
//               <Plus className="w-4 h-4" />
//             </button>
//           </div>
//           <div className="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2">
//             <button
//               onClick={() => moveToWishlist(item)}
//               className="flex items-center space-x-1 text-xs sm:text-sm text-gray-600 hover:text-[#9a8457]"
//             >
//               <Heart className="w-4 h-4" />
//               <span className="hidden sm:inline">Save for later</span>
//             </button>
//             <button
//               onClick={() => removeFromCart(item._id)}
//               className="flex items-center space-x-1 text-xs sm:text-sm text-red-600 hover:text-red-700"
//             >
//               <X className="w-4 h-4" />
//               <span className="hidden sm:inline">Remove</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     );

//     const OrderSummary = ({ showPromo = true }: { showPromo?: boolean }) => {
//       const { selectedCountry } = useCurrency();
//       const getCurrencyData = (item: CartItem) => {
//         const currency = selectedCountry.currency;
//         const priceObj = item.prices?.[currency];
//         return {
//           amount: priceObj?.amount ?? item.price ?? 0,
//           symbol: priceObj?.symbol ?? "₹",
//         };
//       };
//      const subtotal = activeCart.reduce((sum, item) => {
//   const { amount } = getCurrencyData(item);
//   // const makingCharge =
//   //   item.makingChargesByCountry?.[selectedCountry.currency]?.amount ||
//   //   item.makingCharges ||
//   //   0;
//   return sum + (amount ) * item.quantity;
// }, 0);

//       const originalSubtotal = activeCart.reduce((sum, item) => {
//         const currency = selectedCountry.currency;
// const origAmount = item.originalPrice ?? item.prices?.[currency]?.amount ?? item.price ?? 0;
//         return sum + origAmount * item.quantity;
//       }, 0);
//       const productSavings = originalSubtotal > subtotal ? originalSubtotal - subtotal : 0;
//       const promoSavings = promoApplied ? subtotal * promoDiscount : 0;
//       const currencySymbol = cart[0]?.prices?.[selectedCountry.currency]?.symbol || getSymbol(selectedCountry.currency);

//       const shippingCost = subtotal >  0 ? 0 : 20;
// // =======
// //       const shippingCost = subtotal > 0 ? 0 : 20;
// // >>>>>>> 431a7695 (update modal and cartpage)
//       const total = subtotal - promoSavings + shippingCost;

//       return (
//         <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
//           <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
//           <div className="space-y-3">
//             <div className="flex justify-between text-sm sm:text-base">
//               <span className="text-gray-600">Subtotal ({cartCount} items)</span>
//               <span className="font-medium">
//                 {selectedCountry.flag} {currencySymbol}{subtotal.toLocaleString()}
//               </span>
//             </div>
//             {selectedCountry.currency === "INR" && productSavings > 0 && (
//               <div className="flex justify-between text-green-600 text-sm sm:text-base">
//                 <span>Product Savings</span>
//                 <span>−{currencySymbol}{productSavings.toLocaleString()}</span>
//               </div>
//             )}
//             {promoApplied && (
//               <div className="flex justify-between text-green-600 text-sm sm:text-base">
//                 <span>Promo Discount (SAVE10)</span>
//                 <span>−{currencySymbol}{promoSavings.toLocaleString()}</span>
//               </div>
//             )}
//             <div className="flex justify-between text-sm sm:text-base">
//               <span className="text-gray-600">Shipping</span>
//               <span className={shippingCost === 0 ? "text-green-600" : ""}>
//                 {shippingCost === 0 ? "Free" : `${currencySymbol}${shippingCost.toLocaleString()}`}
//               </span>
//             </div>
//           </div>
//           <div className="mt-4 pt-4 border-t border-gray-200">
//             <div className="flex justify-between text-base sm:text-lg font-semibold">
//               <span>Total</span>
//               <span>{selectedCountry.flag} {currencySymbol}{total.toLocaleString()}</span>
//             </div>
//           </div>
//           {showPromo && !promoApplied && (
//             <div className="mt-4 pt-4 border-t border-gray-200">
//               <div className="flex space-x-2">
//                 <input
//                   type="text"
//                   value={promoCode}
//                   onChange={(e) => setPromoCode(e.target.value)}
//                   placeholder="Enter promo code"
//                   className="flex-1 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
//                 />
//                 <button
//                   onClick={applyPromoCode}
//                   className="px-3 sm:px-4 py-2 bg-[#9a8457] text-white text-sm sm:text-base rounded-lg hover:bg-[#8a7547] transition-colors whitespace-nowrap"
//                 >
//                   Apply
//                 </button>
//               </div>
//               <p className="text-xs text-gray-500 mt-1">Try code: SAVE10 for 10% off</p>
//             </div>
//           )}
//           <div className="mt-4 flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
//             <Shield className="w-4 h-4 flex-shrink-0" />
//             <span>Secure checkout with SSL encryption</span>
//           </div>
//         </div>
//       );
//     };

//     if (currentStep === 'confirmation') {
//       return (
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//           <div className="max-w-md w-full mt-20">
//             <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <Check className="w-8 h-8 text-green-600" />
//               </div>
//               <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
//               <p className="text-sm sm:text-base text-gray-600 mb-6">
//                 Thank you for your purchase. Your order #JW-2024-001 has been confirmed and will be processed shortly.
//               </p>
//               <div className="bg-gray-50 rounded-lg p-4 mb-6">
//                 <div className="text-sm text-gray-600 mb-2">Order Total</div>
//                 <div className="text-xl sm:text-2xl font-bold text-[#9a8457]">₹{total.toLocaleString()}</div>
//               </div>
//               <div className="space-y-3">
//                 <button
//                   onClick={() => navigate('/products')}
//                   className="w-full bg-[#9a8457] text-white py-3 rounded-lg hover:bg-[#8a7547] transition-colors text-sm sm:text-base"
//                 >
//                   Continue Shopping
//                 </button>
//                 <button
//                   onClick={() => navigate('/')}
//                   className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
//                 >
//                   Back to Home
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
//         <div className="bg-white border-b border-gray-200 mt-16">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//             <div className="flex items-center justify-center space-x-4 sm:space-x-8 mt-20 sm:mt-40">
//               {[
//                 { step: 'cart' as const, label: 'Shopping Cart', icon: ShoppingBag },
//                 { step: 'shipping' as const, label: 'Shipping', icon: Truck },
//                 { step: 'payment' as const, label: 'Payment', icon: CreditCard },
//               ].map(({ step, label, icon: Icon }, index) => (
//                 <div
//                   key={step}
//                   className={`flex items-center space-x-1 sm:space-x-2 ${
//                     currentStep === step ? 'text-[#9a8457]' : index < ['cart', 'shipping', 'payment'].indexOf(currentStep) ? 'text-green-600' : 'text-gray-400'
//                   }`}
//                 >
//                   <div
//                     className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
//                       currentStep === step ? 'bg-[#9a8457] text-white' : index < ['cart', 'shipping', 'payment'].indexOf(currentStep) ? 'bg-green-600 text-white' : 'bg-gray-200'
//                     }`}
//                   >
//                     <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
//                   </div>
//                   <span className="text-xs sm:text-sm font-medium hidden sm:inline">{label}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
//           {currentStep === 'cart' && (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
//               <div className="lg:col-span-2 space-y-6">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
//                   <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
//                   Shopping Cart ({activeCart.length} items)

//                   </h1>
//                   <button
//                     onClick={() => navigate('/products')}
//                     className="text-[#9a8457] hover:text-[#8a7547] flex items-center space-x-1 text-sm sm:text-base"
//                   >
//                     <ArrowLeft className="w-4 h-4" />
//                     <span>Continue Shopping</span>
//                   </button>
//                 </div>
//                 {activeCart.length === 0 ? (
//                   <div className="text-center py-8 sm:py-12">
//                     <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
//                     <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
//                     <p className="text-sm sm:text-base text-gray-600 mb-6">Add some beautiful jewelry to get started!</p>
//                     <div className="space-y-4">
//                       <button
//                         onClick={() => navigate('/products')}
//                         className="bg-[#9a8457] text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-[#8a7547] transition-colors text-sm sm:text-base"
//                       >
//                         Browse Jewelry
//                       </button>
//                       <button
//                         onClick={() => navigate('/favorites')}
//                         className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
//                       >
//                         <Heart className="w-4 h-4" />
//                         <span>View Wishlist</span>
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     {activeCart.map((item) => (
//                       <CartItemComponent key={`${item._id}-${item.selectedSize}`} item={item} />
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <div className="space-y-6">
//                 <OrderSummary />
//                 {activeCart.length > 0 && (
//                   <button
//                     onClick={handleCheckout}
//                     className="hidden lg:flex w-full bg-[#9a8457] text-white py-4 rounded-lg font-medium hover:bg-[#8a7547] transition-colors items-center justify-center space-x-2"
//                   >
//                     <span>Proceed to Checkout</span>
//                     <ArrowLeft className="w-4 h-4 rotate-180" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}

//           {currentStep === 'shipping' && (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
//               <div className="lg:col-span-2">
//                 <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Shipping Information</h2>
//                 <form onSubmit={handleShippingSubmit} className="space-y-4 sm:space-y-6">
//                   <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
//                     <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                         <input
//                           type="text"
//                           required
//                           value={shippingInfo.firstName}
//                           onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
//                           className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                         <input
//                           type="text"
//                           required
//                           value={shippingInfo.lastName}
//                           onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
//                           className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
//                         <input
//                           type="email"
//                           required
//                           value={shippingInfo.email}
//                           onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
//                           className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
//                         <input
//                           type="tel"
//                           required
//                           value={shippingInfo.phone}
//                           onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
//                           className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
//                     <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
//                         <input
//                           type="text"
//                           required
//                           value={shippingInfo.address}
//                           onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
//                           className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
//                         />
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
//                           <input
//                             type="text"
//                             required
//                             value={shippingInfo.city}
//                             onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
//                             className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
//                           <input
//                             type="text"
//                             required
//                             value={shippingInfo.state}
//                             onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
//                             className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
//                           <input
//                             type="text"
//                             required
//                             value={shippingInfo.zipCode}
//                             onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
//                             className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
//                     <button
//                       type="button"
//                       onClick={() => setCurrentStep('cart')}
//                       className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
//                     >
//                       Back to Cart
//                     </button>
//                     <button
//                       type="button"
//                       onClick={handlePlaceOrder}
//                       className="flex-1 bg-[#9a8457] text-white py-3 rounded-lg font-medium hover:bg-[#8a7547] transition-colors text-sm sm:text-base"
//                     >
//                       Place Order • {selectedCountry.flag} {symbol}{total.toLocaleString()}

//                     </button>
//                   </div>
//                 </form>
//               </div>
//               <div>
//                 <OrderSummary showPromo={false} />
//                 <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
//                   <h4 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">Your order is secure</h4>
//                   <div className="space-y-3">
//                     <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-600">
//                       <Shield className="w-4 h-4 text-green-600 flex-shrink-0" />
//                       <span>SSL encrypted checkout</span>
//                     </div>
//                     <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-600">
//                       <Truck className="w-4 h-4 text-green-600 flex-shrink-0" />
//                       <span>Insured shipping</span>
//                     </div>
//                     <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-600">
//                       <Gift className="w-4 h-4 text-green-600 flex-shrink-0" />
//                       <span>30-day return policy</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {currentStep === 'cart' && activeCart.length > 0 && (
//           <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
//             <div className="flex items-center justify-between mb-2">
//               <span className="font-medium text-sm sm:text-base">Total: ₹{total.toLocaleString()}</span>
//               <span className="text-xs sm:text-sm text-gray-600">{cartCount} items</span>
//             </div>
//             <button
//               onClick={handleCheckout}
//               className="w-full bg-[#9a8457] text-white py-3 sm:py-4 rounded-lg font-medium hover:bg-[#8a7547] transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
//             >
//               <span>{isLoggedIn() ? "Proceed to Checkout" : "Login to Continue"}</span>
//               <ArrowLeft className="w-4 h-4 rotate-180" />
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };

//   export default CartPage;

// pages/CartPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Minus,
  Plus,
  X,
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  CreditCard,
  Check,
  Gift,
  Tag,
  ArrowLeft,
} from "lucide-react";
import { useCart, useWishlist, CartItem } from "@/contexts/AppContext";
import { useEffect } from "react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useTracking } from "@/contexts/TrackingContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useRazorpay } from "@/hooks/useRazorpay";
import ProductLoader from "@/components/ui/ProductLoader";

const API_URL = import.meta.env.VITE_API_URL;

const currencyRates: Record<string, number> = {
  INR: 1,
  USD: 0.012,
  GBP: 0.0095,
  CAD: 0.016,
  AUD: 0.018,
  EUR: 0.011,
  JPY: 1.8,
};

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// const isLoggedIn = () => {
//   const token = localStorage.getItem("token");
//   return !!token;
// };

const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      // Token expired — clean up
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

const getSymbol = (currency: string): string => {
  switch (currency) {
    case "INR":
      return "₹";
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    case "CAD":
      return "CA$";
    case "AUD":
      return "A$";
    case "JPY":
      return "¥";
    default:
      return currency;
  }
};

const CartPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const stepParam = searchParams.get('step');
  
  const [currentStep, setCurrentStep] = useState<
    "cart" | "shipping" | "payment" | "confirmation"
  >(stepParam === 'shipping' ? 'shipping' : "cart");
  const [promoCode, setPromoCode] = useState<string>("");
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());
  const { selectedCountry } = useCurrency();
  const symbol = getSymbol(selectedCountry.currency);
  const {
    initiatePayment,
    loading: razorpayLoading,
    error: razorpayError,
  } = useRazorpay();

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  });

  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  } = useCart();
  const { addToWishlist } = useWishlist();
  const { logAddToCart, logCheckout, logPurchase } = useTracking();

  const getDisplayPrice = (item: CartItem) => {
    const currency = selectedCountry.currency;
    if (item.prices && item.prices[currency]) {
      const { amount, symbol } = item.prices[currency];
      return { amount, symbol };
    }
    return { amount: item.price || 0, symbol: "₹" };
  };

  const moveToWishlist = (item: CartItem) => {
    const product = {
      _id: item._id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      metalType: item.metalType,
      stoneType: item.stoneType,
      style: item.style,
      size: item.size,
      color: item.color,
      rating: item.rating,
      reviews: item.reviews,
      coverImage: item.coverImage, // Fix: use coverImage instead of image
      isNew: item.isNew,
      isBestSeller: item.isBestSeller,
      isMadetoOrder: item.isMadetoOrder,
      description: item.description,
      discount: item.discount,
      inStock: item.inStock !== false, // Default to true if undefined, false only if explicitly false
      category: item.category,
      tags: item.tags,
      gender: item.gender,
    };
    addToWishlist(product);
    removeFromCart(item._id);
    console.log("Moved to wishlist:", item.name);
  };

  const handleRemoveItem = (itemId: string) => {
    // Add to removing items set for visual feedback
    setRemovingItems(prev => new Set(prev).add(itemId));
    
    // Remove from cart
    removeFromCart(itemId);
    
    // Remove from removing items set after a short delay
    setTimeout(() => {
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }, 300);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true);
      setPromoDiscount(0.1);
    }
  };

  const removePromoCode = () => {
    setPromoApplied(false);
    setPromoDiscount(0);
    setPromoCode("");
  };

  const [updatedCart, setUpdatedCart] = useState<CartItem[]>([]);
  const [previousCartIds, setPreviousCartIds] = useState<string[]>([]);
  const activeCart = updatedCart.length > 0 ? updatedCart : cart;

  const rate = currencyRates[selectedCountry.currency] || 1;
  // const subtotalINR = cart.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);
  // const subtotal = subtotalINR * rate;
  // const originalSubtotalINR = cart.reduce((sum, item) => sum + ((item.originalPrice ?? item.price ?? 0) * item.quantity), 0);
  // const originalSubtotal = originalSubtotalINR * rate;
  // const productSavings = selectedCountry.currency === "INR" ? Math.max(originalSubtotal - subtotal, 0) : 0;
  // const promoSavings = subtotal * promoDiscount;
  // const shippingCost = selectedCountry.currency === "INR" && subtotalINR > 100000 ? 0 : 2000 * rate;
  // const total = subtotal - promoSavings + shippingCost;

  const subtotal = activeCart.reduce((sum, item) => {
    const price =
      item.prices?.[selectedCountry.currency]?.amount ?? item.price ?? 0;

    const making =
      item.makingChargesByCountry?.[selectedCountry.currency]?.amount ?? 0;

    return sum + price * item.quantity + making * item.quantity;
  }, 0);

  const originalSubtotal = activeCart.reduce((sum, item) => {
    const original =
      item.originalPrice ??
      item.prices?.[selectedCountry.currency]?.amount ??
      item.price ??
      0;

    return sum + original * item.quantity ;
  }, 0);

  const productSavings =
    originalSubtotal > subtotal ? originalSubtotal - subtotal : 0;
  const shippingCost = 0; // Always free shipping

  const total = subtotal + shippingCost;

  const handleShippingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentStep("payment");
  };

  const handleCheckout = () => {
    if (activeCart.length === 0) return;
    if (!isLoggedIn()) {
      navigate("/login?redirect=checkout");
      return;
    }
    
    // Show shipping loader for 2 seconds
    setShippingLoading(true);
    logCheckout(cart);
    
    setTimeout(() => {
      setCurrentStep("shipping");
      setShippingLoading(false);
    }, 2000);
  };

  const handlePlaceOrder = async () => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    if (activeCart.length === 0) {
      import('@/utils/toast').then(({ showWarningToast }) => {
        showWarningToast("Your cart is empty");
      });
      return;
    }

    setPaymentProcessing(true);

    try {
      console.log("🛒 [FRONTEND] Cart Calculation:");
      console.log("   Subtotal:", subtotal);
      console.log("   Shipping:", shippingCost);
      console.log("   Total:", total);
      console.log("   Total (rounded):", Math.round(total));
      console.log("   Currency:", selectedCountry.currency);
      console.log("   Symbol:", symbol);
      
      // Prepare order payload with frontend-calculated total
      const orderPayload = {
        products: activeCart.map((item) => ({
          productId: item._id,
          variant: item.metalType || "Yellow Gold",
          quantity: item.quantity,
        })),
        deliveryAddress: {
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          phone: shippingInfo.phone,
          addressLine1: shippingInfo.address,
          addressLine2: "",
          city: shippingInfo.city,
          state: shippingInfo.state,
          pincode: shippingInfo.zipCode,
        },
        currency: selectedCountry.currency,
        symbol: symbol,
        totalAmount: Math.round(total), // Ensure it's a whole number
      };
      
      console.log("📦 [FRONTEND] Order Payload:", JSON.stringify(orderPayload, null, 2));

      // Initiate Razorpay payment
      await initiatePayment(
        orderPayload,
        (orderId) => {
          // Payment successful
          setOrderId(orderId);
          logPurchase(orderId, total);
          clearCart();
          setCurrentStep("confirmation");
          setPaymentProcessing(false);
        },
        (error) => {
          // Payment failed
          console.error("Payment failed:", error);
          import('@/utils/toast').then(({ showErrorToast }) => {
            showErrorToast(`Payment failed: ${error}`);
          });
          setPaymentProcessing(false);
        },
      );
    } catch (error: any) {
      console.error("Order placement error:", error);
      import('@/utils/toast').then(({ showErrorToast }) => {
        showErrorToast(error.message || "Failed to place order");
      });
      setPaymentProcessing(false);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const { data } = await axios.get(`${API_URL}/api/user/details`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success) {
          const { user, details } = data;
          setShippingInfo({
            firstName: user.name?.split(" ")[0] || "",
            lastName: user.name?.split(" ")[1] || "",
            email: user.email || "",
            phone: user.phoneNumber || "",
            address: `${details?.address?.houseNumber || ""} ${details?.address?.streetArea || ""}`.trim(),
            zipCode: details?.address?.pinCode || "",
            city: details?.address?.city || "",
            state: details?.address?.state || "",
            country: details?.address?.country || "India",
          });
        }
      } catch (err) {
        console.error("❌ Failed to fetch user details:", err);
      }
    };
    if (currentStep === "shipping") {
      fetchUserDetails();
    }
  }, [currentStep]);

  // Handle step parameter from URL (for post-login redirect)
  useEffect(() => {
    if (stepParam === 'shipping') {
      // Show loader when coming from login redirect
      setShippingLoading(true);
      
      // Clear the step parameter from URL after setting the state
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
      
      // Hide loader after 2 seconds
      setTimeout(() => {
        setShippingLoading(false);
      }, 2000);
    }
  }, [stepParam]);

  // Initial loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      // Always set dataFetched to true after initial delay, regardless of cart length
      // The fetchLatestPrices effect will handle cart-specific logic
      setDataFetched(true);
      if (cart.length === 0) {
        setIsLoading(false);
      }
    }, 1500); // Increased to 1.5 seconds to ensure actual prices are loaded, not cache

    // Fallback: ensure page loads even if something goes wrong
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
      setDataFetched(true);
    }, 5000); // Increased fallback to 5 seconds to allow more time for API calls

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // useEffect(() => {
  //   const fetchLatestPrices = async () => {
  //     try {
  //       const updatedItems: CartItem[] = await Promise.all(
  //         cart.map(async (item) => {
  //           const { data } = await axios.get(
  //             `${API_URL}/api/user/ornaments/${item._id}`,
  //             {
  //               params: { currency: selectedCountry.currency },
  //             }
  //           );

  //           const ornament = data.ornament;

  //           return {
  //             ...item,
  //             price: Number(ornament.displayPrice),
  //             originalPrice: Number(ornament.displayPrice),
  //             prices: {
  //               [selectedCountry.currency]: {
  //                 amount: Number(ornament.displayPrice),
  //                 symbol: ornament.currency,
  //               },
  //             },
  //             makingChargesByCountry: {
  //               [selectedCountry.currency]: {
  //                 amount: Number(ornament.convertedMakingCharge),
  //                 symbol: ornament.currency,
  //               },
  //             },
  //           } as CartItem;
  //         })
  //       );

  //       setUpdatedCart(updatedItems);
  //     } catch (err) {
  //       console.error("Failed to refresh cart prices", err);
  //     }
  //   };

  //   if (cart.length > 0) {
  //     fetchLatestPrices();
  //   }
  // }, [cart, selectedCountry.currency]);

  useEffect(() => {
    const fetchLatestPrices = async () => {
      if (cart.length === 0) {
        setUpdatedCart([]); // Clear updated cart immediately
        setIsLoading(false);
        setDataFetched(true);
        setPreviousCartIds([]);
        return;
      }

      // Get current cart product IDs
      const currentCartIds = cart.map(item => item._id).sort();
      
      // Check if this is just a quantity update (same products, different quantities)
      const isQuantityOnlyUpdate = 
        previousCartIds.length > 0 && 
        currentCartIds.length === previousCartIds.length &&
        currentCartIds.every((id, index) => id === previousCartIds[index]);

      // Check if items were removed (fewer items than before)
      const itemsRemoved = previousCartIds.length > currentCartIds.length;

      // Check if this is the initial load (no previous cart IDs)
      const isInitialLoad = previousCartIds.length === 0;

      // Show loader for initial load or when products are added (not removed or quantity updates)
      if (isInitialLoad || (!isQuantityOnlyUpdate && !itemsRemoved && previousCartIds.length > 0)) {
        setIsLoading(true);
      }

      try {
        const updatedItems: CartItem[] = await Promise.all(
          cart.map(async (item) => {
            const { data } = await axios.get(
              `${API_URL}/api/user/ornaments/${item._id}`,
              {
                params: { currency: selectedCountry.currency },
              },
            );

            const ornament = data.ornament;

            return {
              ...item,
              price: Number(ornament.displayPrice),
              originalPrice: Number(ornament.displayPrice),
              prices: {
                [selectedCountry.currency]: {
                  amount: Number(ornament.displayPrice),
                  symbol: ornament.currency,
                },
              },
              makingChargesByCountry: {
                [selectedCountry.currency]: {
                  amount: Number(ornament.convertedMakingCharge),
                  symbol: ornament.currency,
                },
              },
            } as CartItem;
          }),
        );

        setUpdatedCart(updatedItems);
        
        // For initial load, ensure minimum loading time has passed before showing content
        if (isInitialLoad) {
          // Wait a bit more to ensure smooth transition and avoid cache flash
          setTimeout(() => {
            setDataFetched(true);
            setIsLoading(false);
          }, 500);
        } else {
          setDataFetched(true);
          setIsLoading(false);
        }
        
        setPreviousCartIds(currentCartIds);
      } catch (err) {
        console.error("Failed to refresh cart prices", err);
        setDataFetched(true);
        setIsLoading(false);
        setPreviousCartIds(currentCartIds);
      }
    };

    fetchLatestPrices();
  }, [cart, selectedCountry.currency]);

  const CartItemComponent = ({ item }: { item: CartItem }) => (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 sm:p-6 bg-white rounded-lg border border-gray-200 transition-all duration-300 ${
      removingItems.has(item._id) ? 'opacity-50 scale-95' : ''
    }`}>
      <img
        src={item.coverImage}
        alt={item.name}
        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg cursor-pointer"
        onClick={() => navigate(`/product/${item._id}`)}
      />
      <div className="flex-1 w-full sm:w-auto">
        <h3
          className="font-medium text-gray-900 cursor-pointer hover:text-[#9a8457] text-sm sm:text-base"
          onClick={() => navigate(`/product/${item._id}`)}
        >
          {item.name}
        </h3>
        {/* <div className="text-xs sm:text-sm text-gray-600 mt-1">
          {item.metalType} • {item.stoneType}
          {item.selectedSize && ` • Size: ${item.selectedSize}`}
        </div> */}
        {item.engraving && (
          <div className="text-xs sm:text-sm text-gray-600 mt-1">
            Engraving: "{item.engraving}"
          </div>
        )}
        {(() => {
          const { amount, symbol } = getDisplayPrice(item);
          return (
            <div className="flex items-center space-x-2 mt-2">
              <span className="font-semibold text-gray-900 text-sm sm:text-base">
                {selectedCountry.flag} {symbol}
                {amount.toLocaleString()}
              </span>
              {selectedCountry.currency === "INR" &&
                (item.originalPrice ?? 0) > (item.price ?? 0) && (
                  <span className="text-xs sm:text-sm text-gray-500 line-through">
                    ₹{(item.originalPrice ?? 0).toLocaleString()}
                  </span>
                )}
            </div>
          );
        })()}

        {/*  Making Charges Display */}
        {item.makingChargesByCountry?.[selectedCountry.currency] && (
          <div className="text-xs sm:text-sm text-gray-600 mt-1">
            <span className="font-medium">Making Charges:</span>{" "}
            {item.makingChargesByCountry[selectedCountry.currency].symbol}
            {item.makingChargesByCountry[
              selectedCountry.currency
            ].amount.toLocaleString()}
          </div>
        )}

        {/* Total Price (Price + Making Charges) */}
        {(() => {
          const { amount, symbol } = getDisplayPrice(item);
          const makingCharge = item.makingChargesByCountry?.[selectedCountry.currency]?.amount || 0;
          const totalPrice = amount + makingCharge;
          
          return (
            <div className="text-xs sm:text-sm text-gray-900 mt-1 pt-1 border-t border-gray-200 w-[200px]">
              <span className="font-semibold">Total Price:</span>{" "}
              {selectedCountry.flag} {symbol}
              {totalPrice.toLocaleString()}
            </div>
          );
        })()}
        
        
      </div>
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4 sm:space-x-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
            className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2">
          <button
            onClick={() => moveToWishlist(item)}
            className="flex items-center space-x-1 text-xs sm:text-sm text-gray-600 hover:text-[#9a8457]"
          >
            <Heart className="w-4 h-4" />
            <span className="hidden sm:inline">Save for later</span>
          </button>
          <button
            onClick={() => handleRemoveItem(item._id)}
            disabled={removingItems.has(item._id)}
            className="flex items-center space-x-1 text-xs sm:text-sm text-red-600 hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">
              {removingItems.has(item._id) ? 'Removing...' : 'Remove'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  const OrderSummary = ({ showPromo = true }: { showPromo?: boolean }) => {
    const { selectedCountry } = useCurrency();
    const getCurrencyData = (item: CartItem) => {
      const currency = selectedCountry.currency;
      const priceObj = item.prices?.[currency];
      return {
        amount: priceObj?.amount ?? item.price ?? 0,
        symbol: priceObj?.symbol ?? "₹",
      };
    };
    const subtotal = activeCart.reduce((sum, item) => {
      const { amount } = getCurrencyData(item);
      const makingCharge =
        item.makingChargesByCountry?.[selectedCountry.currency]?.amount ||
        item.makingCharges ||
        0;
      return sum + (amount + makingCharge) * item.quantity;
    }, 0);

    const originalSubtotal = activeCart.reduce((sum, item) => {
      const currency = selectedCountry.currency;
      const origAmount =
        item.originalPrice ??
        item.prices?.[currency]?.amount ??
        item.price ??
        0;
      return sum + origAmount * item.quantity;
    }, 0);
    const productSavings =
      originalSubtotal > subtotal ? originalSubtotal - subtotal : 0;
    const promoSavings = promoApplied ? subtotal * promoDiscount : 0;
    const currencySymbol =
      cart[0]?.prices?.[selectedCountry.currency]?.symbol ||
      getSymbol(selectedCountry.currency);
    const shippingCost = 0; // Always free shipping
    const total = subtotal - promoSavings + shippingCost;

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
          Order Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm sm:text-base">
            <span className="text-gray-600">Subtotal ({cartCount} items)</span>
            <span className="font-medium">
              {selectedCountry.flag} {currencySymbol}
              {subtotal.toLocaleString()}
            </span>
          </div>
          {selectedCountry.currency === "INR" && productSavings > 0 && (
            <div className="flex justify-between text-green-600 text-sm sm:text-base">
              <span>Product Savings</span>
              <span>
                −{currencySymbol}
                {productSavings.toLocaleString()}
              </span>
            </div>
          )}
          {promoApplied && (
            <div className="flex justify-between text-green-600 text-sm sm:text-base">
              <span>Promo Discount (SAVE10)</span>
              <span>
                −{currencySymbol}
                {promoSavings.toLocaleString()}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm sm:text-base">
            <span className="text-gray-600">Shipping</span>
            <span className="text-green-600">
              Free
            </span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-base sm:text-lg font-semibold">
            <span>Total</span>
            <span>
              {selectedCountry.flag} {currencySymbol}
              {total.toLocaleString()}
            </span>
          </div>
        </div>
        {/* {showPromo && !promoApplied && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
              />
              <button
                onClick={applyPromoCode}
                className="px-3 sm:px-4 py-2 bg-[#9a8457] text-white text-sm sm:text-base rounded-lg hover:bg-[#8a7547] transition-colors whitespace-nowrap"
              >
                Apply
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Try code: SAVE10 for 10% off
            </p>
          </div>
        )} */}
        <div className="mt-4 flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
          <Shield className="w-4 h-4 flex-shrink-0" />
          <span>Secure checkout with SSL encryption</span>
        </div>
      </div>
    );
  };

  if (currentStep === "confirmation") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full mt-20">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Order Confirmed!
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Thank you for your purchase. Your order #{orderId || "Processing"}{" "}
              has been confirmed and will be processed shortly.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-600 mb-2">Order Total</div>
              <div className="text-xl sm:text-2xl font-bold text-[#9a8457]">
                ₹{total.toLocaleString()}
              </div>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/products")}
                className="w-full bg-[#9a8457] text-white py-3 rounded-lg hover:bg-[#8a7547] transition-colors text-sm sm:text-base"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loader while fetching data (only show loader if we're actually loading and haven't fetched data yet)
  if (isLoading && !dataFetched) {
    return <ProductLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      <div className="bg-white border-b border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-4 sm:space-x-8 mt-20 sm:mt-40">
            {[
              {
                step: "cart" as const,
                label: "Shopping Cart",
                icon: ShoppingBag,
              },
              { step: "shipping" as const, label: "Shipping", icon: Truck },
              { step: "payment" as const, label: "Payment", icon: CreditCard },
            ].map(({ step, label, icon: Icon }, index) => (
              <div
                key={step}
                className={`flex items-center space-x-1 sm:space-x-2 ${
                  currentStep === step
                    ? "text-[#9a8457]"
                    : index <
                        ["cart", "shipping", "payment"].indexOf(currentStep)
                      ? "text-green-600"
                      : "text-gray-400"
                }`}
              >
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                    currentStep === step
                      ? "bg-[#9a8457] text-white"
                      : index <
                          ["cart", "shipping", "payment"].indexOf(currentStep)
                        ? "bg-green-600 text-white"
                        : "bg-gray-200"
                  }`}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {currentStep === "cart" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Shopping Cart ({activeCart.length} items)
                </h1>
                <button
                  onClick={() => navigate("/products")}
                  className="text-[#9a8457] hover:text-[#8a7547] flex items-center space-x-1 text-sm sm:text-base"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </button>
              </div>
              {activeCart.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    Your cart is empty
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-6">
                    Add some beautiful jewelry to get started!
                  </p>
                  <div className="space-y-4">
                    <button
                      onClick={() => navigate("/products")}
                      className="bg-[#9a8457] text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-[#8a7547] transition-colors text-sm sm:text-base"
                    >
                      Browse Jewelry
                    </button>
                    <button
                      onClick={() => navigate("/favorites")}
                      className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                    >
                      <Heart className="w-4 h-4" />
                      <span>View Wishlist</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeCart.map((item) => (
                    <CartItemComponent
                      key={`${item._id}-${item.selectedSize}`}
                      item={item}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-6">
              <OrderSummary />
              {activeCart.length > 0 && (
                <button
                  onClick={handleCheckout}
                  className="hidden lg:flex w-full bg-[#9a8457] text-white py-4 rounded-lg font-medium hover:bg-[#8a7547] transition-colors items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              )}
            </div>
          </div>
        )}

        {currentStep === "shipping" && (
          <>
            {shippingLoading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <ProductLoader />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Shipping Information
                  </h2>
              <form
                onSubmit={handleShippingSubmit}
                className="space-y-4 sm:space-y-6"
              >
                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.firstName}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            firstName: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.lastName}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            lastName: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            email: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={shippingInfo.phone}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            phone: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
                    Shipping Address
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.address}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            address: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.city}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              city: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.state}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              state: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.zipCode}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              zipCode: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep("cart")}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={paymentProcessing || razorpayLoading}
                    className="flex-1 bg-[#9a8457] text-white py-3 rounded-lg font-medium hover:bg-[#8a7547] transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {paymentProcessing || razorpayLoading
                      ? "Processing..."
                      : `Place Order • ${selectedCountry.flag} ${symbol}${total.toLocaleString()}`}
                  </button>
                </div>
              </form>
            </div>
            <div>
              <OrderSummary showPromo={false} />
              <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                <h4 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">
                  Your order is secure
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>SSL encrypted checkout</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-600">
                    <Truck className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Insured shipping</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-600">
                    <Gift className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>30-day return policy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
            )}
          </>
        )}
      </div>

      {currentStep === "cart" && activeCart.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-sm sm:text-base">
              Total: ₹{total.toLocaleString()}
            </span>
            <span className="text-xs sm:text-sm text-gray-600">
              {cartCount} items
            </span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-[#9a8457] text-white py-3 sm:py-4 rounded-lg font-medium hover:bg-[#8a7547] transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <span>
              {isLoggedIn() ? "Proceed to Checkout" : "Login to Continue"}
            </span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
