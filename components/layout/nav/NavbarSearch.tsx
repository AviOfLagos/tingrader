import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const NavbarSearch = () => {
  return (
    <>
      {/* Search Bar - Hidden on mobile */}
      <div className="hidden md:flex flex-1 items-center max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tasks..." className="pl-8 w-full" />
        </div>
      </div>

      {/* Mobile Search Trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetTitle>Search</SheetTitle>
          <div className="relative mt-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search tasks..." className="pl-8 w-full" />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NavbarSearch;