// components/profile/ActivityFeed.tsx
import { UserActivity } from "@/mock/user-extended-data";
import { Card } from "@/components/ui/card";
import { Star, Send, Trophy, BookOpen } from "lucide-react";

export function ActivityFeed({ activities }: { activities: UserActivity[] }) {
  const getActivityIcon = (type: UserActivity["type"]) => {
    switch (type) {
      case "submission":
        return <Send className="w-4 h-4" />;
      case "grade":
        return <Star className="w-4 h-4" />;
      case "track_join":
        return <BookOpen className="w-4 h-4" />;
      case "achievement":
        return <Trophy className="w-4 h-4" />;
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className="mt-1">
              <div className="p-2 rounded-full bg-muted">
                {getActivityIcon(activity.type)}
              </div>
            </div>
            <div>
              <p className="font-medium">{activity.description}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(activity.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
