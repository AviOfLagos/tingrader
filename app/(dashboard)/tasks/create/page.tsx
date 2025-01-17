// app/tasks/create/page.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  useTaskFormStore,
  TaskFormData,
} from "@/components/tasks/create/store/taskFormStore";
import { BasicInformation } from "@/components/tasks/create/BasicInformation";
import { GradingSettings } from "@/components/tasks/create/GradingSettings";
import { AdvancedGradingSettings } from "./AdvancedGradingSettings";
import { DeadlineSettings } from "@/components/tasks/create/DeadlineSettings";
import { TaskInstructions } from "@/components/tasks/create/TaskInstructions";
import { toast } from "sonner";

const taskFormSchema = z.object({
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
});

export default function CreateTaskPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { formData, updateForm, resetForm } = useTaskFormStore();

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: formData,
  });

  // Load cached form data on mount
  useEffect(() => {
    const cachedData = localStorage.getItem("task-form-data");
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      // Convert date string back to Date object
      if (parsedData.dueDate) {
        parsedData.dueDate = new Date(parsedData.dueDate);
      }
      form.reset(parsedData);
    }
  }, [form]);

  // Update store and cache when form changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      const dataToCache = { ...value };
      // Store the form data in localStorage
      localStorage.setItem("task-form-data", JSON.stringify(dataToCache));
      updateForm(value as TaskFormData);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, updateForm]);

  async function onSubmit(data: TaskFormData, asDraft: boolean = false) {
    try {
      setIsSubmitting(true);
      setError(null);

      const finalData = {
        ...data,
        isDraft: asDraft,
      };

      // Log the complete form data response body
      console.log("Task Creation Request Body:", {
        method: "POST",
        endpoint: "/api/tasks",
        payload: finalData,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!asDraft) {
        // Clear cached data
        localStorage.removeItem("task-form-data");
        resetForm();
        toast.success("Task created successfully!");
        router.push("/tasks");
      } else {
        toast.success("Draft saved successfully!");
      }
    } catch (error) {
      console.error("Failed to create task:", error);
      setError("Failed to create task. Please try again.");
      toast.error("Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-8 max-w-3xl m-16 ">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Create New Task</h1>
          <p className="text-muted-foreground">
            Create a new task for your track
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => onSubmit(data, false))}
          className="space-y-6"
        >
          <Card className="p-6">
            <div className="space-y-8">
              {/* Basic Information */}
              <BasicInformation form={form} />

              {/* Grading Settings */}
              <div className="space-y-6">
                <GradingSettings form={form} />
                <AdvancedGradingSettings form={form} />
              </div>

              {/* Deadline Settings */}
              <DeadlineSettings form={form} />

              {/* Task Instructions */}
              <TaskInstructions form={form} />

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    localStorage.removeItem("task-form-data");
                    form.reset();
                  }}
                  disabled={isSubmitting}
                >
                  Reset
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => onSubmit(form.getValues(), true)}
                  disabled={isSubmitting}
                >
                  Save as Draft
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create Task
                </Button>
              </div>
            </div>
          </Card>
        </form>
      </Form>
    </div>
  );
}
