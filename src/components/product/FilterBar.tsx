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
  // productCount
}) => {
  const activeFilterCount: number = Object.values(activeFilters).reduce(
    (count: number, filterArray: any) => {
      if (Array.isArray(filterArray)) {
        return count + filterArray.length;
      }
      return count;
    },
    0
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
    <div className="space-y-3 sm:space-y-4">
      {/* Main Filter Bar */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
        <div className="space-y-3 sm:space-y-4">
          {/* Search and Filter Button Row */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-2.5 sm:py-3 text-sm sm:text-base bg-white/80 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 transition-all whitespace-nowrap text-sm sm:text-base ${
                showFilters || activeFilterCount > 0
                  ? 'bg-[#9a8457] text-white border-[#9a8457]'
                  : 'bg-white/80 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xs:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Results, Sort and View Mode Row */}
          <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-3">
            {/* Results Count */}
            {/* <span className="text-xs sm:text-sm text-gray-600 flex-shrink-0">
              {productCount} {productCount === 1 ? 'product' : 'products'}
            </span> */}
            
            <div className="flex items-center gap-2 sm:gap-3 flex-1 xs:justify-end">
              {/* Sort */}
              <select
                value={activeFilters.sortBy}
                onChange={(e) => setActiveFilters({ ...activeFilters, sortBy: e.target.value })}
                className="flex-1 xs:flex-initial px-2.5 sm:px-3 py-2 text-xs sm:text-sm bg-white/80 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9a8457] focus:border-transparent"
              >
                {filterOptions.sortBy.map((option: any) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-white/80 border border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${
                    viewMode === "grid"
                      ? 'bg-[#9a8457] text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${
                    viewMode === "list"
                      ? 'bg-[#9a8457] text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(activeFilterCount > 0 || searchQuery) && (
        <div className="bg-white/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-xs sm:text-sm text-gray-600 font-medium w-full xs:w-auto mb-1 xs:mb-0">
              Active filters:
            </span>
            
            {searchQuery && (
              <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                <span className="truncate max-w-[120px] sm:max-w-none">Search: "{searchQuery}"</span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-blue-900 flex-shrink-0"
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
                  className="flex items-center space-x-1 bg-[#9a8457] text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                >
                  <span className="truncate max-w-[100px] sm:max-w-none">{value}</span>
                  <button
                    onClick={() => removeFilter(filterType, value)}
                    className="hover:text-gray-200 flex-shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ));
            })}

            <button
              onClick={clearAllFilters}
              className="text-xs sm:text-sm text-red-600 hover:text-red-800 font-medium whitespace-nowrap"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
