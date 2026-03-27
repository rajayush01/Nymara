import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import FilterBar from "@/components/product/FilterBar";
import FilterPanel from "@/components/product/FilterPanel";
import MobileFilter from "@/components/product/MobileFilter";
import ProductGrid from "@/components/product/ProductGrid";
import ProductHeroSection from "@/components/product/ProductHeroSection";
import ProductStyles from "@/components/product/ProductStyles";
import { useProducts } from "@/contexts/AppContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PRODUCTS_PER_PAGE = 12;

const ProductCategoryPage: React.FC = () => {
  const { category, subCategory } = useParams();
  const location = useLocation();
  const [showFilters, setShowFilters] = useState(false);
  
  // Extract category from URL path if not in params (for legacy routes like /rings)
  const pathCategory = location.pathname.split('/')[1];
const actualCategory = category || (pathCategory && pathCategory !== "products" ? pathCategory : undefined);
  const actualSubCategory = subCategory;
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [hasInitialLoad, setHasInitialLoad] = useState(false);
  

  const {
    filteredProducts,
    searchQuery,
    filters,
    setSearchQuery,
    setFilters,
    resetFilters,
    getCategories,
    getSubCategories,
  } = useProducts();

  // Set filters by category and subcategory
  useEffect(() => {
    console.log("🎯 ProductCategoryPage: Setting filters for category:", actualCategory, "subCategory:", actualSubCategory);
    
    // Reset initial load state when category changes
    setHasInitialLoad(false);
    setIsLoadingProducts(true);
    
    if (actualCategory) {
      const newFilters = {
        ...filters,
        category: [actualCategory],
        sortBy: filters.sortBy || "best-seller",
      };
      
      // Add subcategory filter if present
      if (actualSubCategory) {
        newFilters.subCategory = [actualSubCategory];
        console.log("🏷️ Setting subCategory filter:", [actualSubCategory]);
      } else {
        newFilters.subCategory = [];
        console.log("🏷️ Clearing subCategory filter");
      }
      
      console.log("🎯 Applying filters:", newFilters);
      setFilters(newFilters);
    } else {
      console.log("🔄 No category, resetting filters");
      resetFilters();
    }
  }, [actualCategory, actualSubCategory]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [actualCategory, actualSubCategory]);

  // Mark page loaded after initial render
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Handle initial loading - only stop when we actually have products
  useEffect(() => {
    if (!hasInitialLoad) {
      // Keep loading state true initially
      setIsLoadingProducts(true);
      
      // Wait for products to be available
      if (filteredProducts.length > 0) {
        setHasInitialLoad(true);
        setIsLoadingProducts(false);
      } else {
        // If filters are set but still no products after a reasonable time, assume empty results
        const timer = setTimeout(() => {
          setHasInitialLoad(true);
          setIsLoadingProducts(false);
        }, 1500); // Reduced from 2000ms to 1500ms for faster response
        return () => clearTimeout(timer);
      }
    }
  }, [filteredProducts.length, hasInitialLoad]);

  // Handle loading state for filter changes (after initial load)
  useEffect(() => {
    if (hasInitialLoad) {
      setIsLoadingProducts(true);
      const timer = setTimeout(() => {
        setIsLoadingProducts(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [filters, searchQuery, hasInitialLoad]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts.length, searchQuery, filters]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Scroll to top when page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Filter options
  const filterOptions = {
    metalType: [
      "18K Gold",
      "18K White Gold",
      "18K Rose Gold",
      "14K Gold",
      "14K White Gold",
      "14K Rose Gold",
      "Platinum",
      "925 Sterling Silver",
      "Gold Vermeil",
    ],
    stoneType: [
      "Lab-Grown Diamond",
      "Lab-Grown Sapphire",
      "Lab-Grown Emerald",
      "Lab-Grown Ruby",
      "Pearl",
      "None",
    ],
    style: [
      "Solitaire",
      "Halo",
      "Three Stone",
      "Wedding Band",
      "Eternity",
      "Cocktail",
      "Drop",
      "Vintage",
      "Tennis",
      "Cluster",
      "Chain",
      "Signet",
      "Studs",
      "Bangles",
    ],
    size: [
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "One Size",
      "16 inch",
      "18 inch",
      "20 inch",
      "22 inch",
      "24 inch",
      "7 inch",
      "8 inch",
      "1ct",
    ],
    color: [
      "D-Color",
      "E-Color",
      "F-Color",
      "G-Color",
      "H-Color",
      "I-Color",
      "White",
      "Rose Gold",
      "Gold",
      "Green",
      "Blue",
    ],
    gender: ["Men", "Women", "Unisex"],
    category: getCategories(),
    subCategory: getSubCategories(),
    sortBy: [
      { value: "best-seller", label: "Best Seller" },
      { value: "newest", label: "Newest" },
      { value: "price_asc", label: "Price: Low to High" },
      { value: "price_desc", label: "Price: High to Low" },
      { value: "rating", label: "Highest Rated" },
    ],
  };

  // Dynamic title
  const getCategoryTitle = () => {
    if (actualSubCategory && actualCategory) {
      const subCategoryMap: { [key: string]: string } = {
        studs: "Stud Earrings",
        hoops: "Hoop Earrings",
        tennis: "Tennis Collection",
        pendants: "Pendant Necklaces",
        bangles: "Bangles Collection",
        gemstone: "Gemstone Collection",
        gold: "Gold Collection",
        fashion: "Fashion Collection",
      };
      return subCategoryMap[actualSubCategory.toLowerCase()] || 
             `${actualSubCategory.charAt(0).toUpperCase() + actualSubCategory.slice(1)} ${actualCategory.charAt(0).toUpperCase() + actualCategory.slice(1)}`;
    }
    if (actualCategory) {
      const categoryMap: { [key: string]: string } = {
        rings: "Rings Collection",
        earrings: "Earrings Collection",
        necklaces: "Necklaces Collection",
        bracelets: "Bracelets Collection",
        mens: "Men's Jewelry Collection",
        engagement: "Engagement Rings",
        wedding: "Wedding Bands",
      };
      return (
        categoryMap[actualCategory.toLowerCase()] ||
        `${actualCategory.charAt(0).toUpperCase() + actualCategory.slice(1)} Collection`
      );
    }
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    if (filters.category.length > 0)
      return `${filters.category[0]} Collection`;
    return "All Products";
  };

  const getCategorySubtitle = () => {
    if (actualSubCategory && actualCategory) {
      const subCategoryDescriptions: { [key: string]: string } = {
        studs: "Classic stud earrings for everyday elegance and timeless sophistication",
        hoops: "Modern hoop earrings that make a statement and frame your face beautifully",
        tennis: "Luxury tennis jewelry featuring continuous brilliant stones for ultimate glamour",
        pendants: "Meaningful pendant necklaces for every occasion and personal expression",
        bangles: "Traditional and modern bangles for timeless beauty and cultural elegance",
        gemstone: "Exquisite gemstone jewelry featuring nature's most precious colored stones",
        gold: "Pure gold jewelry crafted with traditional techniques and modern design",
        fashion: "Contemporary fashion jewelry for the modern style-conscious individual",
      };
      return subCategoryDescriptions[actualSubCategory.toLowerCase()] || 
             `Discover our exquisite collection of ${actualSubCategory.toLowerCase()} ${actualCategory.toLowerCase()}`;
    }
    if (actualCategory || filters.category.length > 0) {
      const categoryName = actualCategory || filters.category[0];
      const descriptions: { [key: string]: string } = {
        rings:
          "Discover our exquisite collection of handcrafted rings, where timeless elegance meets contemporary sophistication",
        engagement:
          "Find the perfect symbol of your love with our stunning engagement ring collection",
        wedding: "Classic and contemporary wedding bands for your special day",
        earrings: "Elegant earrings to complement your unique style",
        necklaces: "Beautiful necklaces to enhance your natural radiance",
        bracelets:
          "Sophisticated bracelets that add the perfect finishing touch",
        mens: "Distinguished jewelry collection designed for the modern gentleman",
      };
      return (
        descriptions[categoryName?.toLowerCase()] ||
        `Discover our exquisite collection of handcrafted ${categoryName?.toLowerCase()}, where timeless elegance meets contemporary sophistication`
      );
    }
    if (searchQuery)
      return `Found ${filteredProducts.length} products matching your search`;
    return "Discover our complete collection of handcrafted jewelry, where timeless elegance meets contemporary sophistication";
  };

  const getActiveFilterCount = () => {
    return (
      Object.values(filters).reduce((count: number, filterValue: any) => {
        if (Array.isArray(filterValue)) {
          return count + filterValue.length;
        }
        return count;
      }, 0) + (searchQuery ? 1 : 0)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 sm:mt-20 overflow-x-hidden">
      <ProductStyles />

      <ProductHeroSection
        title={getCategoryTitle()}
        subtitle={getCategorySubtitle()}
        productCount={filteredProducts.length}
        isLoaded={isLoaded}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12">
        <FilterBar
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilters={filters}
          setActiveFilters={setFilters}
          filterOptions={filterOptions}
          productCount={filteredProducts.length}
        />

        <FilterPanel
          showFilters={showFilters}
          activeFilters={filters}
          setActiveFilters={setFilters}
          filterOptions={filterOptions}
        />
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        {/* Show loader while loading, products when loaded, or empty state */}
        {isLoadingProducts ? (
          <ProductGrid products={[]} viewMode={viewMode} isLoading={true} />
        ) : filteredProducts.length > 0 ? (
          <>
            {/* Product Grid with pagination */}
            <ProductGrid products={currentProducts} viewMode={viewMode} isLoading={false} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 mt-12">
                {/* Page info */}
                <div className="text-sm text-slate-600">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
                </div>

                {/* Pagination controls */}
                <div className="flex items-center gap-2">
                  {/* Previous button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg border transition-all ${
                      currentPage === 1
                        ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-[#9a8457] hover:text-white hover:border-[#9a8457]'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                      typeof page === 'number' ? (
                        <button
                          key={index}
                          onClick={() => handlePageChange(page)}
                          className={`min-w-[40px] h-10 rounded-lg border transition-all ${
                            currentPage === page
                              ? 'bg-[#9a8457] text-white border-[#9a8457] font-semibold'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {page}
                        </button>
                      ) : (
                        <span key={index} className="px-2 text-slate-400">
                          {page}
                        </span>
                      )
                    ))}
                  </div>

                  {/* Next button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg border transition-all ${
                      currentPage === totalPages
                        ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-[#9a8457] hover:text-white hover:border-[#9a8457]'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Jump to page - hidden on mobile */}
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-sm text-slate-600">Go to:</span>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                      const page = parseInt(e.target.value);
                      if (page >= 1 && page <= totalPages) {
                        handlePageChange(page);
                      }
                    }}
                    className="w-16 px-2 py-1 border border-slate-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#9a8457]"
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          // Empty state - only shown after loading completes
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No products found
            </h2>
            <p className="text-gray-600 mb-8">
              {getActiveFilterCount() > 0
                ? "Try adjusting your filters or search terms to find what you're looking for."
                : "We couldn't find any products matching your criteria."}
            </p>
            {getActiveFilterCount() > 0 && (
              <button
                onClick={() => {
                  resetFilters();
                  setSearchQuery("");
                }}
                className="bg-[#9a8457] text-white px-6 py-3 rounded-lg hover:bg-[#8a7547] transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>

      <MobileFilter
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        activeFilters={filters}
        setActiveFilters={setFilters}
        filterOptions={filterOptions}
      />
    </div>
  );
};


export default ProductCategoryPage;
