// components/tasks/create/AdvancedGradingSettings.tsx
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Star, Clock, Bell } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { TaskFormData } from "@/components/tasks/create/store/taskFormStore";

interface AdvancedGradingSettingsProps {
  form: UseFormReturn<TaskFormData>;
}

export function AdvancedGradingSettings({
  form,
}: AdvancedGradingSettingsProps) {
  const watchRequireGraderFeedback = form.watch(
    "settings.requireGraderFeedback"
  );
  const watchAutoPublishGrades = form.watch("settings.autoPublishGrades");

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Advanced Grading Options</h3>
        <p className="text-muted-foreground text-sm">
          Configure additional grading settings and automation
        </p>
      </div>

      <Separator />

      {/* Grader Feedback Settings */}
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="settings.requireGraderFeedback"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-md border p-4">
              <div className="flex h-full items-center">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <FormLabel>Require Written Feedback</FormLabel>
                    <FormDescription>
                      Require graders to provide written comments with their
                      grades
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
                {watchRequireGraderFeedback && (
                  <div className="mt-2 text-sm bg-muted p-3 rounded-md">
                    Graders must provide written feedback before submitting
                    their grade
                  </div>
                )}
              </div>
            </FormItem>
          )}
        />

        {/* Grade Publishing Settings */}
        <FormField
          control={form.control}
          name="settings.autoPublishGrades"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-md border p-4">
              <div className="flex h-full items-center">
                <Star className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <FormLabel>Auto-publish Grades</FormLabel>
                    <FormDescription>
                      Automatically publish grades when all required grades are
                      received
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
                {watchAutoPublishGrades && (
                  <div className="mt-2 text-sm bg-muted p-3 rounded-md">
                    Grades will be published automatically once all required
                    graders have submitted their grades
                  </div>
                )}
              </div>
            </FormItem>
          )}
        />

        {/* Notification Settings */}
        <FormField
          control={form.control}
          name="settings.notifyOnSubmission"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-md border p-4">
              <div className="flex h-full items-center">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <FormLabel>Grade Submission Notifications</FormLabel>
                    <FormDescription>
                      Receive notifications when grades are submitted
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              </div>
            </FormItem>
          )}
        />
      </div>

      {/* Status Summary */}
      <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
        <h4 className="font-medium">Current Configuration:</h4>
        <ul className="space-y-1 list-disc list-inside">
          <li>
            Written feedback is{" "}
            {watchRequireGraderFeedback ? "required" : "optional"} for graders
          </li>
          <li>
            Grades will be{" "}
            {watchAutoPublishGrades
              ? "automatically published"
              : "manually published"}{" "}
            after completion
          </li>
          <li>
            Grade submission notifications are{" "}
            {form.watch("settings.notifyOnSubmission") ? "enabled" : "disabled"}
          </li>
        </ul>
      </div>
    </Card>
  );
}
