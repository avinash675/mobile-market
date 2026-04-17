import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const FilterBottomSheet = ({ isOpen, onClose, children, onApply }) => {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-end overflow-hidden">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            drag="y"
            dragDirectionLock
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              // If swiped down by 120px or more, close the sheet
              if (info.offset.y > 120) {
                onClose();
              }
            }}
            className="relative w-full max-h-[85vh] bg-white dark:bg-[#09090b] rounded-t-[32px] shadow-2xl flex flex-col focus:outline-none"
          >
            {/* Drag Handle */}
            <div className="w-12 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full mx-auto mt-4 mb-2 shrink-0" />

            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-border dark:border-white/5 shrink-0">
              <h2 className="text-xl font-black uppercase tracking-widest text-primary dark:text-white leading-none">Filters</h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-text-secondary dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6">
              {children}
            </div>

            {/* Sticky Apply Button */}
            <div className="p-6 border-t border-border dark:border-white/5 bg-white dark:bg-[#09090b] sticky bottom-0 shrink-0">
              <button 
                className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black uppercase tracking-widest text-[13px] shadow-lg shadow-black/10 active:scale-95 transition-all"
                onClick={onApply || onClose}
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default FilterBottomSheet;
