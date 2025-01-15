// mock/tasks.ts
import { Task, TaskSubmission } from '../types/task';

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Build a REST API",
    description: "Create a RESTful API using Express and MongoDB",
    track: "backend",
    stage: 1,
    gradingType: "stars",
    createdAt: "2023-01-01T00:00:00Z",
    dueDate: "2025-02-15T23:59:59Z",
    createdBy: "user3", // Charlie
    status: "open",
    permissions: {
      canEdit: false,
      canDelete: false,
      canGrade: true,
      canSubmit: true,
    },
    submissions: {
      current: 15,
      max: 50,
      userHasSubmitted: true,
    },
    grading: {
      current: 2,
      required: 3,
      userHasGraded: false,
      pendingGrades: 0,
    },
  },
  {
    id: "2",
    title: "Design a Mobile App",
    description: "Create a UI/UX design for a mobile application",
    track: "design",
    stage: 2,
    gradingType: "swipe",
    createdAt: "2023-01-05T00:00:00Z",
    dueDate: "2025-03-01T23:59:59Z",
    createdBy: "user3", // Charlie
    status: "open",
    permissions: {
      canEdit: true,
      canDelete: false,
      canGrade: true,
      canSubmit: false,
    },
    submissions: {
      current: 30,
      max: 30,
      userHasSubmitted: false,
    },
    grading: {
      current: 3,
      required: 3,
      userHasGraded: false,
      pendingGrades: 0,
    },
  },
  {
    id: "3",
    title: "Frontend Challenge",
    description: "Implement a landing page using React and Tailwind CSS",
    track: "frontend",
    stage: 1,
    gradingType: "stars",
    createdAt: "2023-01-10T00:00:00Z",
    dueDate: "2024-12-31T23:59:59Z",
    createdBy: "user3", // Charlie
    status: "closed",
    permissions: {
      canEdit: false,
      canDelete: false,
      canGrade: false,
      canSubmit: false,
    },
    submissions: {
      current: 20,
      max: 20,
      userHasSubmitted: false,
    },
    grading: {
      current: 1,
      required: 2,
      userHasGraded: true,
      pendingGrades: 0,
    },
  },
  {
    id: "4",
    title: "Database Optimization",
    description: "Optimize database queries for a large dataset",
    track: "backend",
    stage: 3,
    gradingType: "stars",
    createdAt: "2023-02-01T00:00:00Z",
    dueDate: "2025-04-01T23:59:59Z",
    createdBy: "user3", // Charlie
    status: "open",
    permissions: {
      canEdit: false,
      canDelete: false,
      canGrade: false,
      canSubmit: false,
    },
    submissions: {
      current: 5,
      max: 25,
      userHasSubmitted: false,
    },
    grading: {
      current: 1,
      required: 2,
      userHasGraded: false,
      pendingGrades: 0,
    },
  },
  {
    id: "5",
    title: "Logo Design",
    description: "Create a new logo for our upcoming product",
    track: "design",
    stage: 3,
    gradingType: "swipe",
    createdAt: "2023-03-15T00:00:00Z",
    dueDate: "2025-05-01T23:59:59Z",
    createdBy: "user3", // Charlie
    status: "open",
    permissions: {
      canEdit: false,
      canDelete: false,
      canGrade: false,
      canSubmit: false,
    },
    submissions: {
      current: 10,
      max: 50,
      userHasSubmitted: false,
    },
    grading: {
      current: 1,
      required: 2,
      userHasGraded: false,
      pendingGrades: 0,
    },
  },
  {
    id: "6",
    title: "Security Audit",
    description: "Perform a security audit on our application",
    track: "backend",
    stage: 3,
    gradingType: "stars",
    createdAt: "2023-04-10T00:00:00Z",
    dueDate: "2025-06-15T23:59:59Z",
    createdBy: "user3", // Charlie
    status: "closed",
    permissions: {
      canEdit: false,
      canDelete: false,
      canGrade: false,
      canSubmit: false,
    },
    submissions: {
      current: 25,
      max: 25,
      userHasSubmitted: false,
    },
    grading: {
      current: 3,
      required: 3,
      userHasGraded: false,
      pendingGrades: 0,
    },
  },
  {
    id: "7",
    title: "Animations in Web",
    description: "Implement interactive animations using CSS and JavaScript",
    track: "frontend",
    stage: 3,
    gradingType: "stars",
    createdAt: "2023-05-20T00:00:00Z",
    dueDate: "2025-07-20T23:59:59Z",
    createdBy: "user3", // Charlie
    status: "open",
    permissions: {
      canEdit: false,
      canDelete: false,
      canGrade: false,
      canSubmit: false,
    },
    submissions: {
      current: 8,
      max: 40,
      userHasSubmitted: false,
    },
    grading: {
      current: 1,
      required: 2,
      userHasGraded: false,
      pendingGrades: 0,
    },
  },
  {
    id: "8",
    title: "Mobile App Development",
    description: "Design and develop a mobile app for our product",
    track: "mobile",
    stage: 1,
    gradingType: "swipe",
    createdAt: "2023-06-01T00:00:00Z",
    dueDate: "2025-08-01T23:59:59Z",
    createdBy: "user3", // Charlie
    status: "open",
    permissions: {
      canEdit: false,
      canDelete: false,
      canGrade: false,
      canSubmit: false,
    },
    submissions: {
      current: 15,
      max: 30,
      userHasSubmitted: false,
    },
    grading: {
      current: 2,
      required: 3,
      userHasGraded: false,
      pendingGrades: 0,
    },
  },
  {
    id: "9",
    title: "UI/UX Design",
    description: "Create a user-friendly and visually appealing interface",
    track: "design",
    stage: 3,
    gradingType: "swipe",
    createdAt: "2023-06-15T00:00:00Z",
    dueDate: "2025-09-01T23:59:59Z",
    createdBy: "user3", // Charlie
    status: "open",
    permissions: {
      canEdit: false,
      canDelete: false,
      canGrade: false,
      canSubmit: false,
    },
    submissions: {
      current: 20,
      max: 20,
      userHasSubmitted: false,
    },
    grading: {
      current: 3,
      required: 3,
      userHasGraded: false,
      pendingGrades: 0,
    },
  },
  {
    id: "10",
    title: "Data Analysis",
    description: "Analyze and interpret data for business insights",
    track: "backend",
    stage: 3,
    gradingType: "stars",
    createdAt: "2023-07-01T00:00:00Z",
    dueDate: "2025-10-01T23:59:59Z",
    createdBy: "user3", // Charlie
    status: "open",

    submissions: {
      current: 10,
      max: 25,
      userHasSubmitted: false,
    },
    grading: {
      current: 1,
      required: 2,
      userHasGraded: false,
      pendingGrades: 0,
    },
    permissions: {
      canEdit: false,
      canDelete: false,
      canGrade: false,
      canSubmit: false,
    },
  },
  // {
  //   id: "11",
  //   title: "Build a Responsive Navigation",
  //   description:
  //     "Create a responsive navigation bar using React and Tailwind CSS",
  //   track: "frontend",
  //   stage: 1,
  //   status: "open",
  //   dueDate: "2025-02-01T00:00:00Z",
  //   gradingType: "stars",
  //   submissions: {
  //     current: 15,
  //     max: 30,
  //     userHasSubmitted: false,
  //   },
  //   grading: {
  //     required: 2,
  //     current: 1,
  //     userHasGraded: false,
  //     pendingGrades: 10,
  //   },
  //   permissions: {
  //     canEdit: true,
  //     canDelete: true,
  //     canGrade: true,
  //     canSubmit: true,
  //   },
  // },
  // Include all other existing tasks...
  // Add new tasks as needed without removing existing ones
];

