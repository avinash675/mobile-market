import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Loader2 } from 'lucide-react';

const PaymentProcessingScreen = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-white dark:bg-[#09090b] flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="max-w-md w-full space-y-12">
        {/* Animated Loader Container */}
        <div className="relative flex items-center justify-center">
          {/* Pulsing Background Glow */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-44 h-44 bg-text-primary dark:bg-white rounded-full blur-2xl"
          />
          
          {/* Main Spinner */}
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
              className="text-text-primary dark:text-white"
            >
              <Loader2 size={64} strokeWidth={1.5} />
            </motion.div>
            
            <div className="absolute inset-0 flex items-center justify-center">
               <motion.div
                 animate={{ opacity: [0.3, 1, 0.3] }}
                 transition={{ duration: 2, repeat: Infinity }}
               >
                 <Lock size={16} className="text-text-primary dark:text-white" />
               </motion.div>
            </div>
          </div>
        </div>

        {/* Messaging Section */}
        <div className="space-y-4">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="heading-2"
          >
            Processing Payment
          </motion.h2>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-1.5"
          >
            <p className="label">
              Securing transaction with end-to-end encryption
            </p>
            <p className="text-[11px] text-red-500 font-medium">
               Please do not refresh or close this page
            </p>
          </motion.div>
        </div>

        {/* Security Badges */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-10 flex items-center justify-center gap-8 border-t border-border dark:border-white/10"
        >
          <div className="flex items-center gap-2 text-text-secondary dark:text-gray-400">
             <ShieldCheck size={16} />
             <span className="label">PCI DSS Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-text-secondary dark:text-gray-400">
             <Lock size={16} />
             <span className="label">256-bit AES</span>
          </div>
        </motion.div>
      </div>

      {/* Footer Branding Overlay */}
      <div className="absolute bottom-10 flex items-center gap-3">
         <div className="flex items-center gap-2 px-3 py-1.5 bg-bg-soft dark:bg-white/5 rounded-full border border-border dark:border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span className="label">SECURE SERVER</span>
         </div>
      </div>
    </motion.div>
  );
};

export default PaymentProcessingScreen;
