"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Save, Upload, Plus, Trash2 } from 'lucide-react';
import * as z from 'zod';

const CACHE_KEY = 'task-creation-cache';

// Form validation schema
const taskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  track: z.string().min(1, 'Please select a track'),
  stage: z.string().min(1, 'Stage number is required'),
  gradingMethod: z.enum(['stars', 'swipe']),
  maxStars: z.number().min(1).max(10).optional(),
  passMark: z.number().min(1),
  maxGraders: z.number().min(1),
  maxSubmissions: z.number().min(1),
  dueDate: z.string().min(1, 'Due date is required'),
  gradingCriteria: z.array(z.object({
    criterion: z.string().min(1),
    weight: z.number().min(1).max(100)
  })),
  graderInstructions: z.string().min(10, 'Grading instructions must be at least 10 characters'),
  attachments: z.array(z.any()).optional()
});

interface TaskCreationWizardProps {
  onClose: () => void;
}

interface FormErrors {
  [key: string]: string[];
}

const TaskCreationWizard: React.FC<TaskCreationWizardProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    track: '',
    stage: '',
    gradingMethod: 'stars',
    maxStars: 5,
    passMark: 3,
    maxGraders: 3,
    maxSubmissions: 50,
    dueDate: '',
    gradingCriteria: [{ criterion: '', weight: 0 }],
    graderInstructions: '',
    attachments: [] as File[],
  });

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      setFormData(JSON.parse(cached));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(formData));
  }, [formData]);

  const validateStep = (stepIndex: number) => {
    try {
      switch (stepIndex) {
        case 0:
          taskSchema.pick({ title: true, description: true, track: true, stage: true }).parse(formData);
          break;
        case 1:
          taskSchema.pick({ gradingMethod: true, maxStars: true, passMark: true }).parse(formData);
          break;
        case 2:
          taskSchema.pick({ maxGraders: true, maxSubmissions: true, dueDate: true }).parse(formData);
          break;
        case 3:
          taskSchema.pick({ gradingCriteria: true, graderInstructions: true }).parse(formData);
          break;
      }
      setErrors({});
      return true;
    } catch (e: any) {
      setErrors(e.formErrors?.fieldErrors || {});
      return false;
    }
  };

  const steps = [
    {
      title: 'Basic Info',
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Task Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter task description"
              className={`min-h-32 ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <Label>Attachments</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              <Input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setFormData({ ...formData, attachments: [...formData.attachments, ...files] });
                }}
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 mx-auto mb-2" />
                <p>Click to upload or drag and drop</p>
              </Label>
            </div>
            {formData.attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-secondary p-2 rounded">
                    <span>{file.name}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setFormData({
                        ...formData,
                        attachments: formData.attachments.filter((_, i) => i !== index)
                      })}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      title: 'Grading Method',
      content: (
        <div className="space-y-6">
          <Tabs defaultValue="stars" onValueChange={(value) => setFormData({ ...formData, gradingMethod: value })}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stars">Star Rating</TabsTrigger>
              <TabsTrigger value="swipe">Swipe (Pass/Fail)</TabsTrigger>
            </TabsList>

            <TabsContent value="stars" className="space-y-4">
              <div className="space-y-2">
                <Label>Maximum Stars</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.maxStars}
                  onChange={(e) => setFormData({ ...formData, maxStars: parseInt(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label>Pass Mark (Stars)</Label>
                <Input
                  type="number"
                  min="1"
                  max={formData.maxStars}
                  value={formData.passMark}
                  onChange={(e) => setFormData({ ...formData, passMark: parseInt(e.target.value) })}
                />
              </div>
            </TabsContent>

            <TabsContent value="swipe" className="space-y-4">
              <div className="space-y-2">
                <Label>Pass Percentage</Label>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.passMark}
                  onChange={(e) => setFormData({ ...formData, passMark: parseInt(e.target.value) })}
                />
                <p className="text-sm text-muted-foreground">Percentage of graders needed to pass</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )
    },
    {
      title: 'Grading Criteria',
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <Label>Grading Criteria</Label>
            {formData.gradingCriteria.map((criterion, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-grow">
                  <Input
                    value={criterion.criterion}
                    onChange={(e) => {
                      const newCriteria = [...formData.gradingCriteria];
                      newCriteria[index].criterion = e.target.value;
                      setFormData({ ...formData, gradingCriteria: newCriteria });
                    }}
                    placeholder="Enter criterion"
                  />
                </div>
                <div className="w-24">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={criterion.weight}
                    onChange={(e) => {
                      const newCriteria = [...formData.gradingCriteria];
                      newCriteria[index].weight = parseInt(e.target.value);
                      setFormData({ ...formData, gradingCriteria: newCriteria });
                    }}
                    placeholder="Weight %"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const newCriteria = formData.gradingCriteria.filter((_, i) => i !== index);
                    setFormData({ ...formData, gradingCriteria: newCriteria });
                  }}
                  disabled={formData.gradingCriteria.length === 1}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFormData({
                ...formData,
                gradingCriteria: [...formData.gradingCriteria, { criterion: '', weight: 0 }]
              })}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Criterion
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Grader Instructions</Label>
            <Textarea
              value={formData.graderInstructions}
              onChange={(e) => setFormData({ ...formData, graderInstructions: e.target.value })}
              placeholder="Enter detailed instructions for graders..."
              className="min-h-32"
            />
            <p className="text-sm text-muted-foreground">These instructions will only be visible to mentors and graders</p>
          </div>
        </div>
      )
    }
  ];

  const handleSubmit = () => {
    try {
      taskSchema.parse(formData);
      console.log('Final form data:', formData);
      localStorage.removeItem(CACHE_KEY);
    } catch (e: any) {
      setErrors(e.formErrors?.fieldErrors || {});
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${index > 0 ? 'ml-4' : ''}`}
                  >
                    {index > 0 && (
                      <div className="w-12 h-0.5 -ml-6 bg-muted"/>
                    )}
                    <Button
                      variant={currentStep === index ? "default" : "outline"}
                      size="sm"
                      className="rounded-full w-8 h-8 p-0"
                      onClick={() => validateStep(currentStep) && setCurrentStep(index)}
                    >
                      {index + 1}
                    </Button>
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium">{steps[currentStep].title}</span>
            </div>

            <div className="py-4">
              {steps[currentStep].content}
            </div>

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(current => current - 1)}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button onClick={handleSubmit}>
                  <Save className="w-4 h-4 mr-2" />
                  Create Task
                </Button>
              ) : (
                <Button
                  onClick={() => validateStep(currentStep) && setCurrentStep(current => current + 1)}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskCreationWizard;