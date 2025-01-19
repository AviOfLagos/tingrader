// app/(dashboard)/profile/page.tsx
"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/client";
import { mockUsers } from "@/app/api/mock-data";
import { User } from "@/types";
import { UserFilters } from "@/components/users/userFilters";
import { UserGridView, UserListView } from "@/components/users/userView";

interface UserStats {
  tasksCompleted: number;
  avgScore: number;
  lastActive?: string;
}

export default function ProfilePage() {
  const [selectedRole, setSelectedRole] = React.useState<string>("all");
  const [selectedTrack, setSelectedTrack] = React.useState<string>("all");
  const [selectedStage, setSelectedStage] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [mounted, setMounted] = React.useState(false);
  const supabase = React.useMemo(() => createClient(), []);

  // Handle hydration by waiting for mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Generate consistent mock stats
  const userStats = React.useMemo(() => {
    const seed = 123; // Use a consistent seed for random numbers
    const stats: Record<string, UserStats> = {};

    mockUsers.forEach((user, index) => {
      // Use deterministic values based on index
      stats[user.id] = {
        tasksCompleted: 10 + index * 5,
        avgScore: 3 + (index % 4) * 0.5,
        lastActive: new Date(2024, 0, 1 + index).toISOString(),
      };
    });

    return stats;
  }, []);

  const filteredUsers = React.useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesRole = selectedRole === "all" || user.role === selectedRole;
      const matchesTrack =
        selectedTrack === "all" || user.trackId === selectedTrack;
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesRole && matchesTrack && matchesSearch;
    });
  }, [selectedRole, selectedTrack, searchQuery]);

  if (!mounted) {
    return null; // Prevent hydration errors by not rendering until mounted
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold">Users</h1>

        <UserFilters
          searchQuery={searchQuery}
          selectedTrack={selectedTrack}
          selectedStage={selectedStage}
          viewMode={viewMode}
          onSearchChange={setSearchQuery}
          onTrackChange={setSelectedTrack}
          onStageChange={setSelectedStage}
          onViewModeChange={setViewMode}
        />
      </header>

      <Tabs defaultValue="all" onValueChange={setSelectedRole}>
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="mentor">Mentors</TabsTrigger>
          <TabsTrigger value="grader">Graders</TabsTrigger>
          <TabsTrigger value="intern">Interns</TabsTrigger>
        </TabsList>

        {["all", "mentor", "grader", "intern"].map((role) => (
          <TabsContent key={role} value={role}>
            {viewMode === "grid" ? (
              <UserGridView users={filteredUsers} userStats={userStats} />
            ) : (
              <UserListView users={filteredUsers} userStats={userStats} />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
