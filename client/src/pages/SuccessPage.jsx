import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import Button from '../components/common/Button';

const SuccessPage = () => {
  // SuccessPage is now a purely presentational snapshot rendered briefly before PaymentPage forces navigation.
  


  // The page acts as a premium fullscreen flash


  return (
    <div className="fixed inset-0 bg-white dark:bg-[#09090b] z-[9999] flex flex-col items-center justify-center p-6 transition-colors duration-500 overflow-hidden">
      
      {/* Minimalist Confetti */}
      <div className="absolute inset-0 pointer-events-none opacity-80" style={{ zIndex: 1 }}>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={150}
          gravity={0.15}
          colors={['#10B981', '#3B82F6', '#F59E0B', '#F43F5E']}
        />
      </div>

      <motion.div 
        className="w-full max-w-sm flex flex-col items-center text-center relative"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Big Animated Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, times: [0, 0.6, 1], ease: "easeInOut" }}
          className="w-24 h-24 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mb-6 relative shadow-xl shadow-emerald-500/10"
        >
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
            <CheckCircle size={36} className="text-white" strokeWidth={3} />
          </div>
        </motion.div>

        {/* Success Text */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-3xl font-black text-text-primary dark:text-white tracking-tight mb-2"
        >
          Payment Successful
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-[15px] text-text-secondary dark:text-gray-400 mb-8 font-medium"
        >
          Your order has been placed successfully
        </motion.p>

        {/* Optional View Orders Button */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="w-full"
        >
          <Link to="/my-orders">
            <Button variant="primary" className="w-full py-4 text-sm font-bold shadow-md shadow-primary/20">
              View Orders
            </Button>
          </Link>
        </motion.div>

        {/* Auto-redirect indicator */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 text-[11px] font-bold text-text-secondary/60 dark:text-white/30 uppercase tracking-widest animate-pulse"
        >
          Redirecting to your orders...
        </motion.p>

      </motion.div>
    </div>
  );
};

export default SuccessPage;
