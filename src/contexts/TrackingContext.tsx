import React, { createContext, useContext, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent, getOrCreateSessionId } from "../utils/tracking";

interface TrackingContextType {
  logAddToCart: (productId: string, extra?: any) => void;
  logCheckout: (cart: any) => void;
  logPurchase: (orderId: string, amount: number) => void;
}

const TrackingContext = createContext<TrackingContextType | null>(null);

export const TrackingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // Log page visits automatically on route change
  useEffect(() => {
    getOrCreateSessionId(); // ensure session exists
    trackEvent("visit", { metadata: { page: location.pathname } });
  }, [location.pathname]);

  // Common reusable loggers
  const logAddToCart = useCallback((productId: string, extra?: any) => {
    trackEvent("add_to_cart", { productId, metadata: extra });
  }, []);

  const logCheckout = useCallback((cart: any) => {
    trackEvent("checkout", { metadata: { cartItems: cart.length } });
  }, []);

  const logPurchase = useCallback((orderId: string, amount: number) => {
    trackEvent("purchase", { orderId, metadata: { totalAmount: amount } });
  }, []);

  return (
    <TrackingContext.Provider value={{ logAddToCart, logCheckout, logPurchase }}>
      {children}
    </TrackingContext.Provider>
  );
};

export const useTracking = () => {
  const ctx = useContext(TrackingContext);
  if (!ctx) throw new Error("useTracking must be used inside <TrackingProvider>");
  return ctx;
};
