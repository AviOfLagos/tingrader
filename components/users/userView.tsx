// components/users/userView.tsx
"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types";
import { UserCircle, Star, Calendar } from "lucide-react";
import { mockTracks } from "@/app/api/mock-data";

interface UserStats {
  tasksCompleted: number;
  avgScore: number;
  lastActive?: string;
}

interface UserViewProps {
  users: User[];
  userStats: Record<string, UserStats>;
}

// Helper function to format dates safely
function formatDate(dateString?: string): string {
  return dateString ? new Date(dateString).toLocaleDateString() : "N/A";
}

export function UserGridView({ users, userStats }: UserViewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <UserCard key={user.id} user={user} stats={userStats[user.id]} />
      ))}
    </div>
  );
}

export function UserListView({ users, userStats }: UserViewProps) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Track</TableHead>
            <TableHead className="text-right">Tasks Completed</TableHead>
            <TableHead className="text-right">Avg. Score</TableHead>
            <TableHead className="text-right">Last Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <UserCircle className="h-8 w-8 text-gray-400" />
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.email}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <RoleBadge role={user.role} />
              </TableCell>
              <TableCell>
                {mockTracks.find((t) => t.id === user.trackId)?.name || "None"}
              </TableCell>
              <TableCell className="text-right">
                {userStats[user.id].tasksCompleted}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  {userStats[user.id].avgScore}
                </div>
              </TableCell>
              <TableCell className="text-right">
                {formatDate(userStats[user.id].lastActive)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

function UserCard({ user, stats }: { user: User; stats: UserStats }) {
  const track = mockTracks.find((t) => t.id === user.trackId);

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <UserCircle className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <RoleBadge role={user.role} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Track:</span>
          <span className="font-medium">{track?.name || "None"}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Avg. Score:</span>
          <span className="font-medium flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            {stats.avgScore}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Tasks Completed:</span>
          <span className="font-medium">{stats.tasksCompleted}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Last Active:</span>
          <span className="font-medium flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(stats.lastActive)}
          </span>
        </div>
      </div>
    </Card>
  );
}

function RoleBadge({ role }: { role: string }) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "mentor":
        return "text-blue-600 bg-blue-100";
      case "grader":
        return "text-green-600 bg-green-100";
      case "intern":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${getRoleColor(role)}`}>
      {role}
    </span>
  );
}
