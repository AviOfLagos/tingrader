import React, { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ThumbsUp,
  ThumbsDown,
  Star,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface Submission {
  id: number;
  intern: string;
  submittedAt: string;
  contents: Array<{
    type: string;
    value: string;
  }>;
  grade?: number | boolean;
  feedback?: string;
}

interface GradingInterfaceProps {
  submissions: Submission[];
  gradingType: "swipe" | "stars";
  onGrade: (
    submissionId: number,
    grade: number | boolean,
    feedback?: string
  ) => void;
  onClose?: () => void;
}

const EnhancedGradingInterface: React.FC<GradingInterfaceProps> = ({
  submissions,
  gradingType,
  onGrade,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<null | "left" | "right">(
    null
  );
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      setSwipeDirection(direction);
      const passed = direction === "right";

      setTimeout(() => {
        onGrade(submissions[currentIndex].id, passed, feedback);
        setFeedback("");
        if (currentIndex < submissions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
        setSwipeDirection(null);
      }, 300);
    },
    [currentIndex, submissions, onGrade, feedback]
  );

  const handleStarGrade = useCallback(
    (stars: number) => {
      onGrade(submissions[currentIndex].id, stars, feedback);
      setFeedback("");
      if (currentIndex < submissions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [currentIndex, submissions, onGrade, feedback]
  );

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (gradingType !== "swipe") return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || gradingType !== "swipe") return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    setOffsetX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging || gradingType !== "swipe") return;
    if (Math.abs(offsetX) > 100) {
      handleSwipe(offsetX > 0 ? "right" : "left");
    }
    setOffsetX(0);
    setIsDragging(false);
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
        {/* Navigation */}
        <div className="flex justify-between items-center mb-4 text-white">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <span>
            {currentIndex + 1} of {submissions.length}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Submission Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSubmission.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: offsetX,
              rotate: offsetX * 0.05,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className={`bg-white p-6 rounded-xl shadow-xl ${
                gradingType === "swipe"
                  ? "cursor-grab active:cursor-grabbing"
                  : ""
              }`}
              onMouseDown={handleTouchStart}
              onMouseMove={handleTouchMove}
              onMouseUp={handleTouchEnd}
              onMouseLeave={handleTouchEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <h2 className="text-2xl font-bold mb-2">
                {currentSubmission.intern}
              </h2>
              <p className="text-gray-500 mb-4">
                Submitted:{" "}
                {new Date(currentSubmission.submittedAt).toLocaleString()}
              </p>

              {currentSubmission.contents.map((content, index) => (
                <div key={index} className="mb-4">
                  {content.type === "text" && (
                    <p className="text-gray-700">{content.value}</p>
                  )}
                  {content.type === "link" && (
                    <a
                      href={content.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {content.value}
                    </a>
                  )}
                </div>
              ))}
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Grading Controls */}
        <div className="mt-6 flex justify-center items-center gap-4">
          {gradingType === "swipe" ? (
            <>
              <Button
                variant="destructive"
                size="lg"
                onClick={() => handleSwipe("left")}
                className="rounded-full p-4"
              >
                <ThumbsDown className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsCommentOpen(true)}
                className="rounded-full bg-white"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
              <Button
                variant="default"
                size="lg"
                onClick={() => handleSwipe("right")}
                className="rounded-full p-4"
              >
                <ThumbsUp className="h-6 w-6" />
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5, 6, 7].map((star) => (
                  <Button
                    key={star}
                    variant="outline"
                    size="icon"
                    onClick={() => handleStarGrade(star)}
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
                variant="outline"
                size="icon"
                onClick={() => setIsCommentOpen(true)}
                className="rounded-full bg-white"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
            </div>
          )}
        </div>

        {/* Comment Dialog */}
        <Dialog open={isCommentOpen} onOpenChange={setIsCommentOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Feedback</DialogTitle>
            </DialogHeader>
            <Textarea
              placeholder="Enter your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px]"
            />
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsCommentOpen(false)}>
                Save Feedback
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EnhancedGradingInterface;
