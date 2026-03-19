// components/product/ProductActions.tsx
import React, { useState } from "react";
import { Plus, Minus, ShoppingBag, Heart, Check, Shield, Award, Gift } from "lucide-react";
import { Product } from "@/contexts/AppContext";
import { LocalCartToast } from "@/components/ui/LocalCartToast";

interface ProductActionsProps {
  product: Product;
  quantity: number;
  setQuantity: (quantity: number) => void;
  selectedSize: string;
  standardSizes: string[];
  handleAddToCart: () => void;
  handleWishlistToggle: () => void;
  isInWishlist: (id: string) => boolean;
  addedToCart: boolean;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  quantity,
  setQuantity,
  selectedSize,
  standardSizes,
  handleAddToCart,
  handleWishlistToggle,
  isInWishlist,
  addedToCart,
}) => {
  const [showLocalToast, setShowLocalToast] = useState(false);

  const handleAddToCartWithToast = () => {
    handleAddToCart();
    setShowLocalToast(true);
  };
  return (
    <div className="space-y-4">
      {/* Quantity and Add to Cart */}
      <div className="space-y-4 border-t pt-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-900">Quantity:</label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex space-x-4 relative">
          <button
            onClick={handleAddToCartWithToast}
            disabled={
              !product.stock 
            }
            className="flex-1 bg-[#9a8457] text-white py-4 px-6 rounded-lg font-medium hover:bg-[#8a7547] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 relative overflow-hidden"
          >
            {addedToCart ? (
              <>
                <Check className="w-5 h-5" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                <span>{product.stock ? "Add to Cart" : "Out of Stock"}</span>
              </>
            )}
          </button>
          
          {/* Local Toast */}
          <LocalCartToast
            message={`${quantity} item${quantity > 1 ? 's' : ''} added successfully`}
            productName={product.name}
            show={showLocalToast}
            onClose={() => setShowLocalToast(false)}
          />
          
          <button
            onClick={handleWishlistToggle}
            className={`p-4 border rounded-lg transition-all ${
              isInWishlist(product._id)
                ? "border-red-300 bg-red-50 text-red-600"
                : "border-gray-300 hover:border-red-300 hover:text-red-600"
            }`}
          >
            <Heart
              className={`w-5 h-5 ${isInWishlist(product._id) ? "fill-current" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Shield className="w-4 h-4 text-green-600" />
          <span>Lifetime Warranty</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Award className="w-4 h-4 text-green-600" />
          <span>Certified Authentic</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Gift className="w-4 h-4 text-green-600" />
          <span>Gift Ready</span>
        </div>
      </div>
    </div>
  );
};

export default ProductActions;