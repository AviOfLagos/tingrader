"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ClipboardList,
  BarChart2,
  Users,
  PlusCircle,
  Menu,
  Send,
  Star,
  User,
  Settings,
  Trophy,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

const tabs = [
  {
    id: 'home',
    label: 'Home',
    href: '/app/',
    icon: Home,
  },
  {
    id: 'tasks',
    label: 'Tasks',
    href: '/app/tasks',
    icon: ClipboardList,
  },
  
    {
      id: 'create',
      label: 'Create',
      icon: PlusCircle,
    },
    {
    id: 'grading',
    label: 'Grade',
    href: '/app/grading',
    icon: BarChart2,
  },
  {
    id: 'leaderboard',
    label: 'Leaderboard',
    href: '/app/leaderboard',
    icon: Trophy,
  },
  {
    id: 'users',
    label: 'Users',
    href: '/app/users',
    icon: Users,
  },
  {
    id: 'interns',
    label: 'Interns',
    href: '/app/interns',
    icon: Users,
  },
  {
    id: 'submit',
    label: 'Submit',
    href: '/app/tasks/submit',
    icon: Send,
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/app/profile',
    icon: User,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/app/settings',
    icon: Settings,
  },
  // Add more tabs here if needed
];



const BottomNav: React.FC<{ onOpenCreateTaskModal: () => void }> = ({ onOpenCreateTaskModal }) => {
  const pathname = usePathname();

  const mobileVisibleTabs = tabs.slice(0, 4); // Show only first 4 tabs in bottom nav
  const remainingTabs = tabs.slice(4); // Rest go to 'More' menu

  // Check if any of the remainingTabs are active
  const isMoreActive = remainingTabs.some((tab) => pathname === tab.href);

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {mobileVisibleTabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <React.Fragment key={tab.id}>
                {tab.id === 'create' ? (
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent default link behavior
                      onOpenCreateTaskModal();
                    }}
                    className={cn(
                      'flex flex-col items-center justify-center flex-1 h-full',
                      'transition-colors',
                      isActive
                        ? 'text-purple-600 bg-purple-100'
                        : 'text-muted-foreground',
                      'hover:bg-gray-500/20'
                    )}
                  >
                    <PlusCircle className="h-5 w-5" />
                    <span className="text-xs mt-1">Create</span>
                  </Link>
                ) : (
                  <Link
                    href={tab.href || "#"}
                    prefetch={tab.href !== undefined}
                    className={cn(
                      'flex flex-col items-center justify-center flex-1 h-full',
                      'transition-colors',
                      isActive
                        ? 'text-purple-600 bg-purple-100'
                        : 'text-muted-foreground',
                      'hover:bg-gray-500/20'
                    )}
                  >
                    {tab.icon && <tab.icon className="h-5 w-5" />}
                    <span className="text-xs mt-1">{tab.label}</span>
                  </Link>
                )}
              </React.Fragment>
            );
          })}
          {remainingTabs.length > 0 && (
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className={cn(
                    'flex flex-col items-center justify-center flex-1 h-full',
                    'transition-colors',
                    isMoreActive
                      ? 'text-purple-600 bg-purple-100'
                      : 'text-muted-foreground',
                    'hover:bg-gray-500/20'
                  )}
                >
                  <Menu className="h-5 w-5" />
                  <span className="text-xs mt-1">More</span>
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[50vh]">
                <div className="grid grid-cols-3 gap-4 p-4">
                  {remainingTabs.map((tab) => {
                    const isActive = pathname === tab.href;
                    return (
                      <SheetClose asChild key={tab.id}>
                        <Link
                          href={tab.href || "#"}
                          prefetch={tab.href !== undefined}
                          className={cn(
                            'flex flex-col items-center justify-center p-4 rounded-lg',
                            'transition-colors',
                            isActive
                              ? 'text-purple-600 bg-purple-100'
                              : 'text-muted-foreground',
                            'hover:bg-gray-500/20'
                          )}
                        >
                          <tab.icon className="h-6 w-6" />
                          <span className="text-sm mt-2">{tab.label}</span>
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
