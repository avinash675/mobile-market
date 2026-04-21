import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const Card = forwardRef(
  (
    {
      children,
      className = "",
      hover = true,
      padding = "md",
      variant = "default",
      clickable = false,
      ...props
    },
    ref
  ) => {
    const paddings = {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-10",
    };

    const variants = {
      default:
        "bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10",
      elevated:
        "bg-white dark:bg-[#0f172a] shadow-md hover:shadow-xl",
      outline:
        "border border-slate-300 dark:border-white/20 bg-transparent",
      soft:
        "bg-slate-50 dark:bg-white/5 border border-transparent",
    };

    return (
      <motion.div
        ref={ref}
        whileHover={
          hover
            ? {
                y: -4,
                scale: 1.01,
              }
            : {}
        }
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn(
          "rounded-2xl transition-all duration-200",
          paddings[padding],
          variants[variant],
          clickable && "cursor-pointer active:scale-[0.98]",
          "focus-within:ring-2 focus-within:ring-blue-500/20",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export default Card;