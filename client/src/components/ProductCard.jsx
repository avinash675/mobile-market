import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import Button from './common/Button';
import SafeImage from './ui/SafeImage';


const conditionConfig = {
  'Like New':  { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-100 dark:border-emerald-900/30' },
  'Excellent': { bg: 'bg-blue-50 dark:bg-blue-900/10',       text: 'text-blue-600 dark:text-blue-400',       border: 'border-blue-100 dark:border-blue-900/20' },
  'Good':      { bg: 'bg-amber-50 dark:bg-amber-900/10',      text: 'text-amber-600 dark:text-amber-400',     border: 'border-amber-100 dark:border-amber-900/20' },
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist, cart, updateQuantity } = useAppContext();
  const isWishlisted = !!wishlist.find((item) => item.id === product.id);
  const { image, name, price, originalPrice, discount, brand, year, ram, condition, storage, rating, isPopular, stock } = product;

  const cond = conditionConfig[condition] || conditionConfig['Good'];
  const isOutOfStock = stock === 0;

  // Live Viewer Count Logic
  const [viewerCount, setViewerCount] = useState(() => 
    isPopular ? Math.floor(Math.random() * 26) + 5 : null
  );

  useEffect(() => {
    if (!isPopular) return;
    
    // Updates every 10-20 seconds
    const intervalTime = Math.floor(Math.random() * 10000) + 10000; 
    
    const interval = setInterval(() => {
      setViewerCount(prev => {
        // Randomly bounce the number up or down a bit
        const change = Math.floor(Math.random() * 5) - 2; 
        let newCount = prev + change;
        if(newCount < 5) newCount = 5;
        if(newCount > 40) newCount = 40;
        return newCount;
      });
    }, intervalTime);
    
    return () => clearInterval(interval);
  }, [isPopular]);

  return (
    <article className="card group overflow-hidden flex flex-col h-full relative cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.4)]">
      {/* Top: Image Container */}
      <div className="relative aspect-square flex items-center justify-center p-6 bg-slate-50/30 dark:bg-white/[0.02] overflow-hidden">
        {/* Discount Badge */}
        {discount && (
          <span className="absolute top-3 left-3 z-20 bg-text-primary dark:bg-white text-white dark:text-text-primary text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest shadow-sm">
            {discount}
          </span>
        )}

        {/* Condition Badge */}
        <span className={`absolute top-3 ${discount ? 'left-14' : 'left-3'} z-20 text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest border ${cond.bg} ${cond.text} ${cond.border}`}>
          {condition}
        </span>

        {/* Wishlist Button - Top Right */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
          className={`absolute top-3 right-3 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isWishlisted
              ? 'bg-red-50 text-red-500 border border-red-100 dark:bg-red-500/10 dark:border-red-500/20'
              : 'glass-panel text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white'
          }`}
        >
          <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} strokeWidth={2} />
        </button>

        {/* Product Image with SafeImage Resilience */}
        <div className="w-full h-40 sm:h-48 flex items-center justify-center p-4">
          <SafeImage
            src={image}
            alt={name}
            brand={brand}
            containerClassName="w-full h-full"
            className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal drop-shadow-xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 will-change-transform"
          />
        </div>

        {/* Premium Action Overlay */}
        <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 dark:bg-white/10 flex items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
            className="w-10 h-10 bg-white dark:bg-slate-900 text-primary dark:text-white rounded-full flex items-center justify-center shadow-lg"
          >
            <Eye size={18} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>

      {/* Middle & Bottom: Details */}
      <div className="p-4 flex flex-col flex-1 border-t border-border dark:border-white/5 bg-white/40 dark:bg-black/20" onClick={() => navigate(`/product/${product.id}`)}>
        
        {/* Brand & Rating */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] font-bold tracking-widest uppercase text-text-secondary dark:text-gray-400">
            {brand} • {year}
          </span>

          <div className="flex items-center gap-1">
            <Star size={10} className="text-amber-500 fill-amber-500" />
            <span className="text-[10px] font-bold text-text-primary dark:text-white">{rating}</span>
          </div>
        </div>

        {/* Name & Storage */}
        <div className="mb-3 flex-1 flex flex-col">
          <h3 className="text-[14px] font-bold text-text-primary dark:text-white tracking-tight line-clamp-1 mb-0.5">
            {name}
          </h3>
          <p className="text-[11px] text-text-secondary dark:text-gray-400 font-medium line-clamp-1 mb-3">
            {ram} / {storage} • Certified
          </p>

          {/* Delivery Badge */}
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1.5 transition-colors duration-300 ${
              price > 40000 
                ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20' 
                : 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20'
            }`}>
              <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
              {price > 40000 ? 'Express Delivery ⚡' : 'Free Delivery'}
            </span>
          </div>

          {isPopular && stock !== undefined && stock <= 5 && (
            <div className="mt-2">
              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 flex w-fit items-center gap-1 rounded shadow-sm ${
                stock === 0 
                  ? 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/30' 
                  : 'bg-orange-50 text-orange-600 border border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/30'
              }`}>
                {stock === 0 ? 'Out of Stock' : (
                  <>
                    <span className="text-[11px] animate-pulse">⚡</span>
                    Only {stock} left
                  </>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Live Viewer Activity */}
        {isPopular && viewerCount !== null && (
          <div className="mb-4 flex items-center gap-1.5 text-text-secondary dark:text-gray-400">
            <Eye size={12} className="opacity-70" />
            <AnimatePresence mode="wait">
              <motion.span
                key={viewerCount}
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -2 }}
                transition={{ duration: 0.3 }}
                className="text-[10px] sm:text-[11px] font-medium"
              >
                {viewerCount} people are viewing this right now
              </motion.span>
            </AnimatePresence>
          </div>
        )}

        {/* Bottom Elements: Price & CTA */}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex flex-col">
            {originalPrice && (
              <span className="text-[11px] text-text-secondary dark:text-gray-500 line-through font-semibold -mb-0.5">
                ₹{originalPrice?.toLocaleString('en-IN') || '0'}
              </span>
            )}
            <span className="text-[18px] font-black text-text-primary dark:text-white tracking-tight leading-none">
              ₹{price?.toLocaleString('en-IN') || '0'}
            </span>
          </div>

          {isOutOfStock ? (
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/50 px-3 py-2 rounded-full border border-slate-200 dark:border-white/5 cursor-not-allowed">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sold Out</span>
            </div>
          ) : (
            (() => {
              const cartItem = cart.find(item => item.id === product.id);
              if (cartItem) {
                return (
                  <div 
                    className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-full border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden h-[34px] w-[100px]"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  >
                    <button
                      onClick={() => updateQuantity(product.id, -1)}
                      className="w-[30px] h-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-700 text-textDark dark:text-white transition-colors text-lg"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center text-[13px] font-bold text-textDark dark:text-white border-x border-gray-100 dark:border-slate-700 flex items-center justify-center h-full">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      className="w-[30px] h-full flex items-center justify-center hover:bg-gray-50 dark:hover:bg-slate-700 text-textDark dark:text-white transition-colors text-lg"
                      disabled={stock === 1}
                    >
                      +
                    </button>
                  </div>
                );
              }
              return (
                <Button
                  onClick={(e) => { 
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    addToCart(product); 
                  }}
                  variant="primary"
                  size="sm"
                  className="!px-4 !py-2.5 !rounded-full shadow-md"
                >
                  <ShoppingCart size={14} strokeWidth={2} />
                  Add
                </Button>
              );
            })()
          )}
        </div>
      </div>
    </article>
  );
};

export default React.memo(ProductCard);
