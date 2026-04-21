import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className = "",
      loading = false,
      icon: Icon,
      iconPosition = "left",
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const baseStyles =
      "inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 disabled:opacity-50 disabled:pointer-events-none select-none";

    const variants = {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20",
      secondary:
        "bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200",
      outline:
        "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
      ghost:
        "bg-transparent text-slate-600 hover:bg-slate-100",
      accent:
        "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs rounded-lg",
      md: "h-11 px-6 text-sm rounded-xl",
      lg: "h-14 px-8 text-base rounded-2xl font-bold",
      icon: "h-10 w-10 rounded-full",
    };

    const iconSizes = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-5 w-5",
      icon: "h-5 w-5",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={!isDisabled ? { scale: 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.96 } : {}}
        initial={false}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          "gap-2",
          className
        )}
        {...props}
      >
        {/* LEFT ICON */}
        {!loading && Icon && iconPosition === "left" && (
          <Icon className={iconSizes[size]} />
        )}

        {/* LOADING SPINNER */}
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}

        {/* TEXT */}
        {children && <span>{children}</span>}

        {/* RIGHT ICON */}
        {!loading && Icon && iconPosition === "right" && (
          <Icon className={iconSizes[size]} />
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;