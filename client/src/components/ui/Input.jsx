import React from 'react';

const Input = ({ 
  label, 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`flex flex-col space-y-1.5 w-full ${className}`}>
      {label && (
        <label className="text-[10px] text-text-secondary/60 dark:text-white/40 uppercase tracking-[0.18em] pl-1 font-bold">
          {label}
        </label>
      )}
      <div className="relative group">
        <input
          className={`
            w-full bg-white/50 dark:bg-black/20 border border-white/20 dark:border-white/5 rounded-xl px-5 py-4 text-sm
            transition-all duration-500 outline-none text-text-primary dark:text-white
            ${error ? 'border-red-500/50 ring-2 ring-red-500/10' : 'focus:border-primary/30 focus:ring-4 focus:ring-primary/5 dark:focus:border-white/20 dark:focus:ring-white/5'}
            group-hover:bg-white/80 dark:group-hover:bg-black/30
          `}
          {...props}
        />
        {error && (
          <p className="text-[9px] font-bold text-red-500/80 mt-1.5 pl-1 tracking-wide">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
