import React, { useEffect } from 'react';
import { Check } from 'lucide-react';

interface LocalCartToastProps {
  message: string;
  productName?: string;
  onClose: () => void;
  show: boolean;
}

export const LocalCartToast: React.FC<LocalCartToastProps> = ({ 
  message, 
  productName, 
  onClose, 
  show 
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-50">
      <style>
        {`
          @keyframes bounce-in {
            0% {
              opacity: 0;
              transform: translateY(10px) scale(0.8);
            }
            50% {
              opacity: 1;
              transform: translateY(-5px) scale(1.05);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-bounce-in {
            animation: bounce-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          }
        `}
      </style>
      <div className="bg-white border border-[#9a8457] shadow-xl rounded-xl px-4 py-3 min-w-[250px] flex items-center gap-3 animate-bounce-in">
        <div className="bg-green-100 p-2 rounded-full">
          <Check className="w-4 h-4 text-green-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800">{message}</p>
          {productName && (
            <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[180px]">{productName}</p>
          )}
        </div>
      </div>
      {/* Arrow pointing down to the button */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2">
        <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#9a8457]"></div>
      </div>
    </div>
  );
};