"use client";

import React, { useState } from 'react';
import { ArrowUpDown, Trophy } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Leaderboard = () => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  }>({ key: 'score', direction: 'desc' });

  // Mock data
  const tracks = [
    { id: 'all', name: 'All Tracks' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'mobile', name: 'Mobile' },
  ];

  const stages = [
    { id: 'all', name: 'All Stages' },
    { id: 'stage1', name: 'Stage 1' },
    { id: 'stage2', name: 'Stage 2' },
    { id: 'stage3', name: 'Stage 3' },
  ];

  const interns = [
    {
      id: 1,
      rank: 1,
      name: 'John Doe',
      track: 'Frontend',
      stage: 'Stage 2',
      tasksCompleted: 15,
      avgScore: 6.8,
      score: 95,
    },
    {
      id: 2,
      rank: 2,
      name: 'Jane Smith',
      track: 'Backend',
      stage: 'Stage 2',
      tasksCompleted: 14,
      avgScore: 6.5,
      score: 92,
    },
    // Add more mock data
  ];

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedInterns = () => {
    const sorted = [...interns].sort((a, b) => {
      if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    return sorted;
  };

  const getTopPerformers = () => {
    return interns.slice(0, 3);
  };

  return (
    <div className="space-y-6">
      {/* Top Performers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {getTopPerformers().map((intern, index) => (
          <Card key={intern.id} className="p-4">
            <div className="flex items-center gap-4">
              <div
                className={`
                h-12 w-12 rounded-full flex items-center justify-center
                ${
                  index === 0
                    ? 'bg-yellow-100 text-yellow-600'
                    : index === 1
                      ? 'bg-gray-100 text-gray-600'
                      : 'bg-orange-100 text-orange-600'
                }
              `}
              >
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">{intern.name}</p>
                <p className="text-sm text-gray-500">{intern.track}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-2xl font-bold">{intern.score}</p>
                <p className="text-sm text-gray-500">points</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select defaultValue="all">
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

        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Stage" />
          </SelectTrigger>
          <SelectContent>
            {stages.map((stage) => (
              <SelectItem key={stage.id} value={stage.id}>
                {stage.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Leaderboard Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Track</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort('tasksCompleted')}
              >
                Tasks
                <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort('avgScore')}
              >
                Avg. Score
                <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => requestSort('score')}
              >
                Points
                <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getSortedInterns().map((intern) => (
              <TableRow key={intern.id}>
                <TableCell className="font-medium">{intern.rank}</TableCell>
                <TableCell>{intern.name}</TableCell>
                <TableCell>{intern.track}</TableCell>
                <TableCell>{intern.stage}</TableCell>
                <TableCell>{intern.tasksCompleted}</TableCell>
                <TableCell>{intern.avgScore.toFixed(1)}</TableCell>
                <TableCell className="font-semibold">{intern.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Leaderboard;
