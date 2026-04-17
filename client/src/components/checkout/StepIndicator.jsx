import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const steps = [
  { id: 'cart',    label: 'Cart' },
  { id: 'address', label: 'Address' },
  { id: 'payment', label: 'Payment' },
  { id: 'success', label: 'Done' },
];

const ease = [0.16, 1, 0.3, 1];

const StepIndicator = ({ currentStep }) => {
  const currentIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="max-w-3xl mx-auto px-6 py-6">
      <div className="relative flex items-center justify-between">
        {/* Track */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-border dark:bg-white/10 -z-10 rounded-full" />

        {/* Progress fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: currentIndex > 0 ? `${(currentIndex / (steps.length - 1)) * 100}%` : '0%' }}
          transition={{ duration: 0.8, ease }}
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-text-primary dark:bg-white -z-10 rounded-full"
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive    = index === currentIndex;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2.5 z-10 w-16">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  backgroundColor: isCompleted
                    ? 'var(--color-text-primary)'
                    : isActive
                    ? 'var(--color-text-primary)'
                    : 'var(--color-bg-main)',
                  borderColor: isCompleted || isActive
                    ? 'transparent'
                    : 'var(--color-border)',
                }}
                transition={{ duration: 0.35, ease }}
                className={`
                  w-8 h-8 rounded-full border-2 flex items-center justify-center
                  text-[11px] font-bold shadow-sm transition-colors duration-300
                  ${isCompleted || isActive ? 'text-white dark:text-[#09090b]' : 'text-text-secondary dark:text-gray-400'}
                  ${isActive ? 'ring-4 ring-text-primary/10 dark:ring-white/10' : ''}
                `}
                style={{
                   // In dark mode, completed/active nodes should be white, inactive bg is dark
                   backgroundColor: (isCompleted || isActive) 
                     ? (document.documentElement.classList.contains('dark') ? '#ffffff' : '#0f172a') 
                     : (document.documentElement.classList.contains('dark') ? '#09090b' : '#ffffff'),
                   borderColor: (isCompleted || isActive) 
                     ? 'transparent' 
                     : (document.documentElement.classList.contains('dark') ? 'rgba(255,255,255,0.1)' : '#e2e8f0')   
                }}
              >
                {isCompleted ? (
                  <motion.span
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <Check size={14} strokeWidth={3} />
                  </motion.span>
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.div>

              <span className={`
                text-[10px] uppercase font-bold tracking-widest transition-colors duration-300
                ${isActive
                  ? 'text-text-primary dark:text-white'
                  : isCompleted
                  ? 'text-text-primary/70 dark:text-gray-300'
                  : 'text-text-secondary/50 dark:text-gray-500'
                }
              `}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
