import React, { useEffect } from 'react';
import { ShoppingCart, X } from 'lucide-react';

interface CartToastProps {
  message: string;
  productName?: string;
  onClose: () => void;
}

export const CartToast: React.FC<CartToastProps> = ({ message, productName, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-50 flex items-start gap-3 bg-white border border-[#9a8457] shadow-xl rounded-xl px-5 py-4 min-w-[280px] animate-slide-up">
      <div className="bg-[#9a8457] p-2 rounded-full mt-0.5">
        <ShoppingCart className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800">{message}</p>
        {productName && (
          <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[200px]">{productName}</p>
        )}
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600 mt-0.5">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};