"use client";
import React, { useState } from "react";
import LeaderboardEntry from "./LeaderboardEntry";
import { LeaderboardData } from "@/types";
import { mockLeaderboardData } from "@/app/api/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search, SortAsc, SortDesc } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { TRACKS, STAGES } from "@/app/api/constants";

const Leaderboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<string>(TRACKS.ALL);
  const [selectedStage, setSelectedStage] = useState<string>(STAGES.ALL);
  const [sortField, setSortField] = useState<keyof LeaderboardData>("rank");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedEntries, setSelectedEntries] = useState<Set<string>>(
    new Set()
  );

  // Function to compare values for sorting
  const compareValues = (a: string | number, b: string | number) => {
    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    }
    return String(a).localeCompare(String(b));
  };

  // Toggle sort order and field
  const toggleSortOrder = (field: keyof LeaderboardData) => {
    if (sortField === field) {
      // Toggle sort order
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      // Switch to new sort field and reset order to 'asc'
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Handle select/deselect entry
  const handleSelectEntry = (id: string) => {
    const newSelectedEntries = new Set(selectedEntries);
    if (newSelectedEntries.has(id)) {
      newSelectedEntries.delete(id);
    } else {
      newSelectedEntries.add(id);
    }
    setSelectedEntries(newSelectedEntries);
  };

  // Export selected users
  const exportSelected = () => {
    const selectedData = mockLeaderboardData.filter((entry) =>
      selectedEntries.has(entry.id)
    );
    // For simplicity, we'll just log the selected data
    console.log("Exporting selected users:", selectedData);
    alert("Selected users exported to console.");
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedTrack(TRACKS.ALL);
    setSelectedStage(STAGES.ALL);
    setSortField("rank");
    setSortOrder("asc");
  };

  const filteredData = mockLeaderboardData
    .filter((entry) => {
      const matchesSearch = entry.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTrack =
        selectedTrack === TRACKS.ALL || entry.track === selectedTrack;
      const matchesStage =
        selectedStage === STAGES.ALL ||
        entry.stage.toString() === selectedStage;
      return matchesSearch && matchesTrack && matchesStage;
    })
    .sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];
      const comparison = compareValues(valueA, valueB);
      return sortOrder === "asc" ? comparison : -comparison;
    });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>

      {/* Filters */}
      <div className="mb-4 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by name..."
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

        <Button variant="secondary" onClick={exportSelected}>
          Export Selected Users
        </Button>

        <Button variant="outline" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>

      {/* Leaderboard Table */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">
              <input
                type="checkbox"
                checked={
                  selectedEntries.size === filteredData.length &&
                  filteredData.length > 0
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    const allIds = filteredData.map((entry) => entry.id);
                    setSelectedEntries(new Set(allIds));
                  } else {
                    setSelectedEntries(new Set());
                  }
                }}
              />
            </th>
            {[
              { label: "Rank", field: "rank" as keyof LeaderboardData },
              { label: "Name", field: "name" as keyof LeaderboardData },
              { label: "Track", field: "track" as keyof LeaderboardData },
              { label: "Stage", field: "stage" as keyof LeaderboardData },
              { label: "Score", field: "score" as keyof LeaderboardData },
              {
                label: "Tasks Completed",
                field: "tasksCompleted" as keyof LeaderboardData,
              },
              {
                label: "Avg Score",
                field: "avgScore" as keyof LeaderboardData,
              },
            ].map(({ label, field }) => (
              <th
                key={field}
                className="px-4 py-2 text-left cursor-pointer"
                onClick={() => toggleSortOrder(field)}
              >
                {label}{" "}
                {sortField === field ? (
                  sortOrder === "asc" ? (
                    <SortAsc className="inline ml-1 w-4 h-4" />
                  ) : (
                    <SortDesc className="inline ml-1 w-4 h-4" />
                  )
                ) : (
                  <SortAsc className="inline ml-1 w-4 h-4 opacity-25" />
                )}
              </th>
            ))}
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((entry: LeaderboardData) => (
            <LeaderboardEntry
              key={entry.id}
              entry={entry}
              isSelected={selectedEntries.has(entry.id)}
              onSelect={handleSelectEntry}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
