// components/profile/ProfileHeader.tsx
import { User } from "@/types";
import { Card } from "@/components/ui/card";
import { UserCircle } from "lucide-react";

export function ProfileHeader({ user }: { user: User }) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
          <UserCircle className="w-12 h-12 text-gray-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
          <div className="flex gap-2 mt-2">
            <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
              {user.role}
            </span>
            {user.tracks.map((track) => (
              <span
                key={track}
                className="text-sm bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
              >
                {track}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
