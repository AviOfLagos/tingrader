//components/grading/SwipeGrading.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface SwipeGradingProps {
  onGrade: (grade: boolean) => void;
}

export function SwipeGrading({ onGrade }: SwipeGradingProps) {
  const controls = useAnimation();
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragEnd = (event: PointerEvent, info: PanInfo) => {
    const threshold = 100; // minimum distance for a swipe
    if (info.offset.x > threshold) {
      onGrade(true);
    } else if (info.offset.x < -threshold) {
      onGrade(false);
    } else {
      controls.start({ x: 0 }); // reset position if not swiped far enough
    }
    setIsDragging(false);
  };

  return (
    <div className="flex gap-4 items-center">
      <Button
        variant="destructive"
        size="lg"
        onClick={() => onGrade(false)}
        className="w-32"
      >
        <ThumbsDown className="mr-2 h-4 w-4" />
        Fail
      </Button>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        animate={controls}
        className={`cursor-grab active:cursor-grabbing ${
          isDragging ? "scale-105" : ""
        }`}
      >
        <div className="px-4 py-2 rounded-full bg-muted text-sm">
          Swipe to grade
        </div>
      </motion.div>

      <Button
        variant="default"
        size="lg"
        onClick={() => onGrade(true)}
        className="w-32"
      >
        <ThumbsUp className="mr-2 h-4 w-4" />
        Pass
      </Button>
    </div>
  );
}
