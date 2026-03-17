import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export interface CreateOrderPayload {
  products: Array<{
    productId: string;
    variant: string;
    quantity: number;
  }>;
  deliveryAddress: {
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  currency?: string;
  symbol?: string;
  totalAmount?: number; // Frontend-calculated total amount
}

export interface CreateOrderResponse {
  success: boolean;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  oId: string;
}

export interface VerifyPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  oId: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  order: any;
  alreadyProcessed?: boolean;
}

/**
 * Create a Razorpay order
 */
export const createRazorpayOrder = async (
  payload: CreateOrderPayload
): Promise<CreateOrderResponse> => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Error("Authentication required");
  }

  const { data } = await axios.post(
    `${API_URL}/api/payments/create-razorpay-order`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};

/**
 * Verify Razorpay payment
 */
export const verifyRazorpayPayment = async (
  payload: VerifyPaymentPayload
): Promise<VerifyPaymentResponse> => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw new Error("Authentication required");
  }

  const { data } = await axios.post(
    `${API_URL}/api/payments/verify-payment`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};
