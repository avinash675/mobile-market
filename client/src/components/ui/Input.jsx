import React, { forwardRef, useId } from "react";
import { cn } from "../../utils/cn";

const Input = forwardRef(
  (
    {
      label,
      error,
      className = "",
      variant = "default",
      disabled = false,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const baseStyles =
      "w-full rounded-xl px-5 py-3 text-sm outline-none transition-all duration-200";

    const variants = {
      default:
        "bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white",
      filled:
        "bg-slate-100 dark:bg-white/5 border border-transparent text-slate-900 dark:text-white",
      outline:
        "bg-transparent border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white",
    };

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", className)}>
        {/* LABEL */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-[10px] uppercase tracking-[0.15em] font-semibold text-slate-500 dark:text-white/40"
          >
            {label}
          </label>
        )}

        {/* INPUT */}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            baseStyles,
            variants[variant],
            disabled && "opacity-50 cursor-not-allowed",
            error
              ? "border-red-500 ring-2 ring-red-500/10"
              : "focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          )}
          {...props}
        />

        {/* ERROR MESSAGE */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-xs text-red-500 mt-1"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;