"use client";

import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using `clsx` and `tailwind-merge`.
 * @param inputs Class values to be combined.
 * @returns A single class string with merged Tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
