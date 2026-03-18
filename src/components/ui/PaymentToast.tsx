import React, { useEffect } from 'react';
import { XCircle, X, AlertCircle, CheckCircle } from 'lucide-react';

interface PaymentToastProps {
  message: string;
  type?: 'error' | 'warning' | 'success';
  onClose: () => void;
}

export const PaymentToast: React.FC<PaymentToastProps> = ({ message, type = 'warning', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const config = {
    warning: {
      icon: <AlertCircle className="w-5 h-5 text-white" />,
      bg: 'bg-amber-500',
      border: 'border-amber-400',
      title: 'Payment Cancelled',
    },
    error: {
      icon: <XCircle className="w-5 h-5 text-white" />,
      bg: 'bg-red-500',
      border: 'border-red-400',
      title: 'Payment Failed',
    },
    success: {
      icon: <CheckCircle className="w-5 h-5 text-white" />,
      bg: 'bg-green-500',
      border: 'border-green-400',
      title: 'Payment Successful',
    },
  }[type];

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-start gap-3 bg-white border ${config.border} shadow-xl rounded-xl px-5 py-4 min-w-[300px] animate-slide-up`}>
      <div className={`${config.bg} p-2 rounded-full mt-0.5 shrink-0`}>
        {config.icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800">{config.title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{message}</p>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600 mt-0.5 shrink-0">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};