// app/(dashboard)/tasks/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import TaskDetails from "@/components/tasks/()/TaskDetails";
import TaskDetailsLoading from "@/components/tasks/()/TaskDetailsLoading";
import TaskError from "@/components/tasks/()/TaskError";
import { mockTasks, mockSubmissions } from "@/mock/tasks";
import { Task, TaskSubmission } from "@/types/task";

const TaskPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [task, setTask] = useState<Task | null>(null);
  const [submissions, setSubmissions] = useState<TaskSubmission[]>([]);

  const fetchTaskData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const taskData = mockTasks.find((t) => t.id === id);
      if (!taskData) {
        throw new Error("Task not found");
      }

      const taskSubmissions = mockSubmissions.filter((s) => s.taskId === id);

      setTask(taskData);
      setSubmissions(taskSubmissions);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load task"));
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTaskData();
  }, [id, fetchTaskData]);

  const handleRetry = () => {
    fetchTaskData();
  };

  const handleGrade = (submissionId: string) => {
    router.push(`/tasks/${id}/grade${submissionId ? `/${submissionId}` : ""}`);
  };

  const handleSubmit = () => {
    router.push(`/tasks/${id}/submit`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <TaskDetailsLoading />
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="container mx-auto p-4">
        <TaskError error={error} resetError={handleRetry} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <TaskDetails
        task={task}
        submissions={submissions}
        onGrade={handleGrade}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default TaskPage;
