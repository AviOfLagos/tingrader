"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { get } from "http";

export default function DashboardPage() {
  return (
    <div className="space-y-6 m-16 mb-16 ">
      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, Avi!
          </h1>
          <p className="text-muted-foreground">
            Here's your overview for today
          </p>
        </div>
        <Link href="/tasks/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Tasks", value: "12" },
          { label: "Pending Reviews", value: "5" },
          { label: "Total Interns", value: "45" },
          { label: "Avg Score", value: "4.5" },
        ].map((stat, i) => (
          <Card key={i} className="p-4">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Button variant="ghost" size="sm">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {[
              "John submitted Frontend Task #3",
              "Sarah completed Backend Challenge",
              "New task created: API Integration",
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <span className="text-sm">{activity}</span>
                <span className="text-xs text-muted-foreground">2h ago</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Tasks */}
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Active Tasks</h2>
            <Button variant="ghost" size="sm">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {[
              "Frontend Development Task",
              "Database Design Challenge",
              "UI/UX Assessment",
            ].map((task, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <span className="text-sm">{task}</span>
                <Button variant="outline" size="sm">
                  Grade
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )}
