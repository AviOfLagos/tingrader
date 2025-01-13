import Leaderboard from '@/components/leaderboard/Leaderboard';

import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leaderboard',
  description: 'View the leaderboard and rankings.',
};

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <p>This is the Leaderboard page.</p>
      <Leaderboard />
    </div>
  );
}
