// components/tasks/create/GradingSettings.tsx
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { TaskFormData } from "./store/taskFormStore";

interface GradingSettingsProps {
  form: UseFormReturn<TaskFormData>;
}

export function GradingSettings({ form }: GradingSettingsProps) {
  const watchGradingType = form.watch("gradingType");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Grading Settings</h2>

      <FormField
        control={form.control}
        name="gradingType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Grading Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select grading type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="stars">Star Rating</SelectItem>
                <SelectItem value="swipe">Swipe (Pass/Fail)</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {watchGradingType === "stars" && (
        <>
          <FormField
            control={form.control}
            name="gradingConfig.maxStars"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Stars</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    placeholder="Maximum stars (1-10)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gradingConfig.passMarkPerGrader"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pass Mark per Grader</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Minimum stars needed to pass"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      <FormField
        control={form.control}
        name="requiredGrades"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Required Grades per Submission</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="1"
                placeholder="Number of graders needed"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Number of graders that must grade each submission
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
