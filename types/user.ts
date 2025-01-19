// types/user.ts
export type UserRole = "chief" | "mentor" | "grader" | "intern";

export interface UserPermissions {
  canCreateTasks: boolean;
  canEditTasks: boolean;
  canDeleteTasks: boolean;
  canGrade: boolean;
  canSubmit: boolean;
  canInviteUsers: boolean;
  canManageUsers: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tracks: string[];
  permissions: UserPermissions;
  avatar?: string;
  username?: string;
  trackId?: string;
}
