// components/product/FilterPanel.tsx
import React from "react";
import { X } from "lucide-react";

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

interface FilterPanelProps {
  showFilters: boolean;
  activeFilters: ActiveFilters;
  setActiveFilters: (filters: ActiveFilters) => void;
  filterOptions: FilterOptions;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  showFilters,
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

  if (!showFilters) return null;

  return (
    <div className="glass-morphism rounded-2xl p-6 filter-slide-down">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        {/* Category */}
        <div>
          <h4 className="font-medium text-slate-800 mb-3">Category</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {filterOptions.category.slice(0, 8).map(category => (
              <label key={category} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={activeFilters.category.includes(category)}
                  onChange={() => toggleFilter('category', category)}
                />
                <div className={`w-4 h-4 bg-white border-2 rounded mr-3 transition-colors relative ${
                  activeFilters.category.includes(category) 
                    ? 'border-[#9a8457]' 
                    : 'border-slate-300 group-hover:border-[#9a8457]'
                }`}>
                  {activeFilters.category.includes(category) && (
                    <div className="absolute inset-0.5 bg-[#9a8457] rounded-sm"></div>
                  )}
                </div>
                <span className="text-sm text-slate-700 group-hover:text-[#9a8457] transition-colors truncate">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Metal Type */}
        <div>
          <h4 className="font-medium text-slate-800 mb-3">Metal Type</h4>
          <div className="space-y-2">
            {filterOptions.metalType.map(metal => (
              <label key={metal} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={activeFilters.metalType.includes(metal)}
                  onChange={() => toggleFilter('metalType', metal)}
                />
                <div className={`w-4 h-4 bg-white border-2 rounded mr-3 transition-colors relative ${
                  activeFilters.metalType.includes(metal) 
                    ? 'border-[#9a8457]' 
                    : 'border-slate-300 group-hover:border-[#9a8457]'
                }`}>
                  {activeFilters.metalType.includes(metal) && (
                    <div className="absolute inset-0.5 bg-[#9a8457] rounded-sm"></div>
                  )}
                </div>
                <span className="text-sm text-slate-700 group-hover:text-[#9a8457] transition-colors">
                  {metal}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Stone Type */}
        <div>
          <h4 className="font-medium text-slate-800 mb-3">Stone Type</h4>
          <div className="space-y-2">
            {filterOptions.stoneType.map(stone => (
              <label key={stone} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={activeFilters.stoneType.includes(stone)}
                  onChange={() => toggleFilter('stoneType', stone)}
                />
                <div className={`w-4 h-4 bg-white border-2 rounded mr-3 transition-colors relative ${
                  activeFilters.stoneType.includes(stone) 
                    ? 'border-[#9a8457]' 
                    : 'border-slate-300 group-hover:border-[#9a8457]'
                }`}>
                  {activeFilters.stoneType.includes(stone) && (
                    <div className="absolute inset-0.5 bg-[#9a8457] rounded-sm"></div>
                  )}
                </div>
                <span className="text-sm text-slate-700 group-hover:text-[#9a8457] transition-colors">
                  {stone}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Style */}
        <div>
          <h4 className="font-medium text-slate-800 mb-3">Style</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {filterOptions.style.map(style => (
              <label key={style} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={activeFilters.style.includes(style)}
                  onChange={() => toggleFilter('style', style)}
                />
                <div className={`w-4 h-4 bg-white border-2 rounded mr-3 transition-colors relative ${
                  activeFilters.style.includes(style) 
                    ? 'border-[#9a8457]' 
                    : 'border-slate-300 group-hover:border-[#9a8457]'
                }`}>
                  {activeFilters.style.includes(style) && (
                    <div className="absolute inset-0.5 bg-[#9a8457] rounded-sm"></div>
                  )}
                </div>
                <span className="text-sm text-slate-700 group-hover:text-[#9a8457] transition-colors">
                  {style}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <h4 className="font-medium text-slate-800 mb-3">Size</h4>
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {filterOptions.size.map(size => (
              <button
                key={size}
                className={`p-2 text-sm rounded-lg border transition-all duration-300 ${
                  activeFilters.size.includes(size)
                    ? "bg-[#9a8457] text-white border-[#9a8457]"
                    : "bg-white text-slate-700 border-slate-200 hover:border-[#9a8457] hover:text-[#9a8457]"
                }`}
                onClick={() => toggleFilter('size', size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <button
            onClick={clearAllFilters}
            className="w-full px-4 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors duration-300 flex items-center justify-center"
          >
            <X className="w-4 h-4 mr-2" />
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;