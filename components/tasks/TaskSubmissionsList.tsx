// components/tasks/TaskSubmissionsList.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TaskSubmission } from "@/types/task";
import { CheckCircle2, Star } from "lucide-react";

interface TaskSubmissionsListProps {
  submissions: TaskSubmission[];
  onGrade: (submissionId: string) => void;
  canGrade: boolean;
}

const TaskSubmissionsList: React.FC<TaskSubmissionsListProps> = ({
  submissions,
  onGrade,
  canGrade,
}) => {
  const getAverageGrade = (submission: TaskSubmission) => {
    if (submission.grades.length === 0) return null;
    const sum = submission.grades.reduce((acc, grade) => {
      if (typeof grade.grade === "number") {
        return acc + grade.grade;
      }
      return acc + (grade.grade ? 1 : 0);
    }, 0);
    return sum / submission.grades.length;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Submitted By</TableHead>
            <TableHead>Submitted At</TableHead>
            <TableHead>Grades</TableHead>
            <TableHead>Average</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => {
            const averageGrade = getAverageGrade(submission);
            return (
              <TableRow key={submission.id}>
                <TableCell className="font-medium">
                  {submission.userId}
                </TableCell>
                <TableCell>
                  {new Date(submission.submittedAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {submission.grades.length} grades
                    </span>
                    {submission.grades.length > 0 && (
                      <Badge variant="secondary">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Graded
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {averageGrade !== null && (
                    <div className="flex items-center">
                      {typeof averageGrade === "number" ? (
                        <>
                          <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
                          <span>{averageGrade.toFixed(1)}</span>
                        </>
                      ) : (
                        <Badge
                          variant={averageGrade ? "default" : "destructive"}
                        >
                          {averageGrade ? "Pass" : "Fail"}
                        </Badge>
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {canGrade && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onGrade(submission.id)}
                    >
                      Grade
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskSubmissionsList;
