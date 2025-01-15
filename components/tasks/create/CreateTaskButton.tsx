"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  track: z.string().min(1, "Track is required"),
  stage: z.string().min(1, "Stage is required"),
  requirements: z.string().optional(),
  resources: z.array(z.string()).default([]),
  gradingType: z.enum(["stars", "swipe"]),
  passingScore: z.number().min(0).max(7).optional(),
  dueDate: z.string().optional(),
  assignedGraders: z.array(z.string()).default([]),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

interface StepComponentProps {
  form: UseFormReturn<TaskFormValues>;
}

interface CreateTaskButtonProps {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

function TaskBasicInfo({ form }: StepComponentProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Task Title</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g., Build a REST API" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Describe the task..."
                className="min-h-[100px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="track"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Track</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Select track" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="stage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Stage</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Select stage" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function TaskRequirements({ form }: StepComponentProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="requirements"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Requirements</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="List the task requirements..."
                className="min-h-[200px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function TaskGrading({ form }: StepComponentProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="gradingType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Grading Method</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 gap-4"
              >
                <FormItem>
                  <FormControl>
                    <RadioGroupItem value="stars" />
                  </FormControl>
                  <FormLabel>Star Rating</FormLabel>
                </FormItem>
                <FormItem>
                  <FormControl>
                    <RadioGroupItem value="swipe" />
                  </FormControl>
                  <FormLabel>Swipe Grading</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="dueDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Due Date</FormLabel>
            <FormControl>
              <Input {...field} type="datetime-local" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default function CreateTaskButton({
  variant = "default",
  size = "default",
  className,
}: CreateTaskButtonProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      track: "",
      stage: "",
      requirements: "",
      resources: [],
      gradingType: "stars",
      passingScore: 4,
      assignedGraders: [],
    },
  });

  function onSubmit(values: TaskFormValues) {
    console.log(values);
    setOpen(false);
    setStep(1);
    form.reset();
  }

  const steps = [
    {
      title: "Basic Info",
      fields: ["title", "description", "track", "stage"],
    },
    {
      title: "Requirements",
      fields: ["requirements", "resources"],
    },
    {
      title: "Grading",
      fields: ["gradingType", "passingScore", "dueDate", "assignedGraders"],
    },
  ];

  const currentStep = steps[step - 1];

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setOpen(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        Create Task
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Task - {currentStep.title}</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {step === 1 && <TaskBasicInfo form={form} />}
              {step === 2 && <TaskRequirements form={form} />}
              {step === 3 && <TaskGrading form={form} />}

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (step === 1) {
                      setOpen(false);
                      setStep(1);
                    } else {
                      setStep(step - 1);
                    }
                  }}
                >
                  {step === 1 ? "Cancel" : "Back"}
                </Button>

                <Button
                  type={step === steps.length ? "submit" : "button"}
                  onClick={() => {
                    if (step < steps.length) {
                      setStep(step + 1);
                    }
                  }}
                >
                  {step === steps.length ? "Create Task" : "Next"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
