"use client";

import React, { useEffect, useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const fileSchema = z.object({
  name: z.string(),
  type: z
    .string()
    .refine(
      (type) => ['image/png', 'image/jpeg', 'application/pdf'].includes(type),
      {
        message: 'Only PNG, JPEG, and PDF files are allowed',
      }
    ),
  size: z.number().max(5 * 1024 * 1024, 'File size must be under 5MB'),
});

const taskSubmissionSchema = z.object({
  title: z.string().min(1, 'Task title is required'),
  description: z.string().min(1, 'Description is required'),
  resourceLinks: z.string().optional(),
  files: z.array(fileSchema).default([]),
});

type TaskSubmissionFormValues = z.infer<typeof taskSubmissionSchema>;

const LOCAL_STORAGE_KEY = 'taskSubmissionForm';

const TaskSubmissionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<TaskSubmissionFormValues>({
    resolver: zodResolver(taskSubmissionSchema),
    defaultValues: {
      title: '',
      description: '',
      resourceLinks: '',
      files: [],
    },
  });

  // Load form state from local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        form.reset(JSON.parse(savedData));
      }
    }
  }, [form]);

  // Save form state to local storage on change
  useEffect(() => {
    const subscription = form.watch((value) => {
      const { files: formFiles, ...rest } = value; // Exclude files
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rest));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    const fileMetadata = newFiles.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
    }));
    form.setValue('files', [...form.getValues('files'), ...fileMetadata]);
  };

  const handleSubmit = async (data: TaskSubmissionFormValues) => {
    setIsSubmitting(true);

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      // Simulate submission delay
      setTimeout(() => {
        setIsSubmitting(false);
        setUploadProgress(0);
        form.reset();
        setFiles([]);
        if (typeof window !== 'undefined') {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
        clearInterval(interval);
      }, 5000);
    } catch (error) {
      // Handle submission error
      console.error(error);
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide detailed description of your submission"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Resource Links Field */}
            <FormField
              control={form.control}
              name="resourceLinks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resource Links</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Add relevant links (GitHub, docs, etc.)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File Upload Area */}
            <FormItem>
              <FormLabel>Attach Files</FormLabel>
              <FormControl>
                <div
                  onDrop={(e) => {
                    e.preventDefault();
                    const droppedFiles = Array.from(e.dataTransfer.files);
                    const validFiles = droppedFiles.filter((file) =>
                      ['image/png', 'image/jpeg', 'application/pdf'].includes(
                        file.type
                      )
                    );
                    if (validFiles.length !== droppedFiles.length) {
                      alert('Only PNG, JPEG, and PDF files are allowed.');
                    }
                    handleFileChange(validFiles);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-blue-500 hover:text-blue-400"
                    >
                      Click to upload
                    </label>
                    {' or drag and drop'}
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const selectedFiles = Array.from(e.target.files || []);
                      const validFiles = selectedFiles.filter((file) =>
                        ['image/png', 'image/jpeg', 'application/pdf'].includes(
                          file.type
                        )
                      );
                      if (validFiles.length !== selectedFiles.length) {
                        alert('Only PNG, JPEG, and PDF files are allowed.');
                      }
                      handleFileChange(validFiles);
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                  >
                    <span className="text-sm truncate">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newFiles = files.filter((_, i) => i !== index);
                        setFiles(newFiles);
                        const newFileMetadata = newFiles.map((file) => ({
                          name: file.name,
                          type: file.type,
                          size: file.size,
                        }));
                        form.setValue('files', newFileMetadata);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Progress */}
            {isSubmitting && (
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Task'
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default TaskSubmissionForm;
