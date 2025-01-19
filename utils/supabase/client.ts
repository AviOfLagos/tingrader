// utils/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// This is a helper function to get the current user and role
export const getCurrentUser = async () => {
  const supabase = createClient();
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;

    if (!user) return null;

    // Get user profile with role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role, tracks')
      .eq('id', user.id)
      .single();

    if (profileError) throw profileError;

    return {
      ...user,
      role: profile?.role || 'intern',
      tracks: profile?.tracks || [],
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}