// components/product/ProductGrid.tsx
import React from "react";
import ProductListItem from "./ProductListItem";
import ProductCard from "./ProductCard";
import { Product } from "@/contexts/AppContext";

export type ViewMode = "grid" | "list";

interface ProductGridProps {
  products: Product[];
  viewMode: ViewMode;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, viewMode }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {products.map((product, index) => (
        <ProductListItem key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductGrid;