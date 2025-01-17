// components/tasks/create/DeadlineSettings.tsx
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
import { Switch } from "@/components/ui/switch";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { UseFormReturn } from "react-hook-form";
import { TaskFormData } from "./store/taskFormStore";

interface DeadlineSettingsProps {
  form: UseFormReturn<TaskFormData>;
}

export function DeadlineSettings({ form }: DeadlineSettingsProps) {
  const watchAllowLateSubmissions = form.watch("settings.allowLateSubmissions");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Deadline Settings</h2>

      <FormField
        control={form.control}
        name="dueDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Due Date</FormLabel>
            <FormControl>
              <DateTimePicker date={field.value ?? undefined} setDate={field.onChange} />
            </FormControl>
            <FormDescription>
              Set when this task should be completed
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4 border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
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
              <FormMessage />
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
                  <Input
                    type="number"
                    min="1"
                    max="168"
                    placeholder="Hours allowed after due date"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
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
              Maximum number of times an intern can submit for this task
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
