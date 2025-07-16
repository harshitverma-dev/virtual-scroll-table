import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Conditionally joins class names together and merges Tailwind CSS classes.
 * @param {import("clsx").ClassValue[]} inputs - Class names to join.
 * @returns {string} The merged class string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
