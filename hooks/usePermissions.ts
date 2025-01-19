// hooks/usePermissions.ts
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import { UserRole, UserPermissions } from "../types/user";
import { DEFAULT_PERMISSIONS } from "../lib/permissions";
import { toast } from "sonner";

interface PermissionContext {
  trackId?: string;
  userId?: string;
}

export const usePermissions = () => {
  const supabase = createClient();
  const router = useRouter();

  const checkPermission = useCallback(
    async (
      permission: keyof UserPermissions,
      context?: PermissionContext
    ): Promise<boolean> => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          router.push("/sign-in");
          return false;
        }

        // Get user's role and tracks from profiles
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role, tracks")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;

        const userRole = (profile?.role as UserRole) || "intern";
        const userTracks = (profile?.tracks as string[]) || [];

        // Get default permissions for role
        const defaultPerms = DEFAULT_PERMISSIONS[userRole];

        // Basic permission check
        const hasBasePermission = defaultPerms[permission];
        if (!hasBasePermission) return false;

        // Track-specific checks
        if (context?.trackId) {
          // Chief has access to all tracks
          if (userRole !== "chief" && !userTracks.includes(context.trackId)) {
            return false;
          }
        }

        // User-specific checks (e.g., can't grade own submissions)
        if (permission === "canGrade" && context?.userId === user.id) {
          return false;
        }

        return true;
      } catch (error) {
        console.error("Permission check error:", error);
        return false;
      }
    },
    [supabase, router]
  );

  const requirePermission = useCallback(
    async (
      permission: keyof UserPermissions,
      options: {
        context?: PermissionContext;
        redirectTo?: string;
        showError?: boolean;
      } = {}
    ): Promise<boolean> => {
      const {
        context,
        redirectTo = "/app/dashboard",
        showError = true,
      } = options;

      const hasPermission = await checkPermission(permission, context);

      if (!hasPermission) {
        if (showError) {
          toast.error("You don't have permission to perform this action");
        }
        router.push(redirectTo);
        return false;
      }

      return true;
    },
    [checkPermission, router]
  );

  return {
    checkPermission,
    requirePermission,
  };
};

// Example usage:
/*
const MyComponent = () => {
  const { checkPermission, requirePermission } = usePermissions();

  const handleEdit = async () => {
    if (await checkPermission('canEditTasks', { trackId: 'frontend' })) {
      // Proceed with edit
    }
  };

  const handleDelete = async () => {
    // Will automatically redirect if permission check fails
    if (await requirePermission('canDeleteTasks', {
      context: { trackId: 'frontend' },
      showError: true
    })) {
      // Proceed with delete
    }
  };
};
*/
