// components/tracks/TrackForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TrackWithStats } from "@/types/profile";
import { Loader2 } from "lucide-react";

const trackFormSchema = z.object({
  name: z.string().min(1, "Track name is required"),
  description: z.string().nullable(),
  stages: z.array(z.number()).min(1, "At least one stage is required"),
  is_active: z.boolean(),
  is_default: z.boolean().optional(),
});

export type TrackFormData = z.infer<typeof trackFormSchema>;

interface TrackFormProps {
  track?: TrackWithStats;
  onSubmit: (data: TrackFormData) => Promise<void>;
  onCancel: () => void;
}

export function TrackForm({ track, onSubmit, onCancel }: TrackFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<TrackFormData>({
    resolver: zodResolver(trackFormSchema),
    defaultValues: track
      ? {
          name: track.name,
          description: track.description || "",
          stages: track.stages.map(Number),
          is_active: track.is_active,
          is_default: false,
        }
      : {
          name: "",
          description: "",
          stages: [1],
          is_active: true,
          is_default: false,
        },
  });

  const handleSubmit = async (data: TrackFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Track Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter track name" {...field} />
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
                  placeholder="Enter track description"
                  className="h-24"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>
                Provide a brief description of what interns will learn in this
                track
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stages</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((stage) => (
                    <Button
                      key={stage}
                      type="button"
                      variant={
                        field.value.includes(stage) ? "default" : "outline"
                      }
                      onClick={() => {
                        const newStages = field.value.includes(stage)
                          ? field.value.filter((s) => s !== stage)
                          : [...field.value, stage].sort();
                        field.onChange(newStages);
                      }}
                    >
                      Stage {stage}
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Active Track</FormLabel>
                  <FormDescription>
                    Interns can join and submit tasks
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

          <FormField
            control={form.control}
            name="is_default"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Default Track</FormLabel>
                  <FormDescription>
                    New interns are automatically added
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
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {track ? "Update Track" : "Create Track"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
