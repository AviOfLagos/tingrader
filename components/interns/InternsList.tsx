"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import NavbarInvite from "../layout/nav/NavbarInvite";

interface Intern {
  id: string;
  name: string;
  email: string;
  track: string;
  stage: string;
  role: "intern" | "grader";
}

const mockInterns: Intern[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    track: "Frontend",
    stage: "Stage 1",
    role: "intern",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    track: "Backend",
    stage: "Stage 2",
    role: "grader",
  },
  // Add more mock data
];

export function InternListView() {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteRole, setInviteRole] = useState<"intern" | "grader">("intern");
  const [inviteEmail, setInviteEmail] = useState("");

  const handleInvite = () => {
    console.log("Inviting:", { email: inviteEmail, role: inviteRole });
    setShowInviteDialog(false);
    setInviteEmail("");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Interns & Graders</h2>
        <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Invite
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New Member</DialogTitle>
              <DialogDescription>
                Send an invitation email to add a new intern or grader.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label>Role</label>
                <Select
                  value={inviteRole}
                  onValueChange={(value: "intern" | "grader") =>
                    setInviteRole(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="intern">Intern</SelectItem>
                    <SelectItem value="grader">Grader</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label>Email</label>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowInviteDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleInvite}>
                <Mail className="mr-2 h-4 w-4" />
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <ul className="space-y-4">
          {mockInterns.map((intern) => (
            <li key={intern.id} className="border rounded-md p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{intern.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {intern.email}
                  </p>
                  <p className="text-sm">
                    {intern.track} - {intern.stage}
                  </p>
                  <p className="text-sm font-medium capitalize">
                    {intern.role}
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{intern.name}'s Profile</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                      <p>Email: {intern.email}</p>
                      <p>Track: {intern.track}</p>
                      <p>Stage: {intern.stage}</p>
                      <p>Role: {intern.role}</p>
                      <Select
                        value={intern.role}
                        onValueChange={(value) =>
                          console.log("Change role to", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mentor">Mentor</SelectItem>
                          <SelectItem value="grader">Grader</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => console.log("Close modal")}
                      >
                        Close
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </li>
          ))}
        </ul>
        ))
      </div>
    </div>
  );
}
