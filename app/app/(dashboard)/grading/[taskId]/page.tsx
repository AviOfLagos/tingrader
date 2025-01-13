import GradingInterface from '@/components/grading/GradingInterface';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grading',
  description: 'View and grade submissions.',
};

export default function GradingTaskPage({
  params,
  searchParams,
}: {
  params: { taskId: string };
  searchParams: { type: 'stars' | 'swipe' };
}) {
  return (
    <div className="container mx-auto py-6">
      <GradingInterface
        taskId={params.taskId}
        gradingType={searchParams.type}
      />
    </div>
  );
}
