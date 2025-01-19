// lib/permissions.ts
import { UserRole, UserPermissions } from "@/types/user";

export const DEFAULT_PERMISSIONS: Record<UserRole, UserPermissions> = {
  chief: {
    canCreateTasks: true,
    canEditTasks: true,
    canDeleteTasks: true,
    canGrade: true,
    canSubmit: false,
    canInviteUsers: true,
    canManageUsers: true,
  },
  mentor: {
    canCreateTasks: true,
    canEditTasks: true,
    canDeleteTasks: false,
    canGrade: true,
    canSubmit: false,
    canInviteUsers: true,
    canManageUsers: false,
  },
  grader: {
    canCreateTasks: false,
    canEditTasks: false,
    canDeleteTasks: false,
    canGrade: true,
    canSubmit: false,
    canInviteUsers: false,
    canManageUsers: false,
  },
  intern: {
    canCreateTasks: false,
    canEditTasks: false,
    canDeleteTasks: false,
    canGrade: false,
    canSubmit: true,
    canInviteUsers: false,
    canManageUsers: false,
  },
};

// Helper functions for permission checks
export const hasPermission = (
  user: { role: UserRole; permissions: UserPermissions },
  permission: keyof UserPermissions
): boolean => {
  // First check the default permissions for the role
  const defaultPerms = DEFAULT_PERMISSIONS[user.role];
  // Then check user-specific permissions (which might override defaults)
  return user.permissions[permission] || defaultPerms[permission];
};

// Track-specific permission checks
export const hasTrackPermission = (
  user: { role: UserRole; tracks: string[] },
  trackId: string,
  permission: keyof UserPermissions
): boolean => {
  // Chief has access to all tracks
  if (user.role === "chief") return true;
  // Others need to be assigned to the track
  return user.tracks.includes(trackId);
};

// Permission check with track context
export const canPerformAction = (
  user: { id: string; role: UserRole; permissions: UserPermissions; tracks: string[] },
  action: keyof UserPermissions,
  context?: { trackId?: string; userId?: string }
): boolean => {
  // Basic permission check
  const hasBasicPermission = hasPermission(user, action);
  if (!hasBasicPermission) return false;

  // Track-specific check if trackId is provided
  if (context?.trackId && !hasTrackPermission(user, context.trackId, action)) {
    return false;
  }

  // User-specific checks (e.g., can't grade own submissions)
  if (action === "canGrade" && context?.userId === user.id) {
    return false;
  }

  return true;
};
