import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  loading = false, 
  icon: Icon,
  iconPosition = 'left',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:opacity-50 disabled:pointer-events-none select-none active:scale-95";
  
  const variants = {
    primary: "bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 shadow-lg shadow-blue-500/20",
    secondary: "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-200 dark:border-white/10",
    outline: "border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-500 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white",
    ghost: "bg-transparent text-slate-600 dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5",
    accent: "bg-text-primary dark:bg-white text-white dark:text-text-primary hover:opacity-90 shadow-md",
  };
  
  const sizes = {
    sm: "h-9 px-4 py-2 text-[13px] rounded-xl",
    md: "h-11 px-6 py-2.5 text-[14px] rounded-xl",
    lg: "h-14 px-8 py-3 text-[16px] rounded-2xl font-black uppercase tracking-widest",
    icon: "h-10 w-10 p-0 rounded-full",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      initial={false}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : Icon && iconPosition === 'left' ? (
        <Icon className={`${children ? 'mr-2' : ''} h-5 w-5`} />
      ) : null}
      
      <span>{children}</span>
      
      {!loading && Icon && iconPosition === 'right' ? (
        <Icon className={`${children ? 'ml-2' : ''} h-5 w-5`} />
      ) : null}
    </motion.button>
  );
};

export default Button;
