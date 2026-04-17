import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ================================================================
   MOBIXA Button Component — Strict Design System
   Primary:   bg #0F172A · radius 10px · padding 12px 20px
   Secondary: bg #F1F5F9 · text #0F172A
   ================================================================ */

const VARIANTS = {
  primary: [
    'bg-blue-600 dark:bg-blue-500 text-white',
    'hover:bg-blue-700 dark:hover:bg-blue-600',
    'shadow-lg shadow-blue-500/20',
  ].join(' '),

  secondary: [
    'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white',
    'border border-slate-200 dark:border-white/10',
    'hover:bg-slate-200 dark:hover:bg-white/20',
  ].join(' '),

  outline: [
    'bg-transparent border-2 border-blue-600 dark:border-blue-500',
    'text-blue-600 dark:text-blue-500',
    'hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white',
  ].join(' '),

  ghost: [
    'bg-transparent text-slate-600 dark:text-white/70',
    'hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white',
  ].join(' '),

  danger: [
    'bg-red-600 text-white',
    'hover:bg-red-700',
    'shadow-lg shadow-red-500/20',
  ].join(' '),
};

const SIZES = {
  sm: 'h-9 px-4 text-[13px] rounded-xl',
  md: 'h-11 px-6 text-[14px] rounded-xl',
  lg: 'h-14 px-8 text-[16px] rounded-2xl font-black uppercase tracking-widest',
  xl: 'h-16 px-10 text-[18px] rounded-2xl font-black uppercase tracking-widest',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  isLoading = false,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.05, y: disabled || isLoading ? 0 : -1 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={[
        'relative inline-flex items-center justify-center gap-2',
        'font-bold tracking-tight',
        'leading-none select-none cursor-pointer',
        'transition-all duration-300',
        'disabled:opacity-40 disabled:pointer-events-none',
        VARIANTS[variant] ?? VARIANTS.primary,
        SIZES[size] ?? SIZES.md,
        className,
      ].join(' ')}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLoading ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="flex items-center gap-2"
          >
            <svg
              className="animate-spin h-3.5 w-3.5 text-current flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Processing</span>
          </motion.span>
        ) : (
          <motion.span
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="flex items-center gap-2 flex-wrap justify-center"
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default Button;
