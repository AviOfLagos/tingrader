// components/tasks/TaskListView.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";
import { Task } from "@/types/task";
import TaskQuickActions from "./TaskQuickActions";

interface TaskListViewProps {
  tasks: Task[];
  onAction: (action: string, taskId: string) => void;
}

const TaskListView: React.FC<TaskListViewProps> = ({ tasks, onAction }) => {
  const getTimeRemaining = (dueDate: string): string => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due.getTime() - now.getTime();

    if (diff < 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h remaining`;
    return `${hours}h remaining`;
  };

  const getStatusBadge = (task: Task) => {
    const color =
      task.status === "closed" ||
      (task.submissions && task.submissions.current != null && task.submissions.max != null && task.submissions.current >= task.submissions.max)
        ? "destructive"
        : (task.submissions && task.submissions.current != null && task.submissions.max != null && task.submissions.current >= task.submissions.max * 0.8)
          ? "secondary"
          : "default";

    return (
      <Badge variant={color}>
        {task.status === "closed" ? "Closed" : "Open"}
      </Badge>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Track</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <div className="flex flex-row items-center text-nowrap">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Due Date</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex flex-row items-center text-nowrap">
                <Users className="w-4 h-4 mr-2" />
                <span>Submissions</span>
              </div>
            </TableHead>
            <TableHead>
              <div className="text-nowrap">Grading Type</div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <div className="flex flex-col max-w-80">
                  <span className="font-medium">{task.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {task.description}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex gap-2 text-nowrap">
                  <Badge variant="secondary">
                    {task.track.charAt(0).toUpperCase() + task.track.slice(1)}
                  </Badge>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex gap-2 text-nowrap">
                  <Badge variant="secondary">Stage {task.stage}</Badge>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex gap-2 text-nowrap">
                  {getStatusBadge(task)}
                  {task.submissions?.userHasSubmitted && (
                    <Badge variant="outline">Submitted</Badge>
                  )}
                  {task.grading.userHasGraded && (
                    <Badge variant="outline">Graded</Badge>
                  )}
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center  ">
                  <span className="flex  text-sm items-center text-center">
                    {task.dueDate ? getTimeRemaining(task.dueDate) : "No due date"}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center justify-center text-nowrap">
                  {task.submissions?.current}/{task.submissions?.max}
                </div>
              </TableCell>

              <TableCell>
                <Badge variant="outline" className="bg-slate-400/30">
                  <div className="flex gap-2 text-nowrap p-1 ">
                    {task.gradingType === "stars" ? "⭐ Stars" : "↔️ Swipe"}
                  </div>
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                <TaskQuickActions task={task} view="list" onAction={onAction} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskListView;
