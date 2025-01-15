// components/tasks/grades/components/GradeDistributionChart.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Task } from "@/types/task";

interface GradeDistributionChartProps {
  gradeDistribution: number[];
  gradingType: Task["gradingType"];
}

const GradeDistributionChart: React.FC<GradeDistributionChartProps> = ({
  gradeDistribution,
  gradingType,
}) => {
  const chartData =
    gradingType === "stars"
      ? gradeDistribution.map((count, grade) => ({
          grade: grade,
          count: count,
          label: `${grade} stars`,
        }))
      : [
          { grade: "Fail", count: gradeDistribution[0], label: "Failed" },
          { grade: "Pass", count: gradeDistribution[1], label: "Passed" },
        ];

  interface TooltipProps {
    active?: boolean;
    payload?: Array<{ name?: string; value?: number; payload?: { label: string } }>;
    label?: string;
  }

  const customTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      const { label } = payload[0].payload || {};
      const value = payload[0].value;
      return (
        <div className="bg-background border rounded-lg p-2 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">
            {value} submissions
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grade Distribution</CardTitle>
        <CardDescription>
          Distribution of grades across all submissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="grade"
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
              />
              <Tooltip content={customTooltip} />
              <Line
                type="monotone"
                dataKey="count"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GradeDistributionChart;
