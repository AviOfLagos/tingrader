// components/profile/Achievements.tsx
import { Achievement } from "@/mock/user-extended-data";
import { Card } from "@/components/ui/card";

export function Achievements({
  achievements,
}: {
  achievements: Achievement[];
}) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Achievements</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="flex items-center gap-4 p-4 rounded-lg bg-muted"
          >
            <div className="text-2xl">{achievement.icon}</div>
            <div>
              <h3 className="font-medium">{achievement.name}</h3>
              <p className="text-sm text-muted-foreground">
                {achievement.description}
              </p>
              {achievement.unlockedAt && (
                <p className="text-xs text-muted-foreground mt-1">
                  Unlocked:{" "}
                  {new Date(achievement.unlockedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
