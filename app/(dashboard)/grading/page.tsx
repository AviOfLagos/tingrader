import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grading',
  description: 'View and grade submissions.',
};

export default function GradingPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Grading interface? </h1>
    </div>
  );
}
