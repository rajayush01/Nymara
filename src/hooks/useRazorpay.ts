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

      // Razorpay options
      const options: RazorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount * 100, // Convert to paise
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
            const dismissMsg = "Payment cancelled by user";
            setError(dismissMsg);
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
      if (onFailure) onFailure(errorMsg);
    }
  };

  return {
    initiatePayment,
    loading,
    error,
  };
};
