import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, AlertCircle } from "lucide-react";
import { Task } from "@/types";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const getStatusColor = (
    task: Task
  ): "default" | "destructive" | "secondary" => {
    if (task.status === "closed") return "destructive";
    if (task.currentSubmissions >= task.maxSubmissions) return "destructive";
    if (task.currentGraders >= task.maxGraders) return "destructive";
    if (new Date(task.dueDate) < new Date()) return "destructive";
    if (task.currentSubmissions >= task.maxSubmissions * 0.8)
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
    <Card className="flex flex-col transition-transform transform hover:scale-105 hover:shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">{task.title}</CardTitle>
        <Badge variant={getStatusColor(task)}>
          {task.status === "closed" ? "Closed" : "Open"}
        </Badge>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-muted-foreground">
              {getTimeRemaining(task.dueDate)}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-muted-foreground">
              {task.currentSubmissions}/{task.maxSubmissions} submissions
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-muted-foreground">
              {task.currentGraders}/{task.maxGraders} graders
            </span>
          </div>
          {task.currentSubmissions >= task.maxSubmissions * 0.8 && (
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
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
