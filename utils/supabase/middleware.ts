// middleware.ts
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { UserRole } from "@/types/user";

// Define protected routes and their allowed roles
const PROTECTED_ROUTES: Record<string, UserRole[]> = {
  "/app/tasks/create": ["chief", "mentor"],
  "/app/tasks/grade": ["chief", "mentor", "grader"],
  "/app/users": ["chief", "mentor"],
  "/app/settings": ["chief", "mentor", "grader", "intern"],
};

// Helper to check if route requires specific roles
const getRequiredRoles = (pathname: string): UserRole[] | null => {
  // Exact match
  if (PROTECTED_ROUTES[pathname]) {
    return PROTECTED_ROUTES[pathname];
  }

  // Check dynamic routes
  const routeKeys = Object.keys(PROTECTED_ROUTES);
  for (const route of routeKeys) {
    if (pathname.startsWith(route)) {
      return PROTECTED_ROUTES[route];
    }
  }

  return null;
};

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    // Create supabase client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options) {
            request.cookies.set({
              name,
              value,
              ...options,
            });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options) {
            request.cookies.delete(name);
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.delete({
              name,
              ...options,
            });
          },
        },
      }
    );

    // Get user session
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Check auth for protected routes
    if (request.nextUrl.pathname.startsWith("/app")) {
      if (!user) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
      if (user && request.nextUrl.pathname === "/app") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      // Get user role from profiles table
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      const userRole = (profile?.role as UserRole) || "intern";

      // Check role-based access
      const requiredRoles = getRequiredRoles(request.nextUrl.pathname);
      if (requiredRoles && !requiredRoles.includes(userRole)) {
        const url = new URL("/dashboard", request.url);
        url.searchParams.set("error", "unauthorized");
        return NextResponse.redirect(url);
      }
    }

    // Redirect authenticated users from auth pages
    if (
      user &&
      (request.nextUrl.pathname === "/sign-in" ||
        request.nextUrl.pathname === "/sign-up")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // For auth pages, proceed normally
    if (request.nextUrl.pathname.startsWith("/auth")) {
      return response;
    }

    return response;
  } catch (e) {
    console.error("Middleware error:", e);
    // On error, redirect to sign in
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
};
