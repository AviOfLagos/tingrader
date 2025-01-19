// components/auth/RoleGuard.tsx
"use client";

import { useRole } from "@/hooks/useRole";
import { UserRole } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
  showError?: boolean;
}

export const RoleGuard = ({
  children,
  allowedRoles,
  redirectTo = "/dashboard",
  showError = true,
}: RoleGuardProps) => {
  const { role, loading } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !allowedRoles.includes(role as UserRole)) {
      if (showError) {
        toast.error("You don't have permission to access this page");
      }
      router.push(redirectTo);
    }
  }, [role, loading, allowedRoles, redirectTo, router, showError]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!role || !allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
};

// Example usage:
/*
// In your page component:
const CreateTaskPage = () => {
  return (
    <RoleGuard allowedRoles={['chief', 'mentor']}>
      <div>Create Task Form</div>
    </RoleGuard>
  );
};
*/
