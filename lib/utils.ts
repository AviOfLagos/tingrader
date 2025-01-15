"use client";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
type ClassValue = string | number | boolean | undefined | null;
type ClassArray = ClassValue[];
type ClassObject = { [key: string]: ClassValue };
type ClassInput = ClassValue | ClassArray | ClassObject;

/**
 * Combines class names using `clsx` and `tailwind-merge`.
 * @param inputs Class values to be combined.
 * @returns A single class string with merged Tailwind classes.
 */
export function cn(...inputs: ClassValue[] ) {
  return twMerge(clsx(inputs));
}
