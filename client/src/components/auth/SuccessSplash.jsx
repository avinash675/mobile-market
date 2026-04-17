import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const SuccessSplash = ({ message = "Securely logging you in...", onComplete }) => {
  useEffect(() => {
    // 2-second total lifecycle as per requirement
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0] // 0-0.5s fade in, 0.5-1.5s steady, 1.5-2s fade out
      }}
      transition={{ 
        duration: 2,
        times: [0, 0.25, 0.75, 1], // Exactly matching the requirement
        ease: "easeInOut"
      }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-white dark:bg-[#09090b] backdrop-blur-2xl"
    >
      <div className="flex flex-col items-center relative">
        {/* Subtle Background Glow */}
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.05, 0.15, 0.05] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute w-72 h-72 bg-blue-500 rounded-full blur-[110px] -z-10"
        />

        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1, 1.02, 1], // 0-0.5s scale in (to 1), then micro-breathing
            opacity: [0, 1, 1, 1] 
          }}
          transition={{ 
            duration: 1.5,
            times: [0, 0.33, 0.66, 1], // Scale in finished by 0.5s
            ease: "easeInOut"
          }}
          className="flex flex-col items-center"
        >
          <span className="text-6xl font-black italic tracking-tighter text-[#09090b] dark:text-white mb-6 drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_20px_40px_rgba(255,255,255,0.05)]">
            Mobixa.
          </span>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              y: [10, 0, 0, -5] 
            }}
            transition={{ 
              duration: 2,
              times: [0, 0.25, 0.75, 1],
              ease: "easeInOut"
            }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]" />
              <p className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em]">
                {message}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Edge Light effect for premium feel */}
      <div className="absolute inset-0 pointer-events-none border-[1px] border-black/5 dark:border-white/5" />
    </motion.div>
  );
};

export default SuccessSplash;
