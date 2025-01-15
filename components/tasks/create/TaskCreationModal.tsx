// "use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import TaskBasicInfo from './steps/TaskBasicInfo';
import TaskRequirements from './steps/TaskRequirements';
import TaskGrading from './steps/TaskGrading';
import TaskReview from './steps/TaskReview';

interface TaskCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  title: string;
  description: string;
  track: string;
  stage: string;
  requirements: string;
  resources: string[];
  gradingType: 'swipe' | 'stars';
  passingScore: number;
  dueDate: string;
  assignedGraders: string[];
}

type Step = {
  id: number;
  title: string;
  description: string;
};

const steps: Step[] = [
  { id: 1, title: 'Basic Info', description: 'Task title and description' },
  { id: 2, title: 'Requirements', description: 'Instructions and resources' },
  { id: 3, title: 'Grading', description: 'Set grading criteria' },
  { id: 4, title: 'Review', description: 'Review and publish' },
];

export default function TaskCreationModal({
  isOpen,
  onClose,
}: TaskCreationModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    track: '',
    stage: '',
    requirements: '',
    resources: [],
    gradingType: 'swipe', // Default to 'swipe' or you can set it to '' if preferred
    passingScore: 0,
    dueDate: '',
    assignedGraders: [],
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
    setCurrentStep(1);
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>

        {/* Stepper */}
        <div className="relative mb-8">
          <div className="absolute top-5 w-full h-[2px] bg-muted" />
          <div className="relative flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 
                      ${
                        currentStep >= step.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                >
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className="text-sm font-medium">{step.title}</p>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 1 && (
                <TaskBasicInfo data={formData} updateData={updateFormData} />
              )}
              {currentStep === 2 && (
                <TaskRequirements data={formData} updateData={updateFormData} />
              )}
              {currentStep === 3 && (
                <TaskGrading data={formData} updateData={updateFormData} />
              )}
              {currentStep === 4 && <TaskReview data={formData} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? onClose : handleBack}
          >
            {currentStep === 1 ? (
              <>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </>
            ) : (
              'Back'
            )}
          </Button>
          <Button
            onClick={currentStep === steps.length ? handleSubmit : handleNext}
          >
            {currentStep === steps.length ? (
              'Create Task'
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
