import React from "react";

const ProductStyles: React.FC = () => {
  return (
    <style>{`
      @keyframes elegant-fade-in {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      
      @keyframes gentle-float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
      
      @keyframes luxury-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(154, 132, 87, 0.1); }
        50% { box-shadow: 0 0 30px rgba(154, 132, 87, 0.2); }
      }
      
      .elegant-fade-in {
        animation: elegant-fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .shimmer-effect {
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.8),
          transparent
        );
        background-size: 200% 100%;
        animation: shimmer 2s ease-in-out infinite;
      }
      
      .gentle-float {
        animation: gentle-float 6s ease-in-out infinite;
      }
      
      .luxury-glow:hover {
        animation: luxury-glow 2s ease-in-out infinite;
      }
      
      .glass-morphism {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(20px) saturate(180%);
        border: 1px solid rgba(255, 255, 255, 0.3);
      }
      
      .filter-slide-down {
        animation: slideDown 0.3s ease-out;
      }
      
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .product-hover {
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .product-hover:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      }
      
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `}</style>
  );
};

export default ProductStyles;