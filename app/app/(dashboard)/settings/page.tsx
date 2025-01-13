import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Adjust your account settings and preferences.',
};

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p>This is the Settings page.</p>
      {/* Add the settings components here in the future */}
    </div>
  );
}