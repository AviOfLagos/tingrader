// "use client";

import React, { useState } from 'react';
import { X, Plus, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Card } from '@/components/ui/card';

interface TaskRequirementsData {
  requirements: string;
  resources: string[];
}

interface TaskRequirementsProps {
  data: TaskRequirementsData;
  updateData: (data: Partial<TaskRequirementsData>) => void;
}

export default function TaskRequirements({
  data,
  updateData,
}: TaskRequirementsProps) {
  const [newResource, setNewResource] = useState('');

  const addResource = () => {
    if (newResource.trim()) {
      updateData({
        resources: [...(data.resources || []), newResource.trim()],
      });
      setNewResource('');
    }
  };

  const removeResource = (index: number) => {
    const updatedResources = [...(data.resources || [])];
    updatedResources.splice(index, 1);
    updateData({ resources: updatedResources });
  };

  return (
    <div className="space-y-6">
      <FormField
        name="requirements"
        render={() => (
          <FormItem>
            <FormLabel>Task Requirements</FormLabel>
            <FormControl>
              <Textarea
                placeholder="List all requirements and acceptance criteria..."
                value={data.requirements}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  updateData({ requirements: e.target.value })
                }
                className="min-h-[200px]"
              />
            </FormControl>
            <FormDescription>
              Clearly outline what interns need to deliver and any specific
              requirements
            </FormDescription>
          </FormItem>
        )}
      />

      <div>
        <FormLabel>Resources & References</FormLabel>
        <FormDescription className="mb-3">
          Add helpful links, documentation, or references for this task
        </FormDescription>

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Add resource URL or description"
              value={newResource}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewResource(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addResource();
                }
              }}
            />
            <Button type="button" variant="secondary" onClick={addResource}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>

          {/* Resource List */}
          <div className="space-y-2">
            {(data.resources || []).map((resource: string, index: number) => (
              <Card
                key={index}
                className="p-3 flex items-center justify-between"
              >
                <span className="text-sm truncate">{resource}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeResource(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* File Upload Area - UI Only */}
      <div className="border-2 border-dashed rounded-lg p-6 text-center">
        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-2">
          Drag and drop files here, or click to select files
        </p>
        <Button variant="secondary" size="sm">
          Choose Files
        </Button>
      </div>
    </div>
  );
}
