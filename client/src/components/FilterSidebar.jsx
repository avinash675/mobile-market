import React from 'react';
import { SlidersHorizontal, Check } from 'lucide-react';

const FilterSidebar = ({ 
  activeFilters, 
  setActiveFilters, 
  activeFiltersCount, 
  availableBrands, 
  toggleFilter,
  className = ""
}) => {
  return (
    <div className={`space-y-10 ${className}`}>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-body font-black uppercase tracking-widest flex items-center gap-2 text-primary dark:text-white">
          <SlidersHorizontal size={18} className="text-cyan-500" /> Filter
        </h3>
        <button 
          onClick={() => setActiveFilters({ brand: [], condition: [], storage: [], ram: [], priceRange: [0, 200000] })} 
          className="text-[10px] font-black text-cyan-500 uppercase tracking-widest hover:text-red-500 transition-colors flex items-center gap-2"
        >
          Reset {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </button>
      </div>

      {/* Launch Year Info */}
      <div className="mb-8">
        <h4 className="text-[10px] font-black text-secondary dark:text-gray-400 uppercase tracking-[0.2em] mb-4">Launch Year</h4>
        <div className="text-[12px] font-bold text-primary dark:text-white px-3 py-2 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 dark:border-white/5 italic">
          Showing last 6 years models
        </div>
      </div>

      {/* Manufacturer Filter */}
      <div className="mb-8">
        <h4 className="text-[10px] font-black text-secondary dark:text-gray-400 uppercase tracking-[0.2em] mb-4">Manufacturer</h4>
        <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {availableBrands.map(brand => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="hidden" 
                checked={activeFilters.brand.includes(brand)} 
                onChange={() => toggleFilter('brand', brand)} 
              />
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${activeFilters.brand.includes(brand) ? 'bg-cyan-500 border-cyan-500' : 'border-border bg-background dark:bg-white/5 group-hover:border-cyan-500'}`}>
                {activeFilters.brand.includes(brand) && <Check size={12} className="text-white" strokeWidth={3} />}
              </div>
              <span className="text-body-sm text-primary dark:text-white font-medium">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* RAM Filter */}
      <div className="mb-8">
        <h4 className="text-[10px] font-black text-secondary dark:text-gray-400 uppercase tracking-[0.2em] mb-4">RAM</h4>
        <div className="space-y-3">
          {["4GB", "6GB", "8GB", "12GB", "16GB"].map(ram => (
            <label key={ram} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="hidden" 
                checked={activeFilters.ram.includes(ram)} 
                onChange={() => toggleFilter('ram', ram)} 
              />
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${activeFilters.ram.includes(ram) ? 'bg-cyan-500 border-cyan-500' : 'border-border bg-background dark:bg-white/5 group-hover:border-cyan-500'}`}>
                {activeFilters.ram.includes(ram) && <Check size={12} className="text-white" strokeWidth={3} />}
              </div>
              <span className="text-body-sm text-primary dark:text-white font-medium">{ram}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Storage Filter */}
      <div className="mb-8">
        <h4 className="text-[10px] font-black text-secondary dark:text-gray-400 uppercase tracking-[0.2em] mb-4">Storage</h4>
        <div className="space-y-3">
          {["64GB", "128GB", "256GB", "512GB"].map(storage => (
            <label key={storage} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="hidden" 
                checked={activeFilters.storage.includes(storage)} 
                onChange={() => toggleFilter('storage', storage)} 
              />
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${activeFilters.storage.includes(storage) ? 'bg-cyan-500 border-cyan-500' : 'border-border bg-background dark:bg-white/5 group-hover:border-cyan-500'}`}>
                {activeFilters.storage.includes(storage) && <Check size={12} className="text-white" strokeWidth={3} />}
              </div>
              <span className="text-body-sm text-primary dark:text-white font-medium">{storage}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="mb-8">
        <h4 className="text-[10px] font-black text-secondary dark:text-gray-400 uppercase tracking-[0.2em] mb-4">Budget Range</h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[12px] font-bold text-secondary dark:text-gray-400">Up to</span>
            <span className="text-[14px] font-black text-primary dark:text-white">₹{activeFilters.priceRange[1].toLocaleString('en-IN')}</span>
          </div>
          <input 
            type="range" 
            min="10000" 
            max="200000" 
            step="5000" 
            value={activeFilters.priceRange[1]} 
            onChange={(e) => setActiveFilters(prev => ({ ...prev, priceRange: [0, parseInt(e.target.value)] }))} 
            className="w-full h-1.5 bg-border dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500 focus:outline-none" 
          />
          <div className="flex justify-between text-[10px] font-bold text-secondary dark:text-gray-400">
            <span>₹10,000</span>
            <span>₹2,00,000+</span>
          </div>
        </div>
      </div>

      {/* Price Presets */}
      <div className="mb-2">
        <h4 className="text-[10px] font-black text-secondary dark:text-gray-400 uppercase tracking-[0.2em] mb-4">Quick Price</h4>
        <div className="grid grid-cols-1 gap-2">
          {[
            { label: 'Under ₹20k', range: [0, 20000] },
            { label: '₹20k - ₹50k', range: [20000, 50000] },
            { label: '₹50k - ₹1L', range: [50000, 100000] },
            { label: 'Above ₹1L', range: [100000, 200000] },
          ].map((preset, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFilters(prev => ({ ...prev, priceRange: preset.range }))}
              className={`text-left px-4 py-2.5 text-[12px] font-bold rounded-xl border transition-all ${
                activeFilters.priceRange[0] === preset.range[0] && activeFilters.priceRange[1] === preset.range[1]
                  ? 'bg-cyan-500 text-white border-cyan-500 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-50 dark:bg-white/5 text-secondary dark:text-gray-400 border-slate-100 dark:border-white/5 hover:border-cyan-500 hover:text-cyan-500'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
