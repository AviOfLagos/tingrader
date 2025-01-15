"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Calendar, Star, ThumbsUp } from "lucide-react";
import TaskCreationModal from "@/components/tasks/create/TaskCreationModal";

// Mock data
const mockTasks = [
  {
    id: "1",
    title: "Build a REST API",
    track: "Backend",
    stage: "Stage 2",
    dueDate: "2025-01-20",
    status: "active",
    submissions: 12,
    pendingGrades: 5,
    gradingType: "stars",
  },
  {
    id: "2",
    title: "Create a React Component Library",
    track: "Frontend",
    stage: "Stage 1",
    dueDate: "2025-01-18",
    status: "active",
    submissions: 8,
    pendingGrades: 3,
    gradingType: "swipe",
  },
  // Add more mock tasks...
];

export default function TasksPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState("all");
  const [selectedStage, setSelectedStage] = useState("all");

  return (
    <div className="space-y-6 m-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">
            Create and manage assessment tasks
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Task
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="sm:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input className="pl-9" placeholder="Search tasks..." />
        </div>

        <Select value={selectedTrack} onValueChange={setSelectedTrack}>
          <SelectTrigger>
            <SelectValue placeholder="Track" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tracks</SelectItem>
            <SelectItem value="frontend">Frontend</SelectItem>
            <SelectItem value="backend">Backend</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedStage} onValueChange={setSelectedStage}>
          <SelectTrigger>
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            <SelectItem value="stage1">Stage 1</SelectItem>
            <SelectItem value="stage2">Stage 2</SelectItem>
            <SelectItem value="stage3">Stage 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Task List */}
      <div className="grid gap-4">
        {mockTasks.map((task) => (
          <Card key={task.id} className="p-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-semibold">{task.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{task.track}</span>
                  <span>•</span>
                  <span>{task.stage}</span>
                  <span>•</span>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Grading Method Indicator */}
                <div className="flex items-center text-muted-foreground">
                  {task.gradingType === "stars" ? (
                    <Star className="h-4 w-4" />
                  ) : (
                    <ThumbsUp className="h-4 w-4" />
                  )}
                </div>

                {/* Submission Stats */}
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {task.submissions} submissions
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {task.pendingGrades} pending grades
                  </div>
                </div>

                {/* Actions */}
                <Button variant="outline">View Details</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Task Creation Modal */}
      <TaskCreationModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
}
