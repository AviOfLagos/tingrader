export interface Submission {
  id: string;
  taskId: string;
  submittedBy: string; // User ID
  submittedAt: string;
  contents: SubmissionContent[];
  grade?: number | boolean;
  gradedBy?: string; // User ID
  gradedAt?: string;
}

export interface SubmissionContent {
  type: 'description' | 'link' | 'image';
  value: string;
}