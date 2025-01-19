import { UserRole } from "./user";

export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  email: string;
  phone_number: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Track {
  id: string;
  name: string;
  description: string | null;
  stages: string[];
  is_active: boolean;
  total_tasks: number;
  created_at: string;
  created_by: string;
}

export interface TrackMembership {
  profile_id: string;
  track_id: string;
  join_date: string;
  avg_score: number;
  total_tasks: number;
  completed_tasks: number;
  leaderboard_position: number;
}

// Extended interfaces for frontend use
export interface TrackWithStats extends Track {
  membership?: TrackMembership;
  isJoined?: boolean;
}

export interface ProfileWithTracks extends Profile {
  tracks: TrackWithStats[];
}

// API response types
export interface ProfileResponse {
  data: Profile | null;
  error: Error | null;
}

export interface TrackResponse {
  data: Track[] | null;
  error: Error | null;
}

// Form types for profile updates
export interface ProfileUpdateFormData {
  username?: string;
  full_name?: string;
  phone_number?: string;
  avatar_url?: string;
}

// Track form types
export interface TrackFormData {
  name: string;
  description?: string;
  stages: string;
  is_active: boolean;
}
