// components/profile/SubmissionChart.tsx
import { UserSubmissionStats } from "@/mock/user-extended-data";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export function SubmissionChart({ stats }: { stats: UserSubmissionStats }) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Submission Activity</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats.submitsByWeek}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
