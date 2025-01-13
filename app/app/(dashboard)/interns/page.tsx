import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interns',
  description: 'Manage intern information and progress.',
};

export default function InternsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Interns</h1>
      <p>This is the Interns page.</p>
      {/* Add the interns list component here in the future */}
    </div>
  );
}