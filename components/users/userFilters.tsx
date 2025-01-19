// components/users/UserFilters.tsx
"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, LayoutGrid, List } from "lucide-react";
import { mockTracks, mockStages } from "@/app/api/mock-data";

interface UserFiltersProps {
  searchQuery: string;
  selectedTrack: string;
  selectedStage: string;
  viewMode: "grid" | "list";
  onSearchChange: (value: string) => void;
  onTrackChange: (value: string) => void;
  onStageChange: (value: string) => void;
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function UserFilters({
  searchQuery,
  selectedTrack,
  selectedStage,
  viewMode,
  onSearchChange,
  onTrackChange,
  onStageChange,
  onViewModeChange,
}: UserFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>

        <Select value={selectedTrack} onValueChange={onTrackChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Track" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tracks</SelectItem>
            {mockTracks.map((track) => (
              <SelectItem key={track.id} value={track.id}>
                {track.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStage} onValueChange={onStageChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            {mockStages.map((stage) => (
              <SelectItem key={stage.id} value={stage.id.toString()}>
                {stage.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => onViewModeChange("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => onViewModeChange("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
