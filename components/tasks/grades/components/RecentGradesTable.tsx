// components/tasks/grades/components/RecentGradesTable.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Task, TaskSubmission } from "@/types/task";

interface RecentGradesTableProps {
  submissions: TaskSubmission[];
  gradingType: Task["gradingType"];
}

const RecentGradesTable: React.FC<RecentGradesTableProps> = ({
  submissions,
  gradingType,
}) => {
  const recentGrades = submissions
    .flatMap((submission) =>
      submission.grades.map((grade) => ({
        ...grade,
        userId: submission.userId,
      }))
    )
    .sort(
      (a, b) => new Date(b.gradedAt).getTime() - new Date(a.gradedAt).getTime()
    )
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Grades</CardTitle>
        <CardDescription>Latest grades given to submissions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Submission</TableHead>
              <TableHead>Grader</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Comment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentGrades.map((grade, index) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(grade.gradedAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-medium">{grade.userId}</TableCell>
                <TableCell>{grade.graderId}</TableCell>
                <TableCell>
                  {typeof grade.grade === "number" ? (
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {grade.grade}
                    </div>
                  ) : (
                    <Badge variant={grade.grade ? "default" : "destructive"}>
                      {grade.grade ? "Pass" : "Fail"}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {grade.comment}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentGradesTable;
