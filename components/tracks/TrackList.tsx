// components/tracks/TrackList.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrackWithStats } from "@/types/profile";
import { useRole } from "@/hooks/useRole";
import {
  Users,
  BarChart2,
  MoreVertical,
  Edit,
  Trash2,
  UserPlus,
  UserMinus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TrackListProps {
  tracks: TrackWithStats[];
  onJoinTrack: (trackId: string) => Promise<void>;
  onLeaveTrack: (trackId: string) => Promise<void>;
  onEditTrack?: (track: TrackWithStats) => void;
  onDeleteTrack?: (trackId: string) => void;
}

export function TrackList({
  tracks,
  onJoinTrack,
  onLeaveTrack,
  onEditTrack,
  onDeleteTrack,
}: TrackListProps) {
  const { isRole } = useRole();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [stageFilter, setStageFilter] = React.useState<string>("all");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  console.log("TrackList - tracks prop:", tracks);
  console.log("TrackList - searchTerm:", searchTerm, "stageFilter:", stageFilter, "statusFilter:", statusFilter);

  const filteredTracks = tracks.filter((track) => {
    const matchesSearch =
      track.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      track.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage =
      stageFilter === "all" || track.stages.map(String).includes(stageFilter);
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && track.is_active) ||
      (statusFilter === "inactive" && !track.is_active);

    return matchesSearch && matchesStage && matchesStatus;
  });

  console.log("TrackList - filteredTracks:", filteredTracks);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Search tracks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            {[1, 2, 3, 4, 5].map((stage) => (
              <SelectItem key={stage} value={stage.toString()}>
                Stage {stage}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Track List */}
      <div className="grid gap-4">
        {filteredTracks.map((track) => (
          <Card key={track.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{track.name}</h3>
                  {track.is_active ? (
                    <Badge variant="default">Active</Badge>
                  ) : (
                    <Badge variant="secondary">Inactive</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {track.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Stage {track.stages.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart2 className="h-4 w-4" />
                    <span>{track.total_tasks} tasks</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {track.isJoined ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onLeaveTrack(track.id)}
                  >
                    <UserMinus className="h-4 w-4 mr-2" />
                    Leave Track
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onJoinTrack(track.id)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Join Track
                  </Button>
                )}

                {isRole(["chief", "mentor"]) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditTrack?.(track)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Track
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDeleteTrack?.(track.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Track
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
