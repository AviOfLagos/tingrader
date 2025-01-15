import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'View and edit your profile information.',
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>This is the Profile page.</p>
      {/* Add the profile component here in the future */}
    </div>
  );
}