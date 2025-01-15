"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedBackground() {
  const [activeLines, setActiveLines] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLines = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * 100)
      );
      setActiveLines(newLines);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* Animated Lines */}
      <AnimatePresence>
        {activeLines.map((line, index) => (
          <motion.div
            key={`${line}-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={cn(
              "absolute h-px w-[200px]",
              "bg-gradient-to-r from-primary/0 via-primary to-primary/0"
            )}
            style={{
              top: `${line}%`,
              left: -200,
              transform: `rotate(${Math.random() * 45}deg)`,
            }}
          >
            <motion.div
              animate={{ x: ["0vw", "200vw"] }}
              transition={{
                duration: 2,
                ease: "linear",
              }}
              className="w-full h-full"
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Random Stars */}
      {activeLines.map((_, index) => (
        <motion.div
          key={`star-${index}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1, delay: Math.random() * 2 }}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}
