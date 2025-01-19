// hooks/useTaskManagement.ts
import { create } from "zustand";
import { mockTasks } from "@/mock/tasks";
import { Task, TaskFormData } from "@/types/task";

interface TaskStore {
  tasks: Task[];
  addTask: (task: TaskFormData) => string; // returns the new task ID
  getTask: (id: string) => Task | undefined;
}

// Helper to generate a unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: mockTasks,
  addTask: (formData: TaskFormData) => {
    const newTask: Task = {
      id: generateId(),
      ...formData,
      dueDate: formData.dueDate ? formData.dueDate.toISOString() : "",
      createdAt: new Date().toISOString(),
      createdBy: "current-user", // You can replace this with actual user ID
      status: formData.isDraft ? "draft" : "open",
      submissions: {
        current: 0,
        max: formData.maxSubmissions,
        userHasSubmitted: false,
      },
      grading: {
        required: formData.requiredGrades,
        current: 0,
        userHasGraded: false,
        pendingGrades: 0,
      },
      permissions: {
        canEdit: true,
        canDelete: true,
        canGrade: true,
        canSubmit: false,
      },
    };

    set((state) => ({
      tasks: [...state.tasks, newTask],
    }));

    return newTask.id;
  },
  getTask: (id: string) => {
    return get().tasks.find((task) => task.id === id);
  },
}));

// Custom hook for task creation and navigation
export const useTaskCreation = () => {
  const addTask = useTaskStore((state) => state.addTask);

  const handleTaskCreation = async (
    formData: TaskFormData,
    options: {
      isDraft?: boolean;
      onSuccess?: (taskId: string) => void;
      onError?: (error: Error) => void;
    } = {}
  ) => {
    try {
      // Add new task to store
      const taskId = addTask({
        ...formData,
        isDraft: options.isDraft || false,
      });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Log the complete task data
      console.log("Task Creation Payload:", {
        method: "POST",
        endpoint: "/api/tasks",
        body: formData,
      });

      // Call success callback if provided
      if (options.onSuccess) {
        options.onSuccess(taskId);
      }

      return taskId;
    } catch (error) {
      if (options.onError) {
        options.onError(error as Error);
      }
      throw error;
    }
  };

  return { handleTaskCreation };
};
