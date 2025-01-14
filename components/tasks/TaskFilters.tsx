import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, SortDesc, Search } from "lucide-react";
import { TRACKS, STAGES, SORT_OPTIONS } from "@/app/api/constants"; // Import constants

interface TaskFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedTrack: string;
  setSelectedTrack: (value: string) => void;
  selectedStage: string;
  setSelectedStage: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedTrack,
  setSelectedTrack,
  selectedStage,
  setSelectedStage,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) => {
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedTrack(TRACKS.ALL);
    setSelectedStage(STAGES.ALL);
    setSortBy(SORT_OPTIONS.DUE_DATE);
    setSortOrder("asc");
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedTrack} onValueChange={setSelectedTrack}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by track" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={TRACKS.ALL}>All Tracks</SelectItem>
            <SelectItem value={TRACKS.FRONTEND}>Frontend</SelectItem>
            <SelectItem value={TRACKS.BACKEND}>Backend</SelectItem>
            <SelectItem value={TRACKS.DESIGN}>Design</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStage} onValueChange={setSelectedStage}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={STAGES.ALL}>All Stages</SelectItem>
            <SelectItem value={STAGES.STAGE_1}>Stage 1</SelectItem>
            <SelectItem value={STAGES.STAGE_2}>Stage 2</SelectItem>
            <SelectItem value={STAGES.STAGE_3}>Stage 3</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SortDesc className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={SORT_OPTIONS.DUE_DATE}>Due Date</SelectItem>
            <SelectItem value={SORT_OPTIONS.SUBMISSIONS}>
              Submissions
            </SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="w-[180px]"
        >
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </Button>
        <Button
          variant="secondary"
          onClick={resetFilters}
          className="w-[180px]"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default TaskFilters;
