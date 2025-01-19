// mock/user-extended-data.ts
import { mockUsers, mockTasks } from "@/app/api/mock-data";

export interface UserActivity {
  id: string;
  userId: string;
  type: "submission" | "grade" | "track_join" | "achievement";
  description: string;
  timestamp: string;
  metadata: {
    taskId?: string;
    trackId?: string;
    score?: number;
    achievementName?: string;
  };
}

export interface UserSubmissionStats {
  totalSubmissions: number;
  averageScore: number;
  completionRate: number;
  tasksByTrack: Record<string, number>;
  submitsByWeek: {
    week: string;
    count: number;
  }[];
  grades: {
    pass: number;
    fail: number;
    pending: number;
  };
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

// Generate mock user activities
export const generateUserActivities = (userId: string): UserActivity[] => {
  const activities: UserActivity[] = [];
  const startDate = new Date("2024-01-01");
  const user = mockUsers.find((u) => u.id === userId);

  if (!user) return activities;

  // Generate random activities
  for (let i = 0; i < 20; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const types: UserActivity["type"][] = [
      "submission",
      "grade",
      "track_join",
      "achievement",
    ];
    const type = types[Math.floor(Math.random() * types.length)];

    const activity: UserActivity = {
      id: `activity-${i}`,
      userId,
      type,
      timestamp: date.toISOString(),
      description: "",
      metadata: {},
    };

    switch (type) {
      case "submission":
        const task = mockTasks[Math.floor(Math.random() * mockTasks.length)];
        activity.description = `Submitted "${task.title}"`;
        activity.metadata = {
          taskId: task.id,
          trackId: task.track,
        };
        break;
      case "grade":
        activity.description = `Received grade for Task #${Math.floor(Math.random() * 10 + 1)}`;
        activity.metadata = {
          score: Math.floor(Math.random() * 5) + 3,
        };
        break;
      case "track_join":
        activity.description = `Joined ${user.trackId} track`;
        activity.metadata = {
          trackId: user.trackId,
        };
        break;
      case "achievement":
        const achievements = [
          "First Submission",
          "Perfect Score",
          "Quick Learner",
          "Track Master",
        ];
        activity.description = `Earned achievement: ${achievements[Math.floor(Math.random() * achievements.length)]}`;
        activity.metadata = {
          achievementName: activity.description.split(": ")[1],
        };
        break;
    }

    activities.push(activity);
  }

  return activities.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

// Generate user submission stats
export const generateUserStats = (userId: string): UserSubmissionStats => {
  const submissions = Array.from({ length: 30 }, (_, i) => ({
    score: Math.random() * 5 + 2,
    passed: Math.random() > 0.2,
    pending: Math.random() > 0.8,
    track: mockTasks[Math.floor(Math.random() * mockTasks.length)].track,
    week: `2024-W${Math.floor(i / 4) + 1}`,
  }));

  return {
    totalSubmissions: submissions.length,
    averageScore:
      submissions.reduce((acc, s) => acc + s.score, 0) / submissions.length,
    completionRate:
      (submissions.filter((s) => s.passed).length / submissions.length) * 100,
    tasksByTrack: submissions.reduce(
      (acc, s) => {
        acc[s.track] = (acc[s.track] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ),
    submitsByWeek: Object.entries(
      submissions.reduce(
        (acc, s) => {
          acc[s.week] = (acc[s.week] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      )
    ).map(([week, count]) => ({ week, count })),
    grades: {
      pass: submissions.filter((s) => s.passed).length,
      fail: submissions.filter((s) => !s.passed && !s.pending).length,
      pending: submissions.filter((s) => s.pending).length,
    },
  };
};

// User achievements
export const userAchievements: Achievement[] = [
  {
    id: "first-submit",
    name: "First Submission",
    description: "Submitted your first task",
    icon: "🎯",
  },
  {
    id: "perfect-score",
    name: "Perfect Score",
    description: "Received a perfect score on a task",
    icon: "⭐",
  },
  {
    id: "quick-learner",
    name: "Quick Learner",
    description: "Completed 5 tasks in a week",
    icon: "🚀",
  },
  {
    id: "track-master",
    name: "Track Master",
    description: "Completed all tasks in a track",
    icon: "👑",
  },
];

// Generate user achievements
export const generateUserAchievements = (userId: string): Achievement[] => {
  return userAchievements
    .filter(() => Math.random() > 0.5)
    .map((achievement) => ({
      ...achievement,
      unlockedAt: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      ).toISOString(),
    }));
};
