import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create',
  description: 'Create new tasks and assignments.',
};

export default function CreatePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create</h1>
      <p>This is the Create page.</p>
      {/* Add the task creation form component here in the future */}
    </div>
  );
}