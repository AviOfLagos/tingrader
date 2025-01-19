//components/grading/GradingPage.tsx
"use client";

import React from "react";
import { GradingContainer } from "./GradingContainer";
import { useToast } from "@/components/ui/use-toast";

// Mock submission for testing
const mockSubmissions = [
  {
    id: "1",
    taskId: "task1",
    submittedBy: "John Doe",
    submittedAt: new Date().toISOString(),
    contents: [
      {
        type: "text",
        value: "Here's my submission for the frontend task.",
      },
      {
        type: "link",
        value: "https://github.com/johndoe/project",
      },
      {
        type: "image",
        value: "/api/placeholder/800/600",
      },
    ],
  },
  // Add more mock submissions as needed
];

export default function GradingPage() {
  const { toast } = useToast();

  const handleGrade = async (
    submissionId: string,
    grade: number | boolean,
    feedback?: string
  ) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success toast
    toast({
      title: "Submission Graded",
      description: `Grade: ${typeof grade === "boolean" ? (grade ? "Pass" : "Fail") : grade}/7`,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Grade Submissions</h1>

      <GradingContainer
        submissions={mockSubmissions}
        gradingType="stars"
        onGrade={handleGrade}
        onNavigate={(direction) => {
          console.log(`Navigating ${direction}`);
        }}
      />
    </div>
  );
}
