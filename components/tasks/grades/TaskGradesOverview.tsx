// components/tasks/grades/TaskGradesOverview.tsx
import React, { useMemo } from "react";
import { Task, TaskSubmission } from "@/types/task";
import GradeStatsCards from "./components/GradeStatsCards";
import GradeDistributionChart from "./components/GradeDistributionChart";
import RecentGradesTable from "./components/RecentGradesTable";
import ExportOptions from "./components/export/ExportOptions";

interface TaskGradesOverviewProps {
  task: Task;
  submissions: TaskSubmission[];
}

const TaskGradesOverview: React.FC<TaskGradesOverviewProps> = ({
  task,
  submissions,
}) => {
  const stats = useMemo(() => {
    const gradeStats = {
      totalGrades: 0,
      averageGrade: 0,
      highestGrade: 0,
      lowestGrade: task.gradingType === "stars" ? 7 : 1,
      gradedSubmissions: 0,
      pendingSubmissions: 0,
      totalSubmissions: submissions.length,
      gradeDistribution:
        task.gradingType === "stars"
          ? Array(8).fill(0) // 0-7 stars
          : [0, 0], // [fail, pass] for swipe
    };

    submissions.forEach((submission) => {
      if (submission.grades.length > 0) {
        gradeStats.gradedSubmissions++;

        submission.grades.forEach((grade) => {
          gradeStats.totalGrades++;

          if (typeof grade.grade === "number") {
            gradeStats.averageGrade += grade.grade;
            gradeStats.highestGrade = Math.max(
              gradeStats.highestGrade,
              grade.grade
            );
            gradeStats.lowestGrade = Math.min(
              gradeStats.lowestGrade,
              grade.grade
            );
            gradeStats.gradeDistribution[grade.grade]++;
          } else {
            gradeStats.gradeDistribution[grade.grade ? 1 : 0]++;
          }
        });
      } else {
        gradeStats.pendingSubmissions++;
      }
    });

    if (gradeStats.totalGrades > 0) {
      gradeStats.averageGrade /= gradeStats.totalGrades;
    }

    return gradeStats;
  }, [submissions, task.gradingType]);

  const userGrades = useMemo(() => {
    return submissions.map((submission) => ({
      userId: submission.userId,
      email: `${submission.userId}@example.com`, // Replace with actual email when available
      averageGrade:
        submission.grades.length > 0
          ? submission.grades.reduce(
              (sum, grade) =>
                sum +
                (typeof grade.grade === "number"
                  ? grade.grade
                  : grade.grade
                    ? 1
                    : 0),
              0
            ) / submission.grades.length
          : 0,
      status:
        submission.grades.length === 0
          ? "pending"
          : task.gradingType === "stars"
            ? stats.averageGrade >= 4
              ? "pass"
              : "fail"
            : stats.averageGrade >= 0.5
              ? "pass"
              : "fail",
    }));
  }, [submissions, task.gradingType, stats.averageGrade]);

  return (
    <div className="space-y-6">
      {/* Export Options */}
      <ExportOptions
        users={userGrades}
        taskTitle={task.title}
        taskId={task.id}
      />

      {/* Statistics Cards */}
      <GradeStatsCards stats={stats} gradingType={task.gradingType} />

      {/* Grade Distribution Chart */}
      <GradeDistributionChart
        gradeDistribution={stats.gradeDistribution}
        gradingType={task.gradingType}
      />

      {/* Recent Grades Table */}
      <RecentGradesTable
        submissions={submissions}
        gradingType={task.gradingType}
      />
    </div>
  );
};

export default TaskGradesOverview;
