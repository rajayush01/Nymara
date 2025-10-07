// components/product/FilterBar.tsx
import React from "react";
import { Search, Filter, Grid, List, X } from "lucide-react";

interface FilterBarProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilters: any;
  setActiveFilters: (filters: any) => void;
  filterOptions: any;
  productCount: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  showFilters,
  setShowFilters,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  activeFilters,
  setActiveFilters,
  filterOptions,
  productCount
}) => {
  const activeFilterCount: number = Object.values(activeFilters).reduce(
  (count: number, filterArray: any) => {
    if (Array.isArray(filterArray)) {
      return count + filterArray.length;
    }
    return count;
  },
  0 // initial value of the accumulator
);


  const clearAllFilters = () => {
    setActiveFilters({
      metalType: [],
      stoneType: [],
      style: [],
      size: [],
      color: [],
      sortBy: "best-seller"
    });
    setSearchQuery("");
  };

  const removeFilter = (filterType: string, value: string) => {
    setActiveFilters({
      ...activeFilters,
      [filterType]: activeFilters[filterType].filter((item: string) => item !== value)
    });
  };

  return (
    <div className="space-y-4">
      {/* Main Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
        {/* Search and Filters */}
        <div className="flex items-center space-x-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl border border-gray-200 transition-all ${
              showFilters || activeFilterCount > 0
                ? 'bg-[#9a8457] text-white border-[#9a8457]'
                : 'bg-white/80 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Results Count and View Mode */}
        <div className="flex items-center justify-between lg:justify-end space-x-4">
          <span className="text-sm text-gray-600">
            {productCount} {productCount === 1 ? 'product' : 'products'} found
          </span>
          
          {/* Sort */}
          <select
            value={activeFilters.sortBy}
            onChange={(e) => setActiveFilters({ ...activeFilters, sortBy: e.target.value })}
            className="px-3 py-2 bg-white/80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent"
          >
            {filterOptions.sortBy.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-white/80 border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 transition-colors ${
                viewMode === "grid"
                  ? 'bg-[#9a8457] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 transition-colors ${
                viewMode === "list"
                  ? 'bg-[#9a8457] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(activeFilterCount > 0 || searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <span className="text-sm text-gray-600 font-medium">Active filters:</span>
          
          {searchQuery && (
            <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              <span>Search: "{searchQuery}"</span>
              <button
                onClick={() => setSearchQuery("")}
                className="hover:text-blue-900"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {Object.entries(activeFilters).map(([filterType, values]) => {
            if (filterType === 'sortBy' || !Array.isArray(values) || values.length === 0) return null;
            
            return values.map((value: string) => (
              <div
                key={`${filterType}-${value}`}
                className="flex items-center space-x-1 bg-[#9a8457] text-white px-3 py-1 rounded-full text-sm"
              >
                <span>{value}</span>
                <button
                  onClick={() => removeFilter(filterType, value)}
                  className="hover:text-gray-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ));
          })}

          <button
            onClick={clearAllFilters}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;