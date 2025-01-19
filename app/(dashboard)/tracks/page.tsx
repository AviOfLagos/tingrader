// app/(dashboard)/tracks/page.tsx
"use client";
import { TrackFormData } from "@/components/tracks/TrackForm";
import React from "react";
import { TrackList } from "@/components/tracks/TrackList";

interface CreateTrackData extends Omit<TrackFormData, 'stages'> {
  stages: string[];
}
import { TrackForm } from "@/components/tracks/TrackForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { useRole } from "@/hooks/useRole";
import { userManagement } from "@/utils/user-management";
import { TrackWithStats } from "@/types/profile";
import { toast } from "sonner";
import { mockTracks } from "@/mock/tracks";

export default function TracksPage() {
  const { role, isRole } = useRole();
  const [tracks, setTracks] = React.useState<TrackWithStats[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);

  // Fetch tracks
  const fetchTracks = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const tracksData = await userManagement.getTracksWithStatus();
      setTracks(tracksData);
    } catch (error) {
      toast.error("Failed to load tracks");
      console.error("Error loading tracks:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  const handleJoinTrack = async (trackId: string) => {
    try {
      await userManagement.joinTrack(trackId);
      toast.success("Successfully joined track");
      fetchTracks();
    } catch (error) {
      toast.error("Failed to join track");
    }
  };

  const handleLeaveTrack = async (trackId: string) => {
    try {
      await userManagement.leaveTrack(trackId);
      toast.success("Successfully left track");
      fetchTracks();
    } catch (error) {
      toast.error("Failed to leave track");
    }
  };

  
  
  interface CreateTrackData extends Omit<TrackFormData, 'stages'> {
    stages: string[];
  }
  
  const handleTrackSubmit = async (formData: TrackFormData) => {
      try {
        const data: CreateTrackData = { ...formData, stages: formData.stages.map(String) };
        await userManagement.createTrack(data
          
        );
      toast.success("Track created successfully");
      setShowForm(false);
      fetchTracks();
    } catch (error) {
      toast.error("Failed to create track");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Tracks</h1>
          <p className="text-muted-foreground">
            View and manage learning tracks
          </p>
        </div>
        {isRole(["chief", "mentor"]) && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Track
          </Button>
        )}
      </div>

      <TrackList
        tracks={tracks}
        onJoinTrack={handleJoinTrack}
        onLeaveTrack={handleLeaveTrack}
      />

      {/* Create Track Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Track</DialogTitle>
          </DialogHeader>
          <TrackForm
            onSubmit={handleTrackSubmit}
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
