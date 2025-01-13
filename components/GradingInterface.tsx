'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { ThumbsUp, ThumbsDown, Star } from 'lucide-react';

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

export default function GradingInterface({
  submissions,
  onGrade,
}: GradingInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<null | 'left' | 'right'>(
    null
  );

  useEffect(() => {
    if (swipeDirection) {
      const timer = setTimeout(() => {
        handleGrade(swipeDirection === 'right');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [swipeDirection]);

  const handleGrade = (passed: boolean | number) => {
    if (currentIndex < submissions.length) {
      onGrade(submissions[currentIndex].id, passed);
      if (currentIndex < submissions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
    setSwipeDirection(null);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
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
          <motion.div
            key={currentSubmission.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white shadow-xl rounded-xl overflow-hidden">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">
                  {currentSubmission.intern}
                </h2>
                <p className="text-gray-500 mb-4">
                  Submitted:{' '}
                  {new Date(currentSubmission.submittedAt).toLocaleString()}
                </p>
                {currentSubmission.contents.map((content, index) => (
                  <div key={index} className="mb-4">
                    {content.type === 'description' && (
                      <p className="text-gray-700">{content.value}</p>
                    )}
                    {content.type === 'link' && (
                      <a
                        href={content.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {content.value}
                      </a>
                    )}
                    {content.type === 'image' && (
                      <Carousel className="w-full max-w-xs mx-auto">
                        <CarouselContent>
                          {content.value.split(',').map((img, imgIndex) => (
                            <CarouselItem key={imgIndex}>
                              <img
                                src={img.trim()}
                                alt={`Submission ${imgIndex + 1}`}
                                className="w-full h-64 object-cover rounded-lg"
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-6 space-x-4">
          <Button
            variant="destructive"
            size="lg"
            onClick={() => handleSwipe('left')}
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
                className={`rounded-full ${star <= (typeof currentSubmission.grade === 'number' ? currentSubmission.grade : 0) ? 'bg-yellow-400' : 'bg-gray-200'}`}
              >
                <Star
                  className={`h-4 w-4 ${star <= (typeof currentSubmission.grade === 'number' ? currentSubmission.grade : 0) ? 'text-yellow-900' : 'text-gray-500'}`}
                />
              </Button>
            ))}
          </div>
          <Button
            variant="default"
            size="lg"
            onClick={() => handleSwipe('right')}
            className="rounded-full p-4"
          >
            <ThumbsUp className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
