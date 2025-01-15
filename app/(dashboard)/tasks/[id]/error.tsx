// app/(dashboard)/tasks/[id]/error.tsx
"use client";

import { useEffect } from "react";
import TaskError from "@/components/tasks/()/TaskError";

export default function TaskErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Task error:", error);
  }, [error]);

  return (
    <div className="container mx-auto p-4">
      <TaskError error={error} resetError={reset} />
    </div>
  );
}
