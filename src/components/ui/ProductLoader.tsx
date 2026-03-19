import React from 'react';
import { ShoppingBag } from 'lucide-react';

const ProductLoader = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Spinning ring */}
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#9a8457] rounded-full border-t-transparent animate-spin"></div>
          {/* Inner icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-[#9a8457]" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Loading Product...
        </h2>
        <p className="text-gray-600">Please wait while we fetch the details</p>
      </div>
    </div>
  );
};

export default ProductLoader;