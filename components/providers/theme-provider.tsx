"use client";

import React from 'react';
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider defaultTheme="dark" {...props}>{children}</NextThemesProvider>;
}