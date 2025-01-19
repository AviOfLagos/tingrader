// components/tasks/create/AdvancedGradingSettings.tsx
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
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Star, Clock, Bell } from "lucide-react";
import { TaskFormData } from "@/types/TaskFormData";

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
  const watchNotifyOnSubmission = form.watch("settings.notifyOnSubmission");

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Advanced Grading Options</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Configure additional grading settings and automation
          </p>
        </div>

        <Separator />

        <div className="space-y-4">
          {/* Grader Feedback Settings */}
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
                </div>
              </FormItem>
            )}
          />

          {/* Auto-publish Settings */}
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
                        Automatically publish grades when all required grades
                        are received
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

        {/* Summary of Settings */}
        <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
          <h4 className="font-medium">Active Settings:</h4>
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
              Submission notifications are{" "}
              {watchNotifyOnSubmission ? "enabled" : "disabled"}
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
