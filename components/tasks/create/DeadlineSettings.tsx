// components/tasks/create/DeadlineSettings.tsx
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
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Clock, InfoIcon } from "lucide-react";
import { TaskFormData } from "@/types/TaskFormData";
import { DateTimePicker } from "@/components/ui/date-time-picker";

interface DeadlineSettingsProps {
  form: UseFormReturn<TaskFormData>;
}

export function DeadlineSettings({ form }: DeadlineSettingsProps) {
  const watchAllowLateSubmissions = form.watch("settings.allowLateSubmissions");

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Deadline Settings</h2>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date and Time</FormLabel>
                <FormControl>
                  <DateTimePicker
                    date={field.value}
                    setDate={(date) => field.onChange(date)}
                  />
                </FormControl>
                <FormDescription>
                  Set when this task should be completed
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="rounded-lg border p-4 space-y-4">
            <FormField
              control={form.control}
              name="settings.allowLateSubmissions"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel>Allow Late Submissions</FormLabel>
                    <FormDescription>
                      Accept submissions after the due date
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {watchAllowLateSubmissions && (
              <FormField
                control={form.control}
                name="settings.gracePeriodHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grace Period (Hours)</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          min="1"
                          max="168"
                          placeholder="Hours allowed after due date"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Maximum 168 hours (1 week) grace period
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <FormField
            control={form.control}
            name="maxSubmissions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Submissions</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    placeholder="Maximum attempts allowed"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Maximum number of times a user can submit for this task
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {watchAllowLateSubmissions && (
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              Late submissions will be accepted up to{" "}
              {form.watch("settings.gracePeriodHours")} hours after the due
              date. Maximum submissions per user: {form.watch("maxSubmissions")}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </Card>
  );
}
