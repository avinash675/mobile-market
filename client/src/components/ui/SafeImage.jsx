import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SafeImage Component
 * A robust, fail-safe image renderer for Mobixa.
 * Features:
 * 1. Automatic onError fallback to high-quality placeholder.
 * 2. Premium shimmer loading skeleton.
 * 3. Consistent layout boxes to prevent jumps.
 */

const SafeImage = ({ 
  src, 
  alt, 
  className = "", 
  containerClassName = "", 
  brand = "Global",
  priority = "low",
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Sync if src changes
  useEffect(() => {
    setImgSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative overflow-hidden flex items-center justify-center bg-gray-50/50 dark:bg-white/[0.02] ${containerClassName}`}>
      
      {/* 1. Shimmer Skeleton (shown during load) */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 shimmer-effect"
          />
        )}
      </AnimatePresence>

      {/* 2. Apple-Style Premium Fallback UI (displayed when image fails) */}
      {hasError ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center text-center p-8 h-full w-full bg-slate-50 dark:bg-white/[0.03] rounded-2xl border border-slate-100/50 dark:border-white/5 shadow-sm group-hover:scale-[1.02] transition-transform duration-500"
        >
          <div className="w-12 h-12 mb-4 rounded-full bg-white dark:bg-white/5 flex items-center justify-center shadow-sm">
            <span className="text-xl opacity-60">📱</span>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 max-w-[80%] leading-relaxed">
            {alt || "Mobixa Product"}
          </span>
        </motion.div>
      ) : (
        /* 3. Actual Image */
        <img
          src={imgSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority === "high" ? "eager" : "lazy"}
          className={`transition-all duration-700 ${isLoading ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'} ${className}`}
          {...props}
        />
      )}

    </div>
  );
};

export default SafeImage;
