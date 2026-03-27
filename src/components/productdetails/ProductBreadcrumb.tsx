// components/product/ProductBreadcrumb.tsx
import React from "react";
import { Product } from "@/contexts/AppContext";

interface ProductBreadcrumbProps {
  product: Product;
  navigate: (path: string) => void;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({
  product,
  navigate,
}) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6 sm:mt-32">
      <button
        onClick={() => navigate("/")}
        className="hover:text-gray-900 transition-colors"
      >
        Home
      </button>
      <span>/</span>
      <button
        onClick={() => navigate("/products")}
        className="hover:text-gray-900 transition-colors"
      >
        Products
      </button>
      {product.category && (
        <>
          <span>/</span>
          <button
            onClick={() => {
              const categoryStr = Array.isArray(product.category)
                ? product.category[0]
                : product.category;
              navigate(`/products/${categoryStr?.toLowerCase() || ""}`);
            }}
            className="hover:text-gray-900 transition-colors"
          >
            {Array.isArray(product.category)
              ? product.category[0]
              : product.category}
          </button>
        </>
      )}
      <span>/</span>
      <span className="text-gray-900 truncate">{product.name}</span>
    </nav>
  );
};

export default ProductBreadcrumb;