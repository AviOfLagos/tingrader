import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'settings',
  description: 'settings your tasks and assignments.',
};

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">settings</h1>
      <p>This is the settings page.</p>
      {/* Add the submission form component here in the future */}
    </div>
  );
}
