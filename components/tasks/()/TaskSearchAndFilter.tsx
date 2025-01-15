// components/tasks/TaskSearchAndFilter.tsx
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
import { Search, Filter, XCircle } from "lucide-react";

interface TaskSearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  gradingFilter: "all" | "graded" | "ungraded";
  setGradingFilter: (value: "all" | "graded" | "ungraded") => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
  onResetFilters: () => void;
}

const TaskSearchAndFilter: React.FC<TaskSearchAndFilterProps> = ({
  searchTerm,
  setSearchTerm,
  gradingFilter,
  setGradingFilter,
  sortOrder,
  setSortOrder,
  onResetFilters,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search submissions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
      </div>

      <Select value={gradingFilter} onValueChange={setGradingFilter}>
        <SelectTrigger className="w-[180px]">
          <Filter className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Submissions</SelectItem>
          <SelectItem value="graded">Graded</SelectItem>
          <SelectItem value="ungraded">Pending Grades</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className="w-[180px]"
      >
        {sortOrder === "asc" ? "Oldest First" : "Newest First"}
      </Button>

      <Button variant="ghost" onClick={onResetFilters} className="w-[100px]">
        Reset
      </Button>
    </div>
  );
};

export default TaskSearchAndFilter;
