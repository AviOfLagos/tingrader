// app/api/mock-data.ts
import { Task, User, Submission, Track, Role, LeaderboardData } from '@/types';

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: 'user1',
    email: 'alice@example.com',
    name: 'Alice',
    username: 'alice',
    role: Role.Intern,
    trackId: 'frontend',
  },
  {
    id: 'user2',
    email: 'bob@example.com',
    name: 'Bob',
    username: 'bob',
    role: Role.Intern,
    trackId: 'backend',
  },
  {
    id: 'user3',
    email: 'charlie@example.com',
    name: 'Charlie',
    username: 'charlie',
    role: Role.Mentor,
    trackId: 'design',
  },
  {
    id: 'user4',
    email: 'dave@example.com',
    name: 'Dave',
    username: 'dave',
    role: Role.Intern,
    trackId: 'backend',
  },
  {
    id: 'user5',
    email: 'eve@example.com',
    name: 'Eve',
    username: 'eve',
    role: Role.Intern,
    trackId: 'design',
  },
  {
    id: 'user6',
    email: 'frank@example.com',
    name: 'Frank',
    username: 'frank',
    role: Role.Intern,
    trackId: 'frontend',
  },
  {
    id: 'user7',
    email: 'grace@example.com',
    name: 'Grace',
    username: 'grace',
    role: Role.Intern,
    trackId: 'design',
  },
  {
    id: 'user8',
    email: 'heidi@example.com',
    name: 'Heidi',
    username: 'heidi',
    role: Role.Intern,
    trackId: 'frontend',
  },
  {
    id: 'user9',
    email: 'ivan@example.com',
    name: 'Ivan',
    username: 'ivan',
    role: Role.Intern,
    trackId: 'backend',
  },
  {
    id: 'user10',
    email: 'judy@example.com',
    name: 'Judy',
    username: 'judy',
    role: Role.Intern,
    trackId: 'design',
  },
  // Add more mock users as needed...
];

// Mock Members Data (Exported)
export const mockMembers: User[] = mockUsers;

// Mock Tracks Data
export const mockTracks: Track[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'Frontend development track',
  },
  {
    id: 'backend',
    name: 'Backend',
    description: 'Backend development track',
  },
  {
    id: 'design',
    name: 'Design',
    description: 'Design track',
  },
  // Add more mock tracks as needed...
];

// Mock Submissions Data
export const mockSubmissions: Submission[] = [
  {
    id: 'submission1',
    taskId: '1',
    submittedBy: 'user1', // Alice
    submittedAt: '2023-06-01T10:00:00Z',
    contents: [
      {
        type: 'link',
        value: 'https://github.com/alice/project1',
      },
    ],
    grade: 5,
    gradedBy: 'user3', // Charlie
    gradedAt: '2023-06-02T14:00:00Z',
  },
  {
    id: 'submission2',
    taskId: '2',
    submittedBy: 'user2', // Bob
    submittedAt: '2023-06-03T12:30:00Z',
    contents: [
      {
        type: 'link',
        value: 'https://dribbble.com/bob/design1',
      },
    ],
    grade: true, // For swipe grading
    gradedBy: 'user3', // Charlie
    gradedAt: '2023-06-04T16:45:00Z',
  },
  // Add more mock submissions as needed...
];

