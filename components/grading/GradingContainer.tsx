//components/grading/GradingContainer.tsx
"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { SwipeGrading } from "./SwipeGrading";
import { StarGrading } from "./StarGrading";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

interface Submission {
  id: string;
  taskId: string;
  submittedBy: string;
  submittedAt: string;
  contents: Array<{
    type: string;
    value: string;
  }>;
  grade?: number | boolean;
  gradedBy?: string;
  gradedAt?: string;
}

interface GradingContainerProps {
  submissions: Submission[];
  gradingType: "stars" | "swipe";
  onGrade: (
    submissionId: string,
    grade: number | boolean,
    feedback?: string
  ) => Promise<void>;
  onNavigate?: (direction: "prev" | "next") => void;
}

export function GradingContainer({
  submissions,
  gradingType,
  onGrade,
  onNavigate,
}: GradingContainerProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isGrading, setIsGrading] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");
  const [showFeedback, setShowFeedback] = React.useState(false);

  const currentSubmission = submissions[currentIndex];

  const handleGrade = async (grade: number | boolean) => {
    if (isGrading || !currentSubmission) return;

    setIsGrading(true);
    try {
      await onGrade(currentSubmission.id, grade, feedback);
      setFeedback("");
      setShowFeedback(false);

      if (currentIndex < submissions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Grading error:", error);
    } finally {
      setIsGrading(false);
    }
  };

  const handleNavigation = (direction: "prev" | "next") => {
    if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (direction === "next" && currentIndex < submissions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
    onNavigate?.(direction);
  };

  if (!currentSubmission) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No submissions to grade</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Navigation and Progress */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleNavigation("prev")}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} of {submissions.length}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleNavigation("next")}
          disabled={currentIndex === submissions.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Submission Content */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">
                Submission by {currentSubmission.submittedBy}
              </h3>
              <p className="text-sm text-muted-foreground">
                {new Date(currentSubmission.submittedAt).toLocaleString()}
              </p>
            </div>
            <Sheet open={showFeedback} onOpenChange={setShowFeedback}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Feedback</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <Textarea
                    placeholder="Enter your feedback..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={6}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Content Display */}
          <div className="space-y-4">
            {currentSubmission.contents.map((content, index) => (
              <div key={index} className="space-y-2">
                {content.type === "text" && (
                  <p className="text-sm">{content.value}</p>
                )}
                {content.type === "link" && (
                  <a
                    href={content.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    {content.value}
                  </a>
                )}
                {content.type === "image" && (
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={content.value}
                      alt={`Submission ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Grading Interface */}
      <div className="flex justify-center">
        {isGrading ? (
          <div className="p-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : gradingType === "swipe" ? (
          <SwipeGrading onGrade={handleGrade} />
        ) : (
          <StarGrading onGrade={handleGrade} />
        )}
      </div>
    </div>
  );
}
