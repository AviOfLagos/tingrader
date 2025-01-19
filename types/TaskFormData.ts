// types/TaskFormData.ts

import { TrackName, GradingType } from "./task";

export interface TaskFormData {
  title: string;
  description: string;
  track: TrackName;
  stage: number;
  gradingType: GradingType;
  dueDate: Date | null;
  maxSubmissions: number;
  requiredGrades: number;
  instructions: string;
  isDraft: boolean;
  gradingConfig: {
    maxStars?: number; // Required when gradingType is 'stars'
    passMarkPerGrader?: number; // Required when gradingType is 'stars'
  };
  settings: {
    allowLateSubmissions: boolean;
    gracePeriodHours: number;
    requireGraderFeedback: boolean;
    autoPublishGrades: boolean;
    notifyOnSubmission: boolean;
  };
}

// Validation schema type
export interface TaskFormValidation {
  title: [string, string]; // [value, error message]
  description: [string, string];
  track: [TrackName, string];
  stage: [number, string];
  gradingType: [GradingType, string];
  dueDate: [Date | null, string];
  maxSubmissions: [number, string];
  requiredGrades: [number, string];
  instructions: [string, string];
  settings: {
    allowLateSubmissions: [boolean, string];
    gracePeriodHours: [number, string];
    requireGraderFeedback: [boolean, string];
    autoPublishGrades: [boolean, string];
    notifyOnSubmission: [boolean, string];
  };
}

// Default values type
export const defaultTaskFormData: TaskFormData = {
  title: "",
  description: "",
  track: "frontend",
  stage: 1,
  gradingType: "swipe",
  dueDate: null,
  maxSubmissions: 3,
  requiredGrades: 2,
  instructions: "",
  isDraft: true,
  gradingConfig: {},
  settings: {
    allowLateSubmissions: false,
    gracePeriodHours: 24,
    requireGraderFeedback: true,
    autoPublishGrades: false,
    notifyOnSubmission: true,
  },
};

// Types for form state
export type TaskFormState = {
  formData: TaskFormData;
  updateForm: (data: Partial<TaskFormData>) => void;
  resetForm: () => void;
};

// Helper type for form validation
export type ValidationErrors = Partial<{
  [K in keyof TaskFormData]: string;
}>;

// Helper type for form submission
export type TaskFormSubmission = {
  data: TaskFormData;
  isDraft: boolean;
};

// Response type after task creation
export type TaskCreationResponse = {
  taskId: string;
  status: "success" | "error";
  message?: string;
};

// Types for task form context if needed
export type TaskFormContextType = {
  formData: TaskFormData;
  errors: ValidationErrors;
  updateField: <K extends keyof TaskFormData>(
    field: K,
    value: TaskFormData[K]
  ) => void;
  validateField: <K extends keyof TaskFormData>(field: K) => string | null;
  resetForm: () => void;
  submitForm: (asDraft?: boolean) => Promise<TaskCreationResponse>;
};