// Mock Tasks Data
export const mockTasks: Task[] = [
  // Restored and existing tasks
  {
    id: '1',
    title: 'Build a REST API',
    description: 'Create a RESTful API using Express and MongoDB',
    trackId: 'backend',
    track: 'backend',
    stage: 1,
    gradingType: 'stars',
    createdAt: '2023-01-01T00:00:00Z',
    dueDate: '2025-02-15T23:59:59Z',
    createdBy: 'user3', // Charlie
    status: 'open',
    currentSubmissions: 15,
    maxSubmissions: 50,
    currentGraders: 2,
    maxGraders: 3,
  },
  {
    id: '2',
    title: 'Design a Mobile App',
    description: 'Create a UI/UX design for a mobile application',
    trackId: 'design',
    track: 'design',
    stage: 2,
    gradingType: 'swipe',
    createdAt: '2023-01-05T00:00:00Z',
    dueDate: '2025-03-01T23:59:59Z',
    createdBy: 'user3', // Charlie
    status: 'open',
    currentSubmissions: 30,
    maxSubmissions: 30,
    currentGraders: 3,
    maxGraders: 3,
  },
  {
    id: '3',
    title: 'Frontend Challenge',
    description: 'Implement a landing page using React and Tailwind CSS',
    trackId: 'frontend',
    track: 'frontend',
    stage: 1,
    gradingType: 'stars',
    createdAt: '2023-01-10T00:00:00Z',
    dueDate: '2024-12-31T23:59:59Z',
    createdBy: 'user3', // Charlie
    status: 'closed',
    currentSubmissions: 20,
    maxSubmissions: 20,
    currentGraders: 3,
    maxGraders: 3,
  },
  {
    id: '4',
    title: 'Database Optimization',
    description: 'Optimize database queries for a large dataset',
    trackId: 'backend',
    track: 'backend',
    stage: 3,
    gradingType: 'stars',
    createdAt: '2023-02-01T00:00:00Z',
    dueDate: '2025-04-01T23:59:59Z',
    createdBy: 'user3', // Charlie
    status: 'open',
    currentSubmissions: 5,
    maxSubmissions: 25,
    currentGraders: 1,
    maxGraders: 2,
  },
  {
    id: '5',
    title: 'Logo Design',
    description: 'Create a new logo for our upcoming product',
    trackId: 'design',
    track: 'design',
    stage: 1,
    gradingType: 'swipe',
    createdAt: '2023-03-15T00:00:00Z',
    dueDate: '2025-05-01T23:59:59Z',
    createdBy: 'user3', // Charlie
    status: 'open',
    currentSubmissions: 10,
    maxSubmissions: 50,
    currentGraders: 2,
    maxGraders: 4,
  },
  {
    id: '6',
    title: 'Security Audit',
    description: 'Perform a security audit on our application',
    trackId: 'backend',
    track: 'backend',
    stage: 2,
    gradingType: 'stars',
    createdAt: '2023-04-10T00:00:00Z',
    dueDate: '2025-06-15T23:59:59Z',
    createdBy: 'user3', // Charlie
    status: 'closed',
    currentSubmissions: 25,
    maxSubmissions: 25,
    currentGraders: 3,
    maxGraders: 3,
  },
  {
    id: '7',
    title: 'Animations in Web',
    description: 'Implement interactive animations using CSS and JavaScript',
    trackId: 'frontend',
    track: 'frontend',
    stage: 2,
    gradingType: 'stars',
    createdAt: '2023-05-20T00:00:00Z',
    dueDate: '2025-07-20T23:59:59Z',
    createdBy: 'user3', // Charlie
    status: 'open',
    currentSubmissions: 8,
    maxSubmissions: 40,
    currentGraders: 1,
    maxGraders: 2,
  },
  // Include all other existing tasks...
  // Add new tasks as needed without removing existing ones
];

// Mock Leaderboard Data
export const mockLeaderboardData: LeaderboardData[] = [
  {
    id: 'leaderboard1',
    userId: 'user1',
    taskId: '1',
    name: 'Alice',
    track: 'Frontend',
    stage: '1',
    score: 95,
    tasksCompleted: 10,
    avgScore: 90.5,
    rank: 1,
  },
  {
    id: 'leaderboard2',
    userId: 'user2',
    taskId: '2',
    name: 'Bob',
    track: 'Backend',
    stage: '2',
    score: 88,
    tasksCompleted: 8,
    avgScore: 85.0,
    rank: 2,
  },
  {
    id: 'leaderboard3',
    userId: 'user4',
    taskId: '3',
    name: 'Dave',
    track: 'Backend',
    stage: '2',
    score: 90,
    tasksCompleted: 9,
    avgScore: 87.0,
    rank: 3,
  },
  {
    id: 'leaderboard4',
    userId: 'user5',
    taskId: '4',
    name: 'Eve',
    track: 'Design',
    stage: '1',
    score: 92,
    tasksCompleted: 9,
    avgScore: 88.0,
    rank: 4,
  },
  {
    id: 'leaderboard5',
    userId: 'user6',
    taskId: '5',
    name: 'Frank',
    track: 'Frontend',
    stage: '1',
    score: 89,
    tasksCompleted: 8,
    avgScore: 86.0,
    rank: 5,
  },
  {
    id: 'leaderboard6',
    userId: 'user7',
    taskId: '6',
    name: 'Grace',
    track: 'Design',
    stage: '3',
    score: 85,
    tasksCompleted: 7,
    avgScore: 82.0,
    rank: 6,
  },
  {
    id: 'leaderboard7',
    userId: 'user8',
    taskId: '7',
    name: 'Heidi',
    track: 'Frontend',
    stage: '2',
    score: 87,
    tasksCompleted: 8,
    avgScore: 85.0,
    rank: 7,
  },
  {
    id: 'leaderboard8',
    userId: 'user9',
    taskId: '8',
    name: 'Ivan',
    track: 'Backend',
    stage: '3',
    score: 83,
    tasksCompleted: 6,
    avgScore: 80.0,
    rank: 8,
  },
  {
    id: 'leaderboard9',
    userId: 'user10',
    taskId: '9',
    name: 'Judy',
    track: 'Design',
    stage: '1',
    score: 91,
    tasksCompleted: 9,
    avgScore: 88.5,
    rank: 9,
  },
  // Add more leaderboard entries as needed...
];

