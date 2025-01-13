'use client';

import { useState } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LeaderboardEntry {
  id: string;
  name: string;
  track: string;
  stage: string;
  score: number;
  tasksCompleted: number;
  rank: number;
}

const mockLeaderboardData: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'John Doe',
    track: 'Frontend',
    stage: 'Stage 1',
    score: 95,
    tasksCompleted: 10,
    rank: 1,
  },
  {
    id: '2',
    name: 'Jane Smith',
    track: 'Backend',
    stage: 'Stage 2',
    score: 92,
    tasksCompleted: 8,
    rank: 2,
  },
  // Add more mock data
];

const tracks = ['All Tracks', 'Frontend', 'Backend', 'Mobile', 'DevOps'];
const stages = ['All Stages', 'Stage 1', 'Stage 2', 'Stage 3'];

export function LeaderboardView() {
  const [selectedTrack, setSelectedTrack] = useState('All Tracks');
  const [selectedStage, setSelectedStage] = useState('All Stages');

  const filteredData = mockLeaderboardData.filter((entry) => {
    const trackMatch =
      selectedTrack === 'All Tracks' || entry.track === selectedTrack;
    const stageMatch =
      selectedStage === 'All Stages' || entry.stage === selectedStage;
    return trackMatch && stageMatch;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <div className="flex flex-wrap gap-4">
          <Select value={selectedTrack} onValueChange={setSelectedTrack}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select track" />
            </SelectTrigger>
            <SelectContent>
              {tracks.map((track) => (
                <SelectItem key={track} value={track}>
                  {track}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedStage} onValueChange={setSelectedStage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              {stages.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Track</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead className="text-right">Tasks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.rank}</TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell>{entry.track}</TableCell>
                <TableCell>{entry.stage}</TableCell>
                <TableCell className="text-right">{entry.score}%</TableCell>
                <TableCell className="text-right">
                  {entry.tasksCompleted}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
