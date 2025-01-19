// components/users/UserInvite.tsx

import React from 'react';
import { Button } from '@/components/ui/button';

const UserInvite: React.FC = () => {
  const handleInvite = () => {
    // Placeholder function for inviting users
    alert('Invite sent!');
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-xl font-semibold mb-2">Invite a User</h2>
      <Button onClick={handleInvite}>Send Invite</Button>
    </div>
  );
};

export default UserInvite;