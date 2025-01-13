import { Task, Submission, User, Role, LeaderboardData, Track } from '@/types';

export const mockTracks: Track[] = [
  { id: 'frontend', name: 'Frontend', description: 'Learn frontend development with React.' },
  { id: 'backend', name: 'Backend', description: 'Learn backend development with Node.js.' },
  { id: 'mobile', name: 'Mobile', description: 'Learn mobile development with React Native.' },
];

export const mockStages = [
  { id: 'stage1', name: 'Stage 1' },
  { id: 'stage2', name: 'Stage 2' },
  { id: 'stage3', name: 'Stage 3' },
];

export const interns = [
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
  // Add more interns as needed
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Build a React Component',
    description: 'Create a simple React component that displays a greeting message.',
    trackId: 'frontend',
    gradingType: 'stars',
    createdAt: '2024-01-15T10:00:00Z',
    dueDate: '2024-01-22T10:00:00Z',
    createdBy: '2', // Bob Mentor
  },
  {
    id: '2',
    title: 'Set up a Node.js Server',
    description: 'Set up a basic Node.js server using Express.',
    trackId: 'backend',
    gradingType: 'swipe',
    createdAt: '2024-01-16T14:00:00Z',
    dueDate: '2024-01-23T14:00:00Z',
    createdBy: '2', // Bob Mentor
  },
  // Add more tasks as needed
];

export const mockMembers: User[] = [
  {
    id: '1',
    email: 'owner@example.com',
    name: 'Alice Owner',
    role: Role.Mentor,
  },
  {
    id: '2',
    email: 'mentor1@example.com',
    name: 'Bob Mentor',
    role: Role.Mentor,
    trackId: 'frontend',
  },
  {
    id: '3',
    email: 'grader1@example.com',
    name: 'Charlie Grader',
    role: Role.Grader,
    trackId: 'frontend',
  },
  {
    id: '4',
    email: 'intern1@example.com',
    name: 'David Intern',
    role: Role.Intern,
    trackId: 'frontend',
  },
  {
    id: '5',
    email: 'intern2@example.com',
    name: 'Eve Intern',
    role: Role.Intern,
    trackId: 'backend',
  },
  {
    id: '6',
    email: 'hostelbrs+2@gmail.com',
    name: 'Avi OfLagos',
    role: Role.ChiefOwner,
  },
  // Add more members as needed
];

export const mockCurrentUser: User = {
  id: '6',
  email: 'hostelbrs+2@gmail.com',
  name: 'Current User',
  role: Role.ChiefOwner,
  trackId: '*',
};

export const mockSubmissions: Submission[] = [
  {
    id: '1',
    taskId: '1',
    submittedBy: '4', // David Intern
    submittedAt: '2024-01-21T09:00:00Z',
    contents: [{ type: 'description', value: 'Here is my solution for the React component task.' }],
    grade: undefined,
    gradedBy: undefined,
    gradedAt: undefined,
  },
  {
    id: '2',
    taskId: '2',
    submittedBy: '5', // Eve Intern
    submittedAt: '2024-01-22T13:00:00Z',
    contents: [{ type: 'link', value: 'https://github.com/eve/nodejs-server' }],
    grade: undefined,
    gradedBy: undefined,
    gradedAt: undefined,
  },
  // Add more submissions as needed
];

export const mockLeaderboardData: LeaderboardData[] = [
  {
    id: '1',
    userId: '4',
    taskId: '1',
    name: 'John Doe',
    track: 'Frontend',
    stage: 'Stage 2',
    score: 95,
    tasksCompleted: 15,
    avgScore: 6.8,
    rank: 1,
  },
  {
    id: '2',
    userId: '5',
    taskId: '2',
    name: 'Jane Smith',
    track: 'Backend',
    stage: 'Stage 2',
    score: 92,
    tasksCompleted: 14,
    avgScore: 6.5,
    rank: 2,
  },
  // Add more leaderboard entries as needed
];

export const mockCreatedTasksPerTrack = [
  { trackId: 'frontend', count: 1 },
  { trackId: 'backend', count: 1 },
  // Add more data as needed
];