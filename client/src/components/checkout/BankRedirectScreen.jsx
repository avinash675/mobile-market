import React from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react';

const BankRedirectScreen = ({ bankName, bankColor }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-white dark:bg-[#09090b] flex flex-col items-center justify-center p-6 text-center transition-colors duration-500"
    >
      <div className="max-w-sm w-full space-y-12">
        {/* Bank Identity Simulation */}
        <div className="flex flex-col items-center space-y-6">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 rounded-[20px] shadow-sm flex items-center justify-center text-white font-bold text-3xl relative overflow-hidden"
            style={{ backgroundColor: bankColor || '#0f172a' }}
          >
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            <span className="relative z-10">{bankName?.substring(0, 1)}</span>
          </motion.div>
          
          <div className="space-y-1.5">
            <h2 className="heading-3 tracking-tight">Redirecting to {bankName}</h2>
            <p className="label">Please do not refresh or close this window.</p>
          </div>
        </div>

        {/* Premium Progress Loader */}
        <div className="relative h-[2px] w-full bg-border dark:bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-full bg-text-primary dark:bg-white"
          />
        </div>

        {/* Secure Message */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-6">
             <div className="flex flex-col items-center gap-1.5">
                <div className="w-8 h-8 rounded-full bg-bg-soft dark:bg-white/5 text-text-primary dark:text-white flex items-center justify-center mb-1">
                   <ShieldCheck size={16} />
                </div>
                <span className="text-[9px] font-semibold uppercase tracking-widest text-text-secondary dark:text-gray-400">Secure Terminal</span>
             </div>
             <div className="h-8 w-[1px] bg-border dark:bg-white/10"></div>
             <div className="flex flex-col items-center gap-1.5">
                <div className="w-8 h-8 rounded-full bg-bg-soft dark:bg-white/5 text-text-primary dark:text-white flex items-center justify-center mb-1">
                   <Lock size={16} />
                </div>
                <span className="text-[9px] font-semibold uppercase tracking-widest text-text-secondary dark:text-gray-400">SSL Encrypted</span>
             </div>
          </div>

          <div className="pt-6 flex items-center justify-center gap-2 text-text-secondary dark:text-gray-500 opacity-60">
             <span className="label text-[10px] tracking-widest">MOBIXA CHECKOUT</span>
             <ArrowRight size={12} />
             <span className="label text-[10px] tracking-widest">{bankName}</span>
          </div>
        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="absolute bottom-10 flex items-center gap-2 opacity-30 grayscale brightness-0 dark:brightness-200">
         <span className="text-sm font-black tracking-tighter italic text-text-primary dark:text-white">MOBIXA</span>
         <div className="h-3 w-[1px] bg-text-primary dark:bg-white"></div>
         <span className="text-[9px] font-bold uppercase tracking-widest text-text-primary dark:text-white">Fintech Core</span>
      </div>
    </motion.div>
  );
};

export default BankRedirectScreen;
