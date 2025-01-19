// components/tasks/TaskCard.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Users,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Task } from "@/types/task";
import TaskQuickActions from "./TaskQuickActions";

interface TaskCardProps {
  task: Task;
  onAction: (action: string, taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onAction }) => {
  const getStatusColor = (
    task: Task
  ): "default" | "destructive" | "secondary" => {
    if (task.status === "closed") return "destructive";
    if (task.submissions?.current != null && task.submissions?.max != null && task.submissions.current >= task.submissions.max) return "destructive";
    if (task.submissions?.current != null && task.submissions?.max != null && task.submissions.current >= task.submissions.max * 0.8)
      return "secondary";
    return "default";
  };

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

  return (
    <Card className="flex flex-col h-full transition-transform hover:shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold leading-none">{task.title}</h3>
          <div className="flex gap-2">
            <Badge variant={getStatusColor(task)}>
              {task.status === "closed" ? "Closed" : "Open"}
            </Badge>
            {task.submissions?.userHasSubmitted && (
              <Badge variant="secondary">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Submitted
              </Badge>
            )}
            {task.grading.userHasGraded && (
              <Badge variant="secondary">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Graded
              </Badge>
            )}
          </div>
        </div>
        <TaskQuickActions task={task} view="grid" onAction={onAction} />
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-muted-foreground">
              {task.dueDate ? getTimeRemaining(task.dueDate) : "No due date"}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-muted-foreground">
              {task.submissions?.current}/{task.submissions?.max} submissions
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-muted-foreground">
              {task.grading.pendingGrades} pending grades
            </span>
          </div>
          {task.submissions?.current != null && task.submissions?.max != null && task.submissions.current >= task.submissions.max * 0.8 && (
            <div className="flex items-center text-sm text-yellow-500">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span>Almost full</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <div className="flex gap-2">
          <Badge variant="secondary">
            {task.track.charAt(0).toUpperCase() + task.track.slice(1)}
          </Badge>
          <Badge variant="secondary">Stage {task.stage}</Badge>
          <Badge variant="outline">
            {task.gradingType === "stars" ? "⭐ Stars" : "↔️ Swipe"}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
