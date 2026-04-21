import React, { useState, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

const SafeImage = forwardRef(
  (
    {
      src,
      alt = "Mobixa product image",
      className = "",
      containerClassName = "",
      fallbackSrc = "",
      loadingStrategy = "lazy",
      width,
      height,
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      setIsLoading(true);
      setHasError(false);
    }, [src]);

    const handleError = () => {
      if (fallbackSrc && !hasError) {
        setHasError(true);
      } else {
        setHasError(true);
        setIsLoading(false);
      }
    };

    const handleLoad = () => {
      setIsLoading(false);
    };

    return (
      <div
        className={cn(
          "relative overflow-hidden flex items-center justify-center bg-slate-50 dark:bg-white/[0.02]",
          containerClassName
        )}
        style={{ width, height }}
      >
        {/* SHIMMER */}
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

        {/* IMAGE */}
        {!hasError ? (
          <img
            ref={ref}
            src={hasError && fallbackSrc ? fallbackSrc : src}
            alt={alt}
            loading={loadingStrategy}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              "transition-all duration-300",
              isLoading
                ? "opacity-0 scale-[0.98]"
                : "opacity-100 scale-100",
              className
            )}
            {...props}
          />
        ) : (
          /* FALLBACK UI */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center p-6 h-full w-full bg-slate-50 dark:bg-white/[0.03] rounded-xl border border-slate-100 dark:border-white/5"
          >
            <div className="w-10 h-10 mb-3 rounded-full bg-white dark:bg-white/5 flex items-center justify-center">
              <span className="text-lg opacity-60">📱</span>
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
              {alt}
            </span>
          </motion.div>
        )}
      </div>
    );
  }
);

SafeImage.displayName = "SafeImage";

export default SafeImage;