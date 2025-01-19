// app/(dashboard)/tasks/create/page.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2, ArrowLeft } from "lucide-react";
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
import dynamic from "next/dynamic";

const TaskCreationModal = dynamic(() =>
  import("@/components/tasks/create/TaskCreationModal").then((mod) => mod.TaskCreationModal),
  { ssr: false }
);
import { toast } from "sonner";

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

export default function CreateTaskPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const [createdTaskId, setCreatedTaskId] = React.useState<string | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const { formData, updateForm, resetForm } = useTaskFormStore();

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: formData,
    mode: "onTouched",
  });

  // Load cached form data on mount
  useEffect(() => {
    const cachedData = localStorage.getItem("task-form-data");
    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData);
        if (parsedData.dueDate) {
          parsedData.dueDate = new Date(parsedData.dueDate);
        }
        form.reset(parsedData);
      } catch (err) {
        console.error("Error loading cached form data:", err);
        localStorage.removeItem("task-form-data");
      }
    }
    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData);
        if (parsedData.dueDate) {
          parsedData.dueDate = new Date(parsedData.dueDate);
        }
        form.reset(parsedData);
      } catch (err) {
        console.error("Error loading cached form data:", err);
        localStorage.removeItem("task-form-data");
      }
    }
  }, [form]);

  // Update store and cache when form changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      try {
        const dataToCache = { ...value };
        localStorage.setItem("task-form-data", JSON.stringify(dataToCache));
        updateForm(value as TaskFormData);
      } catch (err) {
        console.error("Error caching form data:", err);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, form.watch, updateForm]);

  async function onSubmit(data: TaskFormData, asDraft: boolean = false) {
    try {
      setIsSubmitting(true);
      setError(null);
      setSubmitError(null);

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

      // Simulate a successful response with a task ID
      const taskId = `task-${Math.random().toString(36).substr(2, 9)}`;

      // In CreateTaskPage component's onSubmit function
if (!asDraft) {
  localStorage.removeItem("task-form-data");
  resetForm();
  setCreatedTaskId(taskId);
  setShowModal(true);
  // Updated this line to match your route structure
  // router.push('/tasks'); // old line
  router.push('/tasks'); // new line, when they click close on modal

      } else {
        toast.success("Draft saved successfully!");
      }
    } catch (error) {
      console.error("Failed to create task:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Failed to create task"
      );
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleCancel = () => {
    if (form.formState.isDirty) {
      const currentData = form.getValues();
      localStorage.setItem("task-form-data", JSON.stringify(currentData));
      toast.info("Progress saved as draft");
    }
    router.back();
  };

  return (
    <>
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
              <h1 className="text-3xl font-bold">Create New Task</h1>
            </div>
            <p className="text-muted-foreground ml-9">
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
                    onClick={() => {
                      if (confirm("Are you sure you want to reset the form?")) {
                        resetForm();
                        localStorage.removeItem("task-form-data");
                        form.reset();
                        toast.info("Form reset successfully");
                      }
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

      <TaskCreationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        taskId={createdTaskId || ""}
        taskTitle={form.getValues().title}
        isError={!!submitError}
        errorMessage={submitError || ""}
      />
    </>
  );
}

