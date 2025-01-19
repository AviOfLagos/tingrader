// components/tasks/create/TaskInstructions.tsx
import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, FileText } from "lucide-react";
import { TaskFormData } from "@/types/TaskFormData";

interface TaskInstructionsProps {
  form: UseFormReturn<TaskFormData>;
}

export function TaskInstructions({ form }: TaskInstructionsProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Task Instructions</h2>
            <p className="text-sm text-muted-foreground">
              Provide clear instructions for completing the task
            </p>
          </div>
          <FileText className="h-5 w-5 text-muted-foreground" />
        </div>

        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            Provide clear, detailed instructions that explain what students need
            to do, submission requirements, and evaluation criteria.
          </AlertDescription>
        </Alert>

        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter detailed task instructions..."
                  className="min-h-[200px] font-mono"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Include:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Clear objectives and requirements</li>
                  <li>Step-by-step instructions if applicable</li>
                  <li>Evaluation criteria and grading rubric</li>
                  <li>Any resources or references needed</li>
                  <li>Submission format guidelines</li>
                </ul>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-sm text-muted-foreground">
          <p>Tip: You can use markdown for formatting your instructions:</p>
          <pre className="mt-2 p-2 bg-muted rounded-md">
            # Headers{"\n"}
            **Bold text**{"\n"}- Bullet points{"\n"}
            1. Numbered lists{"\n"}
            `code examples`
          </pre>
        </div>
      </div>
    </Card>
  );
}
