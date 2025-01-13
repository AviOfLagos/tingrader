import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

interface Notification {
  id: number;
  message: string;
  time: string;
  href: string;
}

const mockNotifications: Notification[] = [
  { id: 1, message: 'New submission received', time: '2 minutes ago', href: '/app/dashboard/grading' },
  { id: 2, message: 'New feedback available', time: '5 minutes ago', href: '/app/dashboard/grading' },
  { id: 3, message: 'Task deadline approaching', time: '1 hour ago', href: '/app/dashboard/tasks' },
];

const NavbarNotifications = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {mockNotifications.length > 0 && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600"></span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {mockNotifications.map((notification) => (
          <DropdownMenuItem key={notification.id} asChild>
            <Link href={notification.href} className="w-full">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{notification.message}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
            </Link>
          </DropdownMenuItem>
        ))}
        {mockNotifications.length === 0 && (
          <DropdownMenuItem disabled>
            No new notifications
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarNotifications;