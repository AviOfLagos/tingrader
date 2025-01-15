// types/task.ts
export type TaskStatus = 'open' | 'closed';
export type TrackName = 'frontend' | 'backend' | 'design' | 'mobile';
export type GradingType = 'stars' | 'swipe';
export type ViewMode = 'grid' | 'list';

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
  dueDate: string;
  gradingType: GradingType;
  submissions: {
    current: number;
    max: number;
    userHasSubmitted: boolean;
  };
  grading: {
    required: number;
    current: number;
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

export interface QuickActions {
  primary: {
    submit?: boolean;
    grade?: boolean;
    view?: boolean;
  };
  secondary: {
    edit?: boolean;
    delete?: boolean;
    share: boolean;
    duplicate?: boolean;
  };
}
