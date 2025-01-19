//components/grading/StarGrading.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarGradingProps {
  onGrade: (grade: number) => void;
}

export function StarGrading({ onGrade }: StarGradingProps) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);
  const [selectedValue, setSelectedValue] = React.useState<number | null>(null);

  const handleStarClick = (value: number) => {
    setSelectedValue(value);
    onGrade(value);
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: 8 }, (_, i) => i).map((star) => (
        <Button
          key={star}
          variant="ghost"
          size="icon"
          className={cn(
            "hover:bg-transparent",
            (
              hoverValue !== null
                ? star <= hoverValue
                : star <= (selectedValue ?? -1)
            )
              ? "text-yellow-400"
              : "text-muted-foreground"
          )}
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(null)}
          onClick={() => handleStarClick(star)}
        >
          <Star
            className={cn(
              "h-6 w-6 transition-transform",
              (
                hoverValue !== null
                  ? star <= hoverValue
                  : star <= (selectedValue ?? -1)
              )
                ? "fill-current scale-110"
                : ""
            )}
          />
        </Button>
      ))}
    </div>
  );
}
