// pages/CartPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, X, Heart, ShoppingBag, Truck, Shield, CreditCard, Check, Gift, Tag, ArrowLeft } from 'lucide-react';
import { useCart, useWishlist, CartItem } from '@/contexts/AppContext';

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

const CartPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'cart' | 'shipping' | 'payment' | 'confirmation'>('cart');
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();
  const { addToWishlist } = useWishlist();

 const moveToWishlist = (item: CartItem) => {
  // Extract only Product properties, excluding CartItem-specific fields
  const product = {
    id: item.id,
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
    image: item.image,
    isNew: item.isNew,
    isBestSeller: item.isBestSeller,
    isMadetoOrder: item.isMadetoOrder,
    description: item.description,
    discount: item.discount,
    inStock: item.inStock,
    category: item.category,
    tags: item.tags,
    gender: item.gender
  };
  addToWishlist(product);
  removeFromCart(item.id);
  console.log('Moved to wishlist:', item.name);
};

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
      setPromoDiscount(0.1); // 10% discount
    }
  };

  const removePromoCode = () => {
    setPromoApplied(false);
    setPromoDiscount(0);
    setPromoCode('');
  };

  // Calculations
  const subtotal = cartTotal;
  const originalSubtotal = cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const productSavings = originalSubtotal - subtotal;
  const promoSavings = subtotal * promoDiscount;
  const shippingCost = subtotal > 100000 ? 0 : 2000; // Free shipping over 1 lakh
  const total = subtotal - promoSavings + shippingCost;

  const handleShippingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCurrentStep('shipping');
  };

  const handlePlaceOrder = () => {
    // Clear the cart and move to confirmation
    clearCart();
    setCurrentStep('confirmation');
  };

  const CartItemComponent = ({ item }: { item: CartItem }) => (
    <div className="flex items-center space-x-4 p-6 bg-white rounded-lg border border-gray-200">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg cursor-pointer"
        onClick={() => navigate(`/product/${item.id}`)}
      />
      
      <div className="flex-1">
        <h3 
          className="font-medium text-gray-900 cursor-pointer hover:text-[#9a8457]"
          onClick={() => navigate(`/product/${item.id}`)}
        >
          {item.name}
        </h3>
        <div className="text-sm text-gray-600 mt-1">
          {item.metalType} • {item.stoneType}
          {item.selectedSize && ` • Size: ${item.selectedSize}`}
        </div>
        {item.engraving && (
          <div className="text-sm text-gray-600 mt-1">
            Engraving: "{item.engraving}"
          </div>
        )}
        <div className="flex items-center space-x-2 mt-2">
          <span className="font-semibold text-gray-900">
            ₹{item.price.toLocaleString()}
          </span>
          {item.originalPrice > item.price && (
            <span className="text-sm text-gray-500 line-through">
              ₹{item.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col space-y-2">
        <button
          onClick={() => moveToWishlist(item)}
          className="flex items-center space-x-1 text-sm text-gray-600 hover:text-[#9a8457]"
        >
          <Heart className="w-4 h-4" />
          <span>Save for later</span>
        </button>
        <button
          onClick={() => removeFromCart(item.id)}
          className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700"
        >
          <X className="w-4 h-4" />
          <span>Remove</span>
        </button>
      </div>
    </div>
  );

  const OrderSummary = ({ showPromo = true }: { showPromo?: boolean }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({cartCount} items)</span>
          <span className="font-medium">₹{subtotal.toLocaleString()}</span>
        </div>
        
        {productSavings > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Product Savings</span>
            <span>-₹{productSavings.toLocaleString()}</span>
          </div>
        )}
        
        {promoApplied && (
          <div className="flex justify-between text-green-600">
            <span>Promo Discount (SAVE10)</span>
            <span>-₹{promoSavings.toLocaleString()}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className={shippingCost === 0 ? "text-green-600" : ""}>
            {shippingCost === 0 ? 'Free' : `₹${shippingCost.toLocaleString()}`}
          </span>
        </div>
        
        {shippingCost === 0 && (
          <div className="text-sm text-green-600 flex items-center">
            <Truck className="w-4 h-4 mr-1" />
            Free shipping on orders over ₹1,00,000
          </div>
        )}
      </div>

      {showPromo && !promoApplied && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
            />
            <button
              onClick={applyPromoCode}
              className="px-4 py-2 bg-[#9a8457] text-white rounded-lg hover:bg-[#8a7547] transition-colors"
            >
              Apply
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Try code: SAVE10 for 10% off</p>
        </div>
      )}

      {promoApplied && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-green-600" />
              <span className="text-green-700 font-medium">SAVE10 Applied</span>
            </div>
            <button
              onClick={removePromoCode}
              className="text-red-600 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
        <Shield className="w-4 h-4" />
        <span>Secure checkout with SSL encryption</span>
      </div>
    </div>
  );

  if (currentStep === 'confirmation') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order #JW-2024-001 has been confirmed and will be processed shortly.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-600 mb-2">Order Total</div>
              <div className="text-2xl font-bold text-[#9a8457]">₹{total.toLocaleString()}</div>
            </div>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/products')}
                className="w-full bg-[#9a8457] text-white py-3 rounded-lg hover:bg-[#8a7547] transition-colors"
              >
                Continue Shopping
              </button>
              <button 
                onClick={() => navigate('/')}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-8 mt-40">
            {[
              { step: 'cart' as const, label: 'Shopping Cart', icon: ShoppingBag },
              { step: 'shipping' as const, label: 'Shipping', icon: Truck },
              { step: 'payment' as const, label: 'Payment', icon: CreditCard },
            ].map(({ step, label, icon: Icon }, index) => (
              <div
                key={step}
                className={`flex items-center space-x-2 ${
                  currentStep === step
                    ? 'text-[#9a8457]'
                    : index < ['cart', 'shipping', 'payment'].indexOf(currentStep)
                    ? 'text-green-600'
                    : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === step
                      ? 'bg-[#9a8457] text-white'
                      : index < ['cart', 'shipping', 'payment'].indexOf(currentStep)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'cart' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                  Shopping Cart ({cartCount} items)
                </h1>
                <button 
                  onClick={() => navigate('/products')}
                  className="text-[#9a8457] hover:text-[#8a7547] flex items-center space-x-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </button>
              </div>
              
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                  <p className="text-gray-600 mb-6">Add some beautiful jewelry to get started!</p>
                  <div className="space-y-4">
                    <button 
                      onClick={() => navigate('/products')}
                      className="bg-[#9a8457] text-white px-8 py-3 rounded-lg hover:bg-[#8a7547] transition-colors"
                    >
                      Browse Jewelry
                    </button>
                    <button 
                      onClick={() => navigate('/favorites')}
                      className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Heart className="w-4 h-4" />
                      <span>View Wishlist</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <CartItemComponent key={`${item.id}-${item.selectedSize}`} item={item} />
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <OrderSummary />
              {cart.length > 0 && (
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#9a8457] text-white py-4 rounded-lg font-medium hover:bg-[#8a7547] transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              )}
            </div>
          </div>
        )}

        {currentStep === 'shipping' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
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
                        onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
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
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
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
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
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
                          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
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
                          onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
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
                          onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-[#9a8457]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('cart')}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-[#9a8457] text-white py-3 rounded-lg font-medium hover:bg-[#8a7547] transition-colors"
                  >
                    Place Order • ₹{total.toLocaleString()}
                  </button>
                </div>
              </form>
            </div>

            <div>
              <OrderSummary showPromo={false} />
              
              {/* Security Features */}
              <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="font-medium text-gray-900 mb-3">Your order is secure</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>SSL encrypted checkout</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Truck className="w-4 h-4 text-green-600" />
                    <span>Insured shipping</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Gift className="w-4 h-4 text-green-600" />
                    <span>30-day return policy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky bottom bar for mobile */}
      {currentStep === 'cart' && cart.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Total: ₹{total.toLocaleString()}</span>
            <span className="text-sm text-gray-600">{cartCount} items</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-[#9a8457] text-white py-3 rounded-lg font-medium hover:bg-[#8a7547] transition-colors"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;