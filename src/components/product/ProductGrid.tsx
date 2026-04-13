// components/product/ProductGrid.tsx
import React from "react";
// import ProductListItem from "./ProductListItem";
import ProductCard from "./ProductCard";
import { Product } from "@/contexts/AppContext";

export type ViewMode = "grid" | "list";

interface ProductGridProps {
  products: Product[];
  viewMode: ViewMode;
  isLoading?: boolean;
}

// Skeleton Loader for Grid View
const GridSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-200"></div>
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-3 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-12"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
};

// Skeleton Loader for List View
// const ListSkeleton = () => {
//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
//       <div className="flex flex-col md:flex-row">
//         {/* Image skeleton */}
//         <div className="w-full md:w-64 h-64 bg-gray-200"></div>
        
//         {/* Content skeleton */}
//         <div className="flex-1 p-6 space-y-4">
//           <div className="h-6 bg-gray-200 rounded w-3/4"></div>
//           <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//           <div className="space-y-2">
//             <div className="h-3 bg-gray-200 rounded w-full"></div>
//             <div className="h-3 bg-gray-200 rounded w-5/6"></div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="h-8 bg-gray-200 rounded w-24"></div>
//             <div className="h-8 bg-gray-200 rounded w-24"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// Main Loader Component
const ProductGridLoader: React.FC<{ viewMode: ViewMode }> = ({ viewMode }) => {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(12)].map((_, index) => (
          <GridSkeleton key={index} />
        ))}
      </div>
    );
  }

  // return (
  //   <div className="space-y-6">
  //     {[...Array(6)].map((_, index) => (
  //       <ListSkeleton key={index} />
  //     ))}
  //   </div>
  // );
};

const ProductGrid: React.FC<ProductGridProps> = ({ products, viewMode, isLoading = false }) => {
  // Show loader when loading
  if (isLoading) {
    return <ProductGridLoader viewMode={viewMode} />;
  }

  // Empty state
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

  // Grid view
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <ProductCard key={product._id} product={product} index={index} isLoading={false} />
        ))}
      </div>
    );
  }

  // List view
  // return (
  //   <div className="space-y-6">
  //     {products.map((product, index) => (
  //       <ProductListItem key={product._id} product={product} index={index} isLoading={false} />
  //     ))}
  //   </div>
  // );
};

export default ProductGrid;