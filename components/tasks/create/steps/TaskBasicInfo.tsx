// "use client";

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';

interface TaskData {
  title: string;
  description: string;
  track: string;
  stage: string;
}

interface TaskBasicInfoProps {
  data: TaskData;
  updateData: (data: Partial<TaskData>) => void;
}

export default function TaskBasicInfo({
  data,
  updateData,
}: TaskBasicInfoProps) {
  const tracks = [
    { id: 'frontend', name: 'Frontend Development' },
    { id: 'backend', name: 'Backend Development' },
    { id: 'mobile', name: 'Mobile Development' },
    { id: 'design', name: 'UI/UX Design' },
  ];

  const stages = [
    { id: '1', name: 'Stage 1' },
    { id: '2', name: 'Stage 2' },
    { id: '3', name: 'Stage 3' },
  ];

  return (
    <div className="space-y-4">
      <FormField
        name="title"
        render={() => (
          <FormItem>
            <FormLabel>Task Title</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., Build a REST API"
                value={data.title}
                onChange={(e) => updateData({ title: e.target.value })}
              />
            </FormControl>
            <FormDescription>
              Choose a clear, descriptive title for your task
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        name="description"
        render={() => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the task and its objectives..."
                value={data.description}
                onChange={(e) => updateData({ description: e.target.value })}
                className="min-h-[100px]"
              />
            </FormControl>
            <FormDescription>
              Provide a detailed description of what interns need to accomplish
            </FormDescription>
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          name="track"
          render={() => (
            <FormItem>
              <FormLabel>Track</FormLabel>
              <Select
                value={data.track}
                onValueChange={(value) => updateData({ track: value })}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select track" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tracks.map((track) => (
                    <SelectItem key={track.id} value={track.id}>
                      {track.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Assign this task to a specific track
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          name="stage"
          render={() => (
            <FormItem>
              <FormLabel>Stage</FormLabel>
              <Select
                value={data.stage}
                onValueChange={(value) => updateData({ stage: value })}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage.id} value={stage.id}>
                      {stage.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the appropriate stage level
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
