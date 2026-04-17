import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { setIsProcessingOrder } = useAppContext();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Auto-redirect after 3.2 seconds (slight extra beat for premium feel)
    const timer = setTimeout(() => {
      setIsProcessingOrder(false); // 🔥 UNLOCK UI
      navigate('/my-orders', { replace: true });
    }, 3200);

    return () => clearTimeout(timer);
  }, [navigate, setIsProcessingOrder]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] flex flex-col items-center justify-center text-center p-6 pt-32 pb-20 overflow-hidden relative">
      
      {/* Premium Minimal Entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center max-w-sm"
      >
        {/* Animated Checkmark - Premium Variant */}
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1 
            }}
            className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center relative shadow-2xl shadow-emerald-500/10 overflow-hidden"
          >
             <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            >
              <CheckCircle size={40} className="text-emerald-500" strokeWidth={2.5} />
            </motion.div>
            
            {/* Subtle Pulse Ripple */}
            <motion.div 
              animate={{ scale: [1, 1.4, 1], opacity: [0, 0.15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-emerald-500"
            />
          </motion.div>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-text-primary dark:text-white tracking-tight mb-3">
          Congratulations
        </h1>

        <p className="text-[17px] text-text-secondary dark:text-gray-400 font-medium mb-12 tracking-tight opacity-70">
          Thanks for shopping in Mobixa
        </p>

        {/* Minimal Redirect Indicator */}
        <div className="flex flex-col items-center">
           <div className="w-12 h-[2px] bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden mb-3">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
                className="w-full h-full bg-blue-600"
              />
           </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary/30 dark:text-white/20">
            Redirecting to orders
          </p>
        </div>
      </motion.div>
      
      {/* Decorative Minimal background layer (Apple-style gradient) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};

export default OrderSuccess;
