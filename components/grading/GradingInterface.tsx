'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Submission {
  id: number;
  studentName: string;
  submittedAt: string;
  attachments: string[];
}

const GradingInterface = ({
  taskId,
  gradingType,
}: {
  taskId: string;
  gradingType: 'stars' | 'swipe';
}) => {
  const router = useRouter();
  const [currentSubmission, setCurrentSubmission] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Mock submissions data
  const submissions: Submission[] = [
    {
      id: 1,
      studentName: "John Doe",
      submittedAt: "2024-01-10",
      attachments: [
        "/api/placeholder/800/400",
        "/api/placeholder/800/400",
        "/api/placeholder/800/400",
      ],
    },
    {
      id: 2,
      studentName: "John Doe",
      submittedAt: "2024-01-10",
      attachments: [
        "/api/placeholder/800/400",
        "/api/placeholder/800/400",
        "/api/placeholder/800/400",
      ],
    },
    // Add more mock submissions
  ];

  const handleGrade = (grade: number | boolean) => {
    // Here you would normally send the grade to an API
    console.log(
      `Graded submission ${submissions[currentSubmission].id} with ${grade}`
    );

    // Move to next submission immediately
    if (currentSubmission < submissions.length - 1) {
      setCurrentSubmission((prev) => prev + 1);
      setCurrentImage(0); // Reset image carousel
    } else {
      // No more submissions, return to task list
      router.push('/app/grading');
    }
  };

  const handleSwipe = (isPass: boolean) => {
    handleGrade(isPass);
  };

  const handleStarClick = (rating: number) => {
    handleGrade(rating);
  };

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (gradingType !== 'swipe') return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || gradingType !== 'swipe') return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    setOffsetX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging || gradingType !== 'swipe') return;
    if (Math.abs(offsetX) > 100) {
      handleSwipe(offsetX > 0);
    }
    setOffsetX(0);
    setIsDragging(false);
  };

  const submission = submissions[currentSubmission];

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Submission Info */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="font-semibold">{submission.studentName}</h2>
        <span className="text-sm text-gray-500">
          {currentSubmission + 1} of {submissions.length}
        </span>
      </div>

      {/* Main Card */}
      <Card
        className={`relative overflow-hidden ${gradingType === 'swipe' ? 'cursor-grab active:cursor-grabbing' : ''}`}
        style={{
          transform: `translateX(${offsetX}px) rotate(${offsetX * 0.05}deg)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        }}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image Carousel */}
        <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
          <Image
            width={800}
            height={400}
            src={submission.attachments[currentImage]}
            alt={`Submission ${currentImage + 1}`}
            className="w-full h-full object-contain"
          />

          {submission.attachments.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2"
                onClick={() => setCurrentImage((prev) => Math.max(0, prev - 1))}
                disabled={currentImage === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() =>
                  setCurrentImage((prev) =>
                    Math.min(submission.attachments.length - 1, prev + 1)
                  )
                }
                disabled={currentImage === submission.attachments.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Image Counter */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                {currentImage + 1} / {submission.attachments.length}
              </div>
            </>
          )}
        </div>

        {/* Grading Controls */}
        <div className="p-4">
          {gradingType === 'stars' ? (
            <div className="flex justify-center gap-2">
              {[...Array(7)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStarClick(index + 1)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star className="h-8 w-8 text-gray-300 hover:text-yellow-400 hover:fill-yellow-400" />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex justify-between gap-4">
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => handleSwipe(false)}
              >
                Fail
              </Button>
              <Button
                variant="default"
                className="flex-1"
                onClick={() => handleSwipe(true)}
              >
                Pass
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default GradingInterface;
