// utils/user-management.ts
import { createClient } from "@/utils/supabase/client";
import {
  Profile,
  ProfileUpdateFormData,
  Track,
  TrackMembership,
} from "@/types/profile";
import { UserRole } from "@/types/user";
import React from "react";
import { mockTracks } from "@/mock/tracks"; // Add this import

async function insertUser(
  id: string,
  username: string,
  fullName: string,
  email: string
) {
  const supabase = createClient();
  const { data, error } = await supabase.from("profiles").insert([
    {
      id,
      username,
      full_name: fullName,
      email,
    },
  ]);

  if (error) {
    console.error("Error inserting user:", error);
    throw error;
  }

  return data;
}

export const userManagement = {
  insertUser,
  /**
   * Get profile by user ID
   */
  async getProfile(userId: string): Promise<Profile | null> {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        // Return mock data as fallback
        return {
          id: userId,
          username: "testuser",
          full_name: "Test User",
          email: "test@example.com",
          phone_number: null,
          avatar_url: null,
          role: "intern",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }
      return data;
    } catch (error) {
      console.error("Error in getProfile:", error);
      throw error;
    }
  },

  /**
   * Get profile with track memberships
   */
  /**
   * Get profile with track memberships
   */
  async getProfileWithTracks(userId: string) {
    const supabase = createClient();
    let profile = null;

    try {
      // Get profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError) {
        console.error("Profile error:", profileError);
        throw profileError;
      }

      profile = profileData;

      // Get track memberships with track details
      const { data: memberships, error: membershipError } = await supabase
        .from("track_memberships")
        .select(
          `
        *,
        tracks:track_id (*)
      `
        )
        .eq("profile_id", userId);

      if (membershipError) {
        console.error("Membership error:", membershipError);
        // If we can't get real data, return mock data for now
        return {
          ...profile,
          tracks: mockTracks,
        };
      }

      // Transform the data structure to match our expected format
      return {
        ...profile,
        tracks: memberships.map((m) => ({
          ...m.tracks,
          membership: {
            avg_score: m.avg_score,
            total_tasks: m.total_tasks,
            completed_tasks: m.completed_tasks,
            leaderboard_position: m.leaderboard_position,
            join_date: m.join_date,
          },
        })),
      };
    } catch (error) {
      console.error("Error in getProfileWithTracks:", error);
      // Return mock data as fallback
      if (!profile) {
        // If we don't have a profile, create a mock one
        profile = {
          id: userId,
          username: "testuser",
          full_name: "Test User",
          email: "test@example.com",
          phone_number: null,
          avatar_url: null,
          role: "intern",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }
      return {
        ...profile,
        tracks: mockTracks,
      };
    }
  },

  /**
   * Update profile
   */
  async updateProfile(userId: string, updates: ProfileUpdateFormData) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update user role (admin only)
   */
  async updateUserRole(userId: string, newRole: UserRole) {
    const supabase = createClient();
    const { data, error } = await supabase.rpc("update_user_role", {
      target_user_id: userId,
      new_role: newRole,
    });

    if (error) throw error;
    return data;
  },

  /**
   * Join a track
   */
  async joinTrack(trackId: string) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { error } = await supabase.rpc("join_track", {
      user_id: user.id,
      track_id: trackId,
    });

    if (error) throw error;
  },

  /**
   * Leave a track
   */
  async leaveTrack(trackId: string) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { error } = await supabase.rpc("leave_track", {
      user_id: user.id,
      track_id: trackId,
    });

    if (error) throw error;
  },

  /**
   * Get tracks with membership status
   */
  async getTracksWithStatus(): Promise<Track[]> {
    const supabase = createClient();
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Get all tracks
      const { data: tracks, error: tracksError } = await supabase
        .from("tracks")
        .select("*")
        .order("name");

      if (tracksError) {
        console.error("Error fetching tracks:", tracksError);
        // Return mock data as fallback
        return mockTracks.map(track => ({
          ...track,
          stages: Array.isArray(track.stages) ? track.stages : [track.stages]
        }));
      }

      // If not logged in, return tracks without membership status
      if (!user) return tracks;

      // Get user's memberships
      const { data: memberships, error: membershipsError } = await supabase
        .from("track_memberships")
        .select("track_id")
        .eq("profile_id", user.id);

      if (membershipsError) throw membershipsError;

      // Inside getTracksWithStatus
      const membershipSet = new Set(memberships?.map((m) => m.track_id) || []);

      // Return tracks with membership status
      return tracks.map((track) => ({
        ...track,
        isJoined: membershipSet.has(track.id),
      }));
    } catch (error) {
      console.error("Error in getTracksWithStatus:", error);
      return mockTracks; // Fallback to mock data
    }
  },

  /**
   * Create a new track (mentor/chief only)
   */
  async createTrack(
    trackData: Omit<Track, "id" | "created_at" | "created_by" | "total_tasks">
  ) {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("tracks")
      .insert({
        ...trackData,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
  /**
   * Update a track
   */
  async updateTrack(trackId: string, updates: Partial<Track>) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("tracks")
      .update(updates)
      .eq("id", trackId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete a track
   */
  async deleteTrack(trackId: string) {
    const supabase = createClient();
    const { error } = await supabase.from("tracks").delete().eq("id", trackId);

    if (error) throw error;
  },
  /**
   * Set a track as the default for new users
   */
  async setDefaultTrack(trackId: string) {
    const supabase = createClient();

    // First, clear any existing default tracks
    await supabase
      .from("tracks")
      .update({ is_default: false })
      .neq("id", trackId);

    // Set the new default track
    const { error } = await supabase
      .from("tracks")
      .update({ is_default: true })
      .eq("id", trackId);

    if (error) throw error;

    // Add all existing interns to this track
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id")
      .eq("role", "intern");

    if (profilesError) throw profilesError;

    // Batch add all interns to the default track
    if (profiles.length > 0) {
      const trackMemberships = profiles.map((profile) => ({
        profile_id: profile.id,
        track_id: trackId,
      }));

      const { error: membershipError } = await supabase
        .from("track_memberships")
        .upsert(trackMemberships);

      if (membershipError) throw membershipError;
    }
  },

  /**
   * Add user to default track if exists
   */
  async addUserToDefaultTrack(userId: string) {
    const supabase = createClient();

    // Find default track
    const { data: defaultTrack, error: trackError } = await supabase
      .from("tracks")
      .select("id")
      .eq("is_default", true)
      .single();

    if (trackError || !defaultTrack) return; // No default track set

    // Add user to default track
    await supabase
      .from("track_memberships")
      .insert({
        profile_id: userId,
        track_id: defaultTrack.id,
      })
      .select()
      .single();
  },
};

// Helper hook for managing loading and error states
export const useUserAction = <T extends (...args: unknown[]) => Promise<R>, R>(
  action: T,
  options?: {
    onSuccess?: (data: R) => void;
    onError?: (error: Error) => void;
  }
) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [data, setData] = React.useState<R | null>(null);

  const execute = async (...args: Parameters<T>) => {
    setLoading(true);
    setError(null);
    try {
      const result: R = await action(...args);
      setData(result);
      options?.onSuccess?.(result);
      return result;
    } catch (e: unknown) {
      console.error("Action error:", e);
      const thrownError =
        e instanceof Error ? e : new Error(String(e));
      setError(thrownError);
      options?.onError?.(thrownError);
      throw thrownError;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error, data };
};
