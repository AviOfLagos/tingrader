// app/(dashboard)/profile/[id]/page.tsx
"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUsers } from "@/app/api/mock-data";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { StatsOverview } from "@/components/profile/StatsOverview";
import { ActivityFeed } from "@/components/profile/ActivityFeed";
import { Achievements } from "@/components/profile/Achievements";
import { SubmissionChart } from "@/components/profile/SubmissionChart";
import {
  generateUserActivities,
  generateUserStats,
  generateUserAchievements,
} from "@/mock/user-extended-data";
import { Loader2 } from "lucide-react";

export default function UserProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const [isLoading, setIsLoading] = React.useState(true);

  // Get user data
  const user = mockUsers.find((u) => u.id === userId);
  const [activities, setActivities] = React.useState(
    generateUserActivities(userId)
  );
  const [stats, setStats] = React.useState(generateUserStats(userId));
  const [achievements, setAchievements] = React.useState(
    generateUserAchievements(userId)
  );

  React.useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">User Not Found</h1>
          <p className="text-muted-foreground">
            The user you're looking for doesn't exist or you don't have
            permission to view their profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <ProfileHeader user={user} />

      <StatsOverview stats={stats} />

      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <ActivityFeed activities={activities} />
        </TabsContent>

        <TabsContent value="submissions" className="space-y-4">
          <SubmissionChart stats={stats} />
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold mb-2">Tasks by Track</h3>
              <div className="space-y-2">
                {Object.entries(stats.tasksByTrack).map(([track, count]) => (
                  <div
                    key={track}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium">{track}</span>
                    <span className="text-muted-foreground">{count} tasks</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Grades Overview</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Passed</span>
                  <span className="text-green-600">{stats.grades.pass}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Failed</span>
                  <span className="text-red-600">{stats.grades.fail}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Pending</span>
                  <span className="text-yellow-600">
                    {stats.grades.pending}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Achievements achievements={achievements} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
