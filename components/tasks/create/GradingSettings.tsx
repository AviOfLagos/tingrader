// components/tasks/create/GradingSettings.tsx
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Star, ThumbsUp } from "lucide-react";
import { TaskFormData } from "@/types/TaskFormData";

interface GradingSettingsProps {
  form: UseFormReturn<TaskFormData>;
}

export function GradingSettings({ form }: GradingSettingsProps) {
  const watchGradingType = form.watch("gradingType");
  const watchRequireGraderFeedback = form.watch(
    "settings.requireGraderFeedback"
  );

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Grading Settings</h2>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="gradingType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grading Method</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grading method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="stars">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-2" />
                        Star Rating
                      </div>
                    </SelectItem>
                    <SelectItem value="swipe">
                      <div className="flex items-center">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Pass/Fail
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  {watchGradingType === "stars"
                    ? "Star rating allows detailed feedback with customizable maximum stars"
                    : "Pass/Fail provides simple binary grading"}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchGradingType === "stars" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Maximum star rating graders can give
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gradingConfig.passMarkPerGrader"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pass Mark</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        placeholder="Minimum stars to pass"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      Minimum stars needed to pass
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <FormField
            control={form.control}
            name="requiredGrades"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required Grades</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    placeholder="Number of graders needed"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Number of graders that must evaluate each submission
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            {watchGradingType === "stars"
              ? `Submissions will require ${form.watch("requiredGrades")} graders, each giving 1-${form.watch("gradingConfig.maxStars")} stars${watchRequireGraderFeedback ? " with written feedback" : ""}`
              : `Submissions will require ${form.watch("requiredGrades")} graders to pass/fail${watchRequireGraderFeedback ? " with written feedback" : ""}`}
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
}
