// app/(dashboard)/tasks/[id]/page.tsx
"use client";


import TaskDetails from "@/components/tasks/()/TaskDetails";
import TaskDetailsLoading from "@/components/tasks/()/TaskDetailsLoading";
import TaskError from "@/components/tasks/()/TaskError";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { mockTasks, mockSubmissions } from "@/mock/tasks";
import { Task, TaskSubmission } from "@/types/task";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Share2, Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";

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

      // Try to find task in mock data
      let taskData = mockTasks.find((t) => t.id === id);
      
      // If not found in mock data, create a temporary task (for newly created tasks)
      if (!taskData && id?.toString().startsWith('task-')) {
        taskData = {
          id: id.toString(),
          title: "Sample New Task",
          description: "Seeing this sample page because there are no New Task",
          track: "frontend",
          stage: 1,
          status: "open",
          createdBy: "current-user",
          createdAt: new Date().toISOString(),
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
          gradingType: "stars",
          submissions: {
            current: 0,
            max: 30,
            userHasSubmitted: false,
          },
          grading: {
            required: 2,
            current: 0,
            userHasGraded: false,
            pendingGrades: 0,
          },
          maxSubmissions: 30,
          requiredGrades: 2,
          instructions: "Please provide detailed solutions.",
          isDraft: false,
          gradingConfig: {},
          settings: {
            allowLateSubmissions: true,
            gracePeriodHours: 24,
            requireGraderFeedback: true,
            autoPublishGrades: false,
            notifyOnSubmission: true,
          },
          permissions: {
            canEdit: true,
            canDelete: true,
            canGrade: true,
            canSubmit: false,
          },
        };
      }

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
   if (!task?.permissions.canGrade) {
     toast.error("You don't have permission to grade this task");
     return;
   }
   router.push(
     `/tasks/${id}/grade${submissionId ? `/${submissionId}` : ""}`
   );
 };

  const handleSubmit = () => {
    router.push(`/tasks/${id}/submit`);
  };

  const handleEdit = () => {
    router.push(`/tasks/${id}/edit`);
  };

  const handleShare = () => {
    const taskUrl = `${window.location.origin}/tasks/${id}`;
    navigator.clipboard.writeText(taskUrl);
    toast.success("Task link copied to clipboard!");
  };

  const handleDuplicate = () => {
    // TODO: Implement task duplication
    toast.info("Task duplication coming soon!");
  };

  const handleDelete = () => {
    // TODO: Implement task deletion
    if (confirm("Are you sure you want to delete this task?")) {
      toast.info("Task deletion coming soon!");
    }
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
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          onClick={() => router.push("/tasks")}
        >
          Back to Tasks
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleEdit}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit Task
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicate}>
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <TaskDetails
        task={task}
        submissions={submissions}
        onGrade={handleGrade}
        onSubmit={handleSubmit}
      />

      {/* Comments Section Preview */}
      <div className="mt-8 p-6 border rounded-lg bg-muted/50">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        <p className="text-muted-foreground text-center py-8">
          Comments section coming soon! Stay tuned for updates.
        </p>
      </div>
    </div>
  );
};

export default TaskPage;