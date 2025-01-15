// components/tasks/TaskError.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface TaskErrorProps {
  error: Error | null;
  resetError?: () => void;
  className?: string;
}

const TaskError: React.FC<TaskErrorProps> = ({
  error,
  resetError,
  className = "",
}) => {
  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
        <p className="text-muted-foreground text-center mb-6 max-w-md">
          {error?.message ||
            "An unexpected error occurred while loading the task."}
        </p>
        {resetError && (
          <div className="flex gap-4">
            <Button onClick={resetError}>Try Again</Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskError;
