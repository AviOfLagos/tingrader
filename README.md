# Tingrader

Tingrader is a modern grading and task management application with a user-friendly, minimalist design that facilitates seamless task submission, grading, and performance tracking. It is built with a mobile-first approach and designed for scalability.

## Features

- **Task Submission**: Seamless submission of tasks with an intuitive interface.
- **Grading**: Efficient grading tools for evaluators.
- **Leaderboard**: Real-time performance tracking and rankings.
- **Intern Management**: Manage interns and their progress effectively.
- **Responsive Design**: Optimized for all devices with dark mode support and smooth animations.

## Technology Stack

- **Next.js 15 (TypeScript)**
- **TailwindCSS**
- **shadcn/ui components**

## Folder Structure

```
tingrader/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── tasks/
│   │   ├── grading/
│   │   ├── leaderboard/
│   │   ├── interns/
│   │   └── create/
│   ├── api/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── dashboard-layout.tsx
│   │   ├── navbar.tsx
│   │   └── bottom-nav.tsx
│   ├── tasks/
│   ├── grading/
│   ├── leaderboard/
│   └── interns/
├── lib/
│   ├── hooks/
│   ├── utils/
│   └── types/
├── public/
└── styles/
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
