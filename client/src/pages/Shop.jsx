import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';
import FilterSidebar from '../components/FilterSidebar';
import FilterBottomSheet from '../components/FilterBottomSheet';

import { products } from '../data/products';


const Shop = () => {
  const { searchQuery } = useAppContext();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const type = query.get("type");

  const [activeFilters, setActiveFilters] = useState({
    brand: [],
    condition: [],
    storage: [],
    ram: [],
    priceRange: [0, 200000]
  });
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Reset pagination on filter change
  React.useEffect(() => {
    setVisibleCount(12);
  }, [activeFilters, sortBy, searchQuery]);

  const currentYear = new Date().getFullYear();

  // Dynamic Available Brands
  const availableBrands = useMemo(() => {
    const brandsSet = new Set(products.map(p => p.brand.trim()));
    return Array.from(brandsSet).sort((a, b) => a.localeCompare(b));
  }, []);

  // Filter Count Logic
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (activeFilters.brand.length > 0) count += activeFilters.brand.length;
    if (activeFilters.ram.length > 0) count += activeFilters.ram.length;
    if (activeFilters.storage.length > 0) count += activeFilters.storage.length;
    if (activeFilters.condition.length > 0) count += activeFilters.condition.length;
    if (activeFilters.priceRange[1] < 200000) count += 1;
    return count;
  }, [activeFilters]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // --- Dynamic Type Filtering (from Explore Cards) ---
    if (type === "affordable") {
      result = result.filter(p => p.price < 30000);
    } else if (type === "deals") {
      result = result.filter(p => p.discount);
    } else if (type === "budget") {
      result = result.filter(p => ['Xiaomi', 'Realme', 'Oppo', 'iQOO', 'Vivo'].includes(p.brand));
    } else if (type === "online") {
      result = result.filter(p => p.isPopular || p.stock < 10);
    }

    return result
      .filter(product => {
        const brandMatch = activeFilters.brand.length === 0 || 
          activeFilters.brand.some(b => b.toLowerCase().trim() === product.brand.toLowerCase().trim());
        const conditionMatch = activeFilters.condition.length === 0 || activeFilters.condition.includes(product.condition);
        const storageMatch = activeFilters.storage.length === 0 || activeFilters.storage.includes(product.storage);
        const ramMatch = activeFilters.ram.length === 0 || activeFilters.ram.includes(product.ram);
        const priceMatch = product.price >= activeFilters.priceRange[0] && product.price <= activeFilters.priceRange[1];
        const yearMatch = product.year >= (currentYear - 10); // Expanded year range for more results
        const searchMatch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
        
        return brandMatch && conditionMatch && storageMatch && ramMatch && priceMatch && yearMatch && searchMatch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'popular') return b.rating - a.rating;
        // Fix string discount sorting if needed, but for now using year
        return b.year - a.year || b.id - a.id;
      });


  }, [activeFilters, sortBy, searchQuery, currentYear, type]);

  const getPageHeading = () => {
    switch (type) {
      case 'affordable': return <>Affordable <span className="italic">Phones.</span></>;
      case 'deals':      return <>Best <span className="italic">Deals.</span></>;
      case 'budget':     return <>Budget <span className="italic">Brands.</span></>;
      case 'online':     return <>Online <span className="italic">Exclusives.</span></>;
      default:           return <>Discover <span className="italic">Tech.</span></>;
    }
  };

  const getPageSubheading = () => {
    switch (type) {
      case 'affordable': return 'Top-tier performance at entry-level prices. Verified quality guaranteed.';
      case 'deals':      return 'Exclusive limited-time offers and deep discounts on your favorite models.';
      case 'budget':     return 'Trusted value-for-money brands that don\'t compromise on experience.';
      case 'online':     return 'Premium stock and popular choices available instantly for online delivery.';
      default:           return 'Explore our laboratory-certified collection of premium refurbished smartphones.';
    }
  };


  const toggleFilter = (type, value) => {
    setActiveFilters(prev => {
      const current = prev[type];
      const next = current.includes(value) 
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [type]: next };
    });
  };

  return (
    <div className="min-h-screen bg-bgLight dark:bg-[#09090b] transition-colors duration-500">
      <div className="container-custom pt-32 md:pt-36 lg:pt-44 pb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-16 gap-6 px-4">
          <div className="flex flex-col items-start text-left">
            <h1 className="text-[44px] sm:text-[56px] lg:text-[64px] font-black text-text-primary dark:text-white tracking-tight leading-[1.1] mb-5">
              {getPageHeading()}
            </h1>
            <p className="text-[17px] sm:text-[19px] text-text-secondary dark:text-gray-400 font-medium leading-relaxed max-w-[500px] lg:max-w-[700px] m-0">
              {getPageSubheading()}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold uppercase tracking-widest text-[11px] shadow-lg shadow-black/10 flex items-center gap-2"
            >
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-white/5 border border-border dark:border-white/10 rounded-xl px-6 py-3.5 text-[11px] font-bold uppercase tracking-widest outline-none text-primary dark:text-white cursor-pointer hover:border-cyan-500 transition-colors"
            >
              <option value="newest" className="dark:bg-[#09090b]">Newest Arrivals</option>
              <option value="price-low" className="dark:bg-[#09090b]">Price: Low-High</option>
              <option value="price-high" className="dark:bg-[#09090b]">Price: High-Low</option>
              <option value="popular" className="dark:bg-[#09090b]">Most Popular</option>
              <option value="discount" className="dark:bg-[#09090b]">Best Discounts</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start px-4">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block space-y-10">
            <div className="p-8 bg-white dark:bg-black/20 rounded-[32px] border border-border dark:border-white/5 shadow-premium sticky top-32 max-h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar">
              <FilterSidebar 
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
                activeFiltersCount={activeFiltersCount}
                availableBrands={availableBrands}
                toggleFilter={toggleFilter}
              />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <motion.div 
              layout
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                animate: { transition: { staggerChildren: 0.1 } }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              <AnimatePresence mode='popLayout'>
                {filteredProducts.slice(0, visibleCount).map(product => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Load More Button */}
            {visibleCount < filteredProducts.length && (
              <div className="flex justify-center mt-12">
                <Button 
                  onClick={() => setVisibleCount(prev => prev + 12)}
                  variant="outline" 
                  className="rounded-full px-8 py-3 border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Load More Products
                </Button>
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center">
                <Search size={48} className="mx-auto text-secondary/30 mb-4" />
                <h3 className="text-heading-3 text-primary dark:text-white">
                  {activeFilters.brand.length > 0 ? "No products available for this brand." : "No matches found."}
                </h3>
                <Button variant="outline" className="mt-4" onClick={() => setActiveFilters({ brand: [], condition: [], storage: [], ram: [], priceRange: [0, 200000] })}>
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Sheet (Portal) */}
      <FilterBottomSheet 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        onApply={() => setIsFilterOpen(false)}
      >
        <FilterSidebar 
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          activeFiltersCount={activeFiltersCount}
          availableBrands={availableBrands}
          toggleFilter={toggleFilter}
        />
      </FilterBottomSheet>
    </div>
  );
};

export { Shop };
export default Shop;
