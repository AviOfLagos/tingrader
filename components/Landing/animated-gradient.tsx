"use client";

import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  className?: string;
}

export function AnimatedGradient({ className }: AnimatedGradientProps) {
  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background animate-pulse"
        style={{ animationDuration: "4s" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(20%_50%_at_50%_50%,rgba(56,189,248,0.13)_0%,rgba(56,189,248,0)_100%)]" />
    </div>
  );
}
