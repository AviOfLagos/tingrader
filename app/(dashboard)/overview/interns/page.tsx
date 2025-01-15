"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus } from "lucide-react";

export default function InternsPage() {
  return (
    <div className="space-y-6 m-16 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Interns</h1>
          <p className="text-muted-foreground">
            Manage and track intern progress
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Invite Intern
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input className="pl-9" placeholder="Search interns..." />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Track" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tracks</SelectItem>
            <SelectItem value="frontend">Frontend</SelectItem>
            <SelectItem value="backend">Backend</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Interns Grid */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((intern) => (
          <Card key={intern} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">John Doe {intern}</h3>
                <p className="text-sm text-muted-foreground">Frontend Track</p>
                <div className="mt-4 space-y-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">
                      Tasks Completed:
                    </span>
                    <span className="ml-2 font-medium">15/20</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Avg Score:</span>
                    <span className="ml-2 font-medium">4.5/7</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
