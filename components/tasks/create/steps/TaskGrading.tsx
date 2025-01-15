// "use client";

import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface TaskGradingData {
  gradingType: 'swipe' | 'stars';
  passingScore?: number;
  dueDate?: string;
  assignedGraders?: string[];
}

interface TaskGradingProps {
  data: TaskGradingData;
  updateData: (data: Partial<TaskGradingData>) => void;
}

export default function TaskGrading({ data, updateData }: TaskGradingProps) {
  return (
    <div className="space-y-6">
      {/* Grading Type Selection */}
      <FormField
        name="gradingType"
        render={() => (
          <FormItem>
            <FormLabel>Grading Method</FormLabel>
            <FormControl>
              <RadioGroup
                value={data.gradingType}
                onValueChange={(value: 'swipe' | 'stars') =>
                  updateData({ gradingType: value })
                }
                className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
              >
                <Card
                  className={`relative flex items-center space-x-4 p-4 cursor-pointer ${
                    data.gradingType === 'swipe' ? 'border-primary' : ''
                  }`}
                >
                  <RadioGroupItem
                    value="swipe"
                    id="swipe"
                    className="absolute right-4"
                  />
                  <div className="flex-shrink-0">
                    <ThumbsUp className="h-6 w-6" />
                  </div>
                  <div>
                    <label htmlFor="swipe" className="font-medium">
                      Swipe Grading
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Simple pass/fail grading with swipe gestures
                    </p>
                  </div>
                </Card>

                <Card
                  className={`relative flex items-center space-x-4 p-4 cursor-pointer ${
                    data.gradingType === 'stars' ? 'border-primary' : ''
                  }`}
                >
                  <RadioGroupItem
                    value="stars"
                    id="stars"
                    className="absolute right-4"
                  />
                  <div className="flex-shrink-0">
                    <Star className="h-6 w-6" />
                  </div>
                  <div>
                    <label htmlFor="stars" className="font-medium">
                      Star Rating
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Detailed 0-7 star rating system
                    </p>
                  </div>
                </Card>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      {/* Passing Score - Only show for star rating */}
      {data.gradingType === 'stars' && (
        <FormField
          name="passingScore"
          render={() => (
            <FormItem>
              <FormLabel>Passing Score</FormLabel>
              <FormControl>
                <Select
                  value={String(data.passingScore || '')}
                  onValueChange={(value: string) =>
                    updateData({ passingScore: Number(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select minimum passing score" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((score) => (
                      <SelectItem key={score} value={String(score)}>
                        {score} {score === 1 ? 'star' : 'stars'} or higher
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Interns must achieve this score or higher to pass the task
              </FormDescription>
            </FormItem>
          )}
        />
      )}

      {/* Due Date */}
      <FormField
        name="dueDate"
        render={() => (
          <FormItem>
            <FormLabel>Due Date</FormLabel>
            <FormControl>
              <Input
                type="datetime-local"
                value={data.dueDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateData({ dueDate: e.target.value })
                }
              />
            </FormControl>
            <FormDescription>
              Set a deadline for task submissions
            </FormDescription>
          </FormItem>
        )}
      />

      {/* Grader Assignment */}
      <FormField
        name="assignedGraders"
        render={() => (
          <FormItem>
            <FormLabel>Assign Graders</FormLabel>
            <FormControl>
              <Select
                value={data.assignedGraders?.[0] || ''}
                onValueChange={(value: string) =>
                  updateData({ assignedGraders: [value] })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select grader" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grader1">John Smith (Frontend)</SelectItem>
                  <SelectItem value="grader2">
                    Sarah Johnson (Backend)
                  </SelectItem>
                  <SelectItem value="grader3">Mike Wilson (Mobile)</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>
              Assign one or more graders to review submissions
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
}
