// components/tasks/TasksContainer.tsx
"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import TaskFilters from "./TaskFilters";
import TaskViewSelector from "./TaskViewSelector";
import TaskCard from "./TaskCard";
import TaskListView from "./TaskListView";
import { ViewMode, Task } from "@/types/task";
import { mockTasks } from "@/mock/tasks";
import { TRACKS, STAGES, SORT_OPTIONS } from "@/constants/task";


const TasksContainer: React.FC = () => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTrack, setSelectedTrack] = useState<string>(TRACKS.ALL);
  const [selectedStage, setSelectedStage] = useState<string>(STAGES.ALL);
  const [sortBy, setSortBy] = useState<string>(SORT_OPTIONS.DUE_DATE);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  
  const filteredAndSortedTasks = useMemo(() => {
    return mockTasks
      .filter((task: Task) => {
        const matchesSearch =
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTrack =
          selectedTrack === TRACKS.ALL || task.track === selectedTrack;
        const matchesStage =
          selectedStage === STAGES.ALL ||
          task.stage.toString() === selectedStage;
        return matchesSearch && matchesTrack && matchesStage;
      })
      .sort((a: Task, b: Task) => {
        let comparison = 0;
        switch (sortBy) {
          case SORT_OPTIONS.DUE_DATE:
            const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
            const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
            comparison = dateA - dateB;
            break;
          case SORT_OPTIONS.SUBMISSIONS:
            if (a.submissions && b.submissions) {
              comparison = a.submissions.current - b.submissions.current;
            } else if (a.submissions) {
              comparison = 1; // or some other logic if only a.submissions is defined
            } else if (b.submissions) {
              comparison = -1; // or some other logic if only b.submissions is defined
            } else {
              comparison = 0; // or some other logic if neither is defined
            }
            break;
          case SORT_OPTIONS.STAGE:
            comparison = a.stage - b.stage;
            break;
        }
        return sortOrder === "asc" ? comparison : -comparison;
      });
  }, [searchTerm, selectedTrack, selectedStage, sortBy, sortOrder]);

  const handleAction = (action: string, taskId: string) => {
    switch (action) {
      case "submit":
        router.push(`/tasks/${taskId}/submit`);
        break;
      case "grade":
        router.push(`/tasks/${taskId}/grade`);
        break;
      case "view":
        router.push(`/tasks/${taskId}`);
        break;
      case "edit":
        router.push(`/tasks/${taskId}/edit`);
        break;
      case "delete":
        // Handle delete - show confirmation dialog
        console.log("Delete task:", taskId);
        break;
      case "share":
        // Handle share - show share dialog
        console.log("Share task:", taskId);
        break;
      case "duplicate":
        // Handle duplicate
        console.log("Duplicate task:", taskId);
        break;
      default:
        console.log(`Unknown action: ${action} for task: ${taskId}`);
    }
  };

  return (
    <div className="space-y-6 m-16">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <h1 className="text-2xl font-bold">Tasks</h1>
        </div>

        <TaskViewSelector currentView={viewMode} onViewChange={setViewMode} />
      </div>

      <TaskFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
        selectedStage={selectedStage}
        setSelectedStage={setSelectedStage}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedTasks.map((task) => (
            <TaskCard key={task.id} task={task} onAction={handleAction} />
          ))}
        </div>
      ) : (
        <TaskListView tasks={filteredAndSortedTasks} onAction={handleAction} />
      )}

      {filteredAndSortedTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No tasks found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default TasksContainer;
