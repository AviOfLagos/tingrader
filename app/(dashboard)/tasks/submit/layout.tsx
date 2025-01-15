import TaskErrorBoundary from "@/components/tasks/()/TaskErrorBoundary";

// app/(dashboard)/tasks/layout.tsx
export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TaskErrorBoundary>{children}</TaskErrorBoundary>;
}
