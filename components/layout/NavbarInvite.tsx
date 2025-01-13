"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const assignableRoles = ['mentor', 'grader', 'intern'] as const;
type AssignableUserRole = typeof assignableRoles[number];

const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(assignableRoles),
});

type InviteFormValues = z.infer<typeof inviteSchema>;

const NavbarInvite = () => {
  const inviteForm = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: '',
      role: 'intern',
    },
  });

  const handleInviteSubmit = (data: InviteFormValues) => {
    // Placeholder for sending invite
    console.log('Inviting:', data);
    inviteForm.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="hidden md:flex">
          <UserPlus className="mr-2 h-4 w-4" />
          Invite People
        </Button>
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
              {...inviteForm.register('email')}
            />
            {inviteForm.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {inviteForm.formState.errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Select
              value={inviteForm.watch('role')}
              onValueChange={(value: AssignableUserRole) =>
                inviteForm.setValue('role', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mentor">Mentor</SelectItem>
                <SelectItem value="grader">Grader</SelectItem>
                <SelectItem value="intern">Intern</SelectItem>
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
  );
};

export default NavbarInvite;