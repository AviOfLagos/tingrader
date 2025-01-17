// components/tasks/create/TaskInstructions.tsx
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { TaskFormData } from "./store/taskFormStore";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface TaskInstructionsProps {
  form: UseFormReturn<TaskFormData>;
}

export function TaskInstructions({ form }: TaskInstructionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Task Instructions</h2>
      </div>

      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          Provide clear and detailed instructions. Include any specific
          requirements, guidelines, or resources needed to complete the task.
        </AlertDescription>
      </Alert>

      <Card className="p-4">
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed Instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter detailed task instructions..."
                  className="min-h-[200px] font-mono"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can use markdown for formatting. Include:
              </FormDescription>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Clear objectives and requirements</li>
                <li>Step-by-step instructions if applicable</li>
                <li>Evaluation criteria</li>
                <li>Any resources or references</li>
                <li>Submission guidelines</li>
              </ul>
              <FormMessage />
            </FormItem>
          )}
        />
      </Card>

      {/* Preview section can be added here later */}
    </div>
  );
}
