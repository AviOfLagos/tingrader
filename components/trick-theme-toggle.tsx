// components/trick-theme-toggle.tsx
"use client";

import React from 'react';
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function TrickThemeToggle() {
  const { toast } = useToast();
  const messages = [
    "The darkness is overrated, isn't it?",
    "Let there be light!",
    "Who needs themes anyway?",
    "Themes? Nah, toasts are better!",
    "Surprise! No theme changes here!",
    "Fooled you!",
  ];

  const handleClick = () => {
    const message = messages[Math.floor(Math.random() * messages.length)];
    toast({ description: message });
  };

  return (
    <Button variant="outline" size="icon" onClick={handleClick}>
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}