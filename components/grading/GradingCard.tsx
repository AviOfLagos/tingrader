"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";

type Content = {
  type: string;
  value: string;
};

type Submission = {
  id: number;
  intern: string;
  submittedAt: string;
  contents: Content[];
  grade?: number | boolean;
};

interface GradingCardProps {
  submission: Submission;
}

const GradingCard: React.FC<GradingCardProps> = ({ submission }) => {
  return (
    <motion.div
      key={submission.id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white shadow-xl rounded-xl overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">{submission.intern}</h2>
          <p className="text-gray-500 mb-4">
            Submitted: {new Date(submission.submittedAt).toLocaleString()}
          </p>
          {submission.contents.map((content, index) => (
            <div key={index} className="mb-4">
              {content.type === "description" && (
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
              {content.type === "image" && (
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {content.value.split(",").map((img, imgIndex) => (
                      <CarouselItem key={imgIndex}>
                        <Image
                          src={img.trim()}
                          width={300}
                          height={200}
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
  );
};

export default GradingCard;
