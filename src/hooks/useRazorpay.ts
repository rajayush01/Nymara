import { useState } from "react";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
  CreateOrderPayload,
} from "@/services/paymentService";

// Razorpay types
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Toast notification component
const showToast = (message: string, type: 'success' | 'error' | 'warning') => {
  const toastContainer = document.createElement('div');
  toastContainer.style.cssText = `
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 10000;
    animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  `;

  const colors = {
    success: { bg: '#10b981', icon: '✓' },
    error: { bg: '#ef4444', icon: '✕' },
    warning: { bg: '#f59e0b', icon: '⚠' }
  };

  const { bg, icon } = colors[type];

  toastContainer.innerHTML = `
    <style>
      @keyframes slideInRight {
        from { opacity: 0; transform: translateX(120%) scale(0.95); }
        to { opacity: 1; transform: translateX(0) scale(1); }
      }
      @keyframes slideOutRight {
        from { opacity: 1; transform: translateX(0) scale(1); }
        to { opacity: 0; transform: translateX(120%) scale(0.95); }
      }
      @keyframes shrinkProgress {
        from { width: 100%; }
        to { width: 0%; }
      }
    </style>
    <div style="
      background: linear-gradient(135deg, #ffffff 0%, #fefefe 100%);
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05);
      overflow: hidden;
      min-width: 360px;
      max-width: 420px;
      border: 1px solid rgba(0,0,0,0.1);
    ">
      <div style="display: flex; align-items: flex-start; padding: 18px; gap: 14px;">
        <div style="
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: ${bg};
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 12px ${bg}40;
          color: white;
          font-size: 24px;
          font-weight: bold;
        ">${icon}</div>
        <div style="flex: 1; padding-top: 2px;">
          <p style="margin: 0; font-weight: 700; font-size: 16px; color: #1f2937;">
            ${type === 'success' ? 'Success!' : type === 'error' ? 'Payment Failed' : 'Payment Cancelled'}
          </p>
          <p style="margin: 6px 0 0; font-size: 14px; color: #6b7280; line-height: 1.4;">
            ${message}
          </p>
        </div>
        <button onclick="this.closest('[style*=fixed]').remove()" style="
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #9ca3af;
          font-size: 20px;
          line-height: 1;
          border-radius: 6px;
        ">×</button>
      </div>
      <div style="height: 4px; background: #f3f4f6;">
        <div style="
          height: 100%;
          background: ${bg};
          border-radius: 0 0 16px 16px;
          animation: shrinkProgress 4s linear forwards;
        "></div>
      </div>
    </div>
  `;

  document.body.appendChild(toastContainer);

  setTimeout(() => {
    toastContainer.style.animation = 'slideOutRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    setTimeout(() => toastContainer.remove(), 500);
  }, 4000);
};

export const useRazorpay = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load Razorpay script dynamically
   */
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      // Check if already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  /**
   * Initiate payment process
   */
  const initiatePayment = async (
    orderPayload: CreateOrderPayload,
    onSuccess: (orderId: string) => void,
    onFailure?: (error: string) => void
  ) => {
    try {
      setLoading(true);
      setError(null);

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay SDK");
      }

      // Create order on backend
      const orderData = await createRazorpayOrder(orderPayload);

      if (!orderData.success) {
        throw new Error("Failed to create order");
      }

      console.log("💳 [RAZORPAY] Order Data from Backend:", orderData);
      console.log("💳 [RAZORPAY] Amount received:", orderData.amount);
      console.log("💳 [RAZORPAY] Amount type:", typeof orderData.amount);
      console.log("💳 [RAZORPAY] Amount in paise (x100):", orderData.amount * 100);
      console.log("💳 [RAZORPAY] Amount in paise (rounded):", Math.round(orderData.amount * 100));
      console.log("💳 [RAZORPAY] Currency:", orderData.currency);

      // Razorpay options
      const options: RazorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: Math.round(orderData.amount * 100), // Convert to paise (smallest unit) and round to nearest integer
        currency: orderData.currency,
        name: "Nymara Jewelry",
        description: "Purchase from Nymara",
        order_id: orderData.razorpayOrderId,
        handler: async (response: RazorpayResponse) => {
          try {
            // Verify payment on backend
            const verifyData = await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              oId: orderData.oId,
            });

            if (verifyData.success) {
              onSuccess(orderData.oId);
            } else {
              throw new Error(verifyData.message || "Payment verification failed");
            }
          } catch (err: any) {
            const errorMsg = err.response?.data?.message || err.message || "Payment verification failed";
            setError(errorMsg);
            showToast(errorMsg, 'error');
            if (onFailure) onFailure(errorMsg);
          }
        },
        prefill: {
          name: orderPayload.deliveryAddress.name,
          contact: orderPayload.deliveryAddress.phone,
        },
        theme: {
          color: "#9a8457",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            const dismissMsg = "You cancelled the payment. Your order has not been placed.";
            setError(dismissMsg);
            showToast(dismissMsg, 'warning');
            if (onFailure) onFailure(dismissMsg);
          },
        },
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setLoading(false);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || "Payment initiation failed";
      setError(errorMsg);
      setLoading(false);
      showToast(errorMsg, 'error');
      if (onFailure) onFailure(errorMsg);
    }
  };

  return {
    initiatePayment,
    loading,
    error,
  };
};
