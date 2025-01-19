// app/(dashboard)/users/[id]/page.tsx

'use client';

import React from 'react';

interface UserProfilePageProps {
  params: {
    id: string;
  };
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ params }) => {
  const userId = params.id;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <p>User ID: {userId}</p>
      {/* Fetch and display user details here */}
    </div>
  );
};

export default UserProfilePage;