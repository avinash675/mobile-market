import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from 'lucide-react';
import ProductCard from '../components/ProductCard';

import { products } from '../data/products';

// Using the same mock data for deals. In production, this would come from an API endpoint.

const Deals = () => {
  const INITIAL_TIME = 600; // 10 Minutes
  
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [deals, setDeals] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Shuffle Logic
  const shuffleDeals = () => {
    const dealProducts = products.filter(p => p.isDeal || p.discount);
    const shuffled = [...dealProducts].sort(() => 0.5 - Math.random());
    setDeals(shuffled.slice(0, 8)); // Show top 8 shuffled deals
  };

  // Initial Load
  useEffect(() => {
    shuffleDeals();
    setHasStarted(true);
  }, []);

  // Timer Logic
  useEffect(() => {
    if (!hasStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowToast(true);
          shuffleDeals();
          setTimeout(() => setShowToast(false), 3000);
          return INITIAL_TIME;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted]);

  // Format Time into Segments
  const getTimeSegments = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return {
      h: h.toString().padStart(2, '0'),
      m: m.toString().padStart(2, '0'),
      s: s.toString().padStart(2, '0')
    };
  };

  const { h, m, s } = getTimeSegments(timeLeft);
  const progressPercent = (timeLeft / INITIAL_TIME) * 100;

  return (
    <div className="min-h-screen bg-bgLight dark:bg-[#09090b] pt-24 pb-20 transition-colors duration-300">
      
      {/* 1. Deals Hero Section */}
      <div className="container-custom pt-32 md:pt-40 lg:pt-48">
        
        {/* Header & Center Timer */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 px-4 py-1.5 bg-red-500/10 text-red-500 rounded-full mb-6 border border-red-500/20 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-widest">Flash Sale Now Live</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[44px] sm:text-[60px] lg:text-[72px] font-black text-text-primary dark:text-white tracking-tight leading-none mb-8"
          >
            🔥 Top Deals <span className="text-red-500 italic">for You.</span>
          </motion.h1>

          {/* Premium Digital Timer UI */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-lg mx-auto"
          >
            <div className="bg-white dark:bg-white/[0.03] border-2 border-border dark:border-white/10 p-8 rounded-[40px] shadow-premium-hover backdrop-blur-xl relative overflow-hidden">
               {/* Background Urgency Progress Bar */}
               <div className="absolute bottom-0 left-0 h-1.5 bg-red-500/20 w-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "100%" }}
                    animate={{ width: `${progressPercent}%` }}
                    className="h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                  />
               </div>

               <div className="flex items-center justify-center gap-4 sm:gap-8 mb-4">
                  {/* Hours */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-20 sm:w-24 sm:h-28 bg-gray-50 dark:bg-black/40 rounded-2xl flex items-center justify-center border border-border dark:border-white/5 shadow-inner">
                      <span className="text-4xl sm:text-5xl font-black text-primary dark:text-white tabular-nums">{h}</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary mt-3">Hours</span>
                  </div>

                  <span className="text-3xl font-black text-red-500 opacity-40 animate-pulse mt-[-30px]">:</span>

                  {/* Minutes */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-20 sm:w-24 sm:h-28 bg-gray-50 dark:bg-black/40 rounded-2xl flex items-center justify-center border border-border dark:border-white/5 shadow-inner">
                      <span className="text-4xl sm:text-5xl font-black text-primary dark:text-white tabular-nums">{m}</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary mt-3">Minutes</span>
                  </div>

                  <span className="text-3xl font-black text-red-500 opacity-40 animate-pulse mt-[-30px]">:</span>

                  {/* Seconds */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-20 sm:w-24 sm:h-28 bg-red-50 dark:bg-red-500/5 rounded-2xl flex items-center justify-center border border-red-100 dark:border-red-500/20 shadow-inner">
                      <span className="text-4xl sm:text-5xl font-black text-red-500 tabular-nums">{s}</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-500/60 mt-3">Seconds</span>
                  </div>
               </div>

               <p className="text-[12px] font-extrabold text-text-secondary dark:text-gray-500 uppercase tracking-[0.2em] mt-2 italic">
                 Hurry! Prices refresh in 10 minutes.
               </p>
            </div>
          </motion.div>
        </div>

        {/* Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 bg-primary dark:bg-white text-white dark:text-primary px-8 py-4 rounded-full font-black text-sm shadow-2xl flex items-center gap-3 border border-white/10 shadow-red-500/20"
            >
              <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              New Deals Just Dropped 🔥
            </motion.div>
          )}
        </AnimatePresence>

        {/* Deals Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-32">
          <AnimatePresence mode="wait">
            {deals.length > 0 ? (
              <motion.div 
                key={timeLeft === INITIAL_TIME ? 'refresh' : 'active'}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {deals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-32 text-center flex flex-col items-center justify-center bg-white dark:bg-white/[0.03] rounded-[48px] border border-border dark:border-white/5 border-dashed"
              >
                <div className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-8">
                  <Tag size={32} className="text-red-500 animate-bounce" strokeWidth={2.5} />
                </div>
                <h3 className="text-[28px] font-black tracking-tight text-text-primary dark:text-white mb-4">
                  Deals are Loading...
                </h3>
                <p className="text-text-secondary dark:text-gray-400 font-medium mb-10 max-w-sm">
                  We're certifying the latest discounts for you. Get ready for premium tech at unbeatable prices.
                </p>
                <div className="w-48 h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     animate={{ x: [-200, 200] }}
                     transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                     className="w-1/2 h-full bg-red-500"
                   />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Deals;
