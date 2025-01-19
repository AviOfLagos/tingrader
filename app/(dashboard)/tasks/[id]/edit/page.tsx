// app/(dashboard)/tasks/[id]/edit/page.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2, ArrowLeft } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TaskFormData } from "@/components/tasks/create/store/taskFormStore";
import { BasicInformation } from "@/components/tasks/create/BasicInformation";
import { GradingSettings } from "@/components/tasks/create/GradingSettings";
import { AdvancedGradingSettings } from "../../create/AdvancedGradingSettings";
import { DeadlineSettings } from "@/components/tasks/create/DeadlineSettings";
import { TaskInstructions } from "@/components/tasks/create/TaskInstructions";
import { toast } from "sonner";
import { mockTasks } from "@/mock/tasks";
import { Task } from "@/types/task";

const taskFormSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(100),
    description: z.string().min(1, "Description is required").max(500),
    track: z.enum(["frontend", "backend", "design", "mobile"]),
    stage: z.coerce.number().min(1).max(10),
    gradingType: z.enum(["stars", "swipe"]),
    dueDate: z.date({
      required_error: "Due date is required",
    }),
    maxSubmissions: z.coerce.number().min(1),
    requiredGrades: z.coerce.number().min(1),
    instructions: z.string().min(1, "Instructions are required"),
    isDraft: z.boolean(),
    gradingConfig: z.object({
      maxStars: z.number().min(1).max(10).optional(),
      passMarkPerGrader: z.number().min(0).optional(),
    }),
    settings: z.object({
      allowLateSubmissions: z.boolean(),
      gracePeriodHours: z.number().min(1).max(168),
      requireGraderFeedback: z.boolean(),
      autoPublishGrades: z.boolean(),
      notifyOnSubmission: z.boolean(),
    }),
  })
  .superRefine((data, ctx) => {
    // Validate star grading configuration
    if (data.gradingType === "stars") {
      if (!data.gradingConfig.maxStars) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Maximum stars is required for star grading",
          path: ["gradingConfig.maxStars"],
        });
      }
      if (!data.gradingConfig.passMarkPerGrader) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Pass mark is required for star grading",
          path: ["gradingConfig.passMarkPerGrader"],
        });
      }
    }

    // Validate grace period when late submissions are allowed
    if (
      data.settings.allowLateSubmissions &&
      data.settings.gracePeriodHours <= 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Grace period is required when late submissions are allowed",
        path: ["settings.gracePeriodHours"],
      });
    }
  });

export default function EditTaskPage() {
  const router = useRouter();
  const { id } = useParams(); // Get the task ID from the URL
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Find the task with the given ID from mockTasks
  const taskToEdit = mockTasks.find((task) => task.id === id);

  // Handle if task is not found
  useEffect(() => {
    if (!taskToEdit) {
      toast.error("Task not found");
      router.push("/app/tasks");
    }
  }, [taskToEdit, router]);

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: taskToEdit
      ? {
          title: taskToEdit.title,
          description: taskToEdit.description,
          track: taskToEdit.track,
          stage: taskToEdit.stage,
          gradingType: taskToEdit.gradingType,
          dueDate: taskToEdit.dueDate ? new Date(taskToEdit.dueDate as string) : null,
          maxSubmissions: taskToEdit.maxSubmissions,
          requiredGrades: taskToEdit.requiredGrades,
          instructions: taskToEdit.instructions,
          isDraft: taskToEdit.isDraft,
          gradingConfig: taskToEdit.gradingConfig,
          settings: taskToEdit.settings,
        }
      : {},
    mode: "onTouched",
  });

  async function onSubmit(data: TaskFormData) {
    try {
      setIsSubmitting(true);
      setError(null);

      const finalData = {
        ...data,
        id, // Include the task ID
      };

      // Log the complete form data response body
      console.log("Task Update Request Body:", {
        method: "PUT",
        endpoint: `/api/tasks/${id}`,
        payload: finalData,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate successful update
      toast.success("Task updated successfully");
      router.push("/app/tasks");
    } catch (error) {
      console.error("Failed to update task:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update task"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleCancel = () => {
    router.back();
  };

  if (!taskToEdit) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-3xl m-16">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              className="hover:bg-transparent"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">Edit Task</h1>
          </div>
          <p className="text-muted-foreground ml-9">
            Update the details of your task
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="p-6">
            <div className="space-y-8">
              <BasicInformation form={form} />

              <div className="space-y-6">
                <GradingSettings form={form} />
                <AdvancedGradingSettings form={form} />
              </div>

              <DeadlineSettings form={form} />
              <TaskInstructions form={form} />

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update Task
                </Button>
              </div>
            </div>
          </Card>
        </form>
      </Form>
    </div>
  );
}