export const mockSubmissions: TaskSubmission[] = [
  {
    id: "1",
    taskId: "1",
    userId: "user1",
    content: "Here is my submission for the navigation task",
    attachments: ["/api/placeholder/800/400", "/api/placeholder/800/400"],
    submittedAt: "2025-01-15T10:00:00Z",
    grades: [
      {
        id: "grade1",
        graderId: "grader1",
        submissionId: "1",
        grade: 5,
        comment: "Good work on the responsive design",
        gradedAt: "2025-01-16T10:00:00Z",
      },
    ],
  },
  {
    id: "2",
    taskId: "1",
    userId: "user2",
    content: "Here is my submission for the navigation task",
    attachments: ["/api/placeholder/800/400", "/api/placeholder/800/400"],
    submittedAt: "2025-01-15T10:00:00Z",
    grades: [
      {
        id: "grade1",
        graderId: "grader1",
        submissionId: "1",
        grade: 5,
        comment: "Good work on the responsive design",
        gradedAt: "2025-01-16T10:00:00Z",
      },
    ],
  },
  {
    id: "2",
    taskId: "2",
    userId: "user2",
    content: "Here is my submission for the navigation task",
    attachments: ["/api/placeholder/800/400", "/api/placeholder/800/400"],
    submittedAt: "2025-01-15T10:00:00Z",
    grades: [
      {
        id: "grade1",
        graderId: "grader1",
        submissionId: "1",
        grade: 5,
        comment: "Good work on the responsive design",
        gradedAt: "2025-01-16T10:00:00Z",
      },
    ],
  },
  {
    id: "1-1",
    taskId: "1",
    userId: "user1",
    content:
      "Implemented REST API with Express and MongoDB with full CRUD operations. Added authentication middleware and proper error handling.",
    attachments: ["/api/placeholder/800/400", "/api/placeholder/800/400"],
    submittedAt: "2025-01-15T10:00:00Z",
    grades: [
      {
        id: "grade1-1",
        graderId: "grader1",
        submissionId: "1-1",
        grade: 6,
        comment:
          "Excellent implementation. Good security practices and clean code.",
        gradedAt: "2025-01-16T10:00:00Z",
      },
      {
        id: "grade1-2",
        graderId: "grader2",
        submissionId: "1-1",
        grade: 7,
        comment: "Perfect implementation with great documentation.",
        gradedAt: "2025-01-16T11:00:00Z",
      },
    ],
  },
  {
    id: "1-1",
    taskId: "1",
    userId: "user1",
    content:
      "Implemented REST API with Express and MongoDB with full CRUD operations. Added authentication middleware and proper error handling.",
    attachments: ["/api/placeholder/800/400", "/api/placeholder/800/400"],
    submittedAt: "2025-01-15T10:00:00Z",
    grades: [
      {
        id: "grade1-1",
        graderId: "grader1",
        submissionId: "1-1",
        grade: 6,
        comment:
          "Excellent implementation. Good security practices and clean code.",
        gradedAt: "2025-01-16T10:00:00Z",
      },
      {
        id: "grade1-2",
        graderId: "grader2",
        submissionId: "1-1",
        grade: 7,
        comment: "Perfect implementation with great documentation.",
        gradedAt: "2025-01-16T11:00:00Z",
      },
    ],
  },
  {
    id: "1-2",
    taskId: "1",
    userId: "user2",
    content:
      "Created REST API with basic CRUD operations. Includes Swagger documentation.",
    attachments: ["/api/placeholder/800/400"],
    submittedAt: "2025-01-15T12:00:00Z",
    grades: [
      {
        id: "grade1-3",
        graderId: "grader1",
        submissionId: "1-2",
        grade: 5,
        comment: "Good basic implementation but missing error handling.",
        gradedAt: "2025-01-16T13:00:00Z",
      },
    ],
  },
  {
    id: "1-3",
    taskId: "1",
    userId: "user3",
    content:
      "Implemented REST API with advanced features including rate limiting and caching.",
    attachments: [
      "/api/placeholder/800/400",
      "/api/placeholder/800/400",
      "/api/placeholder/800/400",
    ],
    submittedAt: "2025-01-15T14:00:00Z",
    grades: [], // Pending grades
  },

  // Task 2: Design a Mobile App - Multiple submissions with mixed grading types
  {
    id: "2-1",
    taskId: "2",
    userId: "user4",
    content:
      "Designed a modern mobile app UI with focus on accessibility and user experience.",
    attachments: ["/api/placeholder/800/400", "/api/placeholder/800/400"],
    submittedAt: "2025-01-20T09:00:00Z",
    grades: [
      {
        id: "grade2-1",
        graderId: "grader3",
        submissionId: "2-1",
        grade: true, // Pass for swipe grading
        comment: "Excellent design choices and attention to detail.",
        gradedAt: "2025-01-21T10:00:00Z",
      },
      {
        id: "grade2-2",
        graderId: "grader4",
        submissionId: "2-1",
        grade: true,
        comment: "Very intuitive design.",
        gradedAt: "2025-01-21T11:00:00Z",
      },
    ],
  },
  {
    id: "2-2",
    taskId: "2",
    userId: "user5",
    content: "Created minimalist app design focusing on core functionality.",
    attachments: ["/api/placeholder/800/400"],
    submittedAt: "2025-01-20T11:00:00Z",
    grades: [
      {
        id: "grade2-3",
        graderId: "grader3",
        submissionId: "2-2",
        grade: false, // Fail for swipe grading
        comment: "Design lacks necessary features and polish.",
        gradedAt: "2025-01-21T12:00:00Z",
      },
    ],
  },

  // Task 3: Frontend Challenge - Multiple submissions
  {
    id: "3-1",
    taskId: "3",
    userId: "user6",
    content:
      "Implemented responsive landing page with animations and dark mode.",
    attachments: ["/api/placeholder/800/400", "/api/placeholder/800/400"],
    submittedAt: "2024-12-15T10:00:00Z",
    grades: [
      {
        id: "grade3-1",
        graderId: "grader1",
        submissionId: "3-1",
        grade: 7,
        comment: "Outstanding implementation with extra features.",
        gradedAt: "2024-12-16T10:00:00Z",
      },
    ],
  },
  {
    id: "3-2",
    taskId: "3",
    userId: "user7",
    content: "Built landing page with focus on performance optimization.",
    attachments: ["/api/placeholder/800/400"],
    submittedAt: "2024-12-15T11:00:00Z",
    grades: [
      {
        id: "grade3-2",
        graderId: "grader2",
        submissionId: "3-2",
        grade: 6,
        comment: "Great performance metrics but could improve design.",
        gradedAt: "2024-12-16T11:00:00Z",
      },
    ],
  },
  {
    id: "3-3",
    taskId: "3",
    userId: "user8",
    content: "Created landing page with interactive components and animations.",
    attachments: ["/api/placeholder/800/400", "/api/placeholder/800/400"],
    submittedAt: "2024-12-15T12:00:00Z",
    grades: [], // Pending grades
  },

  // Task 4: Database Optimization - Submissions with detailed feedback
  {
    id: "4-1",
    taskId: "4",
    userId: "user9",
    content:
      "Optimized query performance with proper indexing and query restructuring.",
    attachments: ["/api/placeholder/800/400"],
    submittedAt: "2025-03-01T09:00:00Z",
    grades: [
      {
        id: "grade4-1",
        graderId: "grader5",
        submissionId: "4-1",
        grade: 5,
        comment: "Good optimization techniques but missing documentation.",
        gradedAt: "2025-03-02T10:00:00Z",
      },
    ],
  },
  {
    id: "4-2",
    taskId: "4",
    userId: "user10",
    content: "Implemented caching and query optimization strategies.",
    attachments: ["/api/placeholder/800/400"],
    submittedAt: "2025-03-01T10:00:00Z",
    grades: [], // Pending grades
  },

  // Task 5: Logo Design - Multiple submissions with swipe grading
  {
    id: "5-1",
    taskId: "5",
    userId: "user11",
    content: "Modern and minimalist logo design with versatile applications.",
    attachments: ["/api/placeholder/800/400", "/api/placeholder/800/400"],
    submittedAt: "2025-04-01T09:00:00Z",
    grades: [
      {
        id: "grade5-1",
        graderId: "grader6",
        submissionId: "5-1",
        grade: true,
        comment: "Excellent design that meets all requirements.",
        gradedAt: "2025-04-02T10:00:00Z",
      },
    ],
  },
  {
    id: "5-2",
    taskId: "5",
    userId: "user12",
    content: "Bold and colorful logo design with brand guidelines.",
    attachments: ["/api/placeholder/800/400"],
    submittedAt: "2025-04-01T10:00:00Z",
    grades: [], // Pending grades
  },

  // ... Additional submissions can be added for tasks 6-10 following similar pattern
];