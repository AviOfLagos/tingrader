"use client";

import React from "react";
import TasksContainer from "@/components/tasks/()/TasksContainer";
import { Task } from "@/types/task";

export default function TasksPage() {
  const handleTaskCreated = (newTask: Task) => {
    // Handle the new task (e.g., update state or make an API call)
    console.log("New task created:", newTask);
    // You may want to refresh the task list or update state here
  };

  return (
    <div className="container mx-auto m-10 space-y-6">
      <TasksContainer />
    </div>
  );
}