"use client";

import React, { useState, useEffect } from "react";
import InternsGrid from "@/components/interns/InternsGrid";
import { mockMembers } from "../../api/mock-data";
import { Role as UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const assignableRoles = ["mentor", "grader", "intern"] as const;
type AssignableUserRole = (typeof assignableRoles)[number];
const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(assignableRoles),
  track: z.string().optional(),
});

type InviteFormValues = {
  email: string;
  role: AssignableUserRole;
  track?: string;
};

import { User as UserType, Role } from "@/types";

interface User extends Omit<UserType, "trackId"> {
  role: UserType["role"];
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const currentUserRole: UserRole = UserRole.ChiefOwner;

  const filterUsers = () => {
    return users
      .filter((user) => {
        if (filterRole && user.role !== filterRole) return false;
        if (search && !user.name.toLowerCase().includes(search.toLowerCase()))
          return false;
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name)); // Example sorting by name
  };

  // Fetch users from mock data
  useEffect(() => {
    setUsers(mockMembers);
  }, []);

  const inviteForm = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
      role: "intern",
    },
  });

  const handleInviteSubmit = (data: InviteFormValues) => {
    // Placeholder for sending invite
    console.log("Inviting:", data);
    // Implement email sending functionality
    fetch("/api/send-invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        role: data.role,
        track: data.track,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Email sent:", result);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
    inviteForm.reset();
  };

  const handleRoleChange = (userId: number, newRole: AssignableUserRole) => {
    // Placeholder for updating user role
    console.log(`Updating user ${userId} role to ${newRole}`);
  };

  const canAssignRole = (role: UserRole) => {
    if (currentUserRole === UserRole.ChiefOwner) {
      return true;
    }
    if (
      currentUserRole === UserRole.Mentor &&
      role !== UserRole.Mentor &&
      role !== UserRole.ChiefOwner
    ) {
      return true;
    }
    return false;
  };

  const canCreateTask = () => {
    return (
      currentUserRole === UserRole.ChiefOwner ||
      currentUserRole === UserRole.Mentor
    );
  };

  const canGrade = () => {
    return (
      currentUserRole === UserRole.ChiefOwner ||
      currentUserRole === UserRole.Mentor ||
      currentUserRole === UserRole.Grader
    );
  };

  const canViewSubmissionSummary = () => {
    return currentUserRole === UserRole.ChiefOwner;
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold container mx-auto p-4 ">Users</h1>

      {/* Invite User Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Invite User</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite User</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={inviteForm.handleSubmit(handleInviteSubmit)}
            className="space-y-4 mt-4"
          >
            <div>
              <Input
                placeholder="User Email"
                {...inviteForm.register("email")}
              />
              {inviteForm.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {inviteForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Select
                value={inviteForm.watch("role")}
                onValueChange={(value: AssignableUserRole) =>
                  inviteForm.setValue("role", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {currentUserRole === UserRole.ChiefOwner && (
                    <SelectItem value={UserRole.Mentor}>Mentor</SelectItem>
                  )}
                  {canAssignRole(UserRole.Grader) && (
                    <SelectItem value={UserRole.Grader}>Grader</SelectItem>
                  )}
                  <SelectItem value={UserRole.Intern}>Intern</SelectItem>
                </SelectContent>
              </Select>
              {inviteForm.formState.errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {inviteForm.formState.errors.role.message}
                </p>
              )}
            </div>
            <Button type="submit">Send Invite</Button>
          </form>
        </DialogContent>
      </Dialog>

      <h2 className="text-xl font-semibold mt-8 mb-4">Interns</h2>
      <div className="flex items-center space-x-4 mb-4">
        <Input
          placeholder="Search interns..."
          className="max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="intern">Intern</SelectItem>
            <SelectItem value="grader">Grader</SelectItem>
            <SelectItem value="mentor">Mentor</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <InternsGrid
        interns={users.filter(
          (user) =>
            user.role === "intern" &&
            user.name.toLowerCase().includes(search.toLowerCase()) &&
            (filterRole === "" || user.role === filterRole)
        )}
      />
    </div>
  );
};

export default UsersPage;
