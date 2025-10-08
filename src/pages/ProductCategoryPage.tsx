import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FilterBar from "@/components/product/FilterBar";
import FilterPanel from "@/components/product/FilterPanel";
import MobileFilter from "@/components/product/MobileFilter";
import ProductGrid from "@/components/product/ProductGrid";
import ProductHeroSection from "@/components/product/ProductHeroSection";
import ProductStyles from "@/components/product/ProductStyles";
import { useProducts } from "@/contexts/AppContext";

const ProductCategoryPage: React.FC = () => {
  const { category } = useParams();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoaded, setIsLoaded] = useState(false);

  const {
    filteredProducts,
    searchQuery,
    filters,
    setSearchQuery,
    setFilters,
    resetFilters,
    getCategories,
  } = useProducts();

  // Infinite scroll states
  const [visibleProducts, setVisibleProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Set filters by category
  useEffect(() => {
    if (category) {
      setFilters({
        ...filters,
        category: [category],
      });
    }
  }, [category]);

  // Mark page loaded
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Load initial visible products when filters change
  useEffect(() => {
    setVisibleProducts(filteredProducts.slice(0, 9)); // first 9
    setPage(1);
    setHasMore(filteredProducts.length > 9);
  }, [filteredProducts]);

  // Function to load more on scroll
  const loadMoreProducts = () => {
    setLoading(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const newProducts = filteredProducts.slice(0, nextPage * 9);
      setVisibleProducts(newProducts);
      setPage(nextPage);
      setHasMore(newProducts.length < filteredProducts.length);
      setLoading(false);
    }, 400); // delay for smoother UX
  };

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        if (hasMore && !loading) loadMoreProducts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, visibleProducts]);

  // Filter options
  const filterOptions = {
    metalType: [
      "18K White Gold",
      "18K Yellow Gold",
      "18K Rose Gold",
      "Platinum",
      "Sterling Silver",
      "14K Yellow Gold",
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
    category: getCategories(),
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
    if (category) {
      const categoryMap: { [key: string]: string } = {
        rings: "Rings Collection",
        earrings: "Earrings Collection",
        necklaces: "Necklaces Collection",
        bracelets: "Bracelets Collection",
        mens: "Men's Jewelry Collection",
        engagement: "Engagement Rings",
        wedding: "Wedding Bands",
        studs: "Stud Earrings",
        hoops: "Hoop Earrings",
        tennis: "Tennis Collection",
        pendants: "Pendant Necklaces",
        bangles: "Bangles Collection",
      };
      return (
        categoryMap[category.toLowerCase()] ||
        `${category.charAt(0).toUpperCase() + category.slice(1)} Collection`
      );
    }
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    if (filters.category.length > 0)
      return `${filters.category[0]} Collection`;
    return "All Products";
  };

  const getCategorySubtitle = () => {
    if (category || filters.category.length > 0) {
      const categoryName = category || filters.category[0];
      const descriptions: { [key: string]: string } = {
        rings:
          "Discover our exquisite collection of handcrafted rings, where timeless elegance meets contemporary sophistication",
        engagement:
          "Find the perfect symbol of your love with our stunning engagement ring collection",
        wedding: "Classic and contemporary wedding bands for your special day",
        earrings: "Elegant earrings to complement your unique style",
        studs: "Classic stud earrings for everyday elegance",
        hoops: "Modern hoop earrings that make a statement",
        necklaces: "Beautiful necklaces to enhance your natural radiance",
        tennis:
          "Luxury tennis jewelry featuring continuous brilliant stones",
        pendants: "Meaningful pendant necklaces for every occasion",
        bracelets:
          "Sophisticated bracelets that add the perfect finishing touch",
        bangles: "Traditional and modern bangles for timeless beauty",
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

  // ──────────────────────────────────────────────
  // Main return
  // ──────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-x-hidden">
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
        {filteredProducts.length > 0 ? (
          <>
            {/* ✅ 3-column Product Grid with infinite scroll */}
            <ProductGrid products={visibleProducts} viewMode={viewMode} />

            {/* Loader or End Message */}
            <div className="flex justify-center py-8">
              {loading && (
                <span className="text-gray-600 animate-pulse">
                  Loading more products...
                </span>
              )}
              {!hasMore && !loading && (
                <span className="text-gray-400">You've reached the end 🎉</span>
              )}
            </div>
          </>
        ) : (
          // Empty state
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
