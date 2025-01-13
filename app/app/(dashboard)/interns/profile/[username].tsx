"use client";

import React from 'react';
import { useRouter } from 'next/router';
import { mockMembers, mockSubmissions } from '../../../../api/mock-data';
import { User, Submission } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const InternProfile = () => {
  const router = useRouter();
  const { query } = useRouter();
  const { username } = query;
  
  const intern = mockMembers.find((member: User) => member.username === username);

  if (!intern) {
    return <p>Intern not found</p>;
  }

  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterScore, setFilterScore] = React.useState('');
  
  const filteredSubmissions = mockSubmissions
    .filter(submission => submission.submittedBy === intern.id)
    .filter(submission => submission.contents[0].value.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(submission => (filterScore ? String(submission.grade) === filterScore : true));
  
  const averageScore = filteredSubmissions.reduce((acc: number, submission: Submission) => acc + (Number(submission.grade) || 0), 0) / filteredSubmissions.length;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center space-x-4">
        <img src="/avi.jpeg" alt="Profile" className="w-24 h-24 rounded-full" />
        <div>
          <h1 className="text-2xl font-bold">{intern.name}</h1>
          <p className="text-sm text-muted-foreground">{intern.email}</p>
          <p className="text-sm">Role: {intern.role}</p>
          <Select
            value={intern.role}
            onValueChange={(value) => console.log('Change role to', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mentor">Mentor</SelectItem>
              <SelectItem value="grader">Grader</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Submitted Tasks</h2>
        <div className="flex space-x-4 mb-4">
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Input
            placeholder="Filter by score..."
            value={filterScore}
            onChange={(e) => setFilterScore(e.target.value)}
          />
        </div>
        <p className="text-sm">Average Score: {averageScore.toFixed(2)}</p>
        <table className="min-w-full bg-white mt-4">
          <thead>
            <tr>
              <th className="py-2">Task</th>
              <th className="py-2">Score</th>
              <th className="py-2">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map(submission => (
              <tr key={submission.id}>
                <td className="border px-4 py-2">{submission.contents[0].value}</td>
                <td className="border px-4 py-2">{submission.grade || 'Not graded'}</td>
                <td className="border px-4 py-2">{new Date(submission.submittedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InternProfile;