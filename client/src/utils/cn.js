import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge tailwind class names with conditional logic.
 * Uses tailwind-merge to handle conflict resolution.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
