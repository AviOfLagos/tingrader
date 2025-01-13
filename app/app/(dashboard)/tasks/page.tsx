import React from 'react';
import { siteMetadata } from '@/config/metadata';
import TaskList from '@/components/tasks/TasksList';

export const metadata = {
  ...siteMetadata,
  title: 'Tasks',
  description: 'View and manage your tasks.',
};

export default function TasksPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <p>This is the Tasks page.</p>
      <TaskList />
    </div>
  );
}
