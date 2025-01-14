export interface Task {
  id: string;
  title: string;
  description: string;
  trackId: string;
  track: string;
  stage: number;
  gradingType: 'stars' | 'swipe';
  createdAt: string;
  dueDate: string;
  createdBy: string;
  status: 'open' | 'closed';
  currentSubmissions: number;
  maxSubmissions: number;
  currentGraders: number;
  maxGraders: number;
}
