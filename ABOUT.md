# Tingrader

**About Project:**

Tingrader is a modern grading and task management application with a user-friendly, minimalist design that facilitates seamless task submission, grading, and performance tracking. It is built with a mobile-first approach and designed for scalability. The app is being developed feature-by-feature using Next.js 15 (TypeScript), TailwindCSS, and shadcn/ui components, with an App Router approach. Each feature is built as a modular, standalone component for easy integration into the larger system. Once all components are complete, they will be connected via a bottom navigation bar for efficient navigation. The design includes dark mode support, smooth animations, and responsiveness across all devices.

## Core Features (MVP):

**1. Task Submission System**

**	**•**	****Dynamic form:** Supports multiple input types (text, links, images).

**	**•**	****Client-side caching:** Prevents data loss when navigating away.

**	**•**	****Form validation:** Ensures valid input for all fields.

**	**•**	****File uploads:** Allows multiple file attachments with drag-and-drop and upload progress indicators.

---

**2. Grading Interface**

**	**•**	****Tinder-style grading:** Swipe left (fail) or right (pass).

**	**•**	****Star grading:** 0-7 stars with a smooth sliding UI.

**	**•**	****Image carousel:** View multiple submissions with left/right navigation.

**	**•**	****Quick grading workflow:** Grade and auto-navigate to the next submission.

**	**•**	****Scroll for comments:** A collapsible comment section for feedback.

**	**•**	****Icons:**

**	**•**	****Back to last graded task**

**	**•**	****Next task to grade**

---

**3. App Dashboard Layout**

**	**•**	****Bottom navigation bar:** Optimized for mobile-first design.

**	**•**	****Top fixed navbar:**

**	**•**	****Logo:** Left-aligned (“Tingrader”).

**	**•**	****Search bar:** Centered for quick access.

**	**•**	****User profile & notifications:** Right-aligned.

**	**•**	****More menu:** Dropdown for additional features.

**	**•**	****Responsive design:** Adapts to all screen sizes.

---

**4. Leaderboard**

**	**•**	****Filters:** By track and stage.

**	**•**	****Sortable columns:** Sort by metrics like performance and submissions.

**	**•**	****Performance display:** Highlight key metrics for competition.

---

**5. Intern Management**

**	**•**	****Grid view:** Displays intern details (ID, name, email, track, graders).

**	**•**	****Role-based display:** Custom UI for Chief Owner, Mentor, Grader, or Intern roles.

**	**•**	****Invitation system:** Send invites via email.

**	**•**	****Role management:** Update roles and permissions dynamically.

---

**6. Task Creation**

**	**•**	****Customizable grading options:** Choose swipe or star grading.

**	**•**	****Track and stage selection:** Assign tasks to specific groups.

**	**•**	****Instructions support:** Detailed task descriptions with formatting options.

**	**•**	****Configurable pass marks.**

**	**•**	****Grader selection:** Assign tasks to specific graders.

---

**V2 Features for Future Development:**

*(To be implemented incrementally based on MVP success)*

**	**1.**	****Authentication & Authorization:**

**	**•**	**JWT-based authentication.

**	**•**	**Role-based access control (RBAC).

**	**•**	**OAuth for social login.

**	**•**	**Session management.

**	**2.**	****Real-time Features:**

**	**•**	**WebSocket integration for live updates.

**	**•**	**Real-time notifications.

**	**•**	**Live leaderboard updates.

**	**3.**	****Enhanced Submission System:**

**	**•**	**Draft-saving functionality.

**	**•**	**Rich text editor for submission descriptions.

**	**•**	**File type validation and size limits.

**	**4.**	****Analytics Dashboard:**

**	**•**	**Performance trends over time.

**	**•**	**Grader efficiency metrics.

**	**•**	**Exportable reports.

**	**5.**	****Task Management:**

**	**•**	**Scheduling and deadlines.

**	**•**	**Task categories and tags.

**	**•**	**Bulk task creation.

**	**6.**	****Integration Features:**

**	**•**	**GitHub submissions.

**	**•**	**Slack and email notifications.

**	**•**	**Calendar integration.

---

**Technical Guidelines**

**Development Approach:**

**	**•**	**Each feature should be developed as a standalone **Next.js (App Router)** component, using **TypeScript** for type safety and **shadcn/ui** for UI consistency.

**	**•**	**Use **TailwindCSS** for styling and adhere to a **clean, minimalist, modern design** with smooth animations.

**	**•**	**Include **dark mode** support by default.

**Code Organization:**

**	**•**	**Follow **best practices** for clean architecture:

**	**•**	**Separate logic into **custom hooks** and reusable **utility functions.**

**	**•**	**Isolate state management per feature using libraries like Zustand or Redux (if needed).

**	**•**	**Components should be **self-contained** and exportable for reuse.

**	**•**	**Include proper **documentation** for components, utilities, and APIs.

**Performance Optimization:**

**	**•**	**Implement **code splitting** and **lazy loading** for components.

**	**•**	**Use **caching strategies** for faster re-renders.

**	**•**	**Optimize images and implement pagination for large datasets.

---

**Design Requirements:**

**	**•**	**A **modern, user-friendly, and minimal design** style with a focus on accessibility.

**	**•**	****Responsive UI** across all screen sizes (mobile-first).

**	**•**	**Use smooth animations and transitions for an elegant user experience.

**	**•**	****Dark mode:** Include toggling support out of the box.

---

**Development Plan (Feature-by-Feature Approach):**

**	**1.**	**Build individual features/components one at a time (e.g., task submission form, grading interface).

**	**2.**	**Test each feature/component independently.

**	**3.**	**Once all core features are complete, integrate them into the main layout.

**	**4.**	**Add a **bottom navigation bar** and connect all pages for seamless navigation.
