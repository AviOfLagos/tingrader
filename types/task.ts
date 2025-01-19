export type TaskStatus = "draft" | "open" | "closed";
export type TrackName = "frontend" | "backend" | "design" | "mobile";
export type GradingType = "stars" | "swipe";
export type ViewMode = "grid" | "list";

export interface TaskSubmission {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  attachments: string[];
  submittedAt: string;
  grades: TaskGrade[];
  finalGrade?: number;
}

export interface TaskGrade {
  id: string;
  graderId: string;
  submissionId: string;
  grade: number | boolean;
  comment?: string;
  gradedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  track: TrackName;
  stage: number;
  status: TaskStatus;
  createdBy: string;
  createdAt: string;
  dueDate: string; // Changed from 'string | null' to 'string'
  gradingType: GradingType;
  maxSubmissions: number;
  requiredGrades: number;
  instructions: string;
  isDraft: boolean;
  gradingConfig: {
    maxStars?: number;
    passMarkPerGrader?: number;
  };
  settings: {
    allowLateSubmissions: boolean;
    gracePeriodHours: number;
    requireGraderFeedback: boolean;
    autoPublishGrades: boolean;
    notifyOnSubmission: boolean;
  };
  submissions?: {
    current: number;
    max: number;
    userHasSubmitted: boolean;
  };
  grading: {
    current: number;
    required: number;
    userHasGraded: boolean;
    pendingGrades: number;
  };
  permissions: {
    canEdit: boolean;
    canDelete: boolean;
    canGrade: boolean;
    canSubmit: boolean;
  };
}

// Updated UserGradeInfo interface
export interface UserGradeInfo {
  userId: string;
  email: string;
  name?: string; // Made optional
  grade?: number | boolean; // Made optional
  averageGrade: number;
  status: string;
  submittedAt?: string;
  lastGradedAt?: string;
  gradedAt?: string;
  gradesReceived?: number;
  feedback?: string;
  // Include other relevant fields as needed
}

// Default values for task form data
export const defaultTaskFormData: TaskFormData = {
  title: "",
  description: "",
  track: "frontend",
  stage: 1,
  gradingType: "swipe",
  dueDate: new Date(), // Changed from new Date().toISOString() to new Date()
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

// Types for task form data
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
    maxStars?: number;
    passMarkPerGrader?: number;
  };
  settings: {
    allowLateSubmissions: boolean;
    gracePeriodHours: number;
    requireGraderFeedback: boolean;
    autoPublishGrades: boolean;
    notifyOnSubmission: boolean;
  };
}
