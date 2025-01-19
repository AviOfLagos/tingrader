// hooks/useRole.ts
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient, getCurrentUser } from "@/utils/supabase/client";
import { UserRole } from "@/types/user";
import { toast } from "sonner";

export const useRole = () => {
  const supabase = createClient();
  const router = useRouter();
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          setRole(null);
          return;
        }

        setRole(user.role as UserRole);
      } catch (error) {
        console.error("Error fetching role:", error);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        fetchRole();
      } else if (event === "SIGNED_OUT") {
        setRole(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const requireRole = useCallback(
    (
      requiredRoles: UserRole[],
      options: {
        redirectTo?: string;
        showError?: boolean;
      } = {}
    ) => {
      const { redirectTo = "/app/dashboard", showError = true } = options;

      if (!role) {
        router.push("/sign-in");
        return false;
      }

      if (!requiredRoles.includes(role)) {
        if (showError) {
          toast.error("You don't have permission to access this resource");
        }
        router.push(redirectTo);
        return false;
      }

      return true;
    },
    [role, router]
  );

  const isRole = useCallback(
    (roles: UserRole | UserRole[]): boolean => {
      if (!role) return false;
      return Array.isArray(roles) ? roles.includes(role) : roles === role;
    },
    [role]
  );

  return {
    role,
    loading,
    requireRole,
    isRole,
  };
};
