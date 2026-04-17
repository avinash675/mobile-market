/**
 * Utility to merge tailwind class names with conditional logic.
 * Simple dependency-free version for Mobixa.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
