// app/(dashboard)/tasks/[id]/grading/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TaskGradesOverview from "@/components/tasks/grades/TaskGradesOverview";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Task, TaskSubmission } from "@/types/task";
import { mockTasks, mockSubmissions } from "@/mock/tasks"; // Replace with your API calls

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <Card className="p-6">
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    </Card>
    <Skeleton className="h-[300px]" />
    <Skeleton className="h-[200px]" />
  </div>
);

const TaskGradingPage = () => {
  const params = useParams();
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [task, setTask] = useState<Task | null>(null);
  const [submissions, setSubmissions] = useState<TaskSubmission[]>([]);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // In a real app, replace these with actual API calls
        const taskData = mockTasks.find((t) => t.id === id);
        if (!taskData) {
          throw new Error("Task not found");
        }

        const taskSubmissions = mockSubmissions.filter(
          (s) => s.taskId === id
        );

        setTask(taskData);
        setSubmissions(taskSubmissions);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load task data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTaskData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || "Failed to load task data"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <TaskGradesOverview task={task} submissions={submissions} />
    </div>
  );
};

export default TaskGradingPage;
