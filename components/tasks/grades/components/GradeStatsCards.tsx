// components/tasks/grades/components/GradeStatsCards.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, UserCheck, AlertTriangle } from "lucide-react";
import { Task } from "@/types/task";

interface GradeStatsCardsProps {
  stats: {
    totalGrades: number;
    averageGrade: number;
    highestGrade: number;
    lowestGrade: number;
    gradedSubmissions: number;
    pendingSubmissions: number;
    totalSubmissions: number;
    gradeDistribution: number[];
  };
  gradingType: Task["gradingType"];
}

const GradeStatsCards: React.FC<GradeStatsCardsProps> = ({
  stats,
  gradingType,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Average Grade Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Average Grade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            {gradingType === "stars" ? (
              <>
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-2xl font-bold">
                  {stats.averageGrade.toFixed(1)}
                </span>
                <span className="text-muted-foreground">/7</span>
              </>
            ) : (
              <span className="text-2xl font-bold">
                {(
                  (stats.gradeDistribution[1] / stats.totalGrades) *
                  100
                ).toFixed(1)}
                %
                <span className="text-base font-normal text-muted-foreground">
                  {" "}
                  pass rate
                </span>
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Graded Submissions Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Graded Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <UserCheck className="h-5 w-5" />
            <span className="text-2xl font-bold">
              {stats.gradedSubmissions}
            </span>
            <span className="text-muted-foreground">
              /{stats.totalSubmissions}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Pending Grades Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Pending Grades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <span className="text-2xl font-bold">
              {stats.pendingSubmissions}
            </span>
            <Progress
              value={(stats.gradedSubmissions / stats.totalSubmissions) * 100}
              className="w-20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Grade Range Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Grade Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            {gradingType === "stars" ? (
              <span className="text-2xl font-bold">
                {stats.lowestGrade} - {stats.highestGrade}
              </span>
            ) : (
              <Badge variant="outline">
                {stats.gradeDistribution[1]} Pass / {stats.gradeDistribution[0]}{" "}
                Fail
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GradeStatsCards;
