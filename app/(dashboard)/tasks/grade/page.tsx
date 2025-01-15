"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ThumbsUp,
  ThumbsDown,
  Star,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function GradingDemo() {
  const [currentSubmission, setCurrentSubmission] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [gradingType, setGradingType] = useState("swipe");
  const [starRating, setStarRating] = useState(0);

  // Mock submission data
  const submissions = [
    {
      id: 1,
      intern: "Sarah Johnson",
      submittedAt: "2024-01-15T10:30:00",
      track: "Frontend Development",
      task: "Build a React Component",
      description:
        "I've created a reusable button component with various states and animations.",
      images: ["/download.jpg", "/down.jpg"],
      link: "https://github.com/example/project",
    },
  ];

  const submission = submissions[currentSubmission];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 text-white">
          <div>
            <h2 className="text-2xl font-bold">{submission.task}</h2>
            <p className="text-sm opacity-80">{submission.track}</p>
          </div>
          <div className="flex gap-4 items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setGradingType(gradingType === "swipe" ? "stars" : "swipe")
              }
            >
              {gradingType === "swipe" ? "Switch to Stars" : "Switch to Swipe"}
            </Button>
          </div>
        </div>

        {/* Main Card */}
        <Card className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-xl">
          {/* Submission Info */}
          <div className="p-4 border-b dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{submission.intern}</h3>
                <p className="text-sm text-gray-500">
                  Submitted {new Date(submission.submittedAt).toLocaleString()}
                </p>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Feedback</SheetTitle>
                    <SheetDescription>
                      Add your comments and feedback for the submission.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-4">
                    <textarea
                      className="w-full h-32 p-2 border rounded-md"
                      placeholder="Enter your feedback here..."
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="relative aspect-video bg-gray-100 dark:bg-gray-900">
            <Image
              src={submission.images[currentImage]}
              alt={`Submission ${currentImage + 1}`}
              className="w-full h-full object-cover"
              width={800}
              height={600}
            />
            {submission.images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentImage((prev) => Math.max(0, prev - 1))
                  }
                  disabled={currentImage === 0}
                  className="rounded-full bg-white/90 dark:bg-gray-800/90"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentImage((prev) =>
                      Math.min(submission.images.length - 1, prev + 1)
                    )
                  }
                  disabled={currentImage === submission.images.length - 1}
                  className="rounded-full bg-white/90 dark:bg-gray-800/90"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
              {currentImage + 1} / {submission.images.length}
            </div>
          </div>

          {/* Description */}
          <div className="p-4 border-t dark:border-gray-700">
            <p className="text-sm">{submission.description}</p>
            {submission.link && (
              <a
                href={submission.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline mt-2 block"
              >
                View Project →
              </a>
            )}
          </div>

          {/* Grading Controls */}
          <div className="p-6 bg-gray-50 dark:bg-gray-900/50">
            {gradingType === "swipe" ? (
              <div className="flex justify-center gap-4">
                <Button
                  variant="destructive"
                  size="lg"
                  className="w-32 rounded-full"
                >
                  <ThumbsDown className="h-5 w-5 mr-2" />
                  Fail
                </Button>
                <Button
                  variant="default"
                  size="lg"
                  className="w-32 rounded-full"
                >
                  <ThumbsUp className="h-5 w-5 mr-2" />
                  Pass
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((star) => (
                    <Button
                      key={star}
                      variant="ghost"
                      size="lg"
                      className={`rounded-full ${
                        star <= starRating ? "text-yellow-500" : "text-gray-300"
                      }`}
                      onClick={() => setStarRating(star)}
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= starRating ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  {starRating > 0
                    ? `${starRating} out of 7 stars`
                    : "Select a rating"}
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
