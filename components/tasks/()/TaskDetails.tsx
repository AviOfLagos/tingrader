// components/tasks/TaskDetails.tsx
"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  Star,
  ArrowLeftRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Task, TaskSubmission } from "@/types/task";
import TaskSubmissionsList from "../TaskSubmissionsList";
import TaskSearchAndFilter from "./TaskSearchAndFilter";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import TaskGradesOverview from "../grades/TaskGradesOverview";

interface TaskDetailsProps {
  task: Task;
  submissions: TaskSubmission[];
  onGrade: (submissionId: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  error?: Error | null;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
  task,
  submissions,
  onGrade,
  onSubmit,
  isLoading = false,
  error = null,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [gradingFilter, setGradingFilter] = useState<
    "all" | "graded" | "ungraded"
  >("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredSubmissions = useMemo(() => {
    return submissions
      .filter((submission) => {
        const matchesSearch = submission.userId
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesFilter =
          gradingFilter === "all" ||
          (gradingFilter === "graded" && submission.grades.length > 0) ||
          (gradingFilter === "ungraded" && submission.grades.length === 0);
        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        const dateA = new Date(a.submittedAt).getTime();
        const dateB = new Date(b.submittedAt).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
  }, [submissions, searchTerm, gradingFilter, sortOrder]);

  const resetFilters = () => {
    setSearchTerm("");
    setGradingFilter("all");
    setSortOrder("desc");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error.message || "An error occurred while loading the task details."}
        </AlertDescription>
      </Alert>
    );
  }

  const getGradingProgress = () => {
    const totalNeededGrades = submissions.length * task.grading.required;
    const currentGrades = submissions.reduce(
      (total, sub) => total + sub.grades.length,
      0
    );
    return totalNeededGrades > 0
      ? (currentGrades / totalNeededGrades) * 100
      : 0;
  };

  return (
    <div className="space-y-6">
      {/* Task Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{task.title}</CardTitle>
              <CardDescription>{task.description}</CardDescription>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">
                  {task.track.charAt(0).toUpperCase() + task.track.slice(1)}
                </Badge>
                <Badge variant="outline">Stage {task.stage}</Badge>
                <Badge variant="outline">
                  {task.gradingType === "stars" ? (
                    <Star className="w-4 h-4 mr-1" />
                  ) : (
                    <ArrowLeftRight className="w-4 h-4 mr-1" />
                  )}
                  {task.gradingType === "stars"
                    ? "Star Rating"
                    : "Swipe Grading"}
                </Badge>
                <Badge
                  variant={task.status === "closed" ? "destructive" : "default"}
                >
                  {task.status === "closed" ? "Closed" : "Open"}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              {task.permissions.canSubmit &&
                !task.submissions.userHasSubmitted && (
                  <Button onClick={onSubmit} variant="default">
                    Submit Solution
                  </Button>
                )}
              {task.permissions.canGrade && (
                <Button
                  onClick={() => onGrade("")}
                  variant={task.grading.userHasGraded ? "outline" : "default"}
                >
                  {task.grading.userHasGraded
                    ? "Continue Grading"
                    : "Start Grading"}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span className="text-2xl font-bold">
                  {task.submissions.current}
                </span>
                <span className="text-muted-foreground ml-1">
                  /{task.submissions.max}
                </span>
              </div>
              <Progress
                value={(task.submissions.current / task.submissions.max) * 100}
                className="w-20"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Grading Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                <span className="text-2xl font-bold">
                  {Math.round(getGradingProgress())}%
                </span>
              </div>
              <Progress value={getGradingProgress()} className="w-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Time Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="text-2xl font-bold">
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="submissions">
            Submissions ({filteredSubmissions.length})
          </TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Task Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert">
                <div dangerouslySetInnerHTML={{ __html: task.description }} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions">
          <div className="space-y-4">
            <TaskSearchAndFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              gradingFilter={gradingFilter}
              setGradingFilter={setGradingFilter}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              onResetFilters={resetFilters}
            />

            {filteredSubmissions.length > 0 ? (
              <TaskSubmissionsList
                submissions={filteredSubmissions}
                onGrade={onGrade}
                canGrade={task.permissions.canGrade}
              />
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground">
                    No submissions found matching your criteria
                  </p>
                  {(searchTerm || gradingFilter !== "all") && (
                    <Button
                      variant="link"
                      onClick={resetFilters}
                      className="mt-2"
                    >
                      Reset Filters
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="grades">
          <Card>
            <CardContent className="py-12">
              <p className="text-center text-muted-foreground">
                <TabsContent value="grades">
                  <TaskGradesOverview task={task} submissions={submissions} />
                </TabsContent>
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskDetails;
