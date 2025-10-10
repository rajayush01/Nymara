// components/product/MobileFilter.tsx
import React from "react";
import { Filter, X } from "lucide-react";

interface ActiveFilters {
  metalType: string[];
  stoneType: string[];
  style: string[];
  size: string[];
  color: string[];
  category: string[];
  sortBy: string;
}

interface FilterOptions {
  metalType: string[];
  stoneType: string[];
  style: string[];
  size: string[];
  color: string[];
  category: string[];
  sortBy: Array<{
    value: string;
    label: string;
  }>;
}

interface MobileFilterProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  activeFilters: ActiveFilters;
  setActiveFilters: (filters: ActiveFilters) => void;
  filterOptions: FilterOptions;
}

const MobileFilter: React.FC<MobileFilterProps> = ({
  showFilters,
  setShowFilters,
  activeFilters,
  setActiveFilters,
  filterOptions
}) => {
  const clearAllFilters = () => {
    setActiveFilters({
      metalType: [],
      stoneType: [],
      style: [],
      size: [],
      color: [],
      category: [],
      sortBy: "best-seller"
    });
  };

  const toggleFilter = (category: keyof ActiveFilters, value: string) => {
    if (category === 'sortBy') return;
    
    const currentFilters = activeFilters[category] as string[];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(item => item !== value)
      : [...currentFilters, value];
    
    setActiveFilters({
      ...activeFilters,
      [category]: newFilters
    });
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((count: number, filterValue: any) => {
      if (Array.isArray(filterValue)) {
        return count + filterValue.length;
      }
      return count;
    }, 0);
  };

  return (
    <>
      {/* Floating Action Button for Mobile Filters */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="relative p-4 bg-[#9a8457] text-white rounded-full shadow-lg hover:bg-[#8a7547] transition-all duration-300"
        >
          <Filter className="w-5 h-5" />
          {getActiveFilterCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
              {getActiveFilterCount()}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Overlay */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden">
          <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-800">
                Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Sort By */}
              <div>
                <h4 className="font-medium text-slate-800 mb-3">Sort By</h4>
                <select
                  value={activeFilters.sortBy}
                  onChange={(e) => setActiveFilters({...activeFilters, sortBy: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9a8457]"
                >
                  {filterOptions.sortBy.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <h4 className="font-medium text-slate-800 mb-3">Category</h4>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {filterOptions.category.slice(0, 10).map(category => (
                    <button
                      key={category}
                      className={`p-3 text-sm rounded-xl border transition-all duration-300 text-left ${
                        activeFilters.category.includes(category)
                          ? "bg-[#9a8457] text-white border-[#9a8457]"
                          : "bg-white text-slate-700 border-slate-200"
                      }`}
                      onClick={() => toggleFilter('category', category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metal Type */}
              <div>
                <h4 className="font-medium text-slate-800 mb-3">Metal Type</h4>
                <div className="grid grid-cols-2 gap-2">
                  {filterOptions.metalType.map(metal => (
                    <button
                      key={metal}
                      className={`p-3 text-sm rounded-xl border transition-all duration-300 text-left ${
                        activeFilters.metalType.includes(metal)
                          ? "bg-[#9a8457] text-white border-[#9a8457]"
                          : "bg-white text-slate-700 border-slate-200"
                      }`}
                      onClick={() => toggleFilter('metalType', metal)}
                    >
                      {metal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stone Type */}
              <div>
                <h4 className="font-medium text-slate-800 mb-3">Stone Type</h4>
                <div className="grid grid-cols-2 gap-2">
                  {filterOptions.stoneType.map(stone => (
                    <button
                      key={stone}
                      className={`p-3 text-sm rounded-xl border transition-all duration-300 text-left ${
                        activeFilters.stoneType.includes(stone)
                          ? "bg-[#9a8457] text-white border-[#9a8457]"
                          : "bg-white text-slate-700 border-slate-200"
                      }`}
                      onClick={() => toggleFilter('stoneType', stone)}
                    >
                      {stone}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style */}
              <div>
                <h4 className="font-medium text-slate-800 mb-3">Style</h4>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {filterOptions.style.map(style => (
                    <button
                      key={style}
                      className={`p-3 text-sm rounded-xl border transition-all duration-300 text-left ${
                        activeFilters.style.includes(style)
                          ? "bg-[#9a8457] text-white border-[#9a8457]"
                          : "bg-white text-slate-700 border-slate-200"
                      }`}
                      onClick={() => toggleFilter('style', style)}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h4 className="font-medium text-slate-800 mb-3">Size</h4>
                <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto">
                  {filterOptions.size.map(size => (
                    <button
                      key={size}
                      className={`p-3 text-sm rounded-xl border transition-all duration-300 ${
                        activeFilters.size.includes(size)
                          ? "bg-[#9a8457] text-white border-[#9a8457]"
                          : "bg-white text-slate-700 border-slate-200"
                      }`}
                      onClick={() => toggleFilter('size', size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <h4 className="font-medium text-slate-800 mb-3">Color</h4>
                <div className="grid grid-cols-2 gap-2">
                  {filterOptions.color.map(color => (
                    <button
                      key={color}
                      className={`p-3 text-sm rounded-xl border transition-all duration-300 text-left ${
                        activeFilters.color.includes(color)
                          ? "bg-[#9a8457] text-white border-[#9a8457]"
                          : "bg-white text-slate-700 border-slate-200"
                      }`}
                      onClick={() => toggleFilter('color', color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors duration-300"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-3 bg-[#9a8457] text-white rounded-xl hover:bg-[#8a7547] transition-colors duration-300"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileFilter;