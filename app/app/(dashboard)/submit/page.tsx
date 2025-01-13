import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit',
  description: 'Submit your tasks and assignments.',
};

export default function SubmitPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submit</h1>
      <p>This is the Submit page.</p>
      {/* Add the submission form component here in the future */}
    </div>
  );
}