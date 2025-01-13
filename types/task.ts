export interface Task {
  id: string;
  title: string;
  description: string;
  trackId: string;
  gradingType: 'stars' | 'swipe';
  createdAt: string;
  dueDate: string;
  createdBy: string;
}