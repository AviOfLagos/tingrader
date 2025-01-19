import { Task, TaskSubmission } from "@/types/task";

// Mock Tasks Data
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Build a REST API",
    description: "Create a RESTful API using Express and MongoDB",
    track: "backend",
    stage: 1,
    status: "open",
    createdBy: "user3", // Charlie
    createdAt: "2023-01-01T00:00:00Z",
    dueDate: "2025-02-15T23:59:59Z",
    gradingType: "stars",
    maxSubmissions: 50,
    requiredGrades: 3,
    instructions: "Please build a REST API with the specified technologies.",
    isDraft: false,
    gradingConfig: {
      maxStars: 5,
    },
    settings: {
      allowLateSubmissions: false,
      gracePeriodHours: 0,
      requireGraderFeedback: true,
      autoPublishGrades: true,
      notifyOnSubmission: true,
    },
    submissions: {
      current: 15,
      max: 50,
      userHasSubmitted: false,
    },
    grading: {
      current: 2,
      required: 3,
      userHasGraded: false,
      pendingGrades: 1,
    },
    permissions: {
      canEdit: false,
      canDelete: false,
      canGrade: false,
      canSubmit: true,
    },
  },
  {
    id: "2",
    title: "Design a Mobile App",
    description: "Create a UI/UX design for a mobile application",
    track: "design",
    stage: 2,
    status: "open",
    createdBy: "user3", // Charlie
    createdAt: "2023-01-05T00:00:00Z",
    dueDate: "2025-03-01T23:59:59Z",
    gradingType: "swipe",
    maxSubmissions: 30,
    requiredGrades: 3,
    instructions: "Design a mobile app focusing on user experience.",
    isDraft: false,
    gradingConfig: {},
    settings: {
      allowLateSubmissions: true,
      gracePeriodHours: 24,
      requireGraderFeedback: false,
      autoPublishGrades: false,
      notifyOnSubmission: true,
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
    permissions: {
      canEdit: false,
      canDelete: false,
      canGrade: true,
      canSubmit: false,
    },
  },
  {
    id: "3",
    title: "Frontend Challenge",
    description: "Implement a landing page using React and Tailwind CSS",
    track: "frontend",
    stage: 1,
    status: "closed",
    createdBy: "user3", // Charlie
    createdAt: "2023-01-10T00:00:00Z",
    dueDate: "2024-12-31T23:59:59Z",
    gradingType: "stars",
    maxSubmissions: 20,
    requiredGrades: 2,
    instructions: "Build a responsive landing page as per the provided design.",
    isDraft: false,
    gradingConfig: {
      maxStars: 5,
    },
    settings: {
      allowLateSubmissions: false,
      gracePeriodHours: 0,
      requireGraderFeedback: true,
      autoPublishGrades: true,
      notifyOnSubmission: true,
    },
    submissions: {
      current: 20,
      max: 20,
      userHasSubmitted: false,
    },
    grading: {
      current: 1,
      required: 2,
      userHasGraded: false,
      pendingGrades: 1,
    },
    permissions: {
      canEdit: false,
      canDelete: false,
      canGrade: false,
      canSubmit: false,
    },
  },
  {
    id: "4",
    title: "Database Optimization",
    description: "Optimize database queries for a large dataset",
    track: "backend",
    stage: 3,
    status: "open",
    createdBy: "user3", // Charlie
    createdAt: "2023-02-01T00:00:00Z",
    dueDate: "2025-04-01T23:59:59Z",
    gradingType: "stars",
    maxSubmissions: 25,
    requiredGrades: 2,
    instructions: "Improve the performance of database queries.",
    isDraft: false,
    gradingConfig: {
      maxStars: 5,
    },
    settings: {
      allowLateSubmissions: true,
      gracePeriodHours: 12,
      requireGraderFeedback: false,
      autoPublishGrades: false,
      notifyOnSubmission: true,
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
      pendingGrades: 1,
    },
    permissions: {
      canEdit: false,
      canDelete: false,
      canGrade: true,
      canSubmit: true,
    },
  },
  {
    id: "5",
    title: "Logo Design",
    description: "Create a new logo for our upcoming product",
    track: "design",
    stage: 3,
    status: "open",
    createdBy: "user3", // Charlie
    createdAt: "2023-03-15T00:00:00Z",
    dueDate: "2025-05-01T23:59:59Z",
    gradingType: "swipe",
    maxSubmissions: 50,
    requiredGrades: 2,
    instructions: "Design a modern and minimalist logo.",
    isDraft: false,
    gradingConfig: {},
    settings: {
      allowLateSubmissions: true,
      gracePeriodHours: 48,
      requireGraderFeedback: false,
      autoPublishGrades: true,
      notifyOnSubmission: true,
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
      pendingGrades: 1,
    },
    permissions: {
      canEdit: false,
      canDelete: false,
      canGrade: false,
      canSubmit: true,
    },
  },
  {
    id: "6",
    title: "Security Audit",
    description: "Perform a security audit on our application",
    track: "backend",
    stage: 3,
    status: "closed",
    createdBy: "user3", // Charlie
    createdAt: "2023-04-10T00:00:00Z",
    dueDate: "2025-06-15T23:59:59Z",
    gradingType: "stars",
    maxSubmissions: 25,
    requiredGrades: 3,
    instructions: "Identify vulnerabilities and suggest improvements.",
    isDraft: false,
    gradingConfig: {
      maxStars: 5,
    },
    settings: {
      allowLateSubmissions: false,
      gracePeriodHours: 0,
      requireGraderFeedback: true,
      autoPublishGrades: true,
      notifyOnSubmission: true,
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
    permissions: {
      canEdit: false,
      canDelete: false,
      canGrade: false,
      canSubmit: false,
    },
  },
  {
    id: "7",
    title: "Animations in Web",
    description: "Implement interactive animations using CSS and JavaScript",
    track: "frontend",
    stage: 3,
    status: "open",
    createdBy: "user3", // Charlie
    createdAt: "2023-05-20T00:00:00Z",
    dueDate: "2025-07-20T23:59:59Z",
    gradingType: "stars",
    maxSubmissions: 40,
    requiredGrades: 2,
    instructions: "Create engaging animations for web interfaces.",
    isDraft: false,
    gradingConfig: {
      maxStars: 5,
    },
    settings: {
      allowLateSubmissions: true,
      gracePeriodHours: 24,
      requireGraderFeedback: true,
      autoPublishGrades: false,
      notifyOnSubmission: true,
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
      pendingGrades: 1,
    },
    permissions: {
      canEdit: false,
      canDelete: false,
      canGrade: true,
      canSubmit: true,
    },
  },
  {
    id: "8",
    title: "Mobile App Development",
    description: "Design and develop a mobile app for our product",
    track: "mobile",
    stage: 1,
    status: "open",
    createdBy: "user3", // Charlie
    createdAt: "2023-06-01T00:00:00Z",
    dueDate: "2025-08-01T23:59:59Z",
    gradingType: "swipe",
    maxSubmissions: 30,
    requiredGrades: 3,
    instructions: "Develop a cross-platform mobile application.",
    isDraft: false,
    gradingConfig: {},
    settings: {
      allowLateSubmissions: false,
      gracePeriodHours: 0,
      requireGraderFeedback: false,
      autoPublishGrades: true,
      notifyOnSubmission: true,
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
      pendingGrades: 1,
    },
    permissions: {
      canEdit: false,
      canDelete: false,
      canGrade: false,
      canSubmit: true,
    },
  },
  {
    id: "9",
    title: "UI/UX Design",
    description: "Create a user-friendly and visually appealing interface",
    track: "design",
    stage: 3,
    status: "open",
    createdBy: "user3", // Charlie
    createdAt: "2023-06-15T00:00:00Z",
    dueDate: "2025-09-01T23:59:59Z",
    gradingType: "swipe",
    maxSubmissions: 20,
    requiredGrades: 3,
    instructions: "Design an intuitive UI/UX for our application.",
    isDraft: false,
    gradingConfig: {},
    settings: {
      allowLateSubmissions: true,
      gracePeriodHours: 12,
      requireGraderFeedback: false,
      autoPublishGrades: false,
      notifyOnSubmission: true,
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
    permissions: {
      canEdit: false,
      canDelete: false,
      canGrade: true,
      canSubmit: false,
    },
  },
  {
    id: "10",
    title: "Data Analysis",
    description: "Analyze and interpret data for business insights",
    track: "backend",
    stage: 3,
    status: "open",
    createdBy: "user3", // Charlie
    createdAt: "2023-07-01T00:00:00Z",
    dueDate: "2025-10-01T23:59:59Z",
    gradingType: "stars",
    maxSubmissions: 25,
    requiredGrades: 2,
    instructions: "Provide data-driven recommendations.",
    isDraft: false,
    gradingConfig: {
      maxStars: 5,
    },
    settings: {
      allowLateSubmissions: false,
      gracePeriodHours: 0,
      requireGraderFeedback: true,
      autoPublishGrades: true,
      notifyOnSubmission: true,
    },
    submissions: {
      current: 10,
      max: 25,
      userHasSubmitted: false,
    },
    grading: {
      current: 1,
      required: 2,
      userHasGraded: false,
      pendingGrades: 1,
    },
    permissions: {
      canEdit: false,
      canDelete: false,
      canGrade: false,
      canSubmit: true,
    },
  },
  // Add more tasks as needed...
];

export const mockSubmissions: TaskSubmission[] = [
  // Add mock submissions if needed
];
