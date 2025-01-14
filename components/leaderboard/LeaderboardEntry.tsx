import React from 'react';
import { LeaderboardData } from '@/types';
import { Button } from '@/components/ui/button';

interface LeaderboardEntryProps {
  entry: LeaderboardData;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const LeaderboardEntry: React.FC<LeaderboardEntryProps> = ({
  entry,
  isSelected,
  onSelect,
}) => {
  return (
    <tr className="border-b">
      <td className="px-4 py-2 text-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(entry.id)}
        />
      </td>
      <td className="px-4 py-2 text-center">{entry.rank}</td>
      <td className="px-4 py-2">{entry.name}</td>
      <td className="px-4 py-2">{entry.track}</td>
      <td className="px-4 py-2 text-center">{entry.stage}</td>
      <td className="px-4 py-2 text-center">{entry.score}</td>
      <td className="px-4 py-2 text-center">{entry.tasksCompleted}</td>
      <td className="px-4 py-2 text-center">{entry.avgScore.toFixed(2)}</td>
      <td className="px-4 py-2">
        <Button
          variant="link"
          onClick={() => {
            // Handle profile view navigation
            console.log(`Viewing profile for user ID: ${entry.userId}`);
          }}
        >
          View Profile
        </Button>
      </td>
    </tr>
  );
};

export default LeaderboardEntry;
