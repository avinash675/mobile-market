import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Smartphone } from 'lucide-react';

const SearchSuggestions = ({ 
  isOpen, 
  onClose, 
  suggestions, 
  query, 
  setQuery,
  onSuggestionClick 
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={dropdownRef}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-[#0f0f12] rounded-[32px] shadow-premium border border-slate-100 dark:border-white/10 overflow-hidden z-[100]"
      >
        <div className="p-5">
          {query.length > 0 ? (
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-[0.3em] uppercase px-3 mb-4">
                Product Matches
              </h4>
              {suggestions.length > 0 ? (
                suggestions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSuggestionClick(item)}
                    className="w-full flex items-center gap-5 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group text-left border border-transparent hover:border-slate-100 dark:hover:border-white/10"
                  >
                    <div className="h-14 w-14 bg-white dark:bg-[#1a1a1e] rounded-xl overflow-hidden flex-shrink-0 border border-slate-100 dark:border-white/10 shadow-sm">
                      <img src={item.image} alt="" className="h-full w-full object-contain p-2 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-primary dark:text-white truncate group-hover:text-accent transition-colors">
                        {item.name}
                      </p>
                      <p className="text-xs font-bold text-secondary dark:text-slate-400 mt-1">₹{item.price.toLocaleString()}</p>
                    </div>
                    <div className="p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      <Smartphone size={16} className="text-accent" />
                    </div>
                  </button>
                ))
              ) : (
                <div className="flex flex-col items-center py-10 text-center text-slate-400">
                  <div className="w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <Search size={24} className="opacity-40" />
                  </div>
                  <p className="text-sm font-bold text-primary dark:text-white">No matches found</p>
                  <p className="text-[10px] uppercase font-bold tracking-widest mt-2 dark:text-slate-500">Try a different keyword</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-[0.3em] uppercase px-3 mb-5">
                Popular Collections
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {['iPhone 15', 'Galaxy S24', 'Pixel 8', 'Premium Refurbished'].map((topic) => (
                  <button 
                    key={topic}
                    onClick={() => setQuery(topic)}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-accent/40 dark:hover:border-accent/40 hover:bg-accent/5 dark:hover:bg-accent/5 hover:text-accent dark:text-white transition-all text-left group"
                  >
                    <TrendingUp size={14} className="text-slate-400 dark:text-slate-500 group-hover:text-accent group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-bold">{topic}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {query.length > 0 && suggestions.length > 0 && (
          <Link 
            to="/shop" 
            onClick={onClose}
            className="block p-5 bg-slate-50 dark:bg-white/[0.03] border-t border-slate-100 dark:border-white/10 text-center text-[10px] font-bold text-accent uppercase tracking-[0.3em] hover:bg-accent hover:text-white transition-all"
          >
            View all results
          </Link>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchSuggestions;
