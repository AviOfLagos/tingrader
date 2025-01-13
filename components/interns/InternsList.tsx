'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Mail } from 'lucide-react';

interface Intern {
  id: string;
  name: string;
  email: string;
  track: string;
  stage: string;
  role: 'intern' | 'grader';
}

const mockInterns: Intern[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    track: 'Frontend',
    stage: 'Stage 1',
    role: 'intern',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    track: 'Backend',
    stage: 'Stage 2',
    role: 'grader',
  },
  // Add more mock data
];

export function InternListView() {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteRole, setInviteRole] = useState<'intern' | 'grader'>('intern');
  const [inviteEmail, setInviteEmail] = useState('');

  const handleInvite = () => {
    console.log('Inviting:', { email: inviteEmail, role: inviteRole });
    setShowInviteDialog(false);
    setInviteEmail('');
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
                  onValueChange={(value: 'intern' | 'grader') =>
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
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockInterns.map((intern) => (
          <Card key={intern.id}>
            <CardHeader>
              <CardTitle>{intern.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{intern.email}</p>
                <div className="flex justify-between">
                  <span className="text-sm">{intern.track}</span>
                  <span className="text-sm">{intern.stage}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium capitalize">
                    {intern.role}
                  </span>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
