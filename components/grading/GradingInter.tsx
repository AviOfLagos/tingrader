"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Star } from "lucide-react";
import GradingCard from "@/components/grading/GradingCard";

type Submission = {
  id: number;
  intern: string;
  submittedAt: string;
  contents: Array<{ type: string; value: string }>;
  grade?: number | boolean;
};

type GradingInterfaceProps = {
  submissions: Submission[];
  onGrade: (id: number, grade: number | boolean) => void;
};

export default function GradingInter({
  submissions,
  onGrade,
}: GradingInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<null | "left" | "right">(
    null
  );

  const handleGrade = React.useCallback(
    (passed: boolean | number) => {
      if (currentIndex < submissions.length) {
        onGrade(submissions[currentIndex].id, passed);
        if (currentIndex < submissions.length - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }
      }
      setSwipeDirection(null);
    },
    [onGrade, submissions, currentIndex] // Removed 'submissions.length' from dependencies
  );

  useEffect(() => {
    if (swipeDirection) {
      const timer = setTimeout(() => {
        if (currentIndex < submissions.length) {
          onGrade(submissions[currentIndex].id, swipeDirection === "right");
          if (currentIndex < submissions.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
          }
        }
        setSwipeDirection(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [swipeDirection, currentIndex, submissions, onGrade]);

  const handleSwipe = (direction: "left" | "right") => {
    setSwipeDirection(direction);
  };

  const currentSubmission = submissions[currentIndex];

  if (!currentSubmission) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <p className="text-muted-foreground">No submissions to grade</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <AnimatePresence>
          <GradingCard
            submission={currentSubmission}
            key={currentSubmission.id}
          />
        </AnimatePresence>

        <div className="flex justify-center mt-6 space-x-4">
          <Button
            variant="destructive"
            size="lg"
            onClick={() => handleSwipe("left")}
            className="rounded-full p-4"
          >
            <ThumbsDown className="h-6 w-6" />
          </Button>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5, 6, 7].map((star) => (
              <Button
                key={star}
                variant="outline"
                size="icon"
                onClick={() => handleGrade(star)}
                className={`rounded-full ${
                  star <=
                  (typeof currentSubmission.grade === "number"
                    ? currentSubmission.grade
                    : 0)
                    ? "bg-yellow-400"
                    : "bg-gray-200"
                }`}
              >
                <Star
                  className={`h-4 w-4 ${
                    star <=
                    (typeof currentSubmission.grade === "number"
                      ? currentSubmission.grade
                      : 0)
                      ? "text-yellow-900"
                      : "text-gray-500"
                  }`}
                />
              </Button>
            ))}
          </div>
          <Button
            variant="default"
            size="lg"
            onClick={() => handleSwipe("right")}
            className="rounded-full p-4"
          >
            <ThumbsUp className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
