// app/(dashboard)/tasks/submit/page.tsx
import TaskSubmissionForm from '@/components/tasks/TaskSubmissionForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit',
  description: 'Submit your tasks and assignments.',
}

export default function SubmitTaskPage() {
  return (
    <div className="container mx-auto py-6 m-16 ">
      <h1 className="text-2xl font-bold mb-6">Submit Task</h1>
      <TaskSubmissionForm />
    </div>
  );
}
