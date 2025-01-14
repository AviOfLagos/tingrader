"use client";

import React, { useState, useMemo } from 'react';
import TaskFilters from './TaskFilters';
import TaskCard from './TaskCard';
import { Task } from '@/types';
import { mockTasks } from '@/app/api/mock-data';
import { TRACKS, STAGES, SORT_OPTIONS } from '@/app/api/constants'; // Import constants

const TaskListView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTrack, setSelectedTrack] = useState<string>(TRACKS.ALL);
  const [selectedStage, setSelectedStage] = useState<string>(STAGES.ALL);
  const [sortBy, setSortBy] = useState<string>(SORT_OPTIONS.DUE_DATE);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredAndSortedTasks = useMemo<Task[]>(() => {
    return mockTasks
      .filter((task: Task) => {
        const matchesSearch =
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTrack =
          selectedTrack === TRACKS.ALL || task.track === selectedTrack;
        const matchesStage =
          selectedStage === STAGES.ALL ||
          task.stage.toString() === selectedStage;
        return matchesSearch && matchesTrack && matchesStage;
      })
      .sort((a: Task, b: Task) => {
        if (sortBy === SORT_OPTIONS.DUE_DATE) {
          return sortOrder === 'asc'
            ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
            : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        } else if (sortBy === SORT_OPTIONS.SUBMISSIONS) {
          return sortOrder === 'asc'
            ? a.currentSubmissions - b.currentSubmissions
            : b.currentSubmissions - a.currentSubmissions;
        }
        return 0;
      });
  }, [searchTerm, selectedTrack, selectedStage, sortBy, sortOrder]);

  return (
    <div className="container mx-auto p-4">
      <TaskFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
        selectedStage={selectedStage}
        setSelectedStage={setSelectedStage}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedTasks.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {filteredAndSortedTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No tasks found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskListView;
