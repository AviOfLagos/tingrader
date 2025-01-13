"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Import mock data
import { mockTracks, mockTasks, mockSubmissions } from '@/app/api/mock-data';

const Submissions = () => {
  const router = useRouter();

  const [selectedTrack, setSelectedTrack] = React.useState('all');

  const tracks = [{ id: 'all', name: 'All Tracks' }, ...mockTracks];

  // Filter tasks based on selected track
  const filteredTasks = mockTasks.filter((task) => {
    return selectedTrack === 'all' || task.trackId === selectedTrack;
  });

  // Map tasks to include submissions data
  const tasksWithSubmissions = filteredTasks.map((task) => {
    const submissions = mockSubmissions.filter(
      (submission) => submission.taskId === task.id
    );
    const pendingSubmissions = submissions.filter(
      (submission) => submission.grade === undefined
    );
    // Determine if the task is open or closed based on dueDate
    const isClosed = new Date(task.dueDate) < new Date();
    const timeRemaining = Math.max(
      0,
      Math.floor((new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60))
    );

    return {
      ...task,
      submissionsCount: submissions.length,
      pendingCount: pendingSubmissions.length,
      gradingType: task.gradingType,
      trackName: mockTracks.find((t) => t.id === task.trackId)?.name || 'Unknown',
      status: isClosed ? 'Closed' : `Open till: ${timeRemaining} hours`,
    };
  });

  const handleTaskClick = (taskId: string, gradingType: string) => {
    router.push(`/grading/${taskId}?type=${gradingType}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tasks for Grading</h1>
        <Select value={selectedTrack} onValueChange={setSelectedTrack}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Track" />
          </SelectTrigger>
          <SelectContent>
            {tracks.map((track) => (
              <SelectItem key={track.id} value={track.id}>
                {track.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {tasksWithSubmissions.map((task) => (
          <Card
            key={task.id}
            className="p-4 border hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleTaskClick(task.id, task.gradingType)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-500">{task.trackName}</p>
                <p className="text-sm text-gray-500">
                  {task.pendingCount} pending of {task.submissionsCount} submissions
                </p>
                <p className="text-sm text-gray-500">{task.status}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {task.gradingType === 'stars' ? '⭐ Star Rating' : '↔️ Swipe'}
                </span>
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    {task.pendingCount}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Submissions;
