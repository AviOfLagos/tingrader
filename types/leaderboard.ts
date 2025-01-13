export interface LeaderboardData {
  id: string;
  userId: string;
  taskId: string;
  name: string;
  track: string;
  stage: string;
  score: number;
  tasksCompleted: number;
  avgScore: number;
  rank: number;
}
