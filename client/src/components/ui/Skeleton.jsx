import React from "react";
import clsx from "clsx";

const Skeleton = ({
  className = "",
  variant = "rect",
  animation = "shimmer",
  ...props
}) => {
  const baseStyles =
    "relative overflow-hidden bg-slate-200 dark:bg-white/10";

  const variants = {
    rect: "rounded-xl",
    text: "h-4 w-full rounded-md",
    circle: "rounded-full",
  };

  const animations = {
    shimmer:
      "before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:animate-[shimmer_1.5s_infinite]",
    pulse: "animate-pulse",
    none: "",
  };

  return (
    <div
      role="status"
      aria-busy="true"
      className={clsx(
        baseStyles,
        variants[variant],
        animations[animation],
        className
      )}
      {...props}
    />
  );
};

export default Skeleton;